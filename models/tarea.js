import { v4 as uuidv4 } from "uuid";
/* 
 Objeto que se crea para almacenar los valores de las tareas
  id
  descripción
  fecha de completado

  uuidv4 genera un id único
*/

class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

export default Tarea;
