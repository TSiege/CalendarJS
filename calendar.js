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

function renderDateTimeStr(date) {
  return new Intl.DateTimeFormat(navigator.language).format(date)
}

function generateDaysHtml(month) {
  const days = getDaysInMonth(month)
  return days.map(day => {
      return `
        <button class="${true}">
          <time datetime="${renderDateTimeStr(day)}">${day.getDate()}</time>
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


function renderCalendar(month = getFirstOfMonth()) {
  console.log(month)
  renderDays(month)
}

function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', () => fn())
  }
}

onReady(renderCalendar)
