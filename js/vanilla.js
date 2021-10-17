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
            addCarouselItem(data.results[1], "best-rated-movies-carousel")
            addCarouselItem(data.results[2], "best-rated-movies-carousel")
            addCarouselItem(data.results[3], "best-rated-movies-carousel")
            addCarouselItem(data.results[4], "best-rated-movies-carousel")
        }))
        .catch((error) => {
            console.log("Fetch Error :-S", error);
        });

    fetch(api_url + '?genre=action')
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Something went wrong");
        }
    })
    .then((data => {
        addCarouselItem(data.results[1], "action-category-movies-carousel")
        addCarouselItem(data.results[2], "action-category-movies-carousel")
        addCarouselItem(data.results[3], "action-category-movies-carousel")
        addCarouselItem(data.results[4], "action-category-movies-carousel")
    }))
    .catch((error) => {
        console.log("Fetch Error :-S", error);
    });

    fetch(api_url + '?genre=horror')
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Something went wrong");
        }
    })
    .then((data => {
        addCarouselItem(data.results[1], "horror-category-movies-carousel")
        addCarouselItem(data.results[2], "horror-category-movies-carousel")
        addCarouselItem(data.results[3], "horror-category-movies-carousel")
        addCarouselItem(data.results[4], "horror-category-movies-carousel")
    }))
    .catch((error) => {
        console.log("Fetch Error :-S", error);
    });

    fetch(api_url + '?genre=drama')
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Something went wrong");
        }
    })
    .then((data => {
        addCarouselItem(data.results[1], "drama-category-movies-carousel")
        addCarouselItem(data.results[2], "drama-category-movies-carousel")
        addCarouselItem(data.results[3], "drama-category-movies-carousel")
        addCarouselItem(data.results[4], "drama-category-movies-carousel")
    }))
    .catch((error) => {
        console.log("Fetch Error :-S", error);
    });
}

/* Add movies to the carousel */
function addCarouselItem(movie, carouselDivId, genre) {
    const div_item = document.createElement("div");
    const image = document.createElement('img')

    image.src = `${movie.image_url}`

    div_item.appendChild(image)

    document.getElementById(carouselDivId).appendChild(div_item)

}

/* Display result */
getBestRatedMovie()
initCarouselBestRated()
