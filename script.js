let actividades = [];

const contenedor = document.getElementById("contenedorActividades");
const buscador = document.getElementById("buscador");
const contador = document.getElementById("contador");

const categorias = document.querySelectorAll(".chip");

const filtroDistrito = document.getElementById("filtroDistrito");
const filtroCosto = document.getElementById("filtroCosto");

let categoriaSeleccionada = "Todas";


// =========================
// CARGAR ACTIVIDADES
// =========================

fetch("https://script.google.com/macros/s/AKfycbyWW-3ioy0-TNGfYn0p1sgHtgFxjTQ2UkE_B3uBaRG3v-64g88wwiackREskcClsZzD/exec?tipo=actividades")
    .then(respuesta => respuesta.json())
    .then(datos => {
        actividades = datos;
        mostrarActividades(actividades);
    })
   
   

    .catch(error => {

        console.error(
            "Error al cargar las actividades:",
            error
        );

        contenedor.innerHTML = `
            <div class="sin-resultados">

                <h3>
                    No se pudieron cargar las actividades.
                </h3>

                <p>
                    Intentá nuevamente.
                </p>

            </div>
        `;

    });


// =========================
// MOSTRAR ACTIVIDADES
// =========================

function mostrarActividades(lista) {

    contenedor.innerHTML = "";

    contador.textContent =
        `${lista.length} actividades encontradas`;


    if (lista.length === 0) {

        contenedor.innerHTML = `
            <div class="sin-resultados">

                <h3>
                    No encontramos esa actividad
                </h3>

                <p>
                    Probá buscando otra actividad
                    o cambiando los filtros.
                </p>

            </div>
        `;

        return;
    }


    lista.forEach(actividad => {
        console.log("IMAGEN:", actividad.imagen);

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add("card");


       tarjeta.innerHTML = `
    <div class="card-image-container">

        ${
            actividad.imagen
                ? `
                    <img
                        class="card-image"
                        src="${actividad.imagen}"
                        alt="${actividad.nombre}"
                    >
                `
                : `
                    <div class="card-image"></div>
                `
        }

        <span class="card-categoria">
            ${actividad.categoria}
        </span>

    </div>


    <div class="card-content">

        <h3>
            ${actividad.nombre}
        </h3>

        <p class="institucion">
            ${actividad.institucion}
        </p>

        <p class="ubicacion">
            <i data-lucide="map-pin"></i>
            ${actividad.distrito}
        </p>

        <div class="card-info">

            <span>
                <i data-lucide="calendar-days"></i>
                ${actividad.dias.join(", ")}
            </span>

            <span>
                <i data-lucide="clock-3"></i>
                ${actividad.horario}
            </span>

            <span>
                <i data-lucide="users"></i>
                ${actividad.edadMin}
                a
                ${actividad.edadMax}
                años
            </span>

            <span>
                <i data-lucide="circle-dollar-sign"></i>
                ${actividad.costo}
            </span>

        </div>


        <a
            class="btn-ver"
            href="actividad.html?id=${actividad.id}"
        >
            Descubrir actividad
            <i data-lucide="arrow-right"></i>
        </a>

    </div>
`;
      


        contenedor.appendChild(tarjeta);

    });


    lucide.createIcons();

}


// =========================
// APLICAR FILTROS
// =========================

function aplicarFiltros() {

    const texto =
        buscador.value.toLowerCase().trim();


    const distrito =
        filtroDistrito
        ? filtroDistrito.value
        : "";


    const costo =
        filtroCosto
        ? filtroCosto.value
        : "";


    const resultado =
        actividades.filter(actividad => {


            const nombre =
                (actividad.nombre || "").toLowerCase();


            const institucion =
                (actividad.institucion || "").toLowerCase();


            const categoria =
                (actividad.categoria || "").toLowerCase();


            const distritoActividad =
                (actividad.distrito || "").toLowerCase();


            const descripcion =
                (actividad.descripcion || "").toLowerCase();


            const nivel =
                (actividad.nivel || "").toLowerCase();


            const costoActividad =
                (actividad.costo || "").toLowerCase();


            // BUSCADOR

            const coincideTexto =

                nombre.includes(texto)

                ||

                institucion.includes(texto)

                ||

                categoria.includes(texto)

                ||

                distritoActividad.includes(texto)

                ||

                descripcion.includes(texto)

                ||

                nivel.includes(texto)

                ||

                costoActividad.includes(texto);


            // CATEGORÍA

            const coincideCategoria =

                categoriaSeleccionada === "Todas"

                ||

                actividad.categoria ===
                categoriaSeleccionada;


            // DISTRITO

            const coincideDistrito =

                distrito === ""

                ||

                actividad.distrito === distrito;


            // COSTO

            const coincideCosto =

                costo === ""

                ||

                actividad.costo === costo;


            return (

                coincideTexto

                &&

                coincideCategoria

                &&

                coincideDistrito

                &&

                coincideCosto

            );

        });


    mostrarActividades(resultado);

}


// =========================
// BUSCADOR
// =========================

buscador.addEventListener(
    "input",
    aplicarFiltros
);


// =========================
// FILTRO DISTRITO
// =========================

if (filtroDistrito) {

    filtroDistrito.addEventListener(
        "change",
        aplicarFiltros
    );

}


// =========================
// FILTRO COSTO
// =========================

if (filtroCosto) {

    filtroCosto.addEventListener(
        "change",
        aplicarFiltros
    );

}


// =========================
// CATEGORÍAS
// =========================

categorias.forEach(categoria => {

    categoria.addEventListener("click", () => {


        categorias.forEach(c => {

            c.classList.remove("activo");

        });


        categoria.classList.add("activo");


        categoriaSeleccionada =
            categoria.dataset.categoria;


        aplicarFiltros();

    });

});


// =========================
// ENCONTRÁ ALGO PARA VOS
// =========================

const opcionesEncontra =
    document.querySelectorAll(".opcion-encontra");


opcionesEncontra.forEach(opcion => {

    opcion.addEventListener("click", () => {


        const categoria =
            opcion.dataset.filtro;


        categoriaSeleccionada =
            categoria;


        categorias.forEach(
            categoriaBoton => {

                categoriaBoton.classList.remove(
                    "activo"
                );


                if (
                    categoriaBoton.dataset.categoria ===
                    categoria
                ) {

                    categoriaBoton.classList.add(
                        "activo"
                    );

                }

            }
        );


        aplicarFiltros();


        document
            .getElementById("actividades")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});
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