import inquirer from "inquirer";
import colors from "colors";

// preguntas principales
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

// función que imprime en consola las preguntas y retorna la opción escogida
const inquirerMenu = async () => {
  console.clear();

  console.log("===================================".green);
  console.log("      Seleccione una opción".white);
  console.log("===================================\n".green);

  // inquirer devuelve un objeto con el nombre de la question
  const { opcion } = await inquirer.prompt(preguntas);

  // retornamos la opción que escoge el usuario
  return opcion;
};

// función para crear una pausa en la consola
const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  // espaciado en consola
  console.log(`\n`);

  // imprimimos la question en consola
  await inquirer.prompt(question);
};

// función para que el usuario introduzca un valor
// Seria el valor a insertar en crear tarea
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];

  // guardamos el valor que el usuario introduce
  const { desc } = await inquirer.prompt(question);

  // retornamos el valor
  return desc;
};

// Función para eliminar tareas de un array
const listadoTareasBorrar = async (tareas = []) => {
  // Recorremos las tareas del array y retornamos un arreglo de objetos con el valor del id y el index
  const choices = tareas.map((tarea, i) => {
    //
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  // Agregamos la opción de cancelar
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  // Creamos las preguntas del prompt
  const question = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  // Imprimimos el prompt en consola y retornamos el id que se va a eliminar
  const { id } = await inquirer.prompt(question);

  return id;
};

// Función para confirmar si desea eliminar una tarea
const confirmar = async (message) => {
  //
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

//
const mostrarListadoChecklist = async (tareas = []) => {
  // Recorremos las tareas del array y retornamos un arreglo de objetos con el valor del id y el index y si esta chequeado
  const choices = tareas.map((tarea, i) => {
    //
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  // Creamos las preguntas del prompt
  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  // Imprimimos el prompt en consola y retornamos el id que se va a eliminar
  const { ids } = await inquirer.prompt(question);

  return ids;
};

export {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
