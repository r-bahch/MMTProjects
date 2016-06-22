/// <reference path="exercises.js" />
/// <reference path="../lib/knockout-3.4.0.js" />
var scheduleData = [
    {
        exerciseId: 1,
        exerciseName: "Бицепсово сгъване на долен скрипец",
        day: 1,
        order: 1
    },
    {
        exerciseId: 2,
        exerciseName: "Бицепсово сгъване с дъмбели",
        day: 1,
        order: 2
    },
{
    exerciseId: 2,
    exerciseName: "Бицепсово сгъване с дъмбели",
    day: 2,
    order: 1
}]

var Day = function (name) {
    var self = this;
    self.name = name;
    self.exercises = ko.observableArray();
    self.addExercise = function (id) {
        self.exercises.push(jQuery.grep(exercisesArray, function (ex) { return id == ex.id; }).pop());
    }
}

var scheduleViewModel = function () {
    var self = this;
    self.schedule = ko.observableArray([new Day("Понеделник"), new Day("Вторник"), new Day("Сряда"), new Day("Четвъртък"), new Day("Петък"), new Day("Събота"), new Day("Неделя")]);

};
var scheduleVM = new scheduleViewModel();
ko.applyBindings(scheduleVM, document.getElementById("schedule"));