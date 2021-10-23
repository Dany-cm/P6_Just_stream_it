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

/*  Call fetchMovies with selected parameters and add it to the carousel */
function fetchAndUpdate() {
    fetchMovies("", 1).then(movie => {
        addCarouselItem(movie.results[0], "top-rated-movie")
        document.getElementsByClassName("movie-title")[0].innerText = movie.results[0].title
    })
    fetchMovies("", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "best-rated-movies")
        }
    })
    fetchMovies("adventure", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "adventure-category-movies")
        }
    })
    fetchMovies("horror", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "horror-category-movies")
        }
    })
    fetchMovies("crime", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "crime-category-movies")
        }
    })
}

/* Add movies to the carousel */
function addCarouselItem(movie, carouselDivId) {
    /* Create a div and img element */
    const divItem = document.createElement("div");
    const image = document.createElement('img');

    /* Set image source to the movie url and alt to the title*/
    image.src = `${movie.image_url}`
    image.alt = `Image de couverture du film ${movie.title}`

    /* Add a class img to the div and add image to it */
    divItem.setAttribute("class", "image")
    divItem.appendChild(image)

    /* Query the path to the movies-carousel and add all information */
    const carousel = document.querySelector(`#${carouselDivId} > div > div.movies-carousel`)
    carousel.append(image)
}

/* Update carousel's movies */
function updateCarouselItem(movie, carouselDivId) {
    /* Get img element */
    const image = document.querySelector(`#${carouselDivId} > div > div > img`);

    /* Set image source to the movie url and alt to the title*/
    image.src = `${movie.image_url}`
    image.alt = `Image de couverture du film ${movie.title}`

    /* Query the path to the movies-carousel and add all information */
    const carousel = document.querySelector(`#${carouselDivId} > div > div.movies-carousel`)
    carousel.append(image)
}


const pageCounter = []
pageCounter['best-rated-movies'] = { page: 1, genre: "" }
pageCounter['adventure-category-movies'] = { page: 1, genre: 'adventure' }
pageCounter['horror-category-movies'] = { page: 1, genre: 'horror' }
pageCounter['crime-category-movies'] = { page: 1, genre: 'crime' }

/* Function to handle arrows */
function scrollContainer(container, direction) {
    if (direction == "next") {
        fetchMovies(pageCounter[container].genre, ++pageCounter[container].page).then(movie => {
            for (movie of movie.results) {
                updateCarouselItem(movie, container)
            }
        })
    } else if (direction == "previous" && pageCounter[container].page != 1) {
        fetchMovies(pageCounter[container].genre, --pageCounter[container].page).then(movie => {
            for (movie of movie.results) {
                updateCarouselItem(movie, container)
            }
        })
    }
}