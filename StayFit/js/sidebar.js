$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#sidebar-wrapper a").click(function () { $("#wrapper").removeClass("toggled"); });
});