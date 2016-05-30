import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '/imports/api/players.js';
import { Games } from '/imports/api/games.js';

import template from './games.html';

class GamesCtrl {
  constructor($scope, $state, $ionicPopup, $ionicListDelegate, gameScoreService) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$ionicPopup = $ionicPopup;
    this.gameScoreService = gameScoreService;
    this.$ionicListDelegate = $ionicListDelegate;

    this.helpers({
      isAdmin() {
        let user = Meteor.users.findOne({ _id: Meteor.userId() }, { fields: { profile: 1 } });
        if (user) {
          this.role = user.profile.role;
          if (this.role === 'admin') {
            return true;
          }
        }
        return false;
      },
      gamesList() {
        return Games.find(
          { endDate: { $exists: true } }, { limit: 5 , sort: { startDate: -1} }
        );
      },
      inprogress() {
        return Games.findOne(
          { endDate: { $exists: false } }
        );
      }
    });

  }

  scored(team) {
    this.gameScoreService.scored(team, this.inprogress);
  }

  trashGameInProgressModal() {
    if (this.inprogress) {
      let confirmPopup = this.$ionicPopup.confirm({
        title: 'Trash this game?',
        template: 'This will end this game. The scored goals will not result in any change in ELO standings.<br><b>Do you want to end this game?</b>'
      });

      confirmPopup.then((res) => {
        if (res) {
          Games.remove(this.inprogress._id);
        } else {
          return;
        }
      });
    } else {
      this.$state.go('tab.newgame');
    }
  }

  showNewGameModal() {
    this.$state.go('tab.newgame');
  }

  remove(game) {
      let confirmPopup = this.$ionicPopup.confirm({
        title: 'Delete this game?',
        template: 'You <i>can</i> delete this game but it will have no effect on the ELO standings in the leaderboard.<br>The only reason to play-and-delete a game is for cheating, which is not really fair.<br><b>Do you want to delete this game?</b>'
      });
      confirmPopup.then((res) => {
        if (res) {
          Games.remove(game._id);
          this.$ionicListDelegate.closeOptionButtons();
        } else {
          this.$ionicListDelegate.closeOptionButtons();
          return;
        }
      });
  }

}

export default angular.module('games', [
  angularMeteor
])
  .component('games', {
    templateUrl: 'imports/components/games/games.html',
    controller: ['$scope', '$state', '$ionicPopup', '$ionicListDelegate', 'gameScoreService', GamesCtrl]
  })
  .config(($stateProvider) => {
      $stateProvider.state('tab.games', {
      url: '/games',
      views: {
        'tab-games': {
          template: '<games></games>'
        }
      }
    })
  });
