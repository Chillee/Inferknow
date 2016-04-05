Template.TeamSearch.helpers({
    teams: function(){
        var sort_obj = {};
        sort_obj['OPR.'+Session.get('sort_metric')+'_max'] = -1;
        west = ['West','California', 'Washington', 'Montana', 'Nevada', 'Wyoming', 'Alaska', 'Utah', 'Idaho', 'Arizona', 'Colorado', 'Oregon', 'New Mexico'];
        east = ['East','Connecticut','Delaware','Maryland','Massachusetts','Massachusettes','New Jersey','New York','New York','New York','Pennsylvania','Rhode Island','Vermont','Virginia']
        north = ['North','Michigan', 'North Dakota', 'Wisconsin', 'Ohio', 'Iowa', 'Illinois', 'Minnesota', 'Missouri', 'Nebraska', 'West Virginia', 'Indiana'];
        south = ['South','Louisiana','Mississippi','Florida','Georgia','Alabama','Kentucky','South Carolina','North Carolina','Alabama','Arkansas','Texas','Texas San Antonio','Oklahoma'];
        worlds = ["535","2997","3141","3415","3486","3491","3537","3595","3658","3664","3781","4029","4082","4130","4143","4290","4318","4444","4717","4855","4924","4997","5009","5070","5110","5169","5202","5220","5229","5380","5385","5795","5890","5899","5916","5942","5943","5975","6022","6047","6051","6055","6081","6109","6123","6134","6137","6209","6220","6299","6377","6389","6451","6899","6913","6981","7013","7117","7149","7152","7172","7209","7242","7300","7314","7350","7351","7393","7477","7486","7550","7591","7655","8189","8221","8327","8372","8375","8466","8471","8390","8528","8606","8620","8644","8660","8668","8681","8686","8907","8913","8995","9048","9205","9662","9789","9794","9804","9851","9945","10030","10060","10165","10392","10479","11040","11041","11042","11043","11044","11047","11048","11051","11053","11050","11052"]
        filter_obj = {};
        or_arr = [];
        var region = Session.get('region_selector')
        if (region=='west'){
            west.forEach(function(obj){
                or_arr.push({'region': obj});
            });
        } else if (region=='east'){
            east.forEach(function(obj){
                or_arr.push({'region': obj});
            })
        } else if(region=='north'){
            north.forEach(function(obj){
                or_arr.push({'region': obj});
            });
        } else if(region=='south'){
            south.forEach(function(obj){
                or_arr.push({'region': obj});
            })
        } else if (region=='worlds'){
            worlds.forEach(function(obj){
                or_arr.push({'team_number': obj});
            })
        }
        console.log(region);
        if (region=='none'){
            west.forEach(function(obj){
                or_arr.push({'region': obj});
            });
            east.forEach(function(obj){
                or_arr.push({'region': obj});
            })
            north.forEach(function(obj){
                or_arr.push({'region': obj});
            });
            south.forEach(function(obj){
                or_arr.push({'region': obj});
            })
            filter_obj['$nor'] = or_arr;
            console.log(filter_obj);
        } else if (region=='all'){
            return Teams.find({}, {limit: 100, sort: sort_obj});
        } else {
            filter_obj['$or'] = or_arr;
        }
        
        if (filter_obj['$or'] && filter_obj['$or'].length == 0){
            filter_obj = {};
        }
        return Teams.find(filter_obj, {limit: 100, sort: sort_obj});
    },
    teamNum: function(){
        // console.log(this);
        return this.team_number;
    },
    isWorlds: function(){
        return Session.get('region_selector')=='worlds';
    }
});

Template.TeamSearch.events({
    'click .sortable': function(event){
        console.log( $(event.target).attr('id'));
        Session.set('sort_metric', $(event.target).attr('id'));
        Session.set('rank', 0);
    },
    'change #region_selector': function(event){
        // console.log(event.target.val()) q;
        Session.set('region_selector', $(event.target).val());     
    },
})

Template.TeamSearch.onRendered(function(){
    console.log('bruh');
    Session.set('sort_metric', 'total_score');
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