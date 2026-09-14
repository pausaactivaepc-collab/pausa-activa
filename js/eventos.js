let eventos = [];

const contenedor =
    document.getElementById("contenedorEventos");

const buscador =
    document.getElementById("buscarEvento");

const filtroCategoria =
    document.getElementById("filtroCategoria");

const filtroDistrito =
    document.getElementById("filtroDistrito");

const filtroFecha =
    document.getElementById("filtroFecha");

const contador =
    document.getElementById("contadorEventos");


// =========================
// CARGAR EVENTOS
// =========================

fetch("https://script.google.com/macros/s/AKfycbyWW-3ioy0-TNGfYn0p1sgHtgFxjTQ2UkE_B3uBaRG3v-64g88wwiackREskcClsZzD/exec?tipo=eventos")
    .then(respuesta => {

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar eventos.json");
        }

        return respuesta.json();

    })

    .then(datos => {

        eventos = datos;

        mostrarEventos();

    })

    .catch(error => {

        console.error(error);

        contador.textContent =
            "No se pudieron cargar los eventos.";

        contenedor.innerHTML = `
            <div class="sin-eventos">

                <i data-lucide="circle-alert"></i>

                <h2>
                    No pudimos cargar los eventos
                </h2>

                <p>
                    Intentá nuevamente.
                </p>

            </div>
        `;

        lucide.createIcons();

    });


// =========================
// FECHA ACTUAL
// =========================

function obtenerFechaActual() {

    const ahora = new Date();

    ahora.setHours(0, 0, 0, 0);

    return ahora;

}


// =========================
// EVENTO VIGENTE
// =========================

function eventoVigente(evento) {

    const hoy = obtenerFechaActual();

    const fechaTexto = String(evento.fechaFin).substring(0, 10);

    const partes = fechaTexto.split("-");

    const fechaFin = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2]),
        23,
        59,
        59
    );

    return fechaFin >= hoy;
}


// =========================
// FORMATEAR FECHA
// =========================

function formatearFecha(fecha) {

    const fechaTexto = String(fecha).substring(0, 10);

    const partes = fechaTexto.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// =========================
// MOSTRAR EVENTOS
// =========================

function mostrarEventos() {

    const texto =
        buscador.value.toLowerCase().trim();

    const categoria =
        filtroCategoria.value;

    const distrito =
        filtroDistrito.value;

    const fecha =
        filtroFecha.value;


    const hoy =
        obtenerFechaActual();


    const eventosActivos =
        eventos.filter(evento =>
            eventoVigente(evento)
        );


    const resultado =
        eventosActivos.filter(evento => {


          const nombreEvento =
             String(evento.nombre || evento.Evento || "");

          const descripcionEvento =
             String(evento.descripcion || "");

          const lugarEvento =
             String(evento.lugar || "");

          const coincideTexto =

             nombreEvento
               .toLowerCase()
               .includes(texto)

             ||

             descripcionEvento
               .toLowerCase()
               .includes(texto)

             ||

             lugarEvento
               .toLowerCase()
               .includes(texto);


            const coincideCategoria =

                categoria === ""

                ||

                evento.categoria === categoria;


            const coincideDistrito =

                distrito === ""

                ||

                evento.distrito === distrito;


            let coincideFecha = true;


            if (fecha === "proximos") {

                coincideFecha =
                    new Date(evento.fechaInicio) >= hoy;

            }


            if (fecha === "este-mes") {

                const fechaEvento =
                    new Date(evento.fechaInicio);

                coincideFecha =
                    fechaEvento.getMonth() === hoy.getMonth()
                    &&
                    fechaEvento.getFullYear() === hoy.getFullYear();

            }


            return (
                coincideTexto &&
                coincideCategoria &&
                coincideDistrito &&
                coincideFecha
            );

        });


    renderizarEventos(resultado);

}


// =========================
// RENDERIZAR TARJETAS
// =========================

function renderizarEventos(lista) {

    contenedor.innerHTML = "";

    contador.textContent =
        `${lista.length} eventos disponibles`;


    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-eventos">

                <i data-lucide="calendar-x"></i>

                <h2>
                    No encontramos eventos
                </h2>

                <p>
                    Probá cambiando los filtros.
                </p>

            </div>

        `;

        lucide.createIcons();

        return;
    }


    lista.forEach(evento => {

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add("evento-card");


        tarjeta.innerHTML = `

            <div class="evento-imagen">

                ${
                    evento.imagen

                    ?

                    `
                    <img
                        src="${evento.imagen}"
                        alt="${evento.nombre || evento.Evento}">
                    `

                    :

                    `
                    <div class="evento-imagen-vacia">

                        <i data-lucide="calendar-days"></i>

                    </div>
                    `
                }

                <span class="evento-categoria">
                    ${evento.categoria}
                </span>

            </div>


            <div class="evento-contenido">

                <div class="evento-fecha">

                    <i data-lucide="calendar-days"></i>

                    ${formatearFecha(evento.fechaInicio)}

                </div>


                <h2>
                    ${evento.nombre}
                </h2>


                <p class="evento-descripcion">
                    ${evento.descripcion}
                </p>


                <div class="evento-datos">

                    <span>
                        <i data-lucide="clock-3"></i>
                        ${evento.horario}
                    </span>

                    <span>
                        <i data-lucide="map-pin"></i>
                        ${evento.distrito}
                    </span>

                    <span>
                        <i data-lucide="circle-dollar-sign"></i>
                        ${evento.costo}
                    </span>

                </div>


                <a
                    href="evento.html?id=${evento.id}"
                    class="btn-evento">

                    Ver evento

                    <i data-lucide="arrow-right"></i>

                </a>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });


    lucide.createIcons();

}


// =========================
// FILTROS
// =========================

buscador.addEventListener(
    "input",
    mostrarEventos
);

filtroCategoria.addEventListener(
    "change",
    mostrarEventos
);

filtroDistrito.addEventListener(
    "change",
    mostrarEventos
);

filtroFecha.addEventListener(
    "change",
    mostrarEventos
);
/* =========================
   MENÚ CELULAR
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("abierto");

        if (navMenu.classList.contains("abierto")) {

            menuToggle.innerHTML = '<i data-lucide="x"></i>';
            menuToggle.setAttribute("aria-label", "Cerrar menú");

        } else {

            menuToggle.innerHTML = '<i data-lucide="menu"></i>';
            menuToggle.setAttribute("aria-label", "Abrir menú");

        }

        lucide.createIcons();
    });


    /* Cerrar menú al tocar un enlace */

    navMenu.querySelectorAll("a").forEach(function(enlace) {

        enlace.addEventListener("click", function() {

            navMenu.classList.remove("abierto");

            menuToggle.innerHTML = '<i data-lucide="menu"></i>';
            menuToggle.setAttribute("aria-label", "Abrir menú");

            lucide.createIcons();

        });

    });

}
