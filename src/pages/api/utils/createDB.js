import data from "@/assets/data.json";
import connectDB from "@/middleware/connectDB";
import Movie from "@/models/Movie";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      await Movie.insertMany(data);

      res.status(200).json("registered");
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(404).json("Route not found");
  }
};

export default connectDB(handler);
