/// <reference path="exercises.js" />
/// <reference path="../lib/knockout-3.4.0.js" />


var scheduleViewModel = function () {
    //data
    var self = this;
    self.isEdited = ko.observable(false);
    self.schedule = ko.observableArray([new ko.observableArray(),
        new ko.observableArray(), new ko.observableArray(),
        new ko.observableArray(), new ko.observableArray(),
        new ko.observableArray(), new ko.observableArray()]);
    self.days = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"];
    self.selectedExercise = ko.observable({ Day: -1, Order: -1 });

    //behaviours
    self.getSchedule = function () {
        $.ajax({
            type: 'GET',
            url: apiserver + '/api/schedule',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        }).done(function (data) {

            for (var i = 0; i < 7; i++) {
                self.schedule()[i](data[i]);
            }
            self.isEdited(false);
        }).fail(function (xhr, ajaxOptions, thrownError) {
            //TODO
        });
    };
    //initial get
    self.getSchedule();

    self.postSchedule = function () {
        var scheduleData = ko.toJSON(self.schedule);
        $.ajax({
            type: 'POST',
            url: apiserver + '/api/schedule',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            contentType: "application/json",
            data: scheduleData
        }).done(function (data) {
            self.getSchedule();
        }).fail(function (xhr, ajaxOptions, thrownError) {
            //TODO
        });
    };

    self.addExercise = function (day, exId) {
        self.schedule()[day].push({ ExerciseID: exId, ExerciseName: jQuery.grep(exercisesVM.availableExercises(), function (ex) { return exId == ex.ID; }).pop().Name });
        self.isEdited(true);
        self.selectExercise(day, self.schedule()[day]().length-1);
        console.log(self.schedule()[day]().length-1);
    }

    self.selectExercise = function (day, order) {
        self.selectedExercise({ Day: day, Order: order });

        if (self.schedule()[day]().length - 1 == order) {
            $("#move-down").prop("disabled", "true");
        } else {
            $("#move-down").removeProp("disabled");
        }
        if (0 == order) {
            $("#move-up").prop("disabled", "true");
        } else {
            $("#move-up").removeProp("disabled");
        }
    }

    self.moveUp = function () {
        self.isEdited(true);
        var day = self.selectedExercise().Day;
        var order = self.selectedExercise().Order;
        self.schedule()[day].swap(order, order - 1);
        self.selectExercise(day, order - 1);
    }
    self.moveDown = function () {
        self.isEdited(true);
        var day = self.selectedExercise().Day;
        var order = self.selectedExercise().Order;
        self.schedule()[day].swap(order, order + 1);
        self.selectExercise(day, order + 1);
    }

    self.del = function () {
        self.isEdited(true);
        var day = self.selectedExercise().Day;
        var order = self.selectedExercise().Order;
        self.schedule()[day].splice(order, 1);
        console.log(self.schedule()[day]());
        self.selectExercise(-1, -1);
    }

    self.isEdited = ko.observable(false);

    self.goToEx = function () {
        var day = self.selectedExercise().Day;
        var order = self.selectedExercise().Order;
        var exId = self.schedule()[day]()[order].ExerciseID;
        document.location.hash = "exercises/" + exId;
    }

    self.initializeSelected = function(){
        self.selectedExercise({ Day: -1, Order: -1 });
    }
}

ko.observableArray.fn.swap = function (index1, index2) {
    this.valueWillMutate();
    var temp = this()[index1];
    this()[index1] = this()[index2];
    this()[index2] = temp;
    this.valueHasMutated();
}
var scheduleVM = new scheduleViewModel();
ko.applyBindings(scheduleVM, document.getElementById("schedule"));


//DragAndDrop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, exerciseId) {
    ev.dataTransfer.setData("text", exerciseId);
}

function drop(ev, dayIndex) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    scheduleVM.addExercise(dayIndex, data);
}
