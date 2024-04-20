fetch('../Backend/serviceHandler.php?method=queryAppointments')
    .then(response => response.json())
    .then(appointments => {
        const appointmentsList = document.getElementById('appointments');
        appointments.forEach(appointment => {
            const listItem = document.createElement('li');
            listItem.textContent = `${appointment[0].title} ${appointment[0].date} ${appointment[0].location}`;
            appointmentsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Fehler:', error));