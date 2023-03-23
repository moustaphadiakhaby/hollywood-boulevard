import mongoose from "mongoose";

const checkIfConnected = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    } else {
      return await mongoose.connect(process.env.DATABASE_URI);
    }
  } catch (error) {
    console.log(error);
  }
};

export default checkIfConnected;
