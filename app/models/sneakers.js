import store from '../store';
import User from './user';
import _ from 'underscore';

var Sneakers = Backbone.Model.extend({
  defaults: function(){
    return {
      objectId: "",
      date: "",
      image: "",
      name: "",
      price:"",
      sneakernews_id:"",
      created_at: Date.now()
    }
  },

  validate: function(attributes) {
    var errors = {};
    if(_.isEmpty(attributes.name)){
      errors.name = "Must have a valid name";
    }
    if(_.isEmpty(attributes.date)){
      errors.date = "Must have a valid date";
    }
    return _.keys(errors).length ? errors : undefined;
  }
});

export default Sneakers;
