
const downloadPdfBtn = document.getElementById('download-pdf')
const goBackBtn = document.getElementById('go-back')
const transactionDetails = document.getElementById('details-container')


const generateAndDownloadPDF = () => {

 const { jsPDF } = window.jspdf
 const doc = new jsPDF()


 doc.setFont('helvetica', 'bold')
 doc.setFontSize(22)
 doc.text('Comprobante de Transacción ResumeVault', 20, 20)


 doc.setFontSize(10)
 doc.text('Logo de [Tu Nombre]', 170, 20)

 doc.setLineWidth(0.5)
 doc.line(20, 25, 190, 25)


 let y = 40
 doc.setFont('helvetica', 'normal')
 doc.setFontSize(12)


 const dataElements = transactionDetails.querySelectorAll('[data-pdf]')

 dataElements.forEach((el) => {
  const label = el.parentElement.querySelector('strong').textContent // Ej: "Referencia:"
  const value = el.textContent


  doc.setFont('helvetica', 'normal')
  doc.text(label, 20, y)


  doc.setFont('courier', 'bold') 
  doc.text(value, 100, y)

  y += 10 
 })


 y += 20
 doc.setFont('helvetica', 'italic')
 doc.setFontSize(10)
 doc.text(
  'Este documento es su comprobante oficial de donación. ¡Gracias por su apoyo!',
  20,
  y
 )

 doc.save('Comprobante_ResumeVault.pdf')
}


const simulateGoBack = () => {

 if (window.history.length > 1) {
  window.history.back()
 } else {

  alert(
   'Simulando regreso... No hay historial previo para volver. Redirigiendo a home (simulado).'
  )
 }
}

downloadPdfBtn.addEventListener('click', generateAndDownloadPDF)
goBackBtn.addEventListener('click', simulateGoBack)
