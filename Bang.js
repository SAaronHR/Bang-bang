function jugar() {
    ponerBG();
    setTimeout(
        function () {
            window.location.assign("Personaje.html");
        }, 2000)
    var sfxStart = new Audio('sfx/start.m4a');
    sfxStart.play();
}

function ponerBG() {
    document.querySelector('.bg-transicion').classList.add('bg-transicion-show');
}

function quitarBG() {
    document.querySelector('.bg-transicion').style.backgroundColor = "rgba(0, 0, 0, 0)";
    setTimeout(
        function () {
            document.querySelector('.bg-transicion').classList.remove('bg-transicion-show');
        }, 2000)
}

let personajeActual = 1;
function siguientePersonaje() {
    personajeActual++;
    if (personajeActual == 7) {
        personajeActual = 1;
    }
    document.getElementById("personaje").src = "img/p" + personajeActual + ".png"
    var sfxclick = new Audio('sfx/Jump.mp3');
    sfxclick.play();
}

function anteriorPersonaje() {
    personajeActual--;
    if (personajeActual == 0) {
        personajeActual = 6;
    }
    document.getElementById("personaje").src = "img/p" + personajeActual + ".png"
    var sfxclick = new Audio('sfx/Jump.mp3');
    sfxclick.play();

}


function personaje2() {
    localStorage.setItem("personaje1", personajeActual);
    localStorage.setItem("jugador1", document.getElementById("jugador1").value);

    ponerBG();
    setTimeout(
        function () {
            window.location.assign("Personaje2.html");
        }, 2000)
    var sfxStart = new Audio('sfx/Jump.mp3');
    sfxStart.play();
}

function comenzarJuego() {
    localStorage.setItem("personaje2", personajeActual);
    localStorage.setItem("jugador2", document.getElementById("jugador2").value);

    ponerBG();
    setTimeout(
        function () {
            window.location.assign("Escenario.html");
        }, 2000)
    var sfxStart = new Audio('sfx/start.m4a');
    sfxStart.play();
}

function cargarEscenario() {

    let escenario = document.getElementById("escenario");
    if (!escenario) return;

    // Fondo aleatorio
    let bg = Math.floor(Math.random() * 3) + 1;
    escenario.style.backgroundImage = `url('img/bg${bg}.png')`;
    escenario.style.backgroundSize = "cover";
    escenario.style.backgroundPosition = "center";

    let nombre1 = localStorage.getItem("jugador1");
    let nombre2 = localStorage.getItem("jugador2");

    let personaje1 = localStorage.getItem("personaje1");
    let personaje2 = localStorage.getItem("personaje2");

    let n1 = document.getElementById("nombre1");
    let n2 = document.getElementById("nombre2");
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");

    //Los nombres de los personajes
    if (n1) n1.textContent = nombre1;
    if (n2) n2.textContent = nombre2;

    if (p1 && personaje1) p1.src = "img/p" + personaje1 + ".png";
    if (p2 && personaje2) p2.src = "img/p" + personaje2 + ".png";

    //Los personajes se ven
    if (p1) p1.style.transform = "scaleX(1)";
    if (p2) p2.style.transform = "scaleX(-1)";

    listos();
}

function listos() {
    let msj = document.querySelector('.msj');
    if (!msj) return;
    setTimeout(function () {
        msj.style.opacity = "1";
    }, 500);
}

function conteo() {
    var sfxclick = new Audio('sfx/Jump.mp3')
    document.querySelector('.msj').style.opacity = "0";
    document.querySelector(".no3").style.display = "block";
    sfxclick.play();
    setTimeout(function () {
        document.querySelector(".no3").style.display = "none";
        document.querySelector(".no2").style.display = "block";
        sfxclick.play();


        setTimeout(function () {
            document.querySelector(".no2").style.display = "none";
            document.querySelector(".no1").style.display = "block";
            sfxclick.play();

            tiempoRandom = Math.floor(Math.random() * 10) + 1;
            tiempoRandom = tiempoRandom * 1000;

            setTimeout(function () {
                document.querySelector(".no1").style.display = "none";
                document.querySelector(".conteo").style.display = "none";
            }, tiempoRandom);
        }, 1000)
    }, 1000);
}