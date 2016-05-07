Results = new Mongo.Collection('results');

Results.allow({
    insert: function(userId, doc) {
        //return !!userId; //checks if userId exists
        return true;
    },
    update: function(userId, doc, fields, modifier){
        return true;
    }
});


// ResultsSchema = new SimpleSchema({
//     firstName: {
//         type: String,
//         label: "First Name"
//     },
//     lastName: {
//         type: String,
//         label: "Last Name"
//     },
    