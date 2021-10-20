const api_url = "http://localhost:8000/api/v1/titles/"

/* Display all movies and fill the carousel */
fetchAndUpdate()

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
    fetchMovies("", 1).then(movie => displayMovie(movie.results[0], "top-rated-movie"))
    fetchMovies("", 1).then(movie => { for (movie of movie.results) {addCarouselItem(movie, "best-rated-movies-carousel")}})
    fetchMovies("adventure", 1).then(movie => { for (movie of movie.results) {addCarouselItem(movie, "adventure-category-movies-carousel")}})
    fetchMovies("horror", 1).then(movie => { for (movie of movie.results) {addCarouselItem(movie, "horror-category-movies-carousel")}})
    fetchMovies("crime", 1).then(movie => { for (movie of movie.results) {addCarouselItem(movie, "crime-category-movies-carousel")}})
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