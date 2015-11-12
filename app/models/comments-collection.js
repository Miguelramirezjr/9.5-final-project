import Comment from './comment';

var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url() {
    return "https://api.parse.com/1/classes/Comment?include=creator,sneaker&where=" + JSON.stringify({
      recipe: {
        __type: "Pointer",
        className: "Sneaker",
        objectId: this.recipeId
      }
    });
  },

  initialize(models, options) {
    this.recipeId = options && options.recipeId;
  },

  parse(response) {
    return response.results;
  }
});

export default CommentsCollection;
