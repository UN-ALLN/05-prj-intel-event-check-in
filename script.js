// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCountEl = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

//Track attendence
let count = 0;
const maxCount = 50;


//Handle form submission
form.addEventListener('submit', function(event){
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value
  const teamName = teamSelect.selectedOptions[0].text;
  console.log(name, teamName);

  //Increment count
  count++
  console.log("Total check-ins", count);

  //update attendee count on the page
  attendeeCountEl.textContent = count;

  //update progess bar
  const percentage = Math.round((count/maxCount)*100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progess ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //Show welcome message on the page
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  console.log(message)

  form.reset();
});

