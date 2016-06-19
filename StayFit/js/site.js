/// <reference path="knockout-3.4.0.js" />
/// <reference path="models.js" />

var appViewModel = function () {
    this.exercises = new Developer("Radoslav", "Bahchevanov");
}


ko.applyBindings(new appViewModel);
