Template.TeamSearch.helpers({
    teams: function(){
        var sort_obj = {};
        sort_obj['OPR.'+Session.get('sort_metric')+'.0'] = -1
        return Teams.find({}, {sort: sort_obj, limit: 50});
    },
    teamNum: function(){
        // console.log(this);
        return this.team_number;
    }
});

Template.TeamSearch.events({
    'click .sortable': function(event){
        console.log( $(event.target).attr('id'));
        Session.set('sort_metric', $(event.target).attr('id'));
        Session.set('rank', 0);
    }
})

Template.TeamInfo.onRendered(function(){
    var rank = 1;
    $('tr > td:nth-child(1)').each(function(idx, val){
        $(this).text(rank);
        rank++;
    });
})
Tracker.autorun(function(){
      var sort = Session.get('sort_metric');
      sort = 'total_score';
      Meteor.subscribe('teams', sort);
    });