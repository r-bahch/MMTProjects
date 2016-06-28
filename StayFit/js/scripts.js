jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.document.location = $(this).data("href");
    });
});

//spin.js arguments
var opts = {
    lines: 8, // The number of lines to draw
    length: 3, // The length of each line
    width: 5, // The line thickness
    radius: 8, // The radius of the inner circle
    color: '#EC5B32', // #rgb or #rrggbb or array of colors
    speed: 1 // Rounds per second
}
var spinner = new Spinner(opts);
var target = document.getElementById("loading-player");
var ajaxLoader = document.getElementById("ajax-loader");



// AJAX Spinner
$body = $("body");
$(document).on({
    ajaxStart: function () {
        $body.addClass("loading");
        spinner.spin(ajaxLoader);
    },
    ajaxStop: function () {
        $body.removeClass("loading");
        spinner.stop(ajaxLoader);
    }
});

var apiserver = "http://localhost:1272"