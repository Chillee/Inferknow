Router.route('/teams', function(){
    GAnalytics.pageview();
    this.render('TeamSearch');
});
Router.route('/', function(){
    this.redirect('/results');
})

