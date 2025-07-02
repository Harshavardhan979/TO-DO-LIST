function addTask() {
  const input = document.getElementById("taskInput");
  const timeInput = document.getElementById("alarmTime");

  const taskText = input.value.trim();
  const alarmTime = timeInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const now = new Date();
  const [hour, minute] = alarmTime.split(":");

  const alarmDate = new Date();
  alarmDate.setHours(hour, minute, 0, 0); // set seconds & ms to 0

  // If time has already passed today, set for next day
  if (alarmDate < now) {
    alarmDate.setDate(alarmDate.getDate() + 1);
  }

  const timeDiff = alarmTime ? alarmDate.getTime() - now.getTime() : null;

  if (timeDiff && timeDiff > 0) {
    setTimeout(() => {
      alert(`⏰ Task Time: "${taskText}"`);
    }, timeDiff);
  }

  const formattedTime = alarmTime ? formatTime(alarmTime) : "No Alarm";

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" onchange="toggleDone(this)">
      <div>
        <span class="task-text">${taskText}</span><br>
        <span class="task-time">Alarm set for: ${formattedTime}</span>
      </div>
    </div>
    <button onclick="deleteTask(this)">❌</button>
  `;

  document.getElementById("taskList").appendChild(li);

  input.value = "";
  timeInput.value = "";
}

function formatTime(timeStr) {
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function deleteTask(button) {
  button.parentElement.remove();
}

function toggleDone(checkbox) {
  const li = checkbox.closest("li");
  li.classList.toggle("done");
}
