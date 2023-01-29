export async function handler(event) {
  let numberRand = Math.floor(Math.random() * 10000);
  try {
    const res = await global.fetch(
      `https://api.themoviedb.org/3/movie/${numberRand}?api_key=${process.env.MOVIEDB_API_KEY}`
    );
    if (res.status == 404) {
      return {
        statusCode: 404,
        body: `{"message":"Not found movie"}`,
      };
    }
    const data = await res.json();
    const { original_title, overview, poster_path } = data;

    const movie = {
      title: original_title,
      description: overview,
      poster: poster_path,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(movie),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal server error: " + error,
    };
  }
}
