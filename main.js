function getCurrentDate() {
    var currentDate = new Date();
    var options = { weekday: 'long' };
    var dayOfWeek = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('day').innerHTML = dayOfWeek; 
}
getCurrentDate(); 
function getCurrentTimeIn12HourFormat() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
    // Add leading zero to minutes if they are less than 10
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  }
  
const currentTime = getCurrentTimeIn12HourFormat();

document.getElementById("time").innerHTML = currentTime.toString(); 
