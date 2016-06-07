import angularMeteor from 'angular-meteor';

import { Players } from '/imports/api/players.js';
import { Teams } from '/imports/api/teams.js';
import { Games } from '/imports/api/games.js';

class PlayersService {
  constructor() {
  }
  
  eloInc(playerId, elo, game) {
    let newElo = Players.findOne({ _id: playerId },{elo:''}).elo + elo;  
    Players.update({ _id: playerId },
      {
        $inc : { elo: elo },
        $push : { 
          history : { 
            elo : newElo,
            game_id : game._id,
            when : new Date() //game.endDate not set yet?
          }
        }
      }
    );
  }
}

export default angular.module('playersservice', [
  angularMeteor
])
  .service('playersService', PlayersService);
  