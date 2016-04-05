var autoScore = function(team, obj){
        var auto_place = function(x){
            var place_map = {
                0: 0,
                1: 5,
                2: 5,
                3: 5,
                4: 10,
                5: 20,
                6: 40
            };
            return place_map[x];
        };
        var rescue = function(x){return x*20}; 
        var climber = function(x){return x*20};

        var score_map = {
            'auto_place_1': auto_place,
            'auto_place_2': auto_place,
            'auto_rescue': rescue,
            'auto_climber': climber
        }
        var score = 0;
        for (var prop in score_map){
            score += score_map[prop](parseInt(obj[team+'_'+prop]));
        }
        return score;
    };
// var teleScore = 
var teleScore = function(team, obj){
        var tele_place = function(x){
            var place_map = {
                0: 0,
                1: 0,
                2: 0,
                3: 5,
                4: 10,
                5: 20,
                6: 40
            };
            return place_map[x];
        };
        var floor = function(x){return x};
        var high = function(x){return x*15};
        var low = function(x){return x*5};
        var mid = function(x){return x*10};
        var climbers = function(x){return x*10};
        var zipline = function(x){return x*20};
        var allclear = function(x){return x*20};
        var hang = function(x){return x*80};

        var score_map = {
            'tele_place_1': tele_place,
            'tele_place_2': tele_place,
            'tele_floor': floor,
            'tele_high': high,
            'tele_low': low,
            'tele_mid': mid,
            'tele_climber': climbers,
            'tele_zip': zipline,
            'end_allclear': allclear,
            'end_hang': hang
        }
        var score = 0;
        for (var prop in score_map){
            score += score_map[prop](parseInt(obj[team+'_'+prop]));
        }
        score-= obj[team+'_auto_climber']*10;
        return score;
    };

var totalScore = function(team, obj){
    return teleScore(team,obj)+autoScore(team, obj);
}
var totalScoreWithPenalties = function(team, obj){
    return teleScore(team,obj)+autoScore(team, obj) + parseInt(obj[team+'_minor_award'])*10 + parseInt(obj[team+'_major_award'])*50;
}

var alreadyParsed = false;

var completeProcess = function(results){
        if (alreadyParsed) return;
        // console.log(results.data);
        for(var i = results.data.length - 1; i >= 0; i--) {
              var cur = results.data[i];
              // console.log(results.data[i]);
              var res = {};
              var map = {
                'date':'Date',
                'event_name':'Event Name',
                'region':'Event Region',
                'event_type':'Event Type',
                'division':'Division',
                'match_type':'Match Type',
                'match_number':'Match Number',
                'red_1':'Red 1',
                'red_2':'Red 2',
                'red_3':'Red 3',
                'blue_1':'Blue 1',
                'blue_2':'Blue 2',
                'blue_3':'Blue 3',
                'red_auto_place_1':'Red Autonomous Period; Robot 1 Placement',
                'red_auto_place_2':'Red Autonomous Period, Robot 2 Placement',
                'red_auto_rescue':'Red Autonomous Period, Rescue Beacons',
                'red_auto_climber':'Red Autonomous Period, Climbers in Shelter',
                'red_tele_place_1':'Red Driver Controlled; Robot 1 Placement',
                'red_tele_place_2':'Red Driver Controlled; Robot 2 Placement',
                'red_tele_floor':'Red Driver Controlled; Floor Goal',
                'red_tele_high':'Red Driver Controlled; High Goal',
                'red_tele_low':'Red Driver Controlled; Low Goal',
                'red_tele_mid':'Red Driver Controlled; Mid Goal',
                'red_tele_climber':'Red Driver Controlled; Climbers in Shelter',
                'red_tele_zip':'Red Driver Controlled; Zip Line',
                'red_end_allclear':'Red End Game; All Clear Signal',
                'red_end_hang':'Red End Game; Robot on Pull Up Bar',
                'red_minor_incur':'Red Minor Penalty Incurred',
                'red_major_incur':'Red Major Penalty Incurred',
                'red_minor_award':'Red Minor Penalty Awarded',
                'red_major_award':'Red Major Penalty Awarded',
                'blue_auto_place_1':'Blue Autonomous Period; Robot 1 Placement',
                'blue_auto_place_2':'Blue Autonomous Period, Robot 2 Placement',
                'blue_auto_rescue':'Blue Autonomous Period, Rescue Beacons',
                'blue_auto_climber':'Blue Autonomous Period, Climbers in Shelter',
                'blue_tele_place_1':'Blue Driver Controlled; Robot 1 Placement',
                'blue_tele_place_2':'Blue Driver Controlled; Robot 2 Placement',
                'blue_tele_floor':'Blue Driver Controlled; Floor Goal',
                'blue_tele_high':'Blue Driver Controlled; High Goal',
                'blue_tele_low':'Blue Driver Controlled; Low Goal',
                'blue_tele_mid':'Blue Driver Controlled; Mid Goal',
                'blue_tele_climber':'Blue Driver Controlled; Climbers in Shelter',
                'blue_tele_zip':'Blue Driver Controlled; Zip Line',
                'blue_end_allclear':'Blue End Game; All Clear Signal',
                'blue_end_hang':'Blue End Game; Robot on Pull Up Bar',
                'blue_minor_incur':'Blue Minor Penalty Incurred',
                'blue_major_incur':'Blue Major Penalty Incurred',
                'blue_minor_award':'Blue Minor Penalty Awarded',
                'blue_major_award':'Blue Major Penalty Awarded'
              }
              for (var prop in map){
                res[prop] = cur[map[prop]];
                if (typeof res[prop]=='string'){
                    res[prop] = res[prop].trim();
                }
              }
              var west = ['California', 'Washington', 'Montana', 'Nevada', 'Wyoming', 'Alaska', 'Utah', 'Idaho', 'Arizona', 'Colorado', 'Oregon', 'New Mexico'];
              var supers = ['West', 'North', 'South', 'East'];
              if (west.indexOf(res['region'])==-1 && supers.indexOf(res['region'])==-1){
                continue;
              }

              res['blue_tele_score'] = teleScore('blue', res);
              res['red_tele_score'] = teleScore('red', res);
              res['blue_auto_score'] = autoScore('blue', res);
              res['red_auto_score'] = autoScore('red', res);
              res['blue_total_score'] = totalScore('blue', res);
              res['red_total_score'] = totalScore('red', res);
              res['blue_total_score_with_penalties'] = totalScoreWithPenalties('blue', res);
              res['red_total_score_with_penalties'] = totalScoreWithPenalties('red', res);
              res['max_score'] = Math.max(res.blue_total_score, res.red_total_score);
              res['max_score_with_penalties'] = Math.max(res.blue_total_score_with_penalties, res.red_total_score_with_penalties);
              res['red_cubes_scored'] = parseInt(res['red_tele_high']) + parseInt(res['red_tele_mid']) + parseInt(res['red_tele_low']);
              res['blue_cubes_scored'] = parseInt(res['blue_tele_high']) + parseInt(res['blue_tele_mid']) + parseInt(res['blue_tele_low']);

              if (res['date']=='' && res['red_1']==undefined){
                continue;
              }
              var temp = res['date'].split('/');
              // console.log(res);
              if (temp[0].length == 1) temp[0] = '0'+temp[0];
              if (temp[1].length == 1) temp[1] = '0'+temp[1];
              temp[2] = temp[2].substr(2,4);
              res['date'] = temp.join('/');
              // console.log(res);
              // delete cur['Event Name'];
              // console.log(cur['Event_Name']);
              if(res['red_total_score'] && res['blue_total_score'] ){
                Results.insert(res);
              }
          };
          alreadyParsed = true;
          console.log("finished");
        }

var OPR = function(match, red_metric, blue_metric, stored_metric){
    var opr_arr = Results.find({event_name: match}).fetch();
    // console.log(opr_arr);   
    var team_list = new Map();
    var team_pos = {};
    var cnt = 0;
    for (var i = opr_arr.length - 1; i >= 0; i--) {
        var red_1 = opr_arr[i].red_1;
        var red_2 = opr_arr[i].red_2;
        var red_3 = opr_arr[i].red_3;
        var blue_1 = opr_arr[i].blue_1;
        var blue_2 = opr_arr[i].blue_2;
        var blue_3 = opr_arr[i].blue_3;
        var red_total_score = parseInt(opr_arr[i][red_metric]);
        var blue_total_score = parseInt(opr_arr[i][blue_metric]);
        // var red_total_score = parseInt(opr_arr[i].red_end_hang);
        // var blue_total_score = parseInt(opr_arr[i].blue_end_hang);
        if (red_3 != 0 || blue_3!=0){
            continue;
        }

        if (team_list.has(red_1)!== true) {team_list.set(red_1, [[],0]); team_pos[red_1] = cnt; cnt++};
        if (team_list.has(red_2)!== true) {team_list.set(red_2, [[],0]); team_pos[red_2] = cnt; cnt++};
        if (team_list.has(blue_1)!== true) {team_list.set(blue_1, [[],0]); team_pos[blue_1] = cnt; cnt++};
        if (team_list.has(blue_2)!== true) {team_list.set(blue_2, [[],0]); team_pos[blue_2] = cnt; cnt++};

        team_list.get(red_1)[0].push(red_1, red_2);
        team_list.get(red_2)[0].push(red_1, red_2);
        team_list.get(blue_1)[0].push(blue_1, blue_2);
        team_list.get(blue_2)[0].push(blue_1, blue_2);
        // }

        team_list.get(red_1)[1]+= red_total_score;
        team_list.get(red_2)[1]+= red_total_score;
            // console.log(red_1, team_list.get(red_1)[1], red_total_score);

        team_list.get(blue_1)[1]+= blue_total_score;
        team_list.get(blue_2)[1]+= blue_total_score;
    };
   
    // console.log(team_list.get('8375'));
    // console.log(team_list.get('7591'));
    // console.log(team_list.length);
    if (team_list.length == 0){
        return;
    }
    var opr_matrix = new Array(team_list.size);
    for (var i = team_list.size - 1; i >= 0; i--) {
        opr_matrix[i] = [0];
        for (var j = team_list.size-1; j >= 1; j--) {
            opr_matrix[i].push(0);
        };
    };
    var solve_vector = [];
    team_list.forEach(function(value, key){
        value[0].forEach(function(obj){
            opr_matrix[team_pos[key]][team_pos[obj]]++;
        })
       solve_vector.push(value[1]);
    });
    // console.log(opr_matrix, solve_vector);
    if (opr_matrix == undefined || opr_matrix[0] == undefined || opr_matrix.length != opr_matrix[0].length){
        return;
    }
    if (opr_arr[0].event_name =='Canada Championship'){
        console.log(opr_matrix, solve_vector);
    }
    var x = math.lusolve(opr_matrix, solve_vector);
    var results = [];
    for (var idx in team_pos){
        // console.log(idx, x[team_pos[idx]]);
        results.push([x[team_pos[idx]], idx]);
        // console.log(opr_matrix[team_pos[idx]]);
    }
    // results = results.sort();
    // console.log(results[1]);
        function mode(arr){
        return arr.sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    } 
    // team_list.forEach(function(value, key){
    //     // console.log(value)
    //     var store = {};
    //     store['OPR.'+stored_metric] = value[1]/(value[0].length/2);
    //     Teams.update(
    //         {team_number: mode(value[0])}, 
    //         {"$push": store}
    //     );

    //    // solve_vector.push(value[1]);
    // });
    for (var i in results){
        var store = {};
        store['OPR.'+stored_metric] = results[i][0][0];
        Teams.update(
            {team_number: results[i][1]}, 
            {"$push": store}
        );
    }
}


Meteor.startup(function () {
    Results.remove({});
    Teams.remove({});
    // var filePath = process.env.PWD + "/private/results.csv";
    // var file = 
    // console.log(filePath);
    // console.log(Assets.getText("results.csv"));
    // console.log(alreadyParsed);
    // var file = Assets.getText("results.csv");
    // console.log(math.sqrt(-4));
    // Results._ensureIndex({red_total_score: -1});
    // Results._ensureIndex({event_name: 1});
    Results._ensureIndex({max_score: -1});
    Teams._ensureIndex({team_number: 1});
    Teams._ensureIndex({'OPR.total_score': 1});
    console.log("start");

    Baby.parse(Assets.getText("results.csv"), {
      header: true,
      complete: completeProcess
    });
    alreadyParsed = false;
    Baby.parse(Assets.getText("ohio.csv"), {
        header: true,
        complete: completeProcess
    });
    // console.log('bruh');
    var team_arr = Results.find({}, {fields: {red_1: 1, red_2:1}}).fetch();
    var temp_team_arr = [];
    for (var i in team_arr){
        temp_team_arr.push(team_arr[i].red_1, team_arr[i].red_2);
    }
    var all_team_list = new Set(temp_team_arr);
    all_team_list.forEach(function(obj){
        // console.log(obj);
        var team_region = Results.findOne({'region': 'East', '$or': [{red_1: obj},{red_2: obj}]});
        if (!team_region) team_region = Results.findOne({'region': 'North', '$or': [{red_1: obj},{red_2: obj}]});
        if (!team_region) team_region = Results.findOne({'region': 'South', '$or': [{red_1: obj},{red_2: obj}]});
        if (!team_region) team_region = Results.findOne({'$or': [{red_1: obj},{red_2: obj}]});
        var west = ['California', 'Washington', 'Montana', 'Nevada', 'Wyoming', 'Alaska', 'Utah', 'Idaho', 'Arizona', 'Colorado', 'Oregon', 'New Mexico'];
        var supers = ['West', 'North', 'South', 'East'];
        if (west.indexOf(team_region.region)==-1 && supers.indexOf(team_region.region)==-1){
            return;
        }
        console.log(team_region.region);
        Teams.insert({team_number: obj, OPR: {total_score: []}, region: team_region.region});
    })

    var match_arr = Results.find({}, {fields: {event_name: 1, date: 1}}).fetch();

    match_arr.sort(function(a, b){
        // console.log(a);
        var aa = a.date.split('/');
        // console.log(aa);
        aa = [].concat(aa[2]+aa[0]+aa[1]).join();
        bb = b.date.split('/');
        bb = [].concat(bb[2]+bb[0]+bb[1]).join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
    });
    for (var i in match_arr){
        console.log(match_arr[i].date);
    }

    var temp_match_arr = [];
    for (var i in match_arr){
        temp_match_arr.unshift(match_arr[i].event_name);
    }
    var match_list = new Set(temp_match_arr);
    // for (var i=0; i<match_list.values().length; i++){
    //     console.log(match_list[i])
    // }
    // console.log(match_arr);

    // console.log(match_list);
    for (var i=0; i<Array.from(match_list).length; i++){
        console.log(Array.from(match_list)[i]);
        var match_array =  Array.from(match_list)[i];
        OPR(match_array, 'red_total_score', 'blue_total_score', 'total_score');
        OPR(match_array, 'red_end_hang', 'blue_end_hang', 'hang');
        OPR(match_array, 'red_tele_high', 'blue_tele_high', 'high_goal');
        OPR(match_array, 'red_tele_mid', 'blue_tele_mid', 'mid_goal');
        OPR(match_array, 'red_tele_low', 'blue_tele_low', 'low_goal');
        OPR(match_array, 'red_tele_zip', 'blue_tele_zip', 'zipline');
        OPR(match_array, 'red_auto_score', 'blue_auto_score', 'auto');
        OPR(match_array, 'red_end_allclear', 'blue_end_allclear', 'all_clear');
        OPR(match_array, 'red_cubes_scored', 'blue_cubes_scored', 'cubes_scored');
        // hangOPR(match_array);
    }
    all_team_list.forEach(function(obj){
        // console.log(obj);
        var team = Teams.findOne({team_number: obj});
        var OPR = team.OPR;
        var OPR_with_max = {};
        var max_opr = Math.max.apply(Math, OPR.total_score);
        var idx_max = OPR.total_score.indexOf(max_opr);

        for (var i in OPR){
            if (team.region == 'West' || team.region == 'North' || team.region == 'East' || team.region == 'South'){
                // console.log(team.team_number);
                OPR_with_max['OPR.'+i+'_max'] = OPR[i][0];
            } else{
                OPR_with_max['OPR.'+i+'_max'] = OPR[i][idx_max];
            }
        }
        Teams.update({team_number: obj}, {'$set': OPR_with_max});
    });
});

