Template.Leaderboard.helpers({
    isTeam: function(){
        return Session.get('filter_type')=='team';
    },
    teamNum: function(){
        return Session.get('filter_val');
    },
    opr: function(field, team_number){
        Meteor.call('getTeam', team_number, function(err, result){
            if (result){
                console.log(result);
                var res = result.OPR[field+'_max'];
                if (res > 1 && (field=='hang' || field=='all_clear')){
                    res = 1;
                }
                console.log(field);
                if (field=='hang' || field=='all_clear'){
                    res *= 100;
                } 
                Session.set('team_obj_'+field, res.toFixed(2));
                // console.log(res);
            }
        });
        return Session.get('team_obj_'+field);
    },
    ranking: function(field, team_number){
        Meteor.call('getRanking', team_number, field, function(err, result){
            if (result){
                console.log(result);
                Session.set('team_ranking', result);
            }
        });
        return Session.get('team_ranking');
    }

});

Template.Leaderboard.events({
    'change .onoffswitch': function(event){
        // if ($(event.target))
    },
    'click .sortable_heading a': function(event){
        var sort_order = {};
        sort_order[$(event.target).closest('th').attr('id')] = -1;
        console.log(sort_order);
        Pages.set({
            sort: sort_order
        });
    },
    'click .filterable a': function(event){
        var filter_object = {}
        var heading = $(event.target).closest('table').find('th').eq($(event.target).closest('td').index());
        var th = heading.attr('id');
        console.log(th);
        if (th=='red_1' || th=='red_2' || th=='red_3' || th=='blue_1' || th=='blue_2' ||th=='blue_3'){
            var team = $.trim($(event.target).text());
            filter_object['$or'] = [{'red_1': team}, {'red_2': team}, {'red_3': team}, {'blue_1': team}, {'blue_2': team}, {'blue_3': team}];
            // console.log(filter_object);
            $('#cur_filter').text("Team: "+$(event.target).text());
            Session.set("filter_type", "team");
            Session.set('filter_val', team);
        } else{ 
            filter_object[th] = $.trim($(event.target).text());
            $('#cur_filter').text(heading.text()+': '+$(event.target).text());
            Session.set("filter_type", th);
            Session.set("filter_val", $.trim($(event.target).text()));
        }
        Pages.set({
            filters: filter_object
        });
        Session.set('filter_object', filter_object);
    },
    'click #reset_filters': function(){
        Pages.set({
            filters: {}
        });
        Session.set("filter_type", '');
        Session.set("filter_val", '');
        Session.set("filter_object", {});
        $('#search').val('');
        $('#cur_filter').text('');
    },
    'change #search': function(event){
        var res = $(event.target).val();
        if (res != ''){
            filter_object = {};
            var team = $.trim($('#search').val());
            filter_object['$or'] = [{'red_1': team}, {'red_2': team}, {'red_3': team}, {'blue_1': team}, {'blue_2': team}, {'blue_3': team}];
            console.log(filter_object);
            $('#cur_filter').text("Team: "+$(event.target).text());
            Session.set("filter_type", "team");
            Session.set('filter_val', team);
            Pages.set({
                filters: filter_object
            });
        }
    },
    'change #region_selector': function(event){
        // console.log(event.target.val()) q;
        west = ['California', 'Washington', 'Montana', 'Nevada', 'Wyoming', 'Alaska', 'Utah', 'Idaho', 'Arizona', 'Colorado', 'Oregon', 'New Mexico'];
        east = ['Connecticut','Delaware','Maryland','Massachusetts','Massachusettes','New Jersey','New York','New York','New York','Pennsylvania','Rhode Island','Vermont','Virginia']
        north = ['Michigan', 'North Dakota', 'Wisconsin', 'Ohio', 'Iowa', 'Illinois', 'Minnesota', 'Missouri', 'Nebraska', 'West Virginia', 'Indiana'];
        south = ['Louisiana','Mississippi','Florida','Georgia','Alabama','Kentucky','South Carolina','North Carolina','Alabama','Arkansas','Texas','Texas San Antonio','Oklahoma'];
        filter_obj = {};
        if ($(event.target).val()=='all'){
            Pages.set({
                filters: filter_obj
            });
        }
        or_arr = [];
        if ($(event.target).val()=='west'){
            west.forEach(function(obj){
                or_arr.push({'region': obj});
            });
        } else if ($(event.target).val()=='east'){
            east.forEach(function(obj){
                or_arr.push({'region': obj});
            })
        } else if($(event.target).val()=='north'){
            north.forEach(function(obj){
                or_arr.push({'region': obj});
            });
        } else if($(event.target).val()=='south'){
            south.forEach(function(obj){
                or_arr.push({'region': obj});
            })
        } 
        console.log($(event.target).val());
        if ($(event.target).val()=='none'){
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
        } else {
            filter_obj['$or'] = or_arr;
        }

        Session.set("filter_type", '');
        Session.set("filter_val", '');
        Session.set("filter_object", {});
        $('#search').val('');
        $('#cur_filter').text('');
        
        Pages.set({
            filters: filter_obj
        });
    },
    'click .perPage': function(event){
        Pages.set({perPage: parseInt($(event.target).text())});
        $('.perPage').css('color', '#337ab7');
        $(event.target).css('color', 'black');
        
    }
});



