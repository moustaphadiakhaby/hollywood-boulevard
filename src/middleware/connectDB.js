import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  // Si on est déjà connecté, on garde la connexion actuelle
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  // Sinon, on se connecte
  await mongoose.connect(process.env.DATABASE_URI);

  return handler(req, res);
};

export default connectDB;
