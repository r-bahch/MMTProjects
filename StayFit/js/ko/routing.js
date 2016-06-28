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
        if (!mainVM.isLoggedIn()) {
            this.redirect("#login");
        }
        else {
            pages.forEach(function (page) {
                $(page).hide();
            })
            $('#schedule').fadeIn(150);
        }
    });



    this.get('#exercises/:id', function () {
        exerciseVM.reset();
        $.getJSON(apiserver + "/api/exercises/" + this.params['id'], function (data) {
            exerciseVM.exerciseData(data);
        });
        pages.forEach(function (page) {
            $(page).hide();
        })
        $('#exercise').fadeIn(150);
    });



    this.get('#login', function () {
        if (mainVM.isLoggedIn()) {
            this.redirect("#schedule");
        }
        else {
            loginVM.reset();
            pages.forEach(function (page) {
                $(page).hide();
            })
            $('#login').fadeIn(150);
        }

    });

    this.post('#login', function () {
        loginVM.login();
    });

    this.get('#register', function () {
        if (mainVM.isLoggedIn()) {
            this.redirect("#schedule");
        }
        else {
            registerVM.reset();
            pages.forEach(function (page) {
                $(page).hide();
            })
            $('#register').fadeIn(150);
        }
    });

    this.post('#register', function () {
        registerVM.register();
    });

    this.get('', function () {
        this.app.runRoute('get', '#home')
    });
}).run();