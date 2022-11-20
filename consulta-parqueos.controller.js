// * Controlador de '/home' *//

const mongodb = require("mongodb");
const Parqueo = require("../models/Parqueo");

const consultaParqueosController = {};

consultaParqueosController.getParqueo = async (req, res) => {
  const parqueoEncontrado = await Parqueo.findOne({
    _id: new mongodb.ObjectId(req.params.mongo_id),
  });

  res.send(parqueoEncontrado);
};

consultaParqueosController.getEspaciosParqueo = async (req, res) => {
  const parqueoEncontrado = await Parqueo.findOne({
    _id: new mongodb.ObjectId(req.params.mongo_id),
  });

  res.send(parqueoEncontrado.espacios);
};

consultaParqueosController.getHorariosParqueo = async (req, res) => {
  const parqueoEncontrado = await Parqueo.findOne({
    _id: new mongodb.ObjectId(req.params.mongo_id),
  });

  res.send(parqueoEncontrado.horario);
};

consultaParqueosController.getEspaciosParqueoTipo = async (req, res) => {
  const parqueoEncontrado = await Parqueo.findOne({
    _id: new mongodb.ObjectId(req.params.mongo_id)
  });

  res.send(parqueoEncontrado.espacios.filter(espacio => {
    return espacio.tipo === req.params.tipo && espacio.ocupado === "0";
  }));
};

consultaParqueosController.getAllParqueos = async (req, res) => {
  const parqueosEncontrado = await Parqueo.find();
  res.send(parqueosEncontrado);
};

consultaParqueosController.getAllParqueosCombo = async (req, res) => {
  const parqueosEncontrados = await Parqueo.find();
  let finalJSON = [];

  for (let index = 0; index < parqueosEncontrados.length; index++) {
    //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);
    let newData = {
      _id: parqueosEncontrados[index]._id.valueOf(),
      _id_parqueo: parqueosEncontrados[index]._id_parqueo,
      tipo: parqueosEncontrados[index].tipo,
    };
    finalJSON.push(newData);
  }

  res.send(finalJSON);
};

consultaParqueosController.updateOneParqueo = async (req, res) => {
  const parqueoEncontrado = await Parqueo.findOne({
    _id: new mongodb.ObjectId(req.params.mongo_id),
  });
  parqueoEncontrado.overwrite(req.body);
  await parqueoEncontrado.save();
  res.send("Updated");
};
// ObjectId("507c7f79bcf86cd7994f6c0e").valueOf() = 507c7f79bcf86cd7994f6c0e
consultaParqueosController.deleteParqueo = async (req, res) => {
  await Parqueo.deleteOne({ _id: new mongodb.ObjectId(req.params.mongo_id) });
  res.send("Deleted");
};

module.exports = consultaParqueosController;
