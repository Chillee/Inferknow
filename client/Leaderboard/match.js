Template.Match.helpers({
    teamNumber: function(team, robot){
        // wrap = (Session.get('filter_type')=='team' && robot == Session.get('filter_val')? 
            // "<td class='red_team filterable' style = 'background-color: #ff9999'>" : "<td class='red_team filterable'>")
        var wrap = $.parseHTML("<td class='filterable'> <a href='#'>"+robot+"</a></td>");
        if (Session.get('filter_type') == 'team' && robot == Session.get('filter_val')){
            if (team=='red'){
                $(wrap).css('background-color', '#ff9999');
            } else if(team=='blue'){
                $(wrap).css('background-color', '#9999ff');
            }
        }
        if (this.red_total_score > this.blue_total_score && team=='red'){
            $(wrap).css('font-weight', 'bolder');
        } else if(this.red_total_score < this.blue_total_score && team=='blue'){
            $(wrap).css('font-weight', 'bolder');
        }
        if (team=='red'){
            $(wrap).addClass('red_team');
        } else if(team=='blue'){
            $(wrap).addClass('blue_team');
        }
        return $(wrap)[0].outerHTML
    },
    scores: function(team, score){
        // wrap = (this.red_total_score > this.blue_total_score ? "<td class='red_team >" : "<td class='red_team'>");
        var elem = $.parseHTML("<td class='"+team+"_team'>" + score + "</td>");
        // console.log(elem);
        if (team == 'red'){
            $(elem).css('background-color', '#fdd');
        } else if(team=='blue'){
            $(elem).css('background-color', '#ddf');
        }
        if (this.red_total_score > this.blue_total_score && team=='red'){
            $(elem).css('font-weight', 'bolder');
            $(elem).css('background-color', '#fbb');
        } else if(this.red_total_score < this.blue_total_score && team=='blue'){
            $(elem).css('font-weight', 'bolder');
            $(elem).css('background-color', '#bbf');
        }

        return $(elem)[0].outerHTML;
    }
});

Template.Match.events({
    'click .fa-plus-circle' : function(event){
        console.log($(event.target).parent('tr').next());
        $(event.target).closest('tr').next().slideToggle(50);
    }
})

Template.Match.onRendered(function(){
    this.$('.header').closest('tr').next().slideToggle(0);
    
});