/// <reference path="../lib/knockout-3.4.0.js" />
/// <reference path="../lib/jquery.js" />

var exercisesViewModel = function () {
    var self = this;
    self.availableExercises = ko.observableArray();
    self.selectedMuscleGroup = ko.observable(); // Nothing selected by default
    self.getExercises = function () {
        $.getJSON(apiserver + "/api/exercises", function (data) {
            self.availableExercises(data);
        });
    };
    self.getExercises();
    self.uniqueMuscleGroups = ko.computed(function () {
        var arr = ko.utils.arrayMap(self.availableExercises(), function (exercise) { return exercise.MuscleGroup });
        var uniqueNames = [];
        $.each(arr, function (i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        return uniqueNames;
    });

}

var exercisesVM = new exercisesViewModel();
ko.applyBindings(exercisesVM, document.getElementById('exercises'));