/* global Teams, Players */
angular
  .module('PLeague')
  .filter('team', team);
 
function team () {
  return function (team_id) {
    if (!team_id) return;
    let ss = Teams.findOne({ _id: team_id });
    if (ss) {
        if (ss.name) {
            return ss.name;
        } else {
            return ss.players[0].name + ' and ' + ss.players[1].name;            
        }
    } else {
        return 'Team not found';
    }
  };
}