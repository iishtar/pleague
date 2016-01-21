/* global Meteor, Teams */
Meteor.publish('games', function () {
  return Games.find({});
});
Meteor.publish('players', function () {
  return Players.find({});
});
Meteor.publish('teams', function () {
  return Teams.find({});
});
// Meteor.publish('users', function () {
//   return Meteor.users.find({}, { fields: { profile: 1 } });
// });
// Meteor.publishComposite('teams', function () {
//   return {
//     find() {
//       return Teams.find({});
//     },
//     children: [
//       {
//         find(team) {
//           return [
//             Players.findOne({ _id: team.players[0]._id }),
//             Players.findOne({ _id: team.players[1]._id })
//           ];
//         }
//       },
//       {
//         find(chat) {
//           let query = { _id: { $in: chat.userIds } };
//           let options = { fields: { profile: 1 } };
 
//           return Meteor.users.find(query, options);
//         }
//       }
//     ]
//   };

// });
