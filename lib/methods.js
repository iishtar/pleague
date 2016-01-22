/* global Meteor, check */
Meteor.methods({
    newGame(newgame){
      console.log('Creating '+JSON.stringify(newgame));
      //Creating {
      //   "teamRed":{"_id":"Nuuv39vCgdZjFkKkL","players":["J4tfnCK5L8XrxNEFn","DoeZT7tNzcRYu6bXr"]},
      //   "teamBlue":{"_id":"peZZHdBorLJEs9Yyp","players":["F99TrvCpe7hS5LG8t","SPbxkKJn9qg2KQQZm"]}
      // }
      return Games.insert({
        teamRed: newgame.teamRed._id,
        teamBlue: newgame.teamBlue._id,
        teamRedScore: 0,
        teamBlueScore: 0,
        startDate: new Date()
      });

    },
    teamScored(score){
      Games.update(score.gameId, {
        $set: {
          teamRedScore: score.teamRedScore,
          teamBlueScore: score.teamBlueScore
        }
      });
    },
    teamWon(score){
      Games.update(score.gameId, {
        $set: {
          teamRedScore: score.teamRedScore,
          teamBlueScore: score.teamBlueScore,
          winner: score.winner,
          endDate: score.endDate
        }
      });
    },
    updatePlayer(){},
    newTeam(newteam){
      //newteam => {players: [this.playerOne._id, this.playerTwo._id]}
      let tr = Teams.findOne( { $and: [ { players: { $in: [newteam.players[0]] } }, { players: { $in: [newteam.players[1]] } } ] } );
      if (tr) {
        throw new Meteor.Error('team-already-exists', 'Team already exists.');
      }
      if (!tr) {
        let tr_id = Teams.insert(newteam);
        tr = Teams.findOne(tr_id);
        return tr;
      }      
    },
    newPlayer(newplayer){
        let testPlayerName = Players.findOne({ name : { $regex : new RegExp(newplayer.name, "i") } });
        if (testPlayerName) {
            throw new Meteor.Error('player-already-exists',
            'Player already exists');
        }
        
        check(newplayer.name, String);
        newplayer.elo = 1500;
        newplayer.joinDate = new Date();

        if (Meteor.userId() && newplayer.claim) {
            //logged in user creates new player
            console.log('Create player claimed by: ', Meteor.userId());
            newplayer.belongsTo = Meteor.userId();
        }

        Players.insert(newplayer);
    }
});
