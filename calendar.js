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

function dateToTimeStr(date) {
  return new Intl.DateTimeFormat(navigator.language).format(date)
}

function generateDaysHtml(month) {
  const days = getDaysInMonth(month)
  return days.map(day => {
      return `
        <button class="day-${day.getDay()}">
          <time datetime="${dateToTimeStr(day)}">${day.getDate()}</time>
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
  const formatter = new Intl.DateTimeFormat(navigator.language, { month: 'long', year: 'numeric' })
  const monthHTML = `<time>${formatter.format(month)}</time>`
  document.querySelector('.month').innerHTML = monthHTML
}

function renderCalendar(month = getFirstOfMonth()) {
  renderDays(month)
  renderMonth(month)
}

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', () => fn())
  }
}

onReady(renderCalendar)
