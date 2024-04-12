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
        data: {method: "queryDemoAppointments"},
        dataType: "json",
        success: function (response) {
            console.log("AJAX Request Success:");
            let demoData = $("<div id=\"demo-data\">");
            for(let i = 0; i < response.length; i++) {
                let appointment = response[i][0];
                demoData.append(
                    "<span>Title: <strong>" + appointment.title + "</strong> </span><br>" +
                    "<span>Location: " + appointment.location + " </span><br>" +
                    "<span>Date: " + appointment.date + " </span><br>" +
                    "<span>From " + appointment.startTime + " </span> " +
                    "<span>To " + appointment.endTime + " </span><br><br>"
                );
            }
            $("body").append(demoData);
        },
        error: function (xhr, status, error) {
            console.log("AJAX Request Failed: " + status + " - " + error);
            console.log(xhr);
        }
    });
}