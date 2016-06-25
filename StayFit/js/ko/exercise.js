/// <reference path="../lib/jquery.js" />
/// <reference path="../lib/sammy-latest.min.js" />
/// <reference path="../lib/knockout-3.4.0.js" />
var exerciseViewModel = function () {
    var self = this;
    self.exerciseData = ko.observable();
};
var exerciseVM = new exerciseViewModel();
ko.applyBindings(exerciseVM, document.getElementById("exercise"));