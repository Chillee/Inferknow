Router.route('/teams', function(){
    this.render('TeamSearch');
});
Router.route('/', function(){
    console.log("hmmm");
    this.redirect('/results');
})

Router.route('/team/:teamNum', function(){
    Session.set('filter_type','team');
    Session.set('filter_val', this.params.teamNum);
    this.redirect('/results');
})
Router.route('/teams/:teamNum', function(){
    Session.set('filter_type','team');
    Session.set('filter_val', this.params.teamNum);
    this.redirect('/results');
})
