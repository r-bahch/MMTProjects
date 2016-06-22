var pages = ["#exercises", "#home", "#exercise", "#schedule", "#login", "#register"]
Sammy(function () {

    this.get('#exercises', function () {
        pages.forEach(function (page) {
            $(page).hide();
        })
        $('#exercises').fadeIn(150);
    });

    this.get('#home', function () {
        pages.forEach(function (page) {
            $(page).hide();
        })
        $('#home').fadeIn(150);
    });

    this.get('#schedule', function () {
        pages.forEach(function (page) {
            $(page).hide();
        })
        $('#schedule').fadeIn(150);
    });

    this.get('#exercises/:id', function () {
        var self = this;
        pages.forEach(function (page) {
            $(page).hide();
        })
        exerciseVM.id(this.params['id']);
        $('#exercise').fadeIn(150);
    });

    this.get('#login', function () {
        pages.forEach(function (page) {
            $(page).hide();
        })
        $('#login').fadeIn(150);
    });

    this.get('#register', function () {
        pages.forEach(function (page) {
            $(page).hide();
        })
        $('#register').fadeIn(150);
    });

    this.get('', function () { this.app.runRoute('get', '#home') });
}).run();