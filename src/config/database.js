const mongooes = require('mongoose');
 const connectdb = async () => {
  await mongooes.connect(
    'mongodb+srv://atuljaiswal0912:Atul%40123@cluster0.u1tpyon.mongodb.net/devTinder'
  );
 }

 module.exports = connectdb;
