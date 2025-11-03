// B.5: Comentarios claros y estructura modular.

// C.2: Array para almacenar los destinos seleccionados
let selectedDestinations = []

// C.2: Elementos del DOM
const destinationCards = document.querySelectorAll('.destination-card')
const itineraryList = document.getElementById('itinerary-list')
const itineraryCountTitle = document.getElementById('itinerary-count-title')

/**
 * C.2: Renderiza la lista del itinerario en el DOM.
 * La función regenera la lista completa cada vez que se actualiza el array.
 */
const renderItinerary = () => {
 // 1. Limpiar el contenido actual del <ul>
 itineraryList.innerHTML = ''

 // 2. Actualizar el contador en el título
 itineraryCountTitle.textContent = `🗺️ Tu Itinerario (${selectedDestinations.length} Destinos)`

 if (selectedDestinations.length === 0) {
  // Mostrar estado vacío si no hay destinos
  itineraryList.innerHTML =
   '<li class="empty-state">Tu itinerario está vacío. Selecciona un destino.</li>'
  return
 }

 // 3. Generar un nuevo <li> por cada destino en el array
 selectedDestinations.forEach((destinationName) => {
  // B.5: Se usa template literal para crear el HTML del item
  const listItemHTML = `
            <li class="itinerary-item" data-name="${destinationName}" tabindex="0" role="listitem">
                ${destinationName}
                <span class="remove-btn">(Click para eliminar)</span>
            </li>
        `
  itineraryList.innerHTML += listItemHTML
 })
}

/**
 * C.2: Manejador de evento para añadir un destino al itinerario.
 * @param {Event} event - El evento de clic/tecla.
 */
const addDestination = (event) => {
 // 1. Identificar el elemento de la tarjeta
 const card = event.currentTarget // event.currentTarget es el elemento con el listener (la tarjeta)

 // Manejar solo clic o Enter/Espacio (B.4 - accesibilidad de teclado)
 if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
  return
 }

 // 2. Obtener el nombre del destino
 const destinationName = card.dataset.name

 // 3. Evitar duplicados (funcionalidad extra/útil)
 if (selectedDestinations.includes(destinationName)) {
  alert(`¡${destinationName} ya está en tu itinerario!`)
  return
 }

 // 4. Añadir al array y actualizar el DOM
 selectedDestinations.push(destinationName)
 renderItinerary()

 // E.6: Feedback visual simple
 card.classList.add('selected-feedback')
 setTimeout(() => {
  card.classList.remove('selected-feedback')
 }, 500)
}

/**
 * C.2: Manejador de evento para eliminar un destino del itinerario.
 * Se usa "delegación de eventos" en la lista padre.
 * @param {Event} event - El evento de clic.
 */
const removeDestination = (event) => {
 // 1. Verificar si el elemento clickeado es un <li> de la lista
 const listItem = event.target.closest('.itinerary-item')

 if (!listItem) return // Salir si no se hizo clic en un item

 // 2. Obtener el nombre
 const nameToRemove = listItem.dataset.name

 // 3. Filtrar el array para crear uno nuevo sin el elemento
 selectedDestinations = selectedDestinations.filter(
  (name) => name !== nameToRemove
 )

 // 4. Actualizar el DOM
 renderItinerary()
}

// --------------------------------------
// C.2: Inicialización y Listeners
// --------------------------------------

// Añadir listener a todas las tarjetas de destino para AÑADIR (click y keyboard)
destinationCards.forEach((card) => {
 card.addEventListener('click', addDestination)
 card.addEventListener('keydown', addDestination)
})

// Añadir listener a la lista padre para REMOVER (delegación de eventos)
itineraryList.addEventListener('click', removeDestination)

// B.5: Inicializar la lista al cargar la página (mostrar el estado vacío)
document.addEventListener('DOMContentLoaded', renderItinerary)
