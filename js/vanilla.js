const api_url = "http://localhost:8000/api/v1/titles/"

/*
    Get the best rated movie on imdb
*/
function getBestRatedMovie() {
    fetch(api_url + '?sort_by=-imdb_score')
        .then(res => res.json())
        .then(data => {
            const best_rated_movie = data.results[0]
            document.getElementById("best-image").src = best_rated_movie.image_url
            document.getElementById("best-movie-title").innerText = best_rated_movie.title
        })
}

getBestRatedMovie()