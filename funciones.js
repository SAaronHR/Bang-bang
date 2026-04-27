function jugar() {
    ponerBG();
    setTimeout(function () {
        window.location.assign('personaje.html');
    }, 2000);
    reproducirAudio('sfx/start.m4a');
}

function ponerBG() {
    var capa = document.querySelector('.bg-transicion');
    if (!capa) return;

    capa.classList.remove('bg-transicion-hide');
    capa.classList.add('bg-transicion-show');
}

function quitarBG() {
    var capa = document.querySelector('.bg-transicion');
    if (!capa) return;

    capa.classList.add('bg-transicion-hide');
    setTimeout(function () {
        capa.classList.remove('bg-transicion-show');
        capa.classList.remove('bg-transicion-hide');
    }, 1100);
}

let personajeActual = 1;
let personajeBloqueado = null;
let musicaJuego = null;

function inicializarSelectorPersonaje() {
    personajeBloqueado = document.getElementById('jugador2') ? parseInt(localStorage.getItem('personaje1'), 10) : null;
    if (personajeBloqueado === personajeActual) {
        // Se mueve sin sonido porque ocurre automaticamente al cargar la vista.
        moverPersonaje(1);
        return;
    }
    actualizarPersonaje();
}

function actualizarPersonaje() {
    document.getElementById('personaje').src = 'img/p' + personajeActual + '.png';
}

function moverPersonaje(direccion) {
    do {
        personajeActual += direccion;
        if (personajeActual == 7) {
            personajeActual = 1;
        }
        if (personajeActual == 0) {
            personajeActual = 6;
        }
    } while (personajeBloqueado === personajeActual);

    actualizarPersonaje();
}

function siguientePersonaje() {
    moverPersonaje(1);
    reproducirAudio('sfx/Jump.mp3');
}

function anteriorPersonaje() {
    moverPersonaje(-1);
    reproducirAudio('sfx/Jump.mp3');
}

function personaje2() {
    localStorage.setItem('personaje1', personajeActual);
    localStorage.setItem('jugador1', document.getElementById('jugador1').value);
    ponerBG();
    setTimeout(function () {
        window.location.assign('personaje2.html');
    }, 2000);
    reproducirAudio('sfx/Jump.mp3');
}

function comenzarJuego() {
    localStorage.setItem('personaje2', personajeActual);
    localStorage.setItem('jugador2', document.getElementById('jugador2').value);
    ponerBG();
    setTimeout(function () {
        window.location.assign('juego.html');
    }, 2000);
    reproducirAudio('sfx/Jump.mp3');
}

function reproducirAudio(ruta) {
    var audio = new Audio(ruta);
    audio.play().catch(function () {
        // El navegador puede bloquear autoplay sin interaccion del usuario.
    });
}

// funcion para cargar el fondo del escenario y a los
// personajes seleccionados con el nombre del jugador
function cargarEscenario() {
    var bg = Math.floor(Math.random() * 3) + 1;
    var jugador1 = localStorage.getItem('jugador1') || 'jug1';
    var jugador2 = localStorage.getItem('jugador2') || 'jug2';
    var personaje1 = parseInt(localStorage.getItem('personaje1'), 10) || 1;
    var personaje2 = parseInt(localStorage.getItem('personaje2'), 10) || 2;

    var escenario = document.querySelector('.bg-juego');
    var p1 = document.querySelector('.p1');
    var p2 = document.querySelector('.p2');

    if (escenario) {
        escenario.style.backgroundImage = 'url("img/bg' + bg + '.png")';
    }

    if (p1) {
        p1.style.setProperty('--personaje-img', 'url("img/p' + personaje1 + '.png")');
    }

    if (p2) {
        p2.style.setProperty('--personaje-img', 'url("img/p' + personaje2 + '.png")');
    }

    var j1 = document.getElementById('jugador1');
    var j2 = document.getElementById('jugador2');
    if (j1) j1.textContent = jugador1;
    if (j2) j2.textContent = jugador2;

    reproducirMusicaJuego();
    listos();
}

function reproducirMusicaJuego() {
    if (!document.querySelector('.bg-juego')) return;

    if (musicaJuego) {
        musicaJuego.pause();
        musicaJuego.currentTime = 0;
    }

    musicaJuego = new Audio('sfx/start.m4a');
    musicaJuego.preload = 'auto';
    musicaJuego.loop = false;
    musicaJuego.currentTime = 0;
    musicaJuego.play().catch(function () {
        // Si el navegador bloquea autoplay, el audio iniciara en el siguiente gesto del usuario.
    });
}

function listos() {
    setTimeout(function () {
        document.querySelector('.msj').style.opacity = "1";
    }, 500);
}

function conteo() {
    var sfxclick = new Audio('sfx/Jump.mp3');
    document.querySelector('.msj').style.opacity = "0";
    document.querySelector('.no3').style.opacity = "1";
    sfxclick.play();

    setTimeout(function () {
        document.querySelector('.no3').style.opacity = "0";
        document.querySelector('.no2').style.opacity = "1";
        sfxclick.play();

        setTimeout(function () {
            document.querySelector('.no2').style.opacity = "0";
            document.querySelector('.no1').style.opacity = "1";
            sfxclick.play();
            tiempoRandom = Math.floor((Math.random() * 10) + 1);
            tiempoRandom = tiempoRandom + "000"

            setTimeout(function () {
                document.querySelector('.no1').style.opacity = "0";
                document.querySelector('.conteo').style.display = "none";
                sfxclick.play();
            }, tiempoRandom);
        }, 1000);
    }, 1000);
}