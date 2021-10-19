const api_url = "http://localhost:8000/api/v1/titles/"

/* Display all movies and fill the carousel */
getBestRatedMovie()
fetchAndUpdate()

/* Get the best rated movie on imdb */
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
            displayMovie(data.results[0], "top-rated-movie")
        }))
        .catch((error) => {
            console.log("Fetch Error :-S", error);
        });
}

/* Fetch movies with parameters : genre, page, carouseldivid */
function fetchMovies(genre, page) {
    return fetch(`${api_url}?genre=${genre}&sort_by=-imdb_score&page=${page}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
}

function fetchAndUpdate() {
    fetchMovies("adventure", 1).then(results => addCarouselItem(results, "action-category-movies-carousel"))
}

/* Add movies to the carousel */
function addCarouselItem(movie, carouselDivId) {
    const div_item = document.createElement("div");
    const image = document.createElement('img')

    image.src = `${movie.image_url}`

    div_item.appendChild(image)

    document.getElementById(carouselDivId).appendChild(div_item)
}

/* Display the movie */
function displayMovie(retrievedMovie, divContainer) {
    document.getElementById(divContainer + "-image").src = retrievedMovie.image_url
    document.getElementById(divContainer + "-title").innerText = retrievedMovie.title
}
