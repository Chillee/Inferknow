Template.TeamInfo.helpers({
    opr: function(field){
        var team = {};
        team["team_number"] = this.team_number;
        // console.log(Teams.findOne(team));   
        // console.log(Math.max(...Teams.findOne(team).OPR[field]));
        // return Math.max(...Teams.findOne(team).OPR[field]).toFixed(2);
        // var opr_arr = Teams.findOne(team).OPR.total_score;
        // var max_opr = Math.max.apply(Math, opr_arr);
        // var idx_max = opr_arr.indexOf(max_opr);
        var res = Teams.findOne(team).OPR[field+'_max'];
        if (res > 1 && (field=='hang' || field=='all_clear')){
            res = 1;
        }
        if (field=='hang' || field=='all_clear'){
            res *= 100;
        }
        return res.toFixed(2);
    },
    isWorlds: function(){
        return Session.get('region_selector')=='worlds';
    },
    team_name: function(){
        console.log(team_numbers.indexOf(this.team_number));
        return team_names[team_numbers.indexOf(this.team_number)];
    }
});
var team_names = ['Tobor','Beauty Bot and the Beasts','Bears by Cedros','Lancers','Techno Warriors Advanced','FIX IT','The MechaHampsters','Schrödinger\'s Hat','The BOSONS','Girls With Attitude','Westlake Pi-Rho Maniacs','2 Bits and a Byte','RoboSpartans','Robotica Santi  Italy','Hood River Occam\'s Razor','LASA High PHidelity','Green Machine Reloaded','RoboCats','Mechromancers','Batteries In Black','Tuxedo Pandas','Masquerade','Helios','N.U.T.S.','Wingus & Dingus Robotics','Watt\'s Up?','Zip TIE Fighters','RoboKnights','Dragons','Electro Medics RED','Enigma Riddlers','Back To The Drawing Board','e-lemon-ators','Six Bits & a Byte','BoBots','Team Torch','Erector Sets Gone Mad','CYBOTS','TBD - To Be Determined','Twisted Axles','Quantum Mechanics','GearTicks','i²r robotics','Punabots','Mechanical Marauders','Black Frogs','RoBowties','ViperBots Venom','Centripetal','ViperBots QuadX','The Other Guys','The Lazybotts','Tarpon Robotics','Blue Bots','LARES   South Korea','Hortonville Robotics','Hot Wired Robotics','The Blockheads','EHTPAL ENFORCERS','Robot Squad','Technical Difficulties','Tech Hogs Robotics','RoboCats Delta Team','Guzzoline Robotics','Sab-BOT-age','Watt\'s NXT?','Dynamic Signals','electron Volts','Super 7','Suffern\'s Team Erebor','Fig Newtons','Voltage of Imagination','The Q is Silqent','Warren County 4H Robotics','Cubix³','Spartans','Trial N\' Terror (TNT)','Vulcan Robotics','The Fellowship of the Robot','The Ducks','Nerd Herd','Rhyme Know Reason','RSF Intergalactic Dragons','Wormgear Warriors','The Brainstormers','Charging Champions','Error 404: Team Name Not Found','A Few Loose Screws','Height Differential','Blue Box Bots','Brainy Bots','Mogollon Rim Jaegers','Philobots','Iron Maidens','Misgav','TOXIC','Wizards.exe','Bomb Squad','C4','Robo Thunder','7 Sigma','Klamath Coyotes','Apex Preditors','The Rolling Drones','Talon Industries','Return of the Screws','Falcontech Robotics','MalFunction','The League of Relatively Ordinary Gentlemen','PML30-Y','Screw it','Shockwave','Pattern','FIFTH ORDER','Elite Engineers','Translate Server Error']
var team_numbers = ["535","2997","3141","3415","3486","3491","3537","3595","3658","3664","3781","4029","4082","4130","4143","4290","4318","4444","4717","4855","4924","4997","5009","5070","5110","5169","5202","5220","5229","5380","5385","5795","5890","5899","5916","5942","5943","5975","6022","6047","6051","6055","6081","6109","6123","6134","6137","6209","6220","6299","6377","6389","6451","6899","6913","6981","7013","7117","7149","7152","7172","7209","7242","7300","7314","7350","7351","7393","7477","7486","7550","7591","7655","8189","8221","8327","8372","8375","8466","8471","8390","8528","8606","8620","8644","8660","8668","8681","8686","8907","8913","8995","9048","9205","9662","9789","9794","9804","9851","9945","10030","10060","10165","10392","10479","11040","11041","11042","11043","11044","11047","11048","11051","11053","11050","11052"]
