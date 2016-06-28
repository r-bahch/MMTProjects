var loginViewModel = function () {
    var self = this;
    self.email = ko.observable();
    self.password = ko.observable();
    self.errorMessage = ko.observable();
    self.message = ko.observable();

    self.reset = function () {
        self.email("")
        self.password("")
        self.errorMessage(undefined);
        self.message(undefined);
    }

    self.login = function () {
        var loginData = {
            grant_type: 'password',
            username: self.email(),
            password: self.password()
        };

        $.ajax({
            type: 'POST',
            url: apiserver + '/Token',
            data: loginData
        }).done(function (data) {
            mainVM.Name(data.Name);
            // Cache the access token in local storage.  
            localStorage.setItem('token', data.access_token);
            scheduleVM.getSchedule();
            localStorage.setItem('Name', data.Name);
            localStorage.getItem('Name');
            mainVM.isLoggedIn(true);
            document.location.hash = '#schedule';
        }).fail(function (xhr, ajaxOptions, thrownError) {
            self.errorMessage($.parseJSON(xhr.responseText).error_description);
        });
    }

}

loginVM = new loginViewModel();
ko.applyBindings(loginVM, document.getElementById("login"));

