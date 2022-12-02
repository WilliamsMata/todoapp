/*
 * _listado:
 *   { 'uuid-651651-616515: { id: 12, desc: asd, completadoEn: 51613}' }
 *
 * Objeto donde serán almacenadas las tareas creadas
 */
import colors from "colors";
import Tarea from "./tarea.js";

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  // método get para obtener el listado en forma de array
  get listadoArr() {
    const listado = [];

    // accedemos a los keys del listado
    Object.keys(this._listado).forEach((key) => {
      // a traves del key accedemos al objeto de tarea
      const tarea = this._listado[key];
      // agregamos los objeto de tarea al array
      listado.push(tarea);
    });

    // retornamos el array
    return listado;
  }

  // Método para cargar la base de datos al listado de de Tareas
  cargarTareasFromArr(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  // método para crear e insertar tareas en el objeto
  crearTarea(desc = "") {
    // creamos el obj tarea
    const tarea = new Tarea(desc);

    // agregamos al listado del objeto Tareas id = tarea
    this._listado[tarea.id] = tarea;
  }

  // Método que muestra en consola un listado limpio
  // 1. tarea :: Completada || Pendiente
  listadoCompleto() {
    console.log("");

    // Lista de tareas
    this.listadoArr.forEach((tarea, index) => {
      // numero de tarea
      const num = (index + 1).toString() + ".";
      // nombre de tarea y si esta completado
      const { desc, completadoEn } = tarea;
      //Validamos si esta completada o pendiente
      // prettier-ignore
      const estado = completadoEn
        ? "Completada".green
        : "Pendiente".red;

      // mostramos en consola las tareas
      console.log(`${num.green} ${desc} :: ${estado}`);
    });
  }

  // Método que muestra en consola las tareas completadas o las tareas pendientes
  mostrarPendientesCompletadas(completadas = true) {
    //
    console.log();

    let contador = 0;

    // Lista de tareas
    this.listadoArr.forEach((tarea) => {
      // nombre de tarea y cuando fue completado
      const { desc, completadoEn } = tarea;

      if (completadas) {
        // Mostrar completadas
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} :: ${completadoEn.green}`
          );
        }
      } else {
        // Mostrar pendientes
        if (!completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} :: ${"Pendiente".red}`
          );
        }
      }
    });
  }

  // Método para eliminar una tarea creada
  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  // Metodo para marcar completadas las tareas
  toggleCompletadas(ids = []) {
    // Marcar completada
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    // Quitar de completado las tareas que no estén en el checkbox
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

export default Tareas;
