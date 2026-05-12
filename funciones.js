function jugar() {
	ponerBG();
	setTimeout(
		function () {
			window.location.assign('personaje.html');
		}, 1200)
	var sfxStart = new Audio('sfx/start.m4a');
	sfxStart.play();
}

function ponerBG() {
	// document.querySelector('.bg-transicion').style.backgroundColor="rgba(0,0,0,1)";
	document.querySelector('.bg-transicion').classList.add('bg-transicion-show');
}

function quitarBG() {
	document.querySelector('.bg-transicion').style.backgroundColor = "rgba(0,0,0,.0)";
	setTimeout(
		function () {
			document.querySelector('.bg-transicion').classList.remove('bg-transicion-show')
		}, 600)
}

let personajeActual = 1;
let puedeDisparar = false;
function siguientePersonaje() {
	personajeActual++;
	if (personajeActual == 7) {
		personajeActual = 1;
	}
	document.getElementById('personaje').src = "img/p" + personajeActual + ".png";
	var sfxclic = new Audio('sfx/Jump.mp3');
	sfxclic.play();
}

function anteriorPersonaje() {
	personajeActual--;
	if (personajeActual == 0) {
		personajeActual = 6;
	}
	document.getElementById('personaje').src = "img/p" + personajeActual + ".png";
	var sfxclic = new Audio('sfx/Jump.mp3');
	sfxclic.play();
}

function personaje2() {
	localStorage.setItem('personaje1', personajeActual);
	let j1 = document.getElementById('jugador1').value.trim();
	if (j1 === '') j1 = 'Jugador 1';
	localStorage.setItem('jugador1', j1);
	ponerBG();
	setTimeout(
		function () {
			window.location.assign('personaje2.html');
		}, 1200)
	var sfxStart = new Audio('sfx/start.m4a');
	sfxStart.play();
}

function comenzarJuego() {
	localStorage.setItem('personaje2', personajeActual);
	let j2 = document.getElementById('jugador2').value.trim();
	if (j2 === '') j2 = 'Jugador 2';
	localStorage.setItem('jugador2', j2);

	ponerBG();
	setTimeout(
		function () {
			window.location.assign('juego.html');
		}, 1200)
	var sfxStart = new Audio('sfx/start.m4a');
	sfxStart.play();
}

function cargarEscenario() {
	if (!localStorage.getItem('marcador1')) {
		localStorage.setItem('marcador1', '0');
		localStorage.setItem('marcador2', '0');
		marcador1 = localStorage.getItem('marcador1');
		marcador2 = localStorage.getItem('marcador2');
	} else {
		marcador1 = localStorage.getItem('marcador1');
		marcador2 = localStorage.getItem('marcador2');
	}
	//contador de muertes
	for (i = 0; i < marcador1; i++) {
		document.querySelector('.vidas2').innerHTML += "<img src='img/calavera.png'>";
	}
	for (i = 0; i < marcador2; i++) {
		document.querySelector('.vidas1').innerHTML += "<img src='img/calavera.png'>";
	}

	if (marcador1 >= 3 || marcador2 >= 3) {
		document.querySelector('.bg-juego').style.backgroundImage = "url(img/bg_personaje.png)";
		document.querySelector('.ganador').style.display = "block";
		if (marcador1 >= 3) {
			document.querySelector('#nombreGanador').innerHTML = localStorage.getItem('jugador1');
			document.querySelector('#imgGanador').setAttribute('src', "img/p" + localStorage.getItem('personaje1') + ".png");
			document.querySelector('.left').style.display = "none";
			document.querySelector('.right').style.display = "none";
		} else if (marcador2 >= 3) {
			document.querySelector('#nombreGanador').innerHTML = localStorage.getItem('jugador2');
			document.querySelector('#imgGanador').setAttribute('src', "img/p" + localStorage.getItem('personaje2') + ".png");
			document.querySelector('.left').style.display = "none";
			document.querySelector('.right').style.display = "none";
		}
	} else {
		listos();
		document.querySelector('.ganador').style.display = "none";
		bg = Math.floor(Math.random() * 3) + 1;
		document.querySelector('.bg-juego').style.backgroundImage = "url(img/bg" + bg + ".png)";
	}

	document.querySelector('.p1').style.backgroundImage = "url(img/p" + localStorage.getItem('personaje1') + ".png)";
	document.querySelector('.p2').style.backgroundImage = "url(img/p" + localStorage.getItem('personaje2') + ".png)";

	document.querySelector('#jugador1').innerHTML = localStorage.getItem('jugador1');
	document.querySelector('#jugador2').innerHTML = localStorage.getItem('jugador2');
}

function listos() {
	setTimeout(function () {
		document.querySelector('.msj').style.opacity = "1";
	}, 500);
}

function conteo() {
	document.querySelector('.msj').removeAttribute('onclick');
	var sfxclic = new Audio('sfx/Jump.mp3');
	document.querySelector('.msj').style.opacity = "0";
	document.querySelector('.no3').style.opacity = "1";
	sfxclic.play();

	setTimeout(function () {
		document.querySelector('.no3').style.opacity = "0";
		document.querySelector('.no2').style.opacity = "1";
		sfxclic.play();

		setTimeout(function () {
			document.querySelector('.no2').style.opacity = "0";
			document.querySelector('.no1').style.opacity = "1";
			sfxclic.play();
			tiempoRandom = Math.floor((Math.random() * 10) + 1);
			tiempoRandom = tiempoRandom + "000";

			setTimeout(function () {
				document.querySelector('.no1').style.opacity = "0";
				document.querySelector('.conteo').style.display = "none";
				sfxclic.play();
				puedeDisparar = true;
			}, tiempoRandom);
		}, 1000);
	}, 1000);
}

function disparo1() {
	if (!puedeDisparar) return;
	puedeDisparar = false;
	console.log('disparo1');
	document.querySelector('.right').removeAttribute('onclick');
	document.querySelector('.left').removeAttribute('onclick');
	document.querySelector('.p2').style.right = "-800px";
	document.querySelector('.p1').style.left = "10px";
	setTimeout(function () {
		document.querySelector('.p1').style.left = "30px";
	}, 150);

	marcador1++;
	localStorage.setItem('marcador1', marcador1);

	document.querySelector('.conteo').style.display = "block";
	document.querySelector('.no1').style.display = "none";
	document.querySelector('.no2').style.display = "none";
	document.querySelector('.no3').style.display = "none";
	document.querySelector('.msj').innerHTML = "¡" + localStorage.getItem('jugador1').toUpperCase() + " GANA!";
	document.querySelector('.msj').style.opacity = "1";

	setTimeout(function () {
		window.location.assign('juego.html');
	}, 1500);
	var sfxStart = new Audio('sfx/start.m4a');
	sfxStart.play();
}

function disparo2() {
	if (!puedeDisparar) return;
	puedeDisparar = false;
	console.log('disparo2');
	document.querySelector('.right').removeAttribute('onclick');
	document.querySelector('.left').removeAttribute('onclick');
	document.querySelector('.p1').style.left = "-800px";
	document.querySelector('.p2').style.right = "10px";
	setTimeout(function () {
		document.querySelector('.p2').style.right = "30px";
	}, 150);

	marcador2++;
	localStorage.setItem('marcador2', marcador2);

	document.querySelector('.conteo').style.display = "block";
	document.querySelector('.no1').style.display = "none";
	document.querySelector('.no2').style.display = "none";
	document.querySelector('.no3').style.display = "none";
	document.querySelector('.msj').innerHTML = "¡" + localStorage.getItem('jugador2').toUpperCase() + " GANA!";
	document.querySelector('.msj').style.opacity = "1";

	setTimeout(function () {
		window.location.assign('juego.html');
	}, 1500);
	var sfxStart = new Audio('sfx/start.m4a');
	sfxStart.play();
}
function restart() {
	localStorage.setItem('marcador1', '0');
	localStorage.setItem('marcador2', '0');
	window.location.assign('personaje.html');
}


