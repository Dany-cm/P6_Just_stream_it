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
    image.id = `${movie.id}`

    image.setAttribute('id', `${movie.id}`)
    image.onclick = onImgClicked

    /* Add add image to the div */
    divItem.append(image)

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
    image.id = `${movie.id}`

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

/* Modal */
const onImgClicked = function (event) {
    const modal = document.getElementById("myModal");
    const movie_id = event.target.getAttribute('id')
    const span = document.getElementsByClassName("close-modal")[0];

    fetch(`${api_url}${movie_id}`)
        .then(res => res.json())
        .then(movie => {
            document.getElementsByClassName('movie-img')[0].src = movie.image_url
            document.getElementsByClassName("movie-titles")[0].innerHTML = `<p><strong>Titre: </strong>${movie.title}</p>`
            document.getElementsByClassName("movie-genre")[0].innerHTML = `<p><strong>Genre(s): </strong>${movie.genres}</p>`
            document.getElementsByClassName("movie-release-date")[0].innerHTML = `<p><strong>Date de sortie: </strong>${movie.date_published}</p>`
            document.getElementsByClassName("movie-rated")[0].innerHTML = `<p><strong>Rated: </strong>${movie.rated}</p>`
            document.getElementsByClassName("movie-rating-imdb")[0].innerHTML = `<p><strong>Score IMDB: </strong>${movie.imdb_score}</p>`
            document.getElementsByClassName("movie-director")[0].innerHTML = `<p><strong>Réalisateur(s): </strong>${movie.directors}</p>`
            document.getElementsByClassName("movie-list-actors")[0].innerHTML = `<p><strong>Liste des acteurs: </strong>${movie.actors}</p>`
            document.getElementsByClassName("movie-duration")[0].innerHTML = `<p><strong>Duration: </strong>${movie.duration} minutes </p>`
            document.getElementsByClassName("movie-country-origin")[0].innerHTML = `<p><strong>Origine(s): </strong>${movie.countries}</p>`
            document.getElementsByClassName("movie-box-office-result")[0].innerHTML = `<p><strong>Résultat du box office: </strong>${movie.worldwide_gross_income ?? 'Not available'}</p>`
            document.getElementsByClassName("movie-description")[0].innerHTML = `<p><strong>Synopsis: </strong>${movie.description}</p>`

            /* Display the modal */
            modal.style.display = "block"
        })
    
    /* Close the modal when clicking on the button */
    span.onclick = function () {
        modal.style.display = "none";
    }

    /* Close the modal when clicking anywhere */
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
