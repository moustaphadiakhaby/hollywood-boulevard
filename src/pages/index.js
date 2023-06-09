import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Movie from "@/models/Movie";
import checkIfConnected from "@/middleware/checkIfConnected";

const Home = ({ data }) => {
  return (
    <>
      <Head>
        <title>Hollywood Boulevard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center">
        <p className="my-10 text-3xl font-bold">Movies</p>
        <main className="mx-auto flex w-full flex-wrap justify-center gap-10 bg-red-400 p-[30px]">
          {data.map((movie) => {
            return (
              <div key={movie.id} className="flex flex-col items-center">
                <Link href={`/movie/${movie.id}`}>
                  <p className="my-5 h-20 max-w-[400px] text-3xl">
                    {movie.title}
                  </p>
                </Link>

                <Link href={`/movie/${String(movie._id)}`}>
                  <Image
                    width={400}
                    height={400}
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + movie.poster_path}
                    alt="movie"
                  />
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    checkIfConnected();
  } catch (error) {
    console.log(error.message);
  }

  let movies = [];
  // Nous allons, tout simplement, récupérer tous les éléments de la collection Article
  try {
    movies = await Movie.find();
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: {
      // Nous devons rendre serializable ce que nous renvoie mongoose
      data: JSON.parse(JSON.stringify(movies)),
    },
  };
};

// export const getStaticProps = async () => {
//   let dataToSend = [];

//   try {
//     const { data } = await axios.get(
//       "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/top_rated",
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
//         },
//       }
//     );

//     dataToSend = data.results;
//   } catch (error) {
//     console.log("catch home>>", error.message);
//   }

//   return {
//     props: { data: dataToSend },
//   };
// };
