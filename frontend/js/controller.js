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

                let appointment = response[i];

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
                // Christophers Kommentar
            }
        },
        error: function (xhr, status, error) {
            console.log("AJAX Request Failed: " + status + " - " + error);
            console.log(xhr);
        }
    });
}
