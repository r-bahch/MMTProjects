/// <reference path="../lib/knockout-3.4.0.js" />
var registerViewModel = function () {
    var self = this;
    self.userName = ko.observable();
    self.email = ko.observable();
    self.password = ko.observable();
    self.passwordConfirm = ko.observable();
    self.errorMessages = ko.observableArray();

    self.reset = function () {
        self.userName("");
        self.email("");
        self.password("");
        self.passwordConfirm("");
        self.errorMessages(undefined);
    }

    self.register = function () {
        var registerData = {
            Email: self.email,
            Name: self.userName,
            Password: self.password,
            ConfirmPassword: self.passwordConfirm
        };

        $.ajax({
            type: 'POST',
            url: apiserver + '/api/account/register',
            data: registerData
        }).done(function (data) {
            console.log("registered");
            document.location.hash = '#login';
            loginVM.message("Регистрирахте се успешно!")
        }).fail(function (xhr, ajaxOptions, thrownError) {
            var modelState = $.parseJSON(xhr.responseText).ModelState;
            var array = $.map(modelState, function (value, index) {
                return [value];
            });
            self.errorMessages(array);
            console.log(self.errorMessages());
            console.log(modelState[0]);
        });
    }
}

registerVM = new registerViewModel();
ko.applyBindings(registerVM, document.getElementById("register"));