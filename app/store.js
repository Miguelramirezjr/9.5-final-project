import _ from 'underscore';
import Backbone from 'backbone';

import Session from './models/session';
import Recipe from './models/recipe';
import RecipesCollection from './models/recipes-collection';
import SneakersCollection from './models/sneakers-collection';
import CommentsCollection from './models/comments-collection';
import User from './models/user';
import UsersCollection from './models/users-collection';
import FavoritesCollection from './models/favorites-collection';

let session = new Session();
let recipes = new RecipesCollection();
let sneakers = new SneakersCollection();
let users = new UsersCollection();
let favorites = new FavoritesCollection();

let commentsCache = {};

const Store = _.extend({}, Backbone.Events, {

  initialize() {
    this.listenTo(recipes, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(sneakers, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(users, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(session, 'change', this.trigger.bind(this, 'change'));
    this.listenTo(favorites, 'add change remove', this.trigger.bind(this, 'change'));
  },

  getFavorites() {
    return favorites.toJSON();
  },

  fetchFavorites() {
    return favorites.fetch();
  },

  favoriteSneaker(sneaker) {
    return new Promise((resolve, reject) => {
      favorites.create({
        sneaker: {objectId: sneaker.objectId},
        sneakerInfo: sneaker,
        name: sneaker.name,
        image: sneaker.image
      }, {wait: true, success: resolve, error: reject});
    });
  },

  unfavoriteRecipe(recipe) {
    return new Promise((resolve, reject) => {
      return favorites.find((f) => {
        return f.get('recipe').objectId === recipe.objectId;
      }).destroy({success: resolve, error: reject});
    });
  },

  getRecipes() {
    return recipes.toJSON();
  },

  fetchRecipes() {
    return recipes.fetch();
  },

  // TODO: do something if id doesn't exist
  getRecipe(id) {
    let recipe = recipes.get(id);
    if(recipe) {
      return recipe.toJSON();
    } else {
      recipes.fetch();
      return {};
    }
  },

  saveRecipe(recipe, options) {
    options = _.extend({}, options, {merge: true});
    return recipes.create(recipe, options);
  },

  destroyRecipe(recipe) {
    return recipes.get(recipe.objectId).destroy();
  },

  invalidateSession() {
    return session.invalidate();
  },

  authenticateSession(options) {
    return session.authenticate(options);
  },

  getSession(){
    return session.toJSON();
  },

  restoreSession() {
    return session.restore();
  },

  createUser(attributes) {
    // TODO: this user should become the currentUser, instead of fetching again
    let user = new User(attributes);
    return user.save().then(() => {
      return session.authenticate({sessionToken: user.get('sessionToken')});
    });
  },

  getCommentsForRecipe(id) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentsCollection(null, {recipeId: id}));
    this.stopListening(comments);
    this.listenTo(comments, 'add remove change', this.trigger.bind(this, 'change'));
    return comments.toJSON();
  },

  fetchCommentsForRecipe(id) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentsCollection(null, {recipeId: id}));
    this.stopListening(comments);
    this.listenTo(comments, 'add remove change', this.trigger.bind(this, 'change'));
    return comments.fetch();
  },

  commentOnRecipe(id, comment) {
    let comments = (commentsCache[id] = commentsCache[id] || new CommentsCollection(null, {recipeId: id}));
    this.stopListening(comments);
    this.listenTo(comments, 'add remove change', this.trigger.bind(this, 'change'));
    comments.create({
      recipe: {objectId: id},
      text: comment
    });
  },

  saveUser(user, options) {
    options = _.extend({}, options, {merge: true});
    return users.create(user, options);
  },

  // TODO: do something if id doesn't exist
  getUser(id) {
    let user = users.get(id);
    if(user) {
      return user.toJSON();
    } else {
      users.fetch();
      return {};
    }
  },

  getSneakers() {
    return sneakers.toJSON();
  },

  fetchSneakers() {
    return sneakers.fetch();
  },
});

Store.initialize();
// window.Store = Store;

export default Store;
