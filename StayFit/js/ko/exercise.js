/// <reference path="../lib/jquery.js" />
/// <reference path="../lib/sammy-latest.min.js" />
/// <reference path="../lib/knockout-3.4.0.js" />
var exerciseViewModel = function () {
    var self = this;
    self.id = ko.observable();
    self.exerciseData = ko.computed(function () {
        return jQuery.grep(exercisesArray, function (el) { return el.id == self.id(); }).pop();
    });
};
var exerciseVM = new exerciseViewModel();
ko.applyBindings(exerciseVM, document.getElementById("exercise"));