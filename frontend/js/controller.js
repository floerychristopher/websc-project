$(document).ready(function () {
    //Load and Display Appointments
    loadAppointments();
    //Delete Entry
    $(document).on("click", ".delete-button", function() {
        let confirmDelete = confirm("Are you sure you want to delete this appointment?");

        let appointmentId = $(this).closest("li").attr("id");

        if(confirmDelete) {
            $(this).closest("li").remove();
            deleteAppointment(appointmentId);

            var deleteToast = new bootstrap.Toast(document.getElementById('deleteToast'), { 'autohide': true, 'delay': 5000 });
            deleteToast.show();
        }
    });
    //Appointment Modal
    $(document).on("click", ".appointment-button", function() {
        let appointmentId = $(this).closest("li").attr("id");
        displayAppointmentModal(appointmentId);
    });
});

function loadAppointments()
{
    $.ajax({
        url: "../backend/serviceHandler.php",
        method: "GET",
        cache: false,
        data: { method: "queryAppointments" },
        dataType: "json",
        success: function (response) {
            displayAppointments(response);
        },
        error: function (xhr, status, error) {
            displayAppointments(null);
            console.log("AJAX Request Failed: " + status + " - " + error);
            console.log(xhr);
        }
    });
}

function displayAppointments(response)
{
    if(response == null) {
        let newParagraph = $("<p>");
        newParagraph.attr("class", "error-message");
        newParagraph.html("Oops... Something went wrong. Try again later");
        $("#appointment-list").append(newParagraph);
        return;
    }
    //Loop to display all appointments of the AJAX response
    for(let i=0; i < response.length; i++) {
        let appointment = response[i];
        // TODO
        // If Appointment is expired, add special class
        
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







        let newListItem = $("<li>");
        newListItem.attr("id", appointment.id);

        let newAppointmentButton = $("<button>");
        newAppointmentButton.attr("class", "btn btn-outline-dark appointment-button");
        newAppointmentButton.append(
            "<span class='appointment-title'>" + appointment.title + "</span><br>" +
             "<span>Location: " + appointment.location + " </span>" + 
             "<br><span class='text-warning'>Expires: " + appointment.expirationDate + "<span>"
        );
        newAppointmentButton.attr("data-bs-toggle", "modal");
        newAppointmentButton.attr("data-bs-target", "#staticBackdrop");

        let newDeleteButton = $("<button>");
        newDeleteButton.attr("class", "btn btn-outline-danger delete-button");
        newDeleteButton.append(
            "<i class='fa-solid fa-trash fa-xl'></i>"
        );

        newListItem.append(newAppointmentButton);
        newListItem.append(newDeleteButton);
        $("#appointment-list").append(newListItem);
    }
}

function deleteAppointment(appointmentId)
{
    $.ajax({
        url: "../backend/serviceHandler.php",
        method: 'POST',
        cache: false,
        data: { method: "deleteAppointment", id: appointmentId},
        dataType: 'json',
        success: function(response) {
            console.log("Deletion successful");
        },
        error: function(textStatus, errorThrown) {
            console.error("Error:", textStatus, errorThrown);
            alert("Error deleting appointment, please try again later.");
        }
    });
}

function displayAppointmentModal(appointmentId)
{
    let modalAppointment;
    $.ajax({
        url: "../backend/serviceHandler.php",
        method: "GET",
        cache: false,
        data: { method: "queryAppointments" },
        dataType: "json",
        success: function (response) {
            for(let i=0; i < response.length; i++) {
                if(response[i].id == appointmentId) {
                    console.log("Entry found! " + response[i].id + " " + response[i].title);
                    modalAppointment = response[i];
                    break;
                }
            }
            let modalAppointmentTitle = modalAppointment.title;
            let modalAppointmentDescription = modalAppointment.description;
            let modalAppointmentDuration = modalAppointment.duration;
            $("#staticBackdropLabel").html(modalAppointmentTitle);
            $(".modal-body").html(modalAppointmentDescription + "<br>It will last about " + modalAppointmentDuration + "min");
        },
        error: function (xhr, status, error) {
            displayAppointments(null);
            console.log("AJAX Request Failed: " + status + " - " + error);
            console.log(xhr);
        }
    });
}