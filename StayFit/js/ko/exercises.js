/// <reference path="../lib/knockout-3.4.0.js" />
/// <reference path="../lib/jquery.js" />
var Exercise = function (id, name, description, muscleGroup, videoUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.muscleGroup = muscleGroup;
    this.videoUrl = videoUrl;
}
var exercisesViewModel = function () {
    var self = this;
    self.availableExercises = ko.observableArray([]);
    self.selectedMuscleGroup = ko.observable(); // Nothing selected by default

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