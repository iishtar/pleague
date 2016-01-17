/* global Games */
angular
  .module('PLeague')
  .controller('GamesCtrl', GamesCtrl);
 
function GamesCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
  console.log('in games controller');
  this.remove = remove;
  
  this.helpers({
    data() {
      return Games.find();
    }
  });

  function remove(game) {
      Games.remove(game._id);
  }
}