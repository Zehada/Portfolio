/**********
 * LOADER *
 **********/

// code pour afficher et enlever le loader
const loading = document.getElementById("loader");
const content = document.getElementById("content");


if ((window.location.pathname.endsWith('/movie-quiz.html')) && (!sessionStorage.viewed)) {

    sessionStorage.viewed = 1;

    const spansLoader = loading.querySelectorAll("span");

    for (span of spansLoader) {
        span.innerHTML = "?";
    }

    document.onload = setTimeout(showContent, 3500);

    function showContent() {
        loading.style.display = "none";
        content.style.display = "block";
    }


    let titreLoader = document.getElementById("titre-loader");
    let spans = document.querySelectorAll("h1 span");
    let title = titreLoader.innerText;

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z']
    const titre = ["M", "O", "V", "I", "E", " ", "Q", "U", "I", "Z"];


    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const defilement = async () => {
        let index = 0;
        for (lettre of spans) { /* pour chaque lettre du titre */
            for (const item of alphabet) { /* pour chaque lettre de l'alphabet */
                await sleep(6) /* attend entre chaque lettre de l'alphabet */
                lettre.innerHTML = item;
            }
            lettre.innerHTML = titre[index];
            index++
        }
    }

    defilement()
} else if (window.location.pathname.endsWith('/movie-quiz.html')) {
    loading.style.display = "none";
    content.style.display = "block";
}


/**********
 * NAVBAR *
 **********/

const navItems = document.querySelectorAll(".nav-item");
const toggler = document.querySelector(".navbar-toggler");
for (item of navItems) {
    item.addEventListener("click", function () {
        toggler.click();
    });
}


/***********
 * POPOVER *
 ***********/

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));







/**********
 * SWIPER *
 **********/

var swiper = new Swiper(".myswiper", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    freeMode: true,

});



/********
 * MAIN *
 ********/

if (window.location.pathname.endsWith('/movie-quiz.html')) {
    if (localStorage.getItem("dernier trouvé") === null) {
        document.getElementById("main-content").style.backgroundImage = "linear-gradient(0deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 1) 1%, rgba(0, 0, 0, 0) 100%), url('images/john-wick.jpg')";
        document.querySelector("h2").innerHTML = "John Wick : <br>Chapitre 4";
    }

}



/********
 * JSON *
 ********/




fetch('data.json')
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (data) => {

    /*******************
     * PAGE MOVIE QUIZ *
     *******************/

    if (window.location.pathname.endsWith('/movie-quiz.html')) {


        /********
        * FILMS *
        ********/

        for (i = 0; i < data.movies.movie.length; i++) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                }
            };

            fetch('https://api.themoviedb.org/3/movie/' + data.movies.movie[i].id + '?language=fr-FR', options)
                .then(response => response.json())
                .then(dataMovie => printImageFilm(dataMovie))
                .catch(err => console.error(err));

            let printImageFilm = (dataMovie) => {
                // pour chaque film, affiche le backdrop
                // document.getElementById("filmatrouver").innerHTML += '<div class="swiper-slide atrouver filmatrouver"><a href="quiz.html" target="_blank"><img class="' + dataMovie.id + '" src="https://image.tmdb.org/t/p/original' + dataMovie.backdrop_path + '" alt=""></a></div>'
                const filmsATrouver = document.getElementById("filmatrouver");
                const divSwiper = document.createElement("div");
                divSwiper.classList.add('swiper-slide', 'atrouver', 'filmatrouver');
                filmsATrouver.appendChild(divSwiper);
                const a = document.createElement("a");
                a.href = "quiz.html";
                // a.target = "_blank";
                divSwiper.appendChild(a);
                const img = document.createElement("img");
                img.classList.add(dataMovie.id);
                img.src = "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path;
                a.appendChild(img);




                let filmATrouver = document.querySelectorAll(".filmatrouver");
                if (localStorage.getItem("trouvé " + dataMovie.title)) {
                    // pour chaque film trouvé, affiche le poster
                    // document.getElementById("filmstrouves").innerHTML += "<div class='swiper-slide trouve'><a href='quiz2.html' target='_blank'><img class='" + dataMovie.id + "' src='" + localStorage.getItem("trouvé " + dataMovie.title) + "'></a></div>";
                    const filmsTrouves = document.getElementById("filmstrouves");
                    const divSwiper = document.createElement("div");
                    divSwiper.classList.add('swiper-slide', 'trouve');
                    filmsTrouves.appendChild(divSwiper);
                    const a = document.createElement("a");
                    a.href = "quiz2.html";
                    // a.target = "_blank";
                    divSwiper.appendChild(a);
                    const img = document.createElement("img");
                    img.classList.add(dataMovie.id);
                    img.src = localStorage.getItem("trouvé " + dataMovie.title);
                    a.appendChild(img);


                    // pour chaque film trouvé, retire le backdrop
                    for (div of filmATrouver) {
                        if (div.querySelector("img").attributes['src'].value === "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path) {
                            div.remove();
                        }
                    }
                }

                // ajoute le lien de l'image et l'id du film à trouver
                const imageClicked = document.querySelectorAll(".atrouver img");
                const buttonPressed = e => {
                    localStorage.setItem('lien film', e.target.attributes['src'].value);
                    localStorage.setItem('id film', e.target.className);
                }
                for (let image of imageClicked) {
                    image.addEventListener("click", buttonPressed);
                }


                // ajoute l'id du film trouvé
                const imageTrouvee = document.querySelectorAll(".trouve img");
                const ImagePressed = e => {
                    localStorage.setItem('idtrouve', e.target.className);
                    localStorage.setItem("type", "film");
                }
                for (let image of imageTrouvee) {
                    image.addEventListener("click", ImagePressed);
                }


            }

        }






        /**********
        * SÉRIES *
        **********/

        for (i = 0; i < data.movies.serie.length; i++) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                }
            };

            fetch('https://api.themoviedb.org/3/tv/' + data.movies.serie[i].id + '?language=fr-FR', options)
                .then(response => response.json())
                .then(dataMovie => printImageFilm(dataMovie))
                .catch(err => console.error(err));

            let printImageFilm = (dataMovie) => {
                // pour chaque film, affiche le backdrop
                // document.getElementById("serieatrouver").innerHTML += '<div class="swiper-slide atrouver serieatrouver"><a href="quiz.html" target="_blank"><img class="' + dataMovie.id + '" src="https://image.tmdb.org/t/p/original' + dataMovie.backdrop_path + '" alt=""></a></div>'
                const filmsATrouver = document.getElementById("serieatrouver");
                const divSwiper = document.createElement("div");
                divSwiper.classList.add('swiper-slide', 'atrouver', 'serieatrouver');
                filmsATrouver.appendChild(divSwiper);
                const a = document.createElement("a");
                a.href = "quiz.html";
                // a.target = "_blank";
                divSwiper.appendChild(a);
                const img = document.createElement("img");
                img.classList.add(dataMovie.id);
                img.src = "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path;
                a.appendChild(img);





                let serieATrouver = document.querySelectorAll(".serieatrouver");
                if (localStorage.getItem("trouvé " + dataMovie.name)) {
                    // pour chaque film trouvé, affiche le poster
                    // document.getElementById("seriestrouvees").innerHTML += "<div class='swiper-slide trouve'><a href='quiz2.html' target='_blank'><img class='" + dataMovie.id + "' src='" + localStorage.getItem("trouvé " + dataMovie.title) + "'></a></div>";
                    const filmsTrouves = document.getElementById("seriestrouvees");
                    const divSwiper = document.createElement("div");
                    divSwiper.classList.add('swiper-slide', 'trouvee');
                    filmsTrouves.appendChild(divSwiper);
                    const a = document.createElement("a");
                    a.href = "quiz2.html";
                    // a.target = "_blank";
                    divSwiper.appendChild(a);
                    const img = document.createElement("img");
                    img.classList.add(dataMovie.id);
                    img.src = localStorage.getItem("trouvé " + dataMovie.name);
                    a.appendChild(img);



                    // pour chaque film trouvé, retire le backdrop
                    for (div of serieATrouver) {
                        if (div.querySelector("img").attributes['src'].value === "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path) {
                            div.remove();
                        }
                    }
                }


                // ajoute le lien de l'image et l'id du film à trouver
                const imageClicked = document.querySelectorAll(".atrouver img");
                const buttonPressed = e => {
                    localStorage.setItem('lien film', e.target.attributes['src'].value);
                    localStorage.setItem('id film', e.target.className);
                }
                for (let image of imageClicked) {
                    image.addEventListener("click", buttonPressed);
                }


                // ajoute l'id du film trouvé
                const imageTrouvee = document.querySelectorAll(".trouvee img");
                const ImagePressed = e => {
                    localStorage.setItem('idtrouve', e.target.className);
                    localStorage.setItem("type", "serie");
                }
                for (let image of imageTrouvee) {
                    image.addEventListener("click", ImagePressed);
                }


            }

        }




        /********
         * MAIN *
         ********/


        /*********
        * FILMS *
        *********/

        if (localStorage.getItem("type dernier trouvé") === "film") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                }
            };

            fetch('https://api.themoviedb.org/3/movie/' + localStorage.getItem("dernier trouvé") + '?append_to_response=videos&language=fr-FR', options)
                .then(response => response.json())
                .then(dataMovie => printImageFilm(dataMovie))
                .catch(err => console.error(err));

            let printImageFilm = (dataMovie) => {
                document.getElementById("main-content").style.backgroundImage = "linear-gradient(0deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 1) 1%, rgba(0, 0, 0, 0) 100%), url('https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path + "')";
                document.querySelector("h2").innerHTML = dataMovie.title;
                for (i = 0; i < dataMovie.videos.results.length; i++) {
                    if (dataMovie.videos.results[i].type === "Trailer") {
                        document.querySelector(".annonce").href = "https://www.youtube.com/watch?v=" + dataMovie.videos.results[i].key;
                    }
                }
                document.querySelector(".info").href = "https://www.themoviedb.org/movie/" + dataMovie.id;

            }

        }


        /**********
        * SÉRIES *
        **********/


        if (localStorage.getItem("type dernier trouvé") === "série") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                }
            };

            fetch('https://api.themoviedb.org/3/tv/' + localStorage.getItem("dernier trouvé") + '?append_to_response=videos&language=fr-FR', options)
                .then(response => response.json())
                .then(dataMovie => printImageFilm(dataMovie))
                .catch(err => console.error(err));

            let printImageFilm = (dataMovie) => {
                document.getElementById("main-content").style.backgroundImage = "linear-gradient(0deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 1) 1%, rgba(0, 0, 0, 0) 100%), url('https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path + "')";
                document.querySelector("h2").innerHTML = dataMovie.name;
                for (i = 0; i < dataMovie.videos.results.length; i++) {
                    if (dataMovie.videos.results[i].type === "Trailer") {
                        document.querySelector(".annonce").href = "https://www.youtube.com/watch?v=" + dataMovie.videos.results[i].key;
                    }
                }
                document.querySelector(".info").href = "https://www.themoviedb.org/tv/" + dataMovie.id;

            }

        }

    }







    /*******************
    * PAGE FORMULAIRE *
    *******************/



    contentQuiz = document.getElementById("content-quiz");
    let lienFilm = localStorage.getItem('lien film');
    let idFilm = localStorage.getItem('id film');

    if (window.location.pathname.endsWith('/quiz.html')) {
        contentQuiz.style.backgroundImage = "linear-gradient(0deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 1) 1%, rgba(0, 0, 0, 0) 100%), url('" + lienFilm + "')";
        sessionStorage.viewed = 1;
        var input = document.getElementById("fname");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("soumettre").click();
            }
        });

        document.getElementById("soumettre").addEventListener("click", function () {


            /*********
            * FILMS *
             *********/

            for (i = 0; i < data.movies.movie.length; i++) {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                    }
                };

                fetch('https://api.themoviedb.org/3/movie/' + data.movies.movie[i].id + '?language=fr-FR', options)
                    .then(response => response.json())
                    .then(dataMovie => printImageFilm(dataMovie))
                    .catch(err => console.error(err));

                let printImageFilm = (dataMovie) => {

                    if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === dataMovie.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lienFilm === "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path)) {

                        document.getElementById("bonne-reponse").style.display = "block";
                        document.getElementById("mauvaise-reponse").style.display = "none";
                        setTimeout(function () { window.location.replace("movie-quiz.html") }, 3000);
                        localStorage.setItem(("trouvé " + dataMovie.title), ("https://image.tmdb.org/t/p/original" + dataMovie.poster_path));
                        localStorage.setItem("dernier trouvé", dataMovie.id);
                        localStorage.setItem("type dernier trouvé", "film");

                    } else if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") != dataMovie.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lienFilm === "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path)) {
                        document.querySelector("input").value = "";
                        document.getElementById("mauvaise-reponse").style.display = "block";
                    }
                }
            }


            /**********
            * SERIES *
            **********/


            for (i = 0; i < data.movies.serie.length; i++) {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                    }
                };

                fetch('https://api.themoviedb.org/3/tv/' + data.movies.serie[i].id + '?language=fr-FR', options)
                    .then(response => response.json())
                    .then(dataMovie => printImageFilm(dataMovie))
                    .catch(err => console.error(err));

                let printImageFilm = (dataMovie) => {

                    if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === dataMovie.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lienFilm === "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path)) {

                        document.getElementById("bonne-reponse").style.display = "block";
                        document.getElementById("mauvaise-reponse").style.display = "none";
                        setTimeout(function () { window.location.replace("movie-quiz.html") }, 3000);
                        localStorage.setItem(("trouvé " + dataMovie.name), ("https://image.tmdb.org/t/p/original" + dataMovie.poster_path));
                        localStorage.setItem("dernier trouvé", dataMovie.id);
                        localStorage.setItem("type dernier trouvé", "série");

                    } else if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") != dataMovie.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lienFilm === "https://image.tmdb.org/t/p/original" + dataMovie.backdrop_path)) {
                        document.querySelector("input").value = "";
                        document.getElementById("mauvaise-reponse").style.display = "block";
                    }
                }
            }


        })
    };



    /*********************
    * PAGE INFORMATIONS *
    *********************/




    const contentQuizDeux = document.getElementById("content-quiz2");
    if (window.location.pathname.endsWith('/quiz2.html')) {
        sessionStorage.viewed = 1;

        /*********
         * FILMS *
         *********/
        if (localStorage.getItem('type') === "film") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                }
            };

            fetch('https://api.themoviedb.org/3/movie/' + localStorage.getItem("idtrouve") + '?language=fr-FR', options)
                .then(response => response.json())
                .then(data => printu(data))

                .catch(err => console.error(err));

            let printu = (data) => {
                document.getElementById("movietitle").innerHTML = data.title;
                document.getElementById("synopsis").innerHTML = data.overview;
                contentQuizDeux.style.backgroundImage = "linear-gradient(0deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 1) 1%, rgba(0, 0, 0, 0) 100%), url('https://image.tmdb.org/t/p/original" + data.backdrop_path + "')";
            }


            fetch('https://api.themoviedb.org/3/movie/' + localStorage.getItem("idtrouve") + '/credits?language=fr-FR', options)
                .then(response => response.json())
                .then(data => printActor(data))

                .catch(err => console.error(err));

            let printActor = (data) => {
                for (actor of data.cast) {
                    if ((actor.profile_path) && (data.cast.indexOf(actor) < 10)) {
                        // document.querySelector(".acteurs").innerHTML += "<div class='swiper-slide'><img src='https://image.tmdb.org/t/p/original" + actor.profile_path + "' alt='" + actor.name + "'><h4 class='mt-4'>" + actor.name + "</h4><h5>" + actor.character + "</h5></div>"
                        const acteurs = document.querySelector(".acteurs");
                        const divSwiper = document.createElement("div");
                        divSwiper.classList.add('swiper-slide');
                        acteurs.appendChild(divSwiper);
                        const img = document.createElement("img");
                        img.src = "https://image.tmdb.org/t/p/original" + actor.profile_path;
                        img.alt = actor.name;
                        divSwiper.appendChild(img);
                        const h4 = document.createElement("h4");
                        h4.classList.add("mt-4");
                        h4.innerHTML = actor.name;
                        divSwiper.appendChild(h4);
                        const h5 = document.createElement("h5");
                        h5.innerHTML = actor.character;
                        divSwiper.appendChild(h5);

                    }
                }

            }

        }
        /**********
        * SERIES *
        **********/

        if (localStorage.getItem('type') === "serie") {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
                }
            };
            fetch('https://api.themoviedb.org/3/tv/' + localStorage.getItem("idtrouve") + '?language=fr-FR', options)
                .then(response => response.json())
                .then(data => printSeries(data))

                .catch(err => console.error(err));

            let printSeries = (data) => {
                document.getElementById("movietitle").innerHTML = data.name;
                document.getElementById("synopsis").innerHTML = data.overview;
                contentQuizDeux.style.backgroundImage = "linear-gradient(0deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 1) 1%, rgba(0, 0, 0, 0) 100%), url('https://image.tmdb.org/t/p/original" + data.backdrop_path + "')";
            }


            fetch('https://api.themoviedb.org/3/tv/' + localStorage.getItem("idtrouve") + '/credits?language=fr-FR', options)
                .then(response => response.json())
                .then(data => printSeriesActors(data))

                .catch(err => console.error(err));

            let printSeriesActors = (data) => {
                for (actor of data.cast) {
                    if ((actor.profile_path) && (data.cast.indexOf(actor) < 10)) {
                        // document.querySelector(".acteurs").innerHTML += "<div class='swiper-slide'><img src='https://image.tmdb.org/t/p/original" + actor.profile_path + "' alt='" + actor.name + "'><h4 class='mt-4'>" + actor.name + "</h4><h5>" + actor.character + "</h5></div>"
                        const acteurs = document.querySelector(".acteurs");
                        const divSwiper = document.createElement("div");
                        divSwiper.classList.add('swiper-slide');
                        acteurs.appendChild(divSwiper);
                        const img = document.createElement("img");
                        img.src = "https://image.tmdb.org/t/p/original" + actor.profile_path;
                        img.alt = actor.name;
                        divSwiper.appendChild(img);
                        const h4 = document.createElement("h4");
                        h4.classList.add("mt-4");
                        h4.innerHTML = actor.name;
                        divSwiper.appendChild(h4);
                        const h5 = document.createElement("h5");
                        h5.innerHTML = actor.character;
                        divSwiper.appendChild(h5);

                    }


                }

            }
        }

    }





}



