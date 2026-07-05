// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCountEl = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const attendeeListEl = document.getElementById("attendeeList");

//Track attendence
let count = 0;
const maxCount = 50;
let teamCounts = { water: 0, zero: 0, power: 0 };
let attendees = [];

//Load saved progress from local storage, if any
const saved = localStorage.getItem("checkInData");
if (saved) {
  const data = JSON.parse(saved);
  count = data.count;
  teamCounts = data.teamCounts;
  attendees = data.attendees;
}

//Render everything based on current state
function render() {
  attendeeCountEl.textContent = count;

  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;

  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;

  attendeeListEl.innerHTML = "";
  attendees.forEach(function (attendee) {
    const li = document.createElement("li");
    li.textContent = `${attendee.name} — ${attendee.teamName}`;
    attendeeListEl.appendChild(li);
  });
}

//Save current state to local storage
function saveProgress() {
  localStorage.setItem(
    "checkInData",
    JSON.stringify({ count, teamCounts, attendees })
  );
}

//Show initial state (in case of saved progress)
render();

//Handle form submission
form.addEventListener('submit', function(event){
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value
  const teamName = teamSelect.selectedOptions[0].text;

  //Increment counts
  count++;
  teamCounts[team]++;
  attendees.push({ name, teamName });

  //Show welcome message on the page
  greeting.textContent = `🎉 Welcome, ${name} from ${teamName}!`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  render();
  saveProgress();

  //Celebrate when the attendance goal is reached
  if (count === maxCount) {
    const winningTeam = Object.keys(teamCounts).reduce((a, b) =>
      teamCounts[a] >= teamCounts[b] ? a : b
    );
    const winningTeamName = document.querySelector(
      `#${winningTeam}Count`
    ).previousElementSibling.textContent;
    greeting.textContent = `🎊 Goal reached! ${winningTeamName} wins with ${teamCounts[winningTeam]} check-ins!`;
  }

  form.reset();
});

