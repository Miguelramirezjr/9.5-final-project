var Sneaker = Parse.Object.extend("Sneaker");

Parse.Cloud.job("syncSneakers", function(request, status) {
  Parse.Cloud.httpRequest({
    url: 'https://immense-shelf-1544.herokuapp.com/scrape'
  }).then(function(httpResponse){
    var sneakers = httpResponse.data;
    return sneakers.map(function(sneaker) {
        var query = new Parse.Query("Sneaker");
        query.equalTo("sneakernews_id", sneaker.sneakernews_id);
        return query.first().then(function(result) {
            if(result) {
                result.set(sneaker);
                return result.save();
            } else {
                var newSneaker = new Sneaker(sneaker);
                return newSneaker.save();
            }
        });
    });
  }).then(function(){
     status.success("Sneakers synced.");
  }, function(httpResponse) {
     status.error('Request failed with response code ' + httpResponse.status);
  });
});




Parse.Cloud.afterDelete("Recipe", function(request) {
  query = new Parse.Query("Comment");
  query.equalTo("recipe", request.object);
  query.find({
    success: function(comments) {
      Parse.Object.destroyAll(comments, {
        success: function() {},
        error: function(error) {
          console.error("Error deleting related comments " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related comments " + error.code + ": " + error.message);
    }
  });
});

Parse.Cloud.afterSave('Comment', function(request) {
  var Mandrill = require('mandrill');
  var query = new Parse.Query('Recipe');
  query.include('creator');
  return query.get(request.object.get('recipe').id, {useMasterKey: true}).then(function(recipe) {
    Mandrill.initialize('d3vRrzIxBAc4BL5gMMy1Hg');
    var email = recipe.get('creator').get('email');
    var name = recipe.get('creator').get('name');

    if(email) {
      Mandrill.sendEmail({
        message: {
          text: "Hello World!",
          subject: "Using Cloud Code and Mandrill is great!",
          from_email: "parse@cloudcode.com",
          from_name: "Cloud Code",
          to: [
            {
              email: email,
              name: name
            }
          ]
        },
        async: true
      },{
        success: function(httpResponse) {
          console.log(httpResponse);
        },
        error: function(httpResponse) {
          console.error(httpResponse);
        }
      });
    }
  }, function(error) {
    console.error(error);
  });
});
