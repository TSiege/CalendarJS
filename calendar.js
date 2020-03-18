(function iffy() {
  function getFirstOfMonth(month = new Date()) {
    month.setDate(1)
    return month
  }

  function getDaysInMonth(month) {
    var date = new Date(month.getTime())
    var days = []
    while (date.getMonth() === month.getMonth()) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  function generateDaysHtml(month) {
    const days = getDaysInMonth(month)
    const dateFormatter = new Intl.DateTimeFormat(navigator.language)
    return days.map(day => {
        return `
          <button class="day-${day.getDay()}">
            <time datetime="${dateFormatter.format(day)}">${day.getDate()}</time>
          </button>
        `
      })
      .join('\n')
  }

  function renderDays(month) {
    const daysHtml = generateDaysHtml(month)
    const dateGrid = document.querySelector('.date-grid')
    dateGrid.innerHTML = daysHtml
    const firstDay = document.querySelector('.date-grid button:first-child')
    firstDay.style['grid-column'] = (month.getDay() + 1)
  }

  function renderMonth(month) {
    const dateFormatter = new Intl.DateTimeFormat(navigator.language, { month: 'long', year: 'numeric' })
    const monthHTML = `<time>${dateFormatter.format(month)}</time>`
    document.querySelector('.month').innerHTML = monthHTML
  }

  function renderCalendar(month) {
    renderDays(month)
    renderMonth(month)
  }

  function addEventTogglers(month) {
    function reRenderCalendar({ target: { dataset: { direction } } }) {
      if (direction === 'backward') {
        month.setMonth(month.getMonth() - 1)
      } else {
        month.setMonth(month.getMonth() + 1)
      }
      renderCalendar(month)
    }
    const toggles = document.querySelectorAll('.toggle')
    for (const toggle of toggles) {
      toggle.addEventListener('click', reRenderCalendar)
    }
  }

  function renderHTML() {
    const month = getFirstOfMonth()
    renderCalendar(month)
    addEventTogglers(month)
  }

  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn()
    } else {
      document.addEventListener('DOMContentLoaded', () => fn())
    }
  }

  onReady(renderHTML)
})()
