const contenedor =
    document.getElementById("detalleEvento");


const parametros =
    new URLSearchParams(window.location.search);

const id =
    parametros.get("id");


// =========================
// CARGAR EVENTO
// =========================

// =========================
// CARGAR EVENTO
// =========================

const API_EVENTOS =
    "https://script.google.com/macros/s/AKfycbyWW-3ioy0-TNGfYn0p1sgHtgFxjTQ2UkE_B3uBaRG3v-64g88wwiackREskcClsZzD/exec?tipo=eventos";

async function cargarEvento(intentos = 3) {

    try {

        const respuesta = await fetch(API_EVENTOS, {
            cache: "no-store"
        });

        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }

        const eventos = await respuesta.json();

        if (!Array.isArray(eventos)) {
            throw new Error("La respuesta no tiene un formato válido.");
        }

        const evento =
            eventos.find(
                e => String(e.id) === String(id)
            );

        if (!evento) {

            mostrarError(
                "Evento no encontrado",
                "Este evento no está disponible."
            );

            return;
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaTexto =
            String(evento.fechaFin).substring(0, 10);

        const partes = fechaTexto.split("-");

        const fechaFin =
            new Date(
                Number(partes[0]),
                Number(partes[1]) - 1,
                Number(partes[2]),
                23,
                59,
                59
            );

        if (fechaFin < hoy) {

            mostrarError(
                "Evento finalizado",
                "Este evento ya terminó."
            );

            return;
        }

        mostrarEvento(evento);

    } catch (error) {

        console.error("Error al cargar evento:", error);

        if (intentos > 1) {

            setTimeout(() => {
                cargarEvento(intentos - 1);
            }, 1500);

        } else {

            mostrarError(
                "No se pudo cargar el evento",
                "Estamos intentando conectar con la información. Volvé a intentar en unos segundos."
            );

        }

    }
}

cargarEvento();


// =========================
// ERROR
// =========================

function mostrarError(titulo, mensaje) {

    contenedor.innerHTML = `

        <div class="actividad-error">

            <i data-lucide="calendar-x"></i>

            <h2>
                ${titulo}
            </h2>

            <p>
                ${mensaje}
            </p>

            <a
                href="eventos.html"
                class="btn-principal">

                Ver eventos

                <i data-lucide="arrow-right"></i>

            </a>

        </div>

    `;

    lucide.createIcons();

}


// =========================
// FECHA
// =========================

function formatearFecha(fecha) {

    const fechaTexto =
        String(fecha).substring(0, 10);

    const partes =
        fechaTexto.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// =========================
// MOSTRAR EVENTO
// =========================

function mostrarEvento(evento) {

    contenedor.innerHTML = `

        <div class="actividad-card">


            <div class="actividad-imagen">

                ${
                    evento.imagen

                    ?

                    `
                    <img
                        src="${evento.imagen}"
                        alt="${evento.nombre}">
                    `

                    :

                    `
                    <div class="imagen-vacia">

                        <i data-lucide="calendar-days"></i>

                    </div>
                    `
                }

            </div>


            <div class="actividad-info">


                <span class="actividad-categoria">

                    <i data-lucide="calendar-days"></i>

                    ${evento.categoria}

                </span>


                <h1>
                    ${evento.nombre}
                </h1>


                <div class="actividad-institucion">

                    <i data-lucide="map-pin"></i>

                    ${evento.lugar}

                </div>


                <p class="actividad-descripcion">

                    ${evento.descripcion}

                </p>


                <div class="actividad-datos">


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="calendar-days"></i>
                        </div>

                        <div>

                            <strong>Fecha</strong>

                            <span>
                                ${formatearFecha(evento.fechaInicio)}
                            </span>
                             <span>
                                al
                            </span>
                             <span>
                                ${formatearFecha(evento.fechaFin)}
                            </span>

                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="clock-3"></i>
                        </div>

                        <div>

                            <strong>Horario</strong>

                            <span>
                                ${evento.horario}
                            </span>

                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="map-pin"></i>
                        </div>

                        <div>

                            <strong>Lugar</strong>

                            <span>
                                ${evento.direccion}
                            </span>

                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="map"></i>
                        </div>

                        <div>

                            <strong>Distrito</strong>

                            <span>
                                ${evento.distrito}
                            </span>

                        </div>

                    </div>


                    <div class="dato-actividad costo-dato">

                        <div class="dato-icono">
                            <i data-lucide="circle-dollar-sign"></i>
                        </div>

                        <div>

                            <strong>Costo</strong>

                            <span>
                                ${evento.costo}
                            </span>

                        </div>

                    </div>

                </div>


                <div class="actividad-contacto">

                    <h3>
                        Más información
                    </h3>


                    ${
                        evento.telefono
                        ?

                        `
                        <div class="contacto-item">

                            <i data-lucide="phone"></i>

                            <span>
                                ${evento.telefono}
                            </span>

                        </div>
                        `

                        :

                        ""
                    }


                    ${
                        evento.correo
                        ?

                        `
                        <div class="contacto-item">

                            <i data-lucide="mail"></i>

                            <span>
                                ${evento.correo}
                            </span>

                        </div>
                        `

                        :

                        ""
                    }


                    <div class="contacto-botones">


                        ${
                            evento.instagram

                            ?

                            `
                            <a
                                href="${evento.instagram}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-red-social">

                                <i data-lucide="instagram"></i>

                                Instagram

                            </a>
                            `

                            :

                            ""
                        }


                        ${
                            evento.facebook

                            ?

                            `
                            <a
                                href="${evento.facebook}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-red-social">

                                <i data-lucide="facebook"></i>

                                Facebook

                            </a>
                            `

                            :

                            ""
                        }

                    </div>
                    <div class="evento-botones">

                        <a
                          href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evento.direccion)}"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="btn-mapa">

                         <i data-lucide="map-pin"></i>
                            Cómo llegar
                         <i data-lucide="arrow-up-right"></i>

                        </a>

                    </div>
        
                    

                </div>

            </div>

        </div>

    `;

    lucide.createIcons();

}
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
