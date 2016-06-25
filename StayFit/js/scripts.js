jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.document.location = $(this).data("href");
    });
});

function goToSchedule() {
    location.hash = "schedule";
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, exerciseId) {
    ev.dataTransfer.setData("text", exerciseId);
}

function drop(ev, dayIndex) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    scheduleVM.schedule()[dayIndex].addExercise(data);
}

var apiserver = "http://localhost:1272"