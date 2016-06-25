var mainViewModel = function () {
    var self = this;
    self.token = ko.observable();
    self.Name = ko.observable();
    self.isLoggedIn = ko.observable(localStorage.getItem('token') !== null);
    self.Name = ko.observable(localStorage.getItem('Name'));

    self.logout = function () {
        self.isLoggedIn(false);
        self.Name(null);
        localStorage.removeItem('token');
        localStorage.removeItem('Name');
        document.location.hash = "#";
    }
}

ko.bindingHandlers.stopBinding = {
    init: function () {
        return { controlsDescendantBindings: true };
    }
};

var mainVM = new mainViewModel();
ko.applyBindings(mainVM);

