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
    var span = document.getElementsByClassName("close-modal")[0];
    fetch(`${api_url}${movie_id}`)
        .then(res => res.json())
        .then(movie => {
            document.getElementsByClassName('movie-img')[0].src = movie.image_url
            document.getElementsByClassName("movie-titles")[0].textContent = `Titre: ${movie.title}`
            document.getElementsByClassName("movie-genre")[0].textContent = `Genre(s): ${movie.genres}`
            document.getElementsByClassName("movie-release-date")[0].textContent = `Date de sortie: ${movie.date_published}`
            document.getElementsByClassName("movie-rated")[0].textContent = `Rated: ${movie.rated}`
            document.getElementsByClassName("movie-rating-imdb")[0].textContent = `Score IMDB: ${movie.imdb_score}`
            document.getElementsByClassName("movie-director")[0].textContent = `Réalisateur(s): ${movie.directors}`
            document.getElementsByClassName("movie-list-actors")[0].textContent = `Liste des acteurs: ${movie.actors}`
            document.getElementsByClassName("movie-duration")[0].textContent = `Duration : ${movie.duration} minutes`
            document.getElementsByClassName("movie-country-origin")[0].textContent = `Origine(s) : ${movie.countries}`
            document.getElementsByClassName("movie-box-office-result")[0].textContent = `Résultat du box office: ${movie.worldwide_gross_income ?? 'Non disponible'}`
            document.getElementsByClassName("movie-description")[0].textContent = `Synopsis: ${movie.description}`

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
