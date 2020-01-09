function mostrar_dificultad(x) {
    usuario = document.getElementById("nombre").value;
    if (usuario != "") {
        document.getElementById("jugador").innerHTML = usuario;
        document.getElementById("nombre").remove();
        x.remove();
    }
}

//Sustituye la funcion mostrar_botones()
// JQuery - Selectors
$(document).ready(function () {
    // JQuery - Events
    $("button").click(function () {
        // JQuery - CSS
        $(".dif").css("display", "inline-block");
    });
});

//Sustituye la funcion borrar_botones()
$(document).ready(function () {
    $(".dif").click(function () {
        // JQuery - CSS
        $(".dif").hide();
    });
});

// Usando JQuery no necesito este codigo

// function mostrar_botones() {
//     var botones = document.getElementsByTagName('button');

//     for (var i = 2; i >= 0; i--) {
//         botones[i].style.display = "unset";
//     }
// }

// function borrar_botones() {
//     var botones = document.getElementsByTagName('button');

//     for (var i = 2; i >= 0; i--) {
//         botones[i].remove();
//     }
// }


var cantidad_col = 0; //Creamo la variable global para poder acceder a ella en varios metodos

//Funcion que genera las tarjetas dependiendo de la dificultad
function generar_tarjetas(x) {
    var colores = ["red ", "green ", "blue ", "yellow ", "white", "brown", "violet", "orange", "lightblue", "lime", "salmon", "indigo"]
    var dificultades = ["facil ", "normal ", "dificil "]

    //Comprobamos la dificultad y cambiamos los valores necesarios para generar todas las tarjetas
    switch (x) {
        case 1:
            dif_value = 0;
            cantidad_col = 4;
            break;
        case 2:
            dif_value = 1;
            cantidad_col = 8;
            break;
        case 3:
            dif_value = 2;
            cantidad_col = 12;
            break;
    }

    for (i = 0; i < 2; i++) {
        for (j = 0; j < cantidad_col; j++) {
            var tarjeta = document.createElement("div");
            tarjeta.setAttribute("class", "tarjetas " + dificultades[dif_value] + colores[j])
            tarjeta.setAttribute("onclick", "flip(this)")
            // JQuery - Add Remove
            $("#container").append(tarjeta);
            // document.getElementById("container").appendChild(tarjeta);
        }
    }

    // JQuery - Efectes a
    // JQuery - Efectes b
    // JQuery - Chaining
    $(".tarjetas").hide().fadeIn(2000);
}

//Funcion shuffle, ordena aleatoriamente las tarjetas con el atributo order.
function shuffle(x) {
    var tarjetas = document.querySelectorAll('.tarjetas');

    for (i = 0; i < x; i++) {
        posicion = Math.floor(Math.random() * 16);
        tarjetas[i].style.order = posicion;
    }
}

//Funcion para girar la carta, comprobar cuantas se han girado y actuar segun la cantidad giradas
async function flip(x) {

    var n_giradas = document.querySelectorAll('.flipped').length;

    if (x.classList.contains("flipped")) {
        //No permite interactuar con las tarjetas giradas
    } else {
        switch (n_giradas) {
            case 0:
                // JQuery - Classes
                $(x).toggleClass("flipped");
                // x.classList.toggle("flipped");
                break;
            case 1:
                // JQuery - Classes
                $(x).toggleClass("flipped");
                // x.classList.toggle("flipped");
                //Empezamos a comprobar si son pareja

                comprobar = x.className.split(" ").join(".");
                comprobados = document.querySelectorAll("div." + comprobar)
                if (comprobados.length == 2) {
                    for (var i = 0; i < comprobados.length; i++) {
                        //Eliminamos lo necesario para que no se pueda interactuar de ninguna forma con las correctas. Las clase "correcto" simplemente mantiene el formato al eliminar lo demas 
                        comprobados[i].removeAttribute("onClick");
                        comprobados[i].classList.remove("tarjetas");
                        comprobados[i].classList.remove("flipped");
                        comprobados[i].classList.add("correcto");
                    }

                    correctos = document.querySelectorAll('.correcto').length;
                    //Eliminamos las tarjetas para enseñar la puntuacion
                    if (correctos == cantidad_col * 2) {

                        // JQuery - Efectes c
                        $(".correcto").animate({
                            top: "+=500px",
                            opacity: 0
                        }, 4000);

                        // $(".correcto").remove();a

                        // for (var i = correctos; i > 0; i--) {
                        //     document.querySelectorAll('.correcto')[i - 1].remove();
                        // }
                        await new Promise(r => setTimeout(r, 4000));

                        $(".correcto").hide();
                        mostrar_puntuacion();

                    }

                    break;
                } else {
                    giradas = document.querySelectorAll('.flipped');
                    temporizador_start(n_giradas, giradas);
                    break;
                }

            default:
                //No permite girar mas tarjetas hasta que se han vuelto a girar las 2 seleccionadas
                break;
        }

    }
}

//Funcion que define el tiempo que tenemos para ver las tarjetas giradas, en este caso 2 segundos
function temporizador_start(n_giradas, giradas) {
    temporizador = setTimeout(function () { girar_fallo(n_giradas + 1, giradas); }, 2000);
}

//Funcion que vuelve a girar todas las tarjetas en caso de fallo
function girar_fallo(n_giradas, giradas) {
    for (i = 0; i < n_giradas; i++) {
        giradas[i].classList.toggle("flipped");
    }
}

function mostrar_puntuacion() {
    puntos = 10; //Placeholder
    total_puntos = (100 - puntos) * 100;
    document.getElementById("puntuacion").innerHTML = usuario + total_puntos;

    document.getElementById("puntuacion").style.display = "unset";

    //Jquery - Chaining
    $("#puntuacion").hide().fadeIn(2000);
}