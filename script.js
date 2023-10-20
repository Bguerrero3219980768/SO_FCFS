//Pedir datos de entrada al usuario
document.getElementById('numTasks').addEventListener('change', function () {
  const numTasks = parseInt(this.value);
  const taskInputs = document.getElementById('taskInputs');
  taskInputs.innerHTML = '';

  for (let i = 0; i < numTasks; i++) {
    taskInputs.innerHTML += `
        <div class="form-group">
          <label for="name${i}">Name of the homework ${i + 1}:</label>
          <input type="text" id="name${i}" class="form-control">
  
          <label for="arrivalTime${i}">Task arrival time ${i + 1}:</label>
          <input type="number" id="arrivalTime${i}" class="form-control">
  
          <label for="duration${i}">task duration ${i + 1}:</label>
          <input type="number" id="duration${i}" class="form-control">
        </div>
      `;
  }
});

function runFCFS() {
  const tasks = [];

  const numTasks = parseInt(document.getElementById('numTasks').value);

  // Obtener los datos de las tareas ingresadas por el usuario
  for (let i = 0; i < numTasks; i++) {
    const name = document.getElementById(`name${i}`).value;
    const arrivalTime = parseInt(document.getElementById(`arrivalTime${i}`).value);
    const duration = parseInt(document.getElementById(`duration${i}`).value);

    tasks.push({ name, arrivalTime, duration });
  }

  const tableBody = document.querySelector('#results tbody');
  tableBody.innerHTML = '';

  const ganttChartBody = document.querySelector('#ganttChart tbody');
  ganttChartBody.innerHTML = '';

  let currentTime = 0;
  let totalWaitTime = 0;
  let totalTurnaroundTime = 0;

  // Mostrar los datos ingresados con el tiempo de espera y tiempo de retorno por cada tarea
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const waitTime = Math.max(0, currentTime - task.arrivalTime);
    const turnaroundTime = waitTime + task.duration;

    totalWaitTime += waitTime;
    totalTurnaroundTime += turnaroundTime;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.arrivalTime}</td>
        <td>${task.duration}</td>
        <td>${waitTime}</td>
        <td>${turnaroundTime}</td>
      `;

    tableBody.appendChild(row);

    // Crear una fila en el gráfico de Gantt para mostrar el proceso de planificación
    const ganttRow = document.createElement('tr');
    ganttRow.innerHTML = `
        <td>${task.name}</td>
      `;

    // Establecer el color de fondo de la celda del gráfico de Gantt
    const color = getRandomColor();
    ganttRow.style.backgroundColor = color;

    ganttChartBody.appendChild(ganttRow);

    currentTime += task.duration;
  }

  const avgWaitTime = totalWaitTime / tasks.length;
  const avgTurnaroundTime = totalTurnaroundTime / tasks.length;

  const avgRow = document.createElement('tr');
  avgRow.innerHTML = `
      <td></td>
      <td></td>
      <td>Promedio</td>
      <td>${avgWaitTime.toFixed(2)}</td>
      <td>${avgTurnaroundTime.toFixed(2)}</td>
    `;

  tableBody.appendChild(avgRow);
}

// Función auxiliar para generar colores aleatorios en formato hexadecimal
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


