function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");

  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" onchange="toggleDone(this)">
      <span class="task-text">${taskText}</span>
    </div>
    <button onclick="deleteTask(this)">❌</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function deleteTask(button) {
  button.parentElement.remove();
}

function toggleDone(checkbox) {
  let li = checkbox.closest("li");
  li.classList.toggle("done");
}
