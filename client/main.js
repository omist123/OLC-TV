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

  const month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
  const root = document. querySelector(':root')
  root.classList.add(month[date.getMonth()])

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
    // When school is not in session, set progress bar width to 100%
    r.style.setProperty('--progress-bar', '100%')
  }
}

function setTimeRemaining() {
  let now = new Date()

  let time815 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 15)
  let time1441 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 41)

  // Difference in milliseconds
  let difference = time1441 - now

  var timeRemaining = document.getElementById("time-remaining")

  if (difference > 0 && now >= time815) {
    let hours = Math.floor(difference / 1000 / 60 / 60)
    difference -= hours * 1000 * 60 * 60
    let minutes = Math.floor(difference / 1000 / 60)

    timeRemaining.textContent = "Time Remaining: " + hours + "h " + minutes + "m"
  }
}

const announcementsAPI = "https://aspen-api.herocc.com/api/v1/ma-melrose/announcements";
var announcementData;
var scrollAnn = 0;

async function getAnnouncements() {
  try {
    const response = await fetch(announcementsAPI);
    const data = await response.json();
    announcementData = data.data
    announce()
  } catch (error) {
    console.error("Error:", error);
  }
}

function announce() {
  var title = document.createElement("span");
  title.style.fontWeight = "bold";
  title.textContent = announcementData[scrollAnn].title + ": ";

  var box = document.getElementById("info");
  box.innerHTML = "";
  box.appendChild(title)
  box.innerHTML += announcementData[scrollAnn].description;

  scrollAnn += 1;

  if (scrollAnn == announcementData.length) {
    scrollAnn = 0;
  }
}

function KtoF(val) {
  val = (val - 273.15) * 9 / 5 + 32;
  val = Math.round(val);
  return val;
}

async function getWeather() {
  try {
    const response = await fetch('https://mhs-school-lunch.onrender.com/weather');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    var temp = data.main.temp;
    document.getElementById("weather").textContent = KtoF(temp) + "°F";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function getLunch() {
  try {
    const response = await fetch("https://mhs-school-lunch.onrender.com/lunch");
    const lunch = await response.text();
    document.getElementById("lunch").textContent = lunch
    document.getElementById("lunch-loader").style.display = "none";
  } catch (error) {
    console.log(error)
  }
}

var announcementData = getAnnouncements()
setInterval(announce, 8000)

updatePage = () => {
  setDateAndTime()
  setProgress()
  setTimeRemaining()

}
updatePageOther = () => {
  setSchedule()
  getLunch()
  
}


function refreshAt(hours, minutes, seconds) {
  var now = new Date();
  var then = new Date();

  if(now.getHours() > hours ||
     (now.getHours() == hours && now.getMinutes() > minutes) ||
      now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
      then.setDate(now.getDate() + 1);
  }
  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  var timeout = (then.getTime() - now.getTime());
  setTimeout(function() { window.location.reload(true); }, timeout);
}
refreshAt(15,16,0)
updatePage()
setInterval(updatePage, 1000)
setInterval(getWeather(), 3600000)
setInterval(updatePageOther(), 21600000)