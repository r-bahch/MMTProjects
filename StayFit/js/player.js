
$(document).ready(function () {
    //jplayer
    var stream = {
        oga: "http://stream.radioreklama.bg:80/veronika64"
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