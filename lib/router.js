Router.route('/teams', function(){
    this.render('TeamSearch');
});
Router.route('/', function(){
    this.redirect('/results');
})

