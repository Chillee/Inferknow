var team_names = ['Nanogurus','Tobor','Beauty Bot and the Beasts','Bears by Cedros','Lancers','Techno Warriors Advanced','FIX IT','The MechaHampsters','Schrödinger\'s Hat','The BOSONS','Girls With Attitude','Westlake Pi-Rho Maniacs','2 Bits and a Byte','RoboSpartans','Robotica Santi  Italy','Hood River Occam\'s Razor','LASA High PHidelity','Green Machine Reloaded','RoboCats','Mechromancers','Batteries In Black','Tuxedo Pandas','Masquerade','Helios','N.U.T.S.','Wingus & Dingus Robotics','Watt\'s Up?','Zip TIE Fighters','RoboKnights','Dragons','Electro Medics RED','Enigma Riddlers','Back To The Drawing Board','e-lemon-ators','Six Bits & a Byte','BoBots','Team Torch','Erector Sets Gone Mad','CYBOTS','TBD - To Be Determined','Twisted Axles','Quantum Mechanics','GearTicks','i²r robotics','Punabots','Mechanical Marauders','Black Frogs','RoBowties','ViperBots Venom','Centripetal','ViperBots QuadX','The Other Guys','The Lazybotts','Tarpon Robotics','Blue Bots','LARES   South Korea','Hortonville Robotics','Hot Wired Robotics','The Blockheads','EHTPAL ENFORCERS','Robot Squad','Technical Difficulties','Tech Hogs Robotics','RoboCats Delta Team','Guzzoline Robotics','Sab-BOT-age','Watt\'s NXT?','Dynamic Signals','electron Volts','Super 7','Suffern\'s Team Erebor','Fig Newtons','Voltage of Imagination','The Q is Silqent','Warren County 4H Robotics','Cubix³','Spartans','Trial N\' Terror (TNT)','Vulcan Robotics','The Fellowship of the Robot','The Ducks','Nerd Herd','Rhyme Know Reason','RSF Intergalactic Dragons','Wormgear Warriors','The Brainstormers','Charging Champions','Error 404: Team Name Not Found','A Few Loose Screws','Height Differential','Blue Box Bots','Brainy Bots','Mogollon Rim Jaegers','Philobots','Iron Maidens','Misgav','TOXIC','Wizards.exe','Bomb Squad','C4','Robo Thunder','7 Sigma','Klamath Coyotes','Apex Preditors','The Rolling Drones','Talon Industries','Return of the Screws','Falcontech Robotics','MalFunction','The League of Relatively Ordinary Gentlemen','PML30-Y','Screw it','Shockwave','Pattern','FIFTH ORDER','Elite Engineers','Translate Server Error', 'Aperture Science']
var team_numbers = ["4347", "535","2997","3141","3415","3486","3491","3537","3595","3658","3664","3781","4029","4082","4130","4143","4290","4318","4444","4717","4855","4924","4997","5009","5070","5110","5169","5202","5220","5229","5380","5385","5795","5890","5899","5916","5942","5943","5975","6022","6047","6051","6055","6081","6109","6123","6134","6137","6209","6220","6299","6377","6389","6451","6899","6913","6981","7013","7117","7149","7152","7172","7209","7242","7300","7314","7350","7351","7393","7477","7486","7550","7591","7655","8189","8221","8327","8372","8375","8466","8471","8390","8528","8606","8620","8644","8660","8668","8681","8686","8907","8913","8995","9048","9205","9662","9789","9794","9804","9851","9915","10030","10060","10165","10392","10479","11040","11041","11042","11043","11044","11047","11048","11051","11053","11050","11052", "5064"]
var edison = ['2997','3415','3486','3537','3781','4029','4082','4143','4290','4347','4924','4997','5110','5202','5220','5385','5795','5916','5975','6022','6047','6109','6137','6220','6299','6389','6451','6981','7172','7209','7242','7350','7351','7477','7486','7591','7655','8221','8390','8466','8606','8644','8660','8668','8681','8686','8907','8913','9789','9851','10060','10165','10183','10889','11040','11042','11044','11048','11050','11051','11052','11057','11058','11059']
var franklin = ['535','3141','3491','3595','3658','3664','4130','4318','4444','4717','4855','5009','5064','5070','5169','5229','5380','5843','5890','5899','5942','5943','6051','6055','6081','6123','6134','6209','6377','6899','6913','7013','7117','7149','7152','7300','7314','7393','7550','8189','8327','8372','8375','8471','8528','8620','8995','9048','9205','9662','9794','9804','9915','10030','10479','11041','11043','11047','11053','11056','11061','11064','11071','11080']

Template.TeamInfo.helpers({
    opr: function(field){
        var team = {};
        team["team_number"] = this.team_number;
        // console.log(Teams.findOne(team));   
        // console.log(Math.max(...Teams.findOne(team).OPR[field]));
        // return Math.max(...Teams.findOne(team).OPR[field]).toFixed(2);
        var res = this[Session.get('metric_type')][field+'_max'];
        if (res > 1 && (field=='hang' || field=='all_clear')){
            res = 1;
        }
        if (field=='hang' || field=='all_clear'){
            res *= 100;
        }
        return res.toFixed(2);
    },
    getDivision: function(){
        if (edison.indexOf(this.team_number) != -1){
             return "team edison";
        } else if(franklin.indexOf(this.team_number) != -1){
            return "team franklin";
        } else {
            return "team";
        }
       
    },
    getTeamURL: function(){
        return "<a href='http://www.inferknow.org/teams/"+this.team_number+"'> "+this.team_number+"</a>";
    },
    isWorlds: function(){
        return Session.get('region_selector')=='worlds';
    },
    team_name: function(){
        return team_names[team_numbers.indexOf(this.team_number)];
    },
    showGraphs: function(){
        if (Session.get('filter_type')=='team' && Session.get('filter_val')==this.team_number){
            Template.instance().showGraphs.set(true); 
        }
        return Template.instance().showGraphs.get();
    },
    chartId: function(field){
        return this.team_number+'_'+field;
    },
    teamChart: function(field, min, max){
        var data = this.data[field];
        //get any percentile from an array
        function getPercentile(percentile) {
            data.sort(function(a, b){return a-b});
            var index = (percentile/100) * data.length;
            var result;
            if (Math.floor(index) == index) {
                 result = (data[(index-1)] + data[index])/2;
            }
            else {
                result = data[Math.floor(index)];
            }
            return result;
        }
        var boxValues = {}
        boxValues.low    = Math.min.apply(Math,data);
        boxValues.q1     = getPercentile(25);
        boxValues.median = getPercentile(50);
        boxValues.q3     = getPercentile(75);
        boxValues.high   = Math.max.apply(Math,data);

        for (var i = data.length - 1; i >= 0; i--) {
            data[i] = [0,data[i]];
        };
        for (var i = data.length - 2; i >= 0; i--) {
            if (data[i][1] == data[i+1][1]){
                data[i][0] = data[i+1][0]*-1;
                if (i==data.length-2) continue;
                if (data[i][0] == 0){
                    data[i][0] += .1;
                }
                if (data[i][1] == data[i+2][1] && data[i][0] == data[i+2][0]){
                    data[i][0] += (data[i][0]/Math.abs(data[i][0]))*.1;
                }
            }
        };
        return {  
              chart: {
                width: 100
              },
              title: "bruh",
              spacing: [0,0,0,0],
              yAxis: {
                min: min,
                max: max,
                labels: {
                    reserveSpace: false,
                    x: 0,
                    enabled: true
                },
                title: {
                    text: null
                }, 
                allowDecimals: false
              },
              xAxis: {
                min: 0,
                max: 0,
                labels: {
                    enabled: false
                }
              },
              series: [{
                type: 'boxplot',
                data: [boxValues],
                showInLegend: false
              },
              {
                type: 'scatter',
                data: data,
                marker: {radius: 3},
                showInLegend: false
              }],
              credits: false
            }
    }
});
Template.TeamInfo.events({
    'click .fa-plus-circle' : function(event){
        if(!$(event.target).closest('tr').next().is(':hidden')){
            $(event.target).closest('tr').next().slideToggle(50);
        } else if(Template.instance().showGraphs.get()){
            $(event.target).closest('tr').next().slideToggle(50);
        }
        Template.instance().showGraphs.set(true);
        Blaze.saveAsPDF(Template.report, {
        });
        analytics.page('Team Search');
        // if (!Template.instance().showGraphs.get()){
        //     console.log('yo');
        //     c
        //     $(event.target).closest('tr').next().find('.highcharts-container').each(function(idx, obj){
        //         obj.highcharts().destroy();
        //     })
        // }
    }
})
Template.TeamInfo.created = function(){
    this.showGraphs = new ReactiveVar(false);
}
