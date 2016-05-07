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
  Meteor.publish("teams", function (sort_metric) {
    var sort_obj = {};
    sort_obj['OPR.'+sort_metric+'.0'] = -1
    console.log(sort_obj);
    return Teams.find({},{sort: {'OPR.total_score.0': -1}, limit: 289});
  });   
}


Meteor.methods({
    getTeam: function(team_num){
        return Teams.findOne({team_number: team_num});
    },
    getRanking: function(team_num, field){
        var search = {};
        search['OPR.'+field+'.0'] = {$gt: Teams.findOne({team_number: team_num}).OPR[field][0]};
        return Teams.find(search).count();
    }
})

