function jugar() {
    ponerBG();
    setTimeout(function () {
        window.location.assign('personaje.html');
    }, 2000);
    var sfxStart = new Audio('sfx/start.m4a');
    sfxStart.play();
}

function ponerBG() {
    document.querySelector('.bg-transicion').classList.add('bg-transicion-show');
}

function quitarBG() {
    document.querySelector('.bg-transicion').computedStyleMap.backgroundColor = "rgba(0, 0, 0, 0)";
    setTimeout(
        function () {
            document.querySelector('.bg-transicion').classList.remove('bg-transicion-show')
        }
    )
}