// B.5: Comentarios claros y estructura modular.

// C.3: El Array con al menos 10 elementos (objetos para más detalle)
const STAR_CATALOG = [
 {
  name: 'Andrómeda (M31)',
  type: 'Galaxia Espiral',
  description:
   'La galaxia más cercana a la Vía Láctea y visible a simple vista en cielos oscuros.',
 },
 {
  name: 'Nebulosa de Orión (M42)',
  type: 'Nebulosa Difusa',
  description:
   'Una de las guarderías estelares más brillantes en el cielo nocturno.',
 },
 {
  name: 'Júpiter',
  type: 'Planeta Gigante Gaseoso',
  description:
   'El planeta más grande del Sistema Solar, conocido por su Gran Mancha Roja.',
 },
 {
  name: 'Vía Láctea',
  type: 'Galaxia Espiral Barrada',
  description:
   'Nuestro hogar galáctico, conteniendo cientos de miles de millones de estrellas.',
 },
 {
  name: 'Betelgeuse',
  type: 'Supergigante Roja',
  description:
   'Una de las estrellas más grandes conocidas en la constelación de Orión.',
 },
 {
  name: 'Plutón',
  type: 'Planeta Enano',
  description:
   'Clasificado como un objeto transneptuniano, con cinco lunas conocidas.',
 },
 {
  name: 'Galaxia del Triángulo (M33)',
  type: 'Galaxia Espiral',
  description: 'La tercera galaxia más grande en el Grupo Local.',
 },
 {
  name: 'Nebulosa del Cangrejo (M1)',
  type: 'Remanente de Supernova',
  description:
   'Los restos de una explosión de supernova observada en 1054 d.C.',
 },
 {
  name: 'Saturno',
  type: 'Planeta Gigante Gaseoso',
  description: 'Famoso por su extenso y complejo sistema de anillos.',
 },
 {
  name: 'Trappist-1',
  type: 'Sistema Estelar',
  description:
   'Una estrella enana ultrafría con siete planetas rocosos de tamaño similar a la Tierra.',
 },
]

// C.3: Elementos del DOM
const searchInput = document.getElementById('search-input')
const resultsContainer = document.getElementById('results-container')
const resultsInfo = document.getElementById('results-info')
const emptyState = document.getElementById('empty-state')

/**
 * C.3: Función para resaltar el texto coincidente dentro de una cadena.
 * @param {string} text - El texto original donde buscar.
 * @param {string} term - El término de búsqueda a resaltar.
 * @returns {string} El HTML con la clase 'highlight' aplicada al término.
 */
const highlightMatch = (text, term) => {
 // Escapar caracteres especiales para la expresión regular
 const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

 // Crear una expresión regular global e insensible a mayúsculas/minúsculas
 const regex = new RegExp(`(${safeTerm})`, 'gi')

 // Reemplazar la coincidencia con un <span> con la clase 'highlight'
 return text.replace(regex, '<span class="highlight">$1</span>')
}

/**
 * C.3: Función principal de filtrado y renderizado de resultados.
 */
const filterAndRenderResults = () => {
 // 1. Obtener el término de búsqueda y limpiar espacios
 const searchTerm = searchInput.value.trim().toLowerCase()

 // 2. Filtrar el array (Coincidencia Parcial)
 const filteredResults = STAR_CATALOG.filter(
  (item) =>
   item.name.toLowerCase().includes(searchTerm) ||
   item.description.toLowerCase().includes(searchTerm)
 )

 // 3. Actualizar la información de resultados
 if (searchTerm === '') {
  resultsInfo.textContent = `Total de elementos en catálogo: ${STAR_CATALOG.length}`
  emptyState.style.display = 'none'
 } else {
  resultsInfo.textContent = `Resultados encontrados para "${searchTerm}": ${filteredResults.length}`
 }

 // 4. Limpiar el contenedor anterior
 resultsContainer.innerHTML = ''

 // 5. Mostrar estado vacío si no hay resultados
 if (filteredResults.length === 0 && searchTerm !== '') {
  emptyState.style.display = 'block'
  return
 }

 emptyState.style.display = 'none'

 // 6. Generar el HTML de las tarjetas
 filteredResults.forEach((item) => {
  // C.3: Aplicar resaltado
  const highlightedName = highlightMatch(item.name, searchTerm)
  const highlightedDescription = highlightMatch(item.description, searchTerm)

  const cardHTML = `
            <article class="result-card" role="region" aria-label="${item.name}">
                <h3 class="card-title">${highlightedName}</h3>
                <p class="card-type">${item.type}</p>
                <p class="card-description">${highlightedDescription}</p>
            </article>
        `
  resultsContainer.innerHTML += cardHTML
 })
}

// --------------------------------------
// C.3: Inicialización y Listeners
// --------------------------------------

// El filtro debe ejecutarse cada vez que el usuario escribe (input event)
// E.6: Uso de 'input' para búsqueda instantánea, mejor que 'change' o 'keyup'.
searchInput.addEventListener('input', filterAndRenderResults)

// B.5: Inicializar la vista con el catálogo completo al cargar la página.
document.addEventListener('DOMContentLoaded', filterAndRenderResults)
