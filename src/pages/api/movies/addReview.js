import connectDB from "@/middleware/connectDB";
import Movie from "@/models/Movie";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const movie = await Movie.findById(req.body.id);

      movie.reviews.push(req.body.text);
      await movie.save();

      res.status(200).json("commentaire envoyé");
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(404).json("Route not found");
  }
};

export default connectDB(handler);
