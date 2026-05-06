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
    if (!localStorage.getItem('marcador1')) {
        localStorage.setItem('marcador1', 0);
        localStorage.setItem('marcador2', 0);
        marcador1 = localStorage.getItem('marcador1')
        marcador2 = localStorage.getItem('marcador2')
    } else {
        marcador1 = localStorage.getItem('marcador1')
        marcador2 = localStorage.getItem('marcador2')
    }
    //contador de muertes
    for (i = 0; 1 < marcador1; i++) {
        document.querySelector('.vidas2').innerHTML += "<img src='img/calavera.png'>"
    }
    for (i = 0; 1 < marcador2; i++) {
        document.querySelector('.vidas1').innerHTML += "<img src='img/calavera.png'>"
    }

    if (marcador1 >= 3 || marcador2 >= 3) {
        document.querySelector('bg-juego').style.backgroundImage = "url('img/bg_personaje.png')";
        if (marcador1 >= 3) {
            document.querySelector('#nombreGanador').innerHTML = localStorage.getItem('jugador1')
            document.querySelector('#imgGanador').setAttribute('src', 'img/p' + localStorage.getItem('personaje1') + '.png')
            document.querySelector('.left').style.display = "none";
            document.querySelector('.right').style.display = "none";
        } else if (marcador2 >= 3) {
            document.querySelector('#nombreGanador').innerHTML = localStorage.getItem('jugador2')
            document.querySelector('#imgGanador').setAttribute('src', 'img/p' + localStorage.getItem('personaje2') + '.png')
            document.querySelector('.left').style.display = "none";
            document.querySelector('.right').style.display = "none";
        }
    } else {
        listos();
        document.querySelector('.ganador').style.display = "none";
        bg = Math.floor(Math.random() * 3) + 1;
        document.querySelector('.bg-juego').style.backgroundImage = "url('img/bg" + bg + ".png')";
    }

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
    var msj = document.querySelector('.msj');
    msj.style.opacity = "0";
    msj.style.pointerEvents = "none";
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
            // Tiempo aleatorio entre 1 y 5 segundos (en milisegundos)
            let tiempoRandom = (Math.floor(Math.random() * 5) + 1) * 1000;

            setTimeout(function () {
                document.querySelector('.no1').style.opacity = "0";
                document.querySelector('.conteo').style.display = "none";
                sfxclick.play();

                // Habilitar disparos
                document.querySelector('.left').setAttribute('onclick', 'disparo1()');
                document.querySelector('.right').setAttribute('onclick', 'disparo2()');
            }, tiempoRandom);
        }, 1000);
    }, 1000);
}

function disparo1() {
    console.log("Jugador 1 dispara");
    document.querySelector('.right').setAttribute('onclick', '');
    document.querySelector('.left').setAttribute('onclick', '');

    // El jugador 2 (derecha) es eliminado
    document.querySelector('.p2').style.right = "-800px";

    // Animación de disparo para jugador 1
    document.querySelector('.p1').style.left = "10px";
    setTimeout(function () {
        document.querySelector('.p1').style.left = "6%"; // Regresa a su posición original
    }, 150);

    marcador1++
    localStorage.setItem('marcador1', marcador1)

    reproducirAudio('sfx/start.m4a');

    // Reiniciar juego tras 2 segundos
    setTimeout(function () {
        window.location.reload();
    }, 2000);
}

function disparo2() {
    console.log("Jugador 2 dispara");
    document.querySelector('.right').setAttribute('onclick', '');
    document.querySelector('.left').setAttribute('onclick', '');

    // El jugador 1 (izquierda) es eliminado
    document.querySelector('.p1').style.left = "-800px";

    // Animación de disparo para jugador 2
    document.querySelector('.p2').style.right = "10px";
    setTimeout(function () {
        document.querySelector('.p2').style.right = "2.5%"; // Regresa a su posición original
    }, 150);

    marcador2++
    localStorage.setItem('marcador2', marcador2)

    reproducirAudio('sfx/start.m4a');

    // Reiniciar juego tras 2 segundos
    setTimeout(function () {
        window.location.reload();
    }, 2000);
}

function restart() {
    //poner los marcadores en local storage en 0
    localStorage.setItem('marcador1', 0);
    localStorage.setItem('marcador2', 0);
    //regresar a la ventana personaje.html
    window.location.assign('personaje.html');
}