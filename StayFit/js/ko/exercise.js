/// <reference path="../lib/jquery.js" />
/// <reference path="../lib/sammy-latest.min.js" />
/// <reference path="../lib/knockout-3.4.0.js" />
var exerciseViewModel = function () {
    var self = this;
    self.exerciseData = ko.observable();
    self.dayToAddTo = ko.observable();
    self.showMessage = ko.observable(false);
    self.dayAdded = ko.observable();
    self.addToSchedule = function () {
        if (self.dayToAddTo() !== undefined) {
            dayIndex = scheduleVM.days.indexOf(self.dayToAddTo());
            scheduleVM.addExercise(dayIndex, self.exerciseData().ID.toString());
            self.dayAdded(self.dayToAddTo());
            self.showMessage(true);
        }
    }
    self.reset = function () {
        self.exerciseData(undefined);
        self.dayToAddTo(undefined);
        self.showMessage(false);
    }
};
var exerciseVM = new exerciseViewModel();
ko.applyBindings(exerciseVM, document.getElementById("exercise"));