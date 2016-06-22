var mainViewModel = function () {
    var self = this;
    self.isLoggedIn = ko.observable(false);
    
    self.kur = ko.observable("kur");
}

ko.bindingHandlers.stopBinding = {
    init: function () {
        return { controlsDescendantBindings: true };
    }
};

var mainVM = new mainViewModel();
ko.applyBindings(mainVM);

function login() {
    mainVM.isLoggedIn(true);
}

function logout() {
    mainVM.isLoggedIn(false);
}

function displayControls(id) {
    window.alert(id);
}
