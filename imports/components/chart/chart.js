import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

import template from './chart.html';


class ChartCtrl {
  constructor($scope, $state, $filter, $interval, $ionicPopup, $ionicHistory) {
  	$scope.viewModel(this);
  	$interval(this.drawCanvas,60*1000);
	$interval(this.drawCanvas,1000,1);
  }

  drawCanvas() {
    let players = Players.find().fetch();
    drawbg(ctx);
    for (var i=0;i<players.length;i++) {
      drawLine(ctx,[1500,players[i].elo],players[i].name,i);
    }
  }
}

export default angular.module('chart', [
  angularMeteor
])
  .component('chart', {
    templateUrl: 'imports/components/chart/chart.html',
    controller: ['$scope', '$state', '$filter', '$interval', '$ionicPopup', '$ionicHistory', ChartCtrl],
  })
  .config(($stateProvider) => {
      $stateProvider.state('tab.chart', {
      url: '/chart',
      views: {
        'tab-chart': {
          template: '<chart></chart>'
        }
      }
    })
  });
