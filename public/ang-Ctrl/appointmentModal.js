
  searchCtrl.factory('appointment', function($uibModal) {
    function show() {
      return $uibModal.open({
        templateUrl: 'calendarModal.html',
        controller: 'KitchenSinkCtrl'
      });
    }
    return {
      show: show
    };
  });
