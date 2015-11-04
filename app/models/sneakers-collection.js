import Sneakers from 'models/sneakers';

var SneakersCollection = Backbone.Collection.extend({
  model: Sneakers,
  url: "https://api.parse.com/1/classes/Sneaker",
  parse(response) {
    return response.results;
  }
});

export default SneakersCollection;
