






let grille = document.getElementById("grille");
let cardList = [];


document.getElementById("quatre").addEventListener("click", function () {



    document.getElementById("grille").style.display = "grid";
    document.getElementById("chrono").style.display = "flex";
    document.getElementById("main").style.display = "none";

    for (i = 0; i < 16; i++) {
        cardList.push(i);
    }

    for (i = 0; i < 8; i++) {
        let b = Math.floor(Math.random() * cardList.length);
        document.getElementsByClassName("flip-card-back")[cardList[b]].innerHTML = "<img src='https://picsum.photos/id/" + (i + 10) + "/200/300'>";
        cardList.splice(b, 1);
        console.log(cardList)

        let a = Math.floor(Math.random() * cardList.length);
        document.getElementsByClassName("flip-card-back")[cardList[a]].innerHTML += "<img src='https://picsum.photos/id/" + (i + 10) + "/200/300'>";;
        cardList.splice(a, 1);
        console.log(a)
    }
});



document.getElementById("six").addEventListener("click", function () {
    for (i = 0; i < 20; i++) {

        let flipCard = document.querySelector(".flip-card:empty");
        let flipCardInner = document.createElement("div");
        flipCardInner.className = "flip-card-inner";
        let flipCardFront = document.createElement("div");
        flipCardFront.className = "flip-card-front";
        let flipCardBack = document.createElement("div");
        flipCardBack.className = "flip-card-back";
        flipCard.appendChild(flipCardInner);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
    }

    for (i = 0; i < 36; i++) {
        cardList.push(i);
    }

    for (i = 0; i < 18; i++) {
        let b = Math.floor(Math.random() * cardList.length);
        document.getElementsByClassName("flip-card-back")[cardList[b]].innerHTML = "<img src='https://picsum.photos/id/" + (i + 10) + "/200/300'>";
        cardList.splice(b, 1);

        let a = Math.floor(Math.random() * cardList.length);
        document.getElementsByClassName("flip-card-back")[cardList[a]].innerHTML += "<img src='https://picsum.photos/id/" + (i + 10) + "/200/300'>";;
        cardList.splice(a, 1);
    }
    document.getElementById("main").style.cssText = "display: none";
    document.getElementById("chrono").style.cssText = "display: flex; width: 80%";
    document.getElementById("grille").style.cssText = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; grid-template-rows: 15% 15% 15% 15% 15% 15%; width: 80%";
});

document.getElementById("huit").addEventListener("click", function () {
    for (i = 0; i < 48; i++) {

        let flipCard = document.querySelector(".flip-card:empty");
        let flipCardInner = document.createElement("div");
        flipCardInner.className = "flip-card-inner";
        let flipCardFront = document.createElement("div");
        flipCardFront.className = "flip-card-front";
        let flipCardBack = document.createElement("div");
        flipCardBack.className = "flip-card-back";
        flipCard.appendChild(flipCardInner);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
    }

    for (i = 0; i < 64; i++) {
        cardList.push(i);
    }

    for (i = 0; i < 32; i++) {
        let b = Math.floor(Math.random() * cardList.length);
        document.getElementsByClassName("flip-card-back")[cardList[b]].innerHTML = "<img src='https://picsum.photos/id/" + (i + 10) + "/200/300'>";
        cardList.splice(b, 1);

        let a = Math.floor(Math.random() * cardList.length);
        document.getElementsByClassName("flip-card-back")[cardList[a]].innerHTML += "<img src='https://picsum.photos/id/" + (i + 10) + "/200/300'>";;
        cardList.splice(a, 1);
    }
    document.getElementById("main").style.cssText = "display: none";
    document.getElementById("chrono").style.cssText = "display: flex; width: 90%";
    document.getElementById("grille").style.cssText = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; grid-template-rows: 11% 11% 11% 11% 11% 11% 11% 11%; width: 90%";
});




const container = document.querySelectorAll('.flip-card');
let card = 0;
let flippedCard1 = "";
let flippedCard2 = "";
let imageA = "";
let imageB = "";
let paires = 0;
let score = 1;
let temps = 1;
let click = 0;


container.forEach((g) => {


    g.addEventListener("click", function () {
        function augmenterTemps() {
            let minutes = parseInt(temps / 60, 10);
            let secondes = parseInt(temps % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes
            secondes = secondes < 10 ? "0" + secondes : secondes
            document.getElementById("timer").innerText = minutes + ":" + secondes;
            temps++;
        }



        var timer;

        if (click === 0) {
            timer = setInterval(augmenterTemps, 1000);
            click++;
        }


        function unflip() {
            flippedCard1.classList.remove('is-flipped');
            flippedCard2.classList.remove('is-flipped');
        }

        function retirer() {
            flippedCard1.style.display = "none";
            flippedCard2.style.display = "none";
        }

        if (document.querySelectorAll('.is-flipped').length < 2) {

            if (document.querySelectorAll('.is-flipped').length === 1) {
                document.getElementById("coups").innerHTML = "Coups : " + score++;
                flippedCard2 = g.querySelector('.flip-card-inner');
                flippedCard2.classList.add('is-flipped');
                imageB = flippedCard2.querySelector(".flip-card-back").querySelector("img");

                if (imageA.src !== imageB.src) {
                    setTimeout(unflip, 1000);
                } else if (imageA.src === imageB.src && flippedCard1 !== flippedCard2) {
                    setTimeout(retirer, 1000);
                    setTimeout(unflip, 1000);
                    paires++;
                    if (paires === 8 || paires === 18 || paires === 32) {
                        document.getElementById("grille").style.display = "none";
                        document.getElementById("chrono").style.width = "20%";
                        document.getElementById("message").style.display = "flex";
                        for (i = 0; i < 100; i++) {
                            window.clearInterval(i);
                        }



                    }
                }
            }

            if (document.querySelectorAll('.is-flipped').length === 0) {
                flippedCard1 = g.querySelector('.flip-card-inner');
                flippedCard1.classList.add('is-flipped');
                imageA = flippedCard1.querySelector(".flip-card-back").querySelector("img");
            }
        }
    })
});

