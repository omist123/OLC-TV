schedule = [
  ["CREW", "A", "B", "C", "D", "E"],
  ["G", "F", "E", "D", "C", "B"],
  ["A", "B", "C", "F", "G", "FLEX"],
  ["G", "F", "E", "D", "B", "A"],
  ["A", "C", "D", "E", "F", "G"]
]

setDateAndTime = () => {
  let date = new Date()

  var pageDate = document.getElementById("date")
  pageDate.textContent = date.toLocaleDateString()

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var heading = document.querySelector("h1")
  heading.textContent = weekday[date.getDay()] + "'s Information"

  var pageTime = document.getElementById("time")
  pageTime.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

setSchedule = () => {
  let date = new Date()

  var scheduleRow = document.getElementById("schedule-row")

  if (date.getDay() !== 0 && date.getDay() !== 6) {
      scheduleToday = schedule[date.getDay() - 1]

      for (i = 0; i < scheduleToday.length; i++) {
          td = document.createElement("td")
          td.textContent = scheduleToday[i]
          scheduleRow.appendChild(td)
      }
  } else {
      message = document.createElement("p")
      message.classList.add("schedule-message")
      message.textContent = "Have a great weekend! 🎉"
      scheduleRow.appendChild(message)
  }
}

setProgress = () => {
  var r = document.querySelector(":root")
  r.style.setProperty('--progress-bar', '0%')

  let now = new Date()

  // Set the start and end times
  let startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 15)
  let endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 41)

  var percentComplete = document.getElementById("percent-complete")

  if (now >= startTime && now <= endTime) {
      // Total duration in milliseconds
      let duration = endTime - startTime

      // Elapsed time in milliseconds
      let elapsed = now - startTime

      // Percentage of time elapsed
      let percentage = (elapsed / duration) * 100

      // Update the width of the progress bar
      r.style.setProperty('--progress-bar', percentage + "%")
      percentComplete.textContent = Math.floor(percentage) + "%"
  } else {
      // When school is not in session, set progress bar width to 0%
      r.style.setProperty('--progress-bar', '0%')
  }
}

function setTimeRemaining() {
  let now = new Date()

  let time1441 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 41)

  // Difference in milliseconds
  let difference = time1441 - now

  var timeRemaining = document.getElementById("time-remaining")

  if (difference > 0) {
      let hours = Math.floor(difference / 1000 / 60 / 60)
      difference -= hours * 1000 * 60 * 60
      let minutes = Math.floor(difference / 1000 / 60)

      timeRemaining.textContent = "Time Remaining: " + hours + "h " + minutes + "m"
  }
}

announce = (message) => {
  box = document.getElementById("info")
  box.textContent = message
}

updatePage = () => {
  setDateAndTime()
  setProgress()
  setTimeRemaining()
}

announce("Join MHS Hack Club!")
setDateAndTime()
setSchedule()

updatePage()
setInterval(updatePage, 1000)
// weather portion
