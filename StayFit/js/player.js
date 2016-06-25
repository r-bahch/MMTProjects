
$(document).ready(function () {


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

    //jplayer
    var stream = {
        oga: "http://stream.metacast.eu/veronika.ogg"
    },
    ready = false;

    $("#jquery_jplayer_1").jPlayer({
        ready: function (event) {
            ready = true;
            $(this).jPlayer("setMedia", stream);
        },
        pause: function () {
            spinner.stop(target);
            $(this).jPlayer("clearMedia");
        },
        waiting: function () {
            spinner.spin(target);
        },
        error: function (event) {
            if (ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                // Setup the media stream again and play it.
                $(this).jPlayer("setMedia", stream).jPlayer("play");
            }
        },
        swfPath: "js",
        supplied: "oga",
        preload: "none",
        wmode: "window",
        keyEnabled: true,
        progress: function () {
            spinner.stop(target);
        }
    });
});