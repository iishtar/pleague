/* global Players, Teams */
angular
  .module('PLeague')
  .service('GameScore', GameScore);
 
function GameScore($rootScope, $ionicModal) {
  this.scored = scored;
  
  function scored(team, inprogress) {
    try {
      let gameScore = { gameId: inprogress._id, teamRedScore: inprogress.teamRedScore, teamBlueScore: inprogress.teamBlueScore };
      if (team === 'red') {
        console.log('red scored...');
        gameScore.teamRedScore = gameScore.teamRedScore + 1;
        gameScore.winner = inprogress.teamRed;
        gameScore.endDate = Date.now();
        if (gameScore.teamRedScore == 7) { //TODO: move this to a configurable constant
          Meteor.call('teamWon', gameScore, function(error){
            if (error) {
              console.log(error);
            }
          });
          console.log('red won!');
          return;
        }
      } else {
        console.log('blue scored...');
        gameScore.teamBlueScore = gameScore.teamBlueScore + 1;
        gameScore.winner = inprogress.teamBlue;
        gameScore.endDate = Date.now();
        if (gameScore.teamBlueScore == 7) { //TODO: move this to a configurable constant
          Meteor.call('teamWon', gameScore, function(error){
            if (error) {
              console.log(error);
            }
          });
          console.log('blue won!');
          return;
        }
      }
      Meteor.call('teamScored', gameScore, function(error){
        if (error) {
          console.log(error);
        }
      });

    } catch (e) {
      console.log('Hjalp!!');
      console.log(e);
    }
  }
  
  /**
   * This method will calculate the change in a player's
   * Elo rating after playing a single game against another player.
   * The value K is the maximum change in rating. 
   **/
  function calculateELORatingChange (elo1, elo2, k)
  {
    var percentage = 1 / ( 1 + Math.pow( 10, (elo2 - elo1) / 400 ) );

    return {
      win: Math.round( k * ( 1 - percentage ) ),
      draw: Math.round( k * ( .5 - percentage ) ),
      loss: Math.round( k * ( 0 - percentage ) ),
      percent:  Math.round( percentage * 100 )
    };
  }

}