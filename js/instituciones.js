const contenedor =
    document.getElementById(
        "contenedorInstituciones"
    );


const API_INSTITUCIONES =
    "https://script.google.com/macros/s/AKfycbyWW-3ioy0-TNGfYn0p1sgHtgFxjTQ2UkE_B3uBaRG3v-64g88wwiackREskcClsZzD/exec?tipo=instituciones";

async function cargarInstituciones(intentos = 3) {

    contenedor.innerHTML = `
        <div class="sin-resultados">
            <h3>Cargando instituciones...</h3>
            <p>Estamos buscando las instituciones disponibles.</p>
        </div>
    `;

    try {

        const respuesta = await fetch(API_INSTITUCIONES, {
            cache: "no-store"
        });

        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }

        const instituciones = await respuesta.json();

        if (!Array.isArray(instituciones)) {
            throw new Error("La respuesta no tiene un formato válido.");
        }

        mostrarInstituciones(instituciones);

    } catch (error) {

        console.error("Error al cargar instituciones:", error);

        if (intentos > 1) {

            setTimeout(() => {
                cargarInstituciones(intentos - 1);
            }, 1500);

        } else {

            contenedor.innerHTML = `
                <div class="sin-resultados">
                    <h3>No pudimos cargar las instituciones</h3>
                    <p>
                        Estamos intentando conectar con la información.
                        Volvé a intentar en unos segundos.
                    </p>
                </div>
            `;

        }

    }
}

cargarInstituciones();

function mostrarInstituciones(instituciones) {

    contenedor.innerHTML = "";


    instituciones.forEach(institucion => {

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add(
            "institucion-card"
        );


        tarjeta.innerHTML = `

    <div class="institucion-imagen">

        ${
            institucion.logo
            ?
            `<img
                src="${institucion.logo}"
                alt="${institucion.nombre || institucion.Nombre || "Institución"}">`
            :
            `<i data-lucide="building-2"></i>`
        }

    </div>


    <div class="institucion-contenido">

        <span class="institucion-distrito">

            <i data-lucide="map-pin"></i>

            ${institucion.distrito}

        </span>


        <h2>
            ${institucion.nombre || institucion.Nombre || "Sin nombre"}
        </h2>


        <p>
            ${institucion.descripcion}
        </p>


        <div class="institucion-datos">

            <div>
                <i data-lucide="map-pin"></i>
                <span>${institucion.direccion}</span>
            </div>

            ${
                institucion.telefono
                ?
                `
                <div>
                    <i data-lucide="phone"></i>
                    <span>${institucion.telefono}</span>
                </div>
                `
                :
                ""
            }

            ${
                institucion.correo
                ?
                `
                <div>
                    <i data-lucide="mail"></i>
                    <span>${institucion.correo}</span>
                </div>
                `
                :
                ""
            }

        </div>


        <div class="institucion-redes">

            ${
                institucion.instagram
                ?
                `
                <a
                    href="${institucion.instagram}"
                    target="_blank"
                    rel="noopener noreferrer">

                    <i data-lucide="instagram"></i>

                    Instagram

                </a>
                `
                :
                ""
            }


            ${
                institucion.facebook
                ?
                `
                <a
                    href="${institucion.facebook}"
                    target="_blank"
                    rel="noopener noreferrer">

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

        </div>

    </div>

`;


        contenedor.appendChild(tarjeta);

    });


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
