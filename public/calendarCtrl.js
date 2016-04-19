var CalendarCtrl2 = angular.module('CalendarCtrl2', ['mwl.calendar','ui.bootstrap','ngAnimate']);

  CalendarCtrl2.controller('KitchenSinkCtrl',['$scope','moment', '$stateParams','$http',function($scope,moment,$stateParams,$http) {

    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'day';
    vm.viewDate = new Date();
    vm.events =[];

    // $scope.drIdentifier = $stateParams.uid;
    // console.log($scope.drIdentifier);

    $http.get('/auth/populateCalendar/1').success(function(data) {
      $scope.appointments = data;
      // console.log(data);
       for(i=0;i<data.length;i++){
         vm.events.push({
            title:data[i].eventTitle,
            type: 'warning',
            startsAt: new Date(data[i].startDateTime),
            endsAt: new Date(data[i].endDateTime),
            // startsAt: new Date(2016,3,17,9),
            // endsAt: new Date(2016,3,17,11),
            draggable: true,
            resizable: true,
            editable: false,
            deletable :false
        })
       }
       console.log(vm.events);
    });

    $scope.addEvent = function(){
      console.log("Add event clicked");
      $scope.date = new Date;
      $scope.added = true;

      vm.events.push({
        title:"Your Name",
        type: 'warning',
        startsAt:$scope.date ,
        endsAt: $scope.date,
        draggable: true,
        resizable: true,
        editable: true,
        deletable :true
      });
    }

    // vm.events = [
    //   {
    //     title: 'An event',
    //     type: 'warning',
    //     startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
    //     endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
    //     draggable: true,
    //     resizable: true
    //   }, {
    //     title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
    //     type: 'info',
    //     startsAt: moment().subtract(1, 'day').toDate(),
    //     endsAt: moment().add(5, 'days').toDate(),
    //     draggable: true,
    //     resizable: true
    //   }, {
    //     title: 'This is a really long event title that occurs on every year',
    //     type: 'important',
    //     startsAt: moment().startOf('day').add(7, 'hours').toDate(),
    //     endsAt: moment().startOf('day').add(19, 'hours').toDate(),
    //     recursOn: 'year',
    //     draggable: true,
    //     resizable: true
    //   }
    // ];

    // });
    $scope.isCellOpen = true;

    vm.eventClicked = function(event) {
      // alert.show('Clicked', event);
      console.log('Clicked', event);
    };

    vm.eventEdited = function(event) {
      // alert.show('Edited', event);
      console.log('Edited', event);
    };

    vm.eventDeleted = function(event) {
      // alert.show('Deleted', event);
      console.log('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      // alert.show('Dropped or resized', event);
      console.log('Dropped or resized', event);
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

  }]);

// CalendarCtrl2.factory('myAppointment','$stateParams','$http',function($scope,$stateParams,$http){
//   var appointments = [];
//   var factory = {};
//   factory.getAppointments = function (){
//     $scope.drIdentifier = $stateParams.uid;
//     console.log($scope.drIdentifier);
//     $http.get('/auth/populateCalendar/'+$scope.drIdentifier).success(function(data) {
//       $scope.appointments = data;
//        console.log($scope.appointments);
//     });
//     return appointments;
//   }

//   factory.postAppointments = function(){

//   }

//   return factory;
// });
