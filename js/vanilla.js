const api_url = "http://localhost:8000/api/v1/titles/"

/* Display all movies and fill the carousel */
getBestRatedMovie()
initCarouselBestRated()

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

/* Display the movie */
function displayMovie(retrievedMovie, divContainer) {
    document.getElementById(divContainer + "-image").src = retrievedMovie.image_url
    document.getElementById(divContainer + "-title").innerText = retrievedMovie.title
}

/* Init the carousel and retrieve movie information */
function initCarouselBestRated() {
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
            for (let i = 0; i < 4; ++i) {
                addCarouselItem(data.results[i], "best-rated-movies-carousel")
            }
            
        }))
        .catch((error) => {
            console.log("Fetch Error :-S", error);
        });

    fetch(api_url + '?genre=action' + '&sort_by=-imdb_score')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
        .then((data => {
            for (let i = 0; i < 4; ++i) {
                addCarouselItem(data.results[i], "action-category-movies-carousel")
            }
        }))
        .catch((error) => {
            console.log("Fetch Error :-S", error);
        });

    fetch(api_url + '?genre=horror' + '&sort_by=-imdb_score')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
        .then((data => {
            for (let i = 0; i < 4; ++i) {
                addCarouselItem(data.results[i], "horror-category-movies-carousel")
            }
        }))
        .catch((error) => {
            console.log("Fetch Error :-S", error);
        });

    fetch(api_url + '?genre=drama' + '&sort_by=-imdb_score')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
        .then((data => {
            for (let i = 0; i < 4; ++i) {
                addCarouselItem(data.results[i], "drama-category-movies-carousel")
            }
        }))
        .catch((error) => {
            console.log("Fetch Error :-S", error);
        });
}

/* Add movies to the carousel */
function addCarouselItem(movie, carouselDivId) {
    const div_item = document.createElement("div");
    const image = document.createElement('img')

    image.src = `${movie.image_url}`

    div_item.appendChild(image)

    document.getElementById(carouselDivId).appendChild(div_item)
}

function scrollContainer(direction) {
    console.log('event', event)
    console.log('direction', direction)
}