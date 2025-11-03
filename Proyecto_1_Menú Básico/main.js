// B.5: Comentarios claros y estructura modular.

// C.1: Elementos del DOM
const themeToggle = document.getElementById('theme-toggle')
const body = document.body
const iconIndicator = themeToggle.querySelector('.icon-indicator')
const toggleText = themeToggle.querySelector('.toggle-text')

/**
 * C.1: Función para aplicar el tema (dark/light) al <body>
 * @param {string} theme - 'dark' o 'light'
 */
const applyTheme = (theme) => {
 // 1. Aplicar la clase correcta
 if (theme === 'dark') {
  body.classList.remove('light-mode')
  body.classList.add('dark-mode')
  // 2. Actualizar el indicador del botón (UX)
  iconIndicator.textContent = '☀️'
  toggleText.textContent = 'Modo Claro'
 } else {
  body.classList.remove('dark-mode')
  body.classList.add('light-mode')
  // 2. Actualizar el indicador del botón (UX)
  iconIndicator.textContent = '🌙'
  toggleText.textContent = 'Modo Oscuro'
 }
 // 3. Persistir la preferencia en localStorage
 localStorage.setItem('themePreference', theme)
}

/**
 * Función que inicializa el tema al cargar la página.
 * B.5: Evitamos código global innecesario ejecutando la inicialización en una función.
 */
const initializeTheme = () => {
 // C.1: Obtener la preferencia del usuario desde localStorage
 const savedTheme = localStorage.getItem('themePreference')

 // Comprobamos si hay una preferencia guardada O si el sistema prefiere modo oscuro.
 // Usamos el savedTheme si existe, si no, comprobamos la preferencia del sistema.
 if (savedTheme) {
  applyTheme(savedTheme)
 } else if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
 ) {
  // Si no hay preferencia guardada, pero el sistema está en oscuro, aplicar oscuro.
  applyTheme('dark')
 } else {
  // Por defecto, se queda en 'light' (la clase inicial del body).
  // Aún así, lo guardamos para establecer una preferencia futura.
  applyTheme('light')
 }
}

/**
 * Función manejadora del evento click del botón.
 */
const handleThemeToggle = () => {
 // Determinar el tema actual basándose en las clases del body
 const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light'

 // Aplicar el tema opuesto
 const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

 applyTheme(newTheme)
}

// --------------------------------------
// C.1: Ejecución y Listeners
// --------------------------------------

// Inicializar el tema al cargar la página
document.addEventListener('DOMContentLoaded', initializeTheme)

// Añadir el listener al botón
themeToggle.addEventListener('click', handleThemeToggle)
