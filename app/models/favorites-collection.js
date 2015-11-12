import Favorite from './favorite';

var FavoritesCollection = Backbone.Collection.extend({
  model: Favorite,
  url: "https://api.parse.com/1/classes/Favorite?include=creator,sneaker",

  parse(response) {
    return response.results;
  }
});

export default FavoritesCollection;
