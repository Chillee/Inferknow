Template.TeamInfo.helpers({
    opr: function(field){
        var team = {};
        team["team_number"] = this.team_number;
        // console.log(Teams.findOne(team));   
        // console.log(Math.max(...Teams.findOne(team).OPR[field]));
        // return Math.max(...Teams.findOne(team).OPR[field]).toFixed(2);
        return Teams.findOne(team).OPR[field][0].toFixed(2);
    }

});