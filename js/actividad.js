const contenedor = document.getElementById("detalleActividad");

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");


// =========================
// CARGAR ACTIVIDAD
// =========================

fetch("https://script.google.com/macros/s/AKfycbyWW-3ioy0-TNGfYn0p1sgHtgFxjTQ2UkE_B3uBaRG3v-64g88wwiackREskcClsZzD/exec?tipo=actividades")
    .then(respuesta => {

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar actividades.json");
        }

        return respuesta.json();

    })

    .then(actividades => {

        const actividad = actividades.find(
            actividad =>
                String(actividad.id) === String(id)
        );


        if (!actividad) {

            mostrarError(
                "Actividad no encontrada",
                "La actividad que buscás no existe."
            );

            return;
        }


        mostrarActividad(actividad);

    })

    .catch(error => {

        console.error("ERROR:", error);

        mostrarError(
            "No se pudo cargar la actividad",
            "Revisá el archivo actividades.json o intentá nuevamente."
        );

    });


// =========================
// ERROR
// =========================

function mostrarError(titulo, mensaje) {

    contenedor.innerHTML = `

        <div class="actividad-error">

            <i data-lucide="circle-alert"></i>

            <h2>${titulo}</h2>

            <p>${mensaje}</p>

            <a
                href="index.html#actividades"
                class="btn-principal">

                Volver a actividades

            </a>

        </div>

    `;

    lucide.createIcons();

}


// =========================
// MOSTRAR ACTIVIDAD
// =========================
function mostrarEdad(edadMin, edadMax) {

    const min = String(edadMin ?? "").trim();
    const max = String(edadMax ?? "").trim();

    const minTexto = min.toLowerCase();
    const maxTexto = max.toLowerCase();

    // Todas las edades
    if (
        minTexto === "todas las edades" ||
        maxTexto === "todas las edades"
    ) {
        return "Todas las edades";
    }

    // Consultar
    const minConsultar = minTexto === "consultar";
    const maxConsultar = maxTexto === "consultar";

    const minVacio = min === "" || minConsultar;
    const maxVacio = max === "" || maxConsultar;

    if (minVacio && maxVacio) {
        return "Consultar";
    }

    if (!minVacio && maxVacio) {
        return `Desde ${min} años`;
    }

    if (minVacio && !maxVacio) {
        return `Hasta ${max} años`;
    }

    return `${min} a ${max} años`;
}
function mostrarActividad(actividad) {

    contenedor.innerHTML = `

        <div class="actividad-card">


            <div class="actividad-imagen">

                ${
                    actividad.imagen

                    ?

                    `
                    <img
                        src="${actividad.imagen}"
                        alt="${actividad.nombre}">
                    `

                    :

                    `
                    <div class="imagen-vacia">

                        <i data-lucide="image"></i>

                    </div>
                    `
                }

            </div>


            <div class="actividad-info">


                <span class="actividad-categoria">

                    <i data-lucide="sparkles"></i>

                    ${actividad.categoria}

                </span>


                <h1>
                    ${actividad.nombre}
                </h1>


                <div class="actividad-institucion">

                    <i data-lucide="building-2"></i>

                    <span>
                        ${actividad.institucion}
                    </span>

                </div>


                <p class="actividad-descripcion">

                    ${actividad.descripcion}

                </p>


                <div class="actividad-datos">


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="map-pin"></i>
                        </div>

                        <div>
                           <strong>Lugar</strong>
                           <span>${actividad.lugar}</span>
                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="map"></i>
                        </div>

                        <div>
                            <strong>Distrito</strong>
                            <span>${actividad.distrito}</span>
                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="calendar-days"></i>
                        </div>

                        <div>
                            <strong>Días</strong>
                            <span>${actividad.dias.join(", ")}</span>
                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="clock-3"></i>
                        </div>

                        <div>
                            <strong>Horario</strong>
                            <span>${actividad.horario}</span>
                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="users"></i>
                        </div>

                        <div>
                            <strong>Edad</strong>

                            <span>
                              ${mostrarEdad(actividad.edadMin, actividad.edadMax)}
                            </span>

                        </div>

                    </div>


                    <div class="dato-actividad">

                        <div class="dato-icono">
                            <i data-lucide="signal"></i>
                        </div>

                        <div>
                            <strong>Nivel</strong>
                            <span>${actividad.nivel}</span>
                        </div>

                    </div>


                    <div class="dato-actividad costo-dato">

                        <div class="dato-icono">
                            <i data-lucide="circle-dollar-sign"></i>
                        </div>

                        <div>
                            <strong>Costo</strong>
                            <span>${actividad.costo}</span>
                        </div>

                    </div>


                </div>

                <div class="actividad-inscripcion">

                    <div class="inscripcion-titulo">

                        <div class="inscripcion-icono">
                           <i data-lucide="clipboard-pen-line"></i>
                        </div>

                        <div>

                            <h3>¿Cómo participar?</h3>

                            <p>
                                ${
                                    actividad.inscripcion?.mensaje ||
                                    "Consultá con la institución para conocer cómo participar."
                              }
                            </p>

                        </div>

                    </div>


                    ${
                        actividad.inscripcion?.tipo === "formulario"
                        ?   
                        `
                        <a
                            href="${actividad.inscripcion.url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-inscripcion">

                            <i data-lucide="clipboard-pen-line"></i>
                            Inscribirme

                            <i data-lucide="arrow-up-right"></i>

                        </a>
                        `
                        :
                        ""
                    }


                
${
    (
        actividad.telefono ||
        actividad.whatsapp ||
        actividad.correo
    )
    ?
    `
    <div class="medios-contacto">

        <h4>
            Medios de contacto
        </h4>


        ${
            actividad.telefono
            ?
            `
            <div class="contacto-item">

                <i data-lucide="phone"></i>

                <div>
                    <strong>Teléfono</strong>
                    <span>${actividad.telefono}</span>
                </div>

            </div>
            `
            :
            ""
        }


        ${
            actividad.whatsapp
            ?
            `
            <div class="contacto-item">

                <i data-lucide="message-circle"></i>

                <div>
                    <strong>WhatsApp</strong>
                    <span>${actividad.whatsapp}</span>
                </div>

            </div>
            `
            :
            ""
        }


        ${
            actividad.correo
            ?
            `
            <div class="contacto-item">

                <i data-lucide="mail"></i>

                <div>
                    <strong>Correo electrónico</strong>
                    <span>${actividad.correo}</span>
                </div>

            </div>
            `
            :
            ""
        }

    </div>
    `
    :
    ""
}


                    ${
                        actividad.instagram &&
                        actividad.instagram !== "..."
                        ?
                        `
                        <a
                            href="${actividad.instagram}"
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
                        actividad.facebook &&
                        actividad.facebook !== "..."
                        ?
                        `
                        <a
                            href="${actividad.facebook}"
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


                    ${
                        actividad.sitioWeb &&
                        actividad.sitioWeb !== "..."
                        ?
                        `
                        <a
                            href="${actividad.sitioWeb}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-red-social">

                            <i data-lucide="globe"></i>

                            Sitio web

                        </a>
                        `
                        :
                        ""
                    }


                    <a
                        href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(actividad.direccion)}"
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
