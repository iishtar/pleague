import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';

import template from './teams.html';

class TeamsCtrl {
  constructor($scope, $ionicNavBarDelegate) {
    $scope.viewModel(this);
    $ionicNavBarDelegate.title('Teams');
    
    console.log('in teams controller');

    this.helpers({
      data() {
        return Teams.find();
      }
    });

  }
}

export default angular.module('teams', [
  angularMeteor
])
  .component('teams', {
    templateUrl: 'imports/components/teams/teams.html',
    controller: ['$scope', '$ionicNavBarDelegate', TeamsCtrl],
    controllerAs: 'teams'
  });