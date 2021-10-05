const api_url = "http://localhost:8000/api/v1/titles/"

/*
    Get the best rated movie on imdb
*/
function getBestRatedMovie() {
    fetch(api_url + '?sort_by=-imdb_score')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
        .then((data => {
            const best_rated_movie = data.results[0]
            document.getElementById("best-image").src = best_rated_movie.image_url
            document.getElementById("best-movie-title").innerText = best_rated_movie.title
        }))
        .catch((error) => {
            console.log("Fetch Error :-S", error);
        });
}

getBestRatedMovie()