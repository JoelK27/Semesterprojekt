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

function isDatesEqual(cellDate, appointmentDate) {
    // Konvertiere Datumsstrings in Date-Objekte
    const cellDateObject = new Date(cellDate);
    
    const appointmentDateObject = new Date(appointmentDate);
    

    // Setze die Uhrzeit beider Daten auf 00:00:00.000
    cellDateObject.setHours(0, 0, 0, 0);
    appointmentDateObject.setHours(0, 0, 0, 0);

    // Vergleiche die Daten mit getTime()
    //console.log(cellDateObject.getTime() === appointmentDateObject.getTime());
    return cellDateObject.getTime() === appointmentDateObject.getTime();
}

function fillWeekTable(weekStart) {
    updateTableHeader(weekStart);
    const weekBody = document.getElementById('weekBody');
    weekBody.innerHTML = ''; // clear the body

    fetch('serviceHandler.php?method=queryAppointments')
        .then(response => response.json())
        .then(data => {
            const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
            const row = document.createElement('tr'); // Create the row here
            for (let i = 0; i < 7; i++) {
                const cellDate = new Date(weekStart);
                cellDate.setDate(cellDate.getDate() + i);
                cellDate.setHours(0, 0, 0, 0); // set time to 00:00:00.000
            
                const cell = document.createElement('td'); // Create the cell here
            
                // Loop through appointments to find those matching the current date
                for (const appointment of data) {
                    const appointmentDate = appointment.date;
                    if (isDatesEqual(cellDate, appointmentDate)) {
                        // Create a card element for each appointment
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.style.margin = '20px'; // Set margin bottom to 20px
                        card.addEventListener('click', function() {
                            // This function will be executed when the card is clicked
                            openPopup();
                            console.log('Card was clicked!');
                        });

                        // Create the card body
                        const cardBody = document.createElement('div');
                        cardBody.classList.add('card-body');

                        // Create the card title
                        const cardTitle = document.createElement('h5');
                        cardTitle.classList.add('card-title');
                        cardTitle.textContent = appointment.title;

                        // Create the card text
                        const cardText = document.createElement('p');
                        cardText.classList.add('card-text');
                        cardText.textContent = `${appointment.startingTime}-${appointment.endTime}`;
                        cardBody.appendChild(cardTitle);
                        cardBody.appendChild(cardText);
                        card.appendChild(cardBody);
                        cell.appendChild(card);
                    }
                }
            
                row.appendChild(cell); // Append the cell to the row here
            }
            weekBody.appendChild(row); // Append the row to the body here
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
        if (isDatesEqual(cellDate, currentDate)) {
            headerCell.style.backgroundColor = 'lightblue';
        }

        weekHeader.appendChild(headerCell);
    }
}
function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}
