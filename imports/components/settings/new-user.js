import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from '/imports/components/settings/new-user.html';

class NewUserCtrl {
  constructor($scope, $state, $ionicPopup, $ionicHistory) {
    $scope.viewModel(this);
    this.$state = $state;
    this.$ionicPopup = $ionicPopup;
    this.$ionicHistory = $ionicHistory;

    console.log('in new-user controller');
    this.credentials = {};
    
    this.helpers({
      players() {
        return Players.find({});
      }
    });
  }
  
  allReady() {
    if (this.credentials.username && this.credentials.email && this.credentials.password && this.profile.firstname && this.profile.lastname ) {
      return true;
    }
    return false;
  }
  
  newUser() {
    let that = this;
    try {
      Accounts.createUser({
        username: this.credentials.username,
        email : this.credentials.email,
        password : this.credentials.password,
        profile  : {
            //publicly visible fields like firstname goes here
            firstname: this.profile.firstname,
            lastname: this.profile.lastname
        }
      }, (error) => {
        if (error) {
          // :(
          console.log(error);
          return;
        }
        // that.hideNewUserModal();
        that.$state.go('tab.players');
      });

    } catch (e) {
        console.log('Hjalp!!');
        console.log(e);
    }
  }  
 
}

export default angular.module('newuser', [
  angularMeteor
])
  .component('newuser', {
    templateUrl: 'imports/components/settings/new-user.html',
    controller: ['$scope', '$state', '$ionicPopup', '$ionicHistory', NewUserCtrl],
    controllerAs: 'newuser'
  });