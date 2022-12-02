import colors from "colors";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";

// Función principal
const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  // Leemos la DB
  const tareasDB = leerDB();
  if (tareasDB) {
    // Cargamos la BD en Tareas
    tareas.cargarTareasFromArr(tareasDB);
  }

  do {
    // Imprimir el menu
    opt = await inquirerMenu();

    // Opciones del menu
    switch (opt) {
      case "1":
        // Creamos tareas
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      case "2":
        // Imprimimos en consola las tareas creadas
        tareas.listadoCompleto();
        break;

      case "3":
        // Listar completadas
        tareas.mostrarPendientesCompletadas(true);
        break;

      case "4":
        // Listar pendientes
        tareas.mostrarPendientesCompletadas(false);
        break;

      case "5":
        // Completado | Pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);

        tareas.toggleCompletadas(ids);
        break;

      case "6":
        // Eliminar tarea

        //Listamos las tareas que se desea borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);

        // Si el id es cero significa que el usuario canceló la operación
        if (id !== "0") {
          // TODO: Preguntar si esta seguro
          const ok = await confirmar("Estas seguro?");

          // Eliminamos si el usuario confirma
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    // Guardamos db
    guardarDB(tareas.listadoArr);

    // Pausa para presionar enter
    await pausa();

    // Todo se ejecuta hasta que la opción sea cero
  } while (opt !== "0");
};

main();
