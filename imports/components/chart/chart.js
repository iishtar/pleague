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
   
    var now = new Date();
    var start = new Date(now);
    start.setDate(start.getDate()-4);
    start.setHours(0,0,0,0);
        
    for (var i=0;i<players.length;i++) {
      if (!players[i].history)
        players[i].history = [];
      players[i].history.push({when:now,elo:players[i].elo});
      players[i].history.push({when:players[i].joinDate,elo:1500});
    }
    drawbg(ctx,start);
    
    for (var i=0;i<players.length;i++) {
      scatterData = players[i].history.map((o) => {
        if (o.elo && o.when)
          return {y : o.elo , x : o.when.getTime()};
        }
      );
      scatterData = scatterData.filter(o => o);
      drawLine(ctx,scatterData,players[i].name,i);
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
