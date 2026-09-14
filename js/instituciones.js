const contenedor =
    document.getElementById(
        "contenedorInstituciones"
    );


fetch("https://script.google.com/macros/s/AKfycbyWW-3ioy0-TNGfYn0p1sgHtgFxjTQ2UkE_B3uBaRG3v-64g88wwiackREskcClsZzD/exec?tipo=instituciones")

    .then(respuesta => respuesta.json())

    .then(instituciones => {

        mostrarInstituciones(instituciones);

    })

    .catch(error => {

        console.error(error);

        contenedor.innerHTML = `

            <p>
                No se pudieron cargar las instituciones.
            </p>

        `;

    });


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
