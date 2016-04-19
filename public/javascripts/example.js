  var CalendarCtrl2 = angular.module('CalendarCtrl2', ['mwl.calendar','ui.bootstrap','ngAnimate']);

  CalendarCtrl2.controller('KitchenSinkCtrl',['$scope','moment', '$stateParams','$http','alert',function($scope,moment,$stateParams,$http,alert) {
    $scope.isCollapsed = true;
    $scope.reset = function() {
        $scope.user = {};
        $scope.user.email="";
        $scope.isCollapsed = true;;
    };
    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
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
    };
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

    vm.isCellOpen = true;

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
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
