// B.5: Comentarios claros y estructura modular.

// C.4: Elementos del DOM
const downloadPdfBtn = document.getElementById('download-pdf')
const goBackBtn = document.getElementById('go-back')
const transactionDetails = document.getElementById('details-container')

// window.jsPDF ya está disponible gracias al CDN en el HTML

/**
 * C.4: Genera y descarga un comprobante PDF simple con datos del DOM.
 */
const generateAndDownloadPDF = () => {
 // B.5: Usamos el objeto global de jsPDF cargado por el CDN
 const { jsPDF } = window.jspdf
 const doc = new jsPDF()

 // Título y encabezado
 doc.setFont('helvetica', 'bold')
 doc.setFontSize(22)
 doc.text('Comprobante de Transacción ResumeVault', 20, 20)

 // B.2: Añadir el avatar (simulado con texto si no queremos complejidad de imagen)
 doc.setFontSize(10)
 doc.text('Logo de [Tu Nombre]', 170, 20)

 doc.setLineWidth(0.5)
 doc.line(20, 25, 190, 25) // Línea divisoria

 // Detalles del comprobante (B.3: Contenido propio)
 let y = 40
 doc.setFont('helvetica', 'normal')
 doc.setFontSize(12)

 // Obtener los datos del DOM usando los atributos data-pdf
 const dataElements = transactionDetails.querySelectorAll('[data-pdf]')

 dataElements.forEach((el) => {
  const label = el.parentElement.querySelector('strong').textContent // Ej: "Referencia:"
  const value = el.textContent // Ej: "RVL-839210-2025"

  // Escribir la etiqueta
  doc.setFont('helvetica', 'normal')
  doc.text(label, 20, y)

  // Escribir el valor (con tipografía de código simulada)
  doc.setFont('courier', 'bold') // Usar fuente monospace para el valor
  doc.text(value, 100, y)

  y += 10 // Incrementar la posición Y para la siguiente línea
 })

 // Pie de página
 y += 20
 doc.setFont('helvetica', 'italic')
 doc.setFontSize(10)
 doc.text(
  'Este documento es su comprobante oficial de donación. ¡Gracias por su apoyo!',
  20,
  y
 )

 // C.4: Descargar el archivo con un nombre específico
 doc.save('Comprobante_ResumeVault.pdf')
}

/**
 * C.4: Simula el comportamiento de volver a la página anterior.
 */
const simulateGoBack = () => {
 // Usamos window.history.back() que es el comportamiento más correcto.
 // Esto funciona mejor si el usuario navegó a esta página desde otra.
 // Si se está probando directamente, no hará nada.
 if (window.history.length > 1) {
  window.history.back()
 } else {
  // Opción de fallback o simulación si no hay historial previo (ej: primera carga)
  // Podríamos redirigir a una página principal o dar un mensaje.
  alert(
   'Simulando regreso... No hay historial previo para volver. Redirigiendo a home (simulado).'
  )
 }
}

downloadPdfBtn.addEventListener('click', generateAndDownloadPDF)
goBackBtn.addEventListener('click', simulateGoBack)
