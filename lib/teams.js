Teams = new Mongo.Collection('teams');

Teams.allow({
    insert: function(userId, doc) {
        //return !!userId; //checks if userId exists
        return true;
    },
    update: function(userId, doc, fields, modifier){
        return true;
    }
});


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("teams", function (sort_metric) {
    var sort_obj = {};
    sort_obj['OPR.'+sort_metric+'.0'] = -1
    console.log(sort_obj);
    return Teams.find({},{sort: sort_obj, limit: 200});
  });
}


Meteor.methods({
    getTeam: function(team_num){
        return Teams.findOne({team_number: team_num});
    }
})

