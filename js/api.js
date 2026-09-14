const API = {
    url: "data/actividades.json"
};

async function obtenerActividades() {
    const respuesta = await fetch(API.url);

    if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las actividades.");
    }

    return await respuesta.json();
}
