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

  alarmDate.setHours(hour, minute, 0, 0);
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
    <div class="task-buttons">
      <button onclick="editTask(this)">✏️</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
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
  button.closest("li").remove();
}

function toggleDone(checkbox) {
  const li = checkbox.closest("li");
  li.classList.toggle("done");
}

function editTask(button) {
  const li = button.closest("li");
  const span = li.querySelector(".task-text");

  if (button.textContent === "✏️") {
    // Start editing
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";
    span.replaceWith(input);
    button.textContent = "💾"; // Change to save  
  } else {
    // Save edited text
    const input = li.querySelector(".edit-input");
    const newSpan = document.createElement("span");
    newSpan.className = "task-text";
    newSpan.textContent = input.value;

    input.replaceWith(newSpan);
    button.textContent = "✏️"; // Change back to edit
  }
}