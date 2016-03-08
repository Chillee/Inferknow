if (Meteor.isClient){
    Template.pageResults.replaces('_pagesPage');
}
Pages = new Meteor.Pagination(Results, {  
                  route: "/results",
                  router: "iron-router",
                  routerTemplate: "Leaderboard",
                  // routerLayout: "Layout",
                  sort: {
                    max_score: -1
                  },
                  templateName: 'Leaderboard',
                  itemTemplate: 'Match',
                  homeRoute: '/results',
                  availableSettings: {sort: true, filters: true, perPage: true}
                });

// Teams = new Meteor.Pagination(Results, {  
//                   router: "iron-router",
//                   routerTemplate: "Leaderboard",
//                   // routerLayout: "Layout",
//                   sort: {
//                     max_score: -1
//                   },
//                   templateName: 'TeamSearch',
//                   itemTemplate: 'Match',
//                   homeRoute: '/teams',
//                   availableSettings: {sort: true, filters: true, perPage: true}
//                 });

