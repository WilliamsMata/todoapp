import fs from "fs";

// Donde sera guardado la data
const archivo = "./db/data.json";

const guardarDB = (data) => {
  // Creamos la data
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
  // Si no existe el archivo retornamos null
  if (!fs.existsSync(archivo)) {
    return null;
  }

  // Leemos la DB
  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  const data = JSON.parse(info);

  //console.log(data);

  return data;
};

export { guardarDB, leerDB };
