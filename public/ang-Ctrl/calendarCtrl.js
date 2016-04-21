  var CalendarCtrl2 = angular.module('CalendarCtrl2', ['mwl.calendar','ui.bootstrap','ngAnimate']);

  CalendarCtrl2.controller('KitchenSinkCtrl',['$scope','moment', '$stateParams','$http','alert',function($scope,moment,$stateParams,$http,alert) {

    $scope.isCollapsed = true; //To show appoinment form only on click
    $scope.currentDate = new Date(); // To validate that appointment can not be made prior to current date
    $scope.maxAppointmentDate = moment($scope.currentDate).add(3, 'M')._d;
    console.log("Current date :"+$scope.currentDate+" and Max date :"+$scope.maxAppointmentDate);

    $scope.reset = function() {
        $scope.appointment = "";
        $scope.isCollapsed = true;
    };

    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.events =[];

    $scope.populateCalendar = function(){

      $http.get('/auth/populateCalendar/'+$stateParams.uid).success(function(data) {
      // $scope.appointments = data;
       for(i=0;i<data.length;i++){
         vm.events.push({
            title:data[i].name,
            type: 'warning',
            startsAt: new Date(data[i].eventStartsAt),
            endsAt: new Date(data[i].eventEndsAt),
            draggable: true,
            resizable: true,
            editable: false,
            deletable :false
        })
       }
        // console.log(vm.events);
      });
    };

    $scope.populateCalendar(); //It should be integrated with in the doctor search page

    $scope.addEvent = function(appointment,event){
      $scope.appointment.drIdentifier = $stateParams.uid;
      // $scope.appointment.drIdentifier = "1";
      $scope.appointment.eventStartsAt = $scope.event.startsAt,
      $scope.appointment.eventEndsAt = moment($scope.event.startsAt).add(1, 'h')._d,

      // Simple POST request to add Event into the database:
      $http({
        method: 'POST',
        url: '/auth/addEvent',
        data :{appointment:$scope.appointment}
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
         vm.events.push({
            title:$scope.appointment.name,
            type: 'warning',
            startsAt:$scope.event.startsAt ,
            endsAt: moment($scope.event.startsAt).add(1, 'hour')._d,
            draggable: true,
            resizable: true,
            editable: true,
            deletable :true
          });
         $scope.appointment ={};
         $scope.isCollapsed = true;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log("failed to load the event in database");
      });

    };

    vm.isCellOpen = true;

    vm.eventClicked = function(event) {
      alert.show('Your Appointment Details', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };
}]);
