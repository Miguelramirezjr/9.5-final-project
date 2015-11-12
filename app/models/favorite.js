import store from '../store';
import _ from 'underscore';
import User from './user';

const Favorite = Backbone.Model.extend({

  urlRoot: "https://api.parse.com/1/classes/Favorite",

  url: function() {
    return Backbone.Model.prototype.url.apply(this, arguments) + "?include=creator,sneaker";
  },

  idAttribute: 'objectId',

  defaults() {
    return {
      sneaker: {},
      creator: {}
    }
  },

  toJSON(options) {
    // I'm saving the model
    if(options) {

      return _.extend({}, this.attributes, {
        sneaker: {
          "__type": "Pointer",
          "className": "Sneaker",
          "objectId": this.get('sneaker').objectId
        },
        creator: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('creator').objectId
        },
        user: this.get('creator').objectId
      });

    // I'm using toJSON to get a simple object of attributes
    } else {
      return _.clone(this.attributes);
    }
  },

  save() {
    let currentUser = store.getSession().currentUser;
    if(currentUser) {
      if(this.isNew()) {
        this.set('creator', currentUser);
      }
      Backbone.Model.prototype.save.apply(this, arguments);
    } else {
      return new Promise((_, reject) => reject("Invalid session"));
    }
  }
});

export default Favorite;
