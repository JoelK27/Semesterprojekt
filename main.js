let currentWeekStart = getMonday(new Date());

window.onload = function() {
    fillWeekTable(currentWeekStart);

    document.getElementById('prevWeek').addEventListener('click', function() {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        fillWeekTable(currentWeekStart);
    });

    document.getElementById('nextWeek').addEventListener('click', function() {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        fillWeekTable(currentWeekStart);
    });
};

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

function fillWeekTable(weekStart) {
    updateTableHeader(weekStart);
    const weekBody = document.getElementById('weekBody');
    weekBody.innerHTML = ''; // clear the body

    fetch('serviceHandler.php?method=queryAppointments')
        .then(response => response.json())
        .then(data => {
            const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
            for (let i = 0; i < 7; i++) {
                const cellDate = new Date(weekStart);
                cellDate.setDate(cellDate.getDate() + i);
                cellDate.setHours(0, 0, 0, 0); // set time to 00:00:00.000

                const row = document.createElement('tr');

                const appointmentsOnThisDay = data.filter(appointment => {
                    const appointmentDate = new Date(appointment.date);
                    appointmentDate.setHours(0, 0, 0, 0); // set time to 00:00:00.000
                    return appointmentDate.getTime() === cellDate.getTime();
                });
                appointmentsOnThisDay.forEach(appointment => {
                    const cell = document.createElement('td');
                    cell.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${appointment.title}</h5>
                                <p class="card-text">${appointment.startingTime}-${appointment.endTime}</p>
                            </div>
                        </div>
                    `;

                    row.appendChild(cell);
                });

                weekBody.appendChild(row);
            }
        })
        .catch(error => console.error('Error:', error));
}

function updateTableHeader(weekStart) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set time to 00:00:00.000

    const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
    const weekHeader = document.getElementById('weekTable').querySelector('thead tr');
    weekHeader.innerHTML = ''; // clear the header

    for (let i = 0; i < 7; i++) {
        const cellDate = new Date(weekStart);
        cellDate.setDate(cellDate.getDate() + i);

        const headerCell = document.createElement('th');
        headerCell.textContent = `${weekDays[i]} (${cellDate.getDate()}.${cellDate.getMonth()+1}.${cellDate.getFullYear()})`;

        // Highlight the cell if it's the current date
        if (cellDate.getTime() === currentDate.getTime()) {
            headerCell.style.backgroundColor = 'grey';
        }

        weekHeader.appendChild(headerCell);
    }
}