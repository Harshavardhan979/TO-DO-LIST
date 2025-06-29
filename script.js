function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const time = getCurrentTime();

  let li = document.createElement("li");

  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" onchange="toggleDone(this)">
      <div>
        <span class="task-text">${taskText}</span><br>
        <span class="task-time">(Added at ${time})</span>
      </div>
    </div>
    <button onclick="deleteTask(this)">❌</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}

function deleteTask(button) {
  button.parentElement.remove();
}

function toggleDone(checkbox) {
  let li = checkbox.closest("li");
  li.classList.toggle("done");
}
