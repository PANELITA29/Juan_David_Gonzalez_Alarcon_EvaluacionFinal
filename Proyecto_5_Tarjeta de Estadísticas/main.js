const STAT_ID = 'player-1-stats'
const INITIAL_POINTS = 200
let pointsAvailable = INITIAL_POINTS
let stats = {
 poder: 0,
 defensa: 0,
 suerte: 0,
}

const card = document.querySelector('.stat-card')
const pointsCountEl = document.getElementById('points-count')
const statRows = document.querySelectorAll('.stat-row')
const resetBtn = document.getElementById('reset-stats')

const loadState = () => {
 const savedStats = localStorage.getItem(STAT_ID)
 if (savedStats) {
  stats = JSON.parse(savedStats)
 }

 const totalSpent = Object.values(stats).reduce((sum, value) => sum + value, 0)
 pointsAvailable = INITIAL_POINTS - totalSpent

 renderStats()
}
saveState = () => {
 localStorage.setItem(STAT_ID, JSON.stringify(stats))
}

const renderStats = () => {
 pointsCountEl.textContent = pointsAvailable
 pointsCountEl.classList.toggle('spent-points', pointsAvailable < 0)

 statRows.forEach((row) => {
  const statName = row.dataset.stat
  const valueEl = row.querySelector('.stat-value')

  valueEl.textContent = stats[statName]
  valueEl.dataset.value = stats[statName]

  const btnMinus = row.querySelector('.btn-minus')
  const btnPlus = row.querySelector('.btn-plus')

  btnMinus.disabled = stats[statName] <= 0

  btnPlus.disabled = pointsAvailable <= 0
 })
}

/**
 * @param {Event} event - El evento de click
 */
const handleStatChange = (event) => {
 const btn = event.target.closest('button')
 if (!btn) return

 const statRow = btn.closest('.stat-row')
 const statName = statRow.dataset.stat

 let change = 0
 if (btn.classList.contains('btn-plus')) {
  if (pointsAvailable > 0) {
   change = 1
  }
 } else if (btn.classList.contains('btn-minus')) {
  if (stats[statName] > 0) {
   change = -1
  }
 }

 if (change !== 0) {
  stats[statName] += change
  pointsAvailable -= change
  saveState()
  renderStats()
 }
}

const handleReset = () => {
 if (confirm('¿Estás seguro de que quieres reiniciar todos los puntos?')) {
  stats = { poder: 0, defensa: 0, suerte: 0 }
  pointsAvailable = INITIAL_POINTS
  saveState()
  renderStats()

  localStorage.removeItem(STAT_ID)
 }
}

card.addEventListener('click', handleStatChange)
resetBtn.addEventListener('click', handleReset)

document.addEventListener('DOMContentLoaded', loadState)
