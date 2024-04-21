$(document).ready(function () {
    loaddata(); 
});

function loaddata()
{
    $.ajax
    ({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryAppointments"},
        dataType: "json",
        success: function (response) {
            console.log("AJAX Request Success!");

            
            //Loop to display all appointments of the AJAX response
            for(let i=0; i < response.length; i++) {
                let newListItem = $("<li>");

                let newAppointmentButton = $("<button>");
                newAppointmentButton.attr("class", "btn btn-outline-dark appointmentButton");

                let newDeleteButton = $("<button>");
                newDeleteButton.attr("class", "btn btn-outline-danger deleteButton");

                // If Appointment is expired, add special class

                let appointment = response[i];
                var currentDate = new Date();
                
                 var expirationDate = new Date(appointment.expirationDate);
                    if (expirationDate < currentDate) {
                    // Termin ist abgelaufen, füge spezielle Klasse hinzu
                     newListItem = $("<li>").addClass("expired-appointment");
                     // Button deaktivieren
                     newAppointmentButton.prop("disabled", true);
                        newDeleteButton.prop("disabled", true);
                 } 
                    else {
                    // Termin ist nicht abgelaufen
                    let newListItem = $("<li>");
                }


                newAppointmentButton.append(
                    "<span class='appointment-title'>" + appointment.title + "</span><br>" +
                     "<span>Location: " + appointment.location + " </span>" + 
                     "<br><span class='text-warning'>Expires: " + appointment.expirationDate + "<span>"
                );

                newDeleteButton.append(
                    "<i class='fa-solid fa-trash fa-xl'></i>"

                );

                newListItem.append(newAppointmentButton);
                newListItem.append(newDeleteButton);
                $("#appointment-list").append(newListItem);
            }
        },
        error: function (xhr, status, error) {
            console.log("AJAX Request Failed: " + status + " - " + error);
            console.log(xhr);
        }
    });
}
