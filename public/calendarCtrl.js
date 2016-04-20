angular
  .module('CalendarCtrl2',['mwl.calendar', 'ui.bootstrap','ngAnimate']) //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl', function(moment) {
      // .controller('KitchenSinkCtrl', function(moment,alert) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'week';
    vm.viewDate = new Date();
    vm.events = [
      {
        title: 'An event',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }
    ];

    // $http.get('/auth/populateCalendar/:uid').success(function(data) {
    //     console.log(data);
    //   if (data.username) {
    //     $rootScope.authenticated = true;
    //     $rootScope.current_user = data.username;
    //     console.log("successfully Logged In");
    //     $location.path('/');
    //   } else {
    //     $scope.error_message = data.message;
    //   }
    // });
    vm.isCellOpen = true;

    // vm.eventClicked = function(event) {
    //   alert.show('Clicked', event);
    // };

    // vm.eventEdited = function(event) {
    //   alert.show('Edited', event);
    // };

    // vm.eventDeleted = function(event) {
    //   alert.show('Deleted', event);
    // };

    // vm.eventTimesChanged = function(event) {
    //   alert.show('Dropped or resized', event);
    // };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

  });