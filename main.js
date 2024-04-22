window.onload = function() {
    fetch('serviceHandler.php?method=queryAppointments')
        .then(response => response.json())  // parse the response as JSON
        .then(data => {
            console.log(data);  // log the parsed data
            const appointmentsDiv = document.getElementById('appointments');
            // Sort appointments by date and time
            data.sort((a, b) => new Date(a.date + ' ' + a.startingTime) - new Date(b.date + ' ' + b.startingTime));
            data.forEach(appointment => {
                const div = document.createElement('div');
                div.className = 'appointment-box form-check';

                const input = document.createElement('input');
                input.className = 'form-check-input';
                input.type = 'checkbox';
                input.value = '';
                input.id = `appointment${appointment.appointment_id}`;

                const label = document.createElement('label');
                label.className = 'form-check-label';
                label.htmlFor = input.id;
                const currentDate = new Date();
                const appointmentDate = new Date(appointment.date);
                let expiredText = '';
                if (appointmentDate < currentDate) {
                    expiredText = ' (Expired)';
                }
                label.textContent = `${appointment.title}, ${appointment.location}, ${appointment.date}, ${appointment.voting_expiry_date}, ${appointment.startingTime}, ${appointment.endTime}${expiredText}`;

                div.appendChild(input);
                div.appendChild(label);
                appointmentsDiv.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
};