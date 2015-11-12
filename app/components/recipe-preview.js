import React from 'react';
import _ from 'underscore';
import BackboneMixin from '../mixins/backbone';
import { Link } from 'react-router';
import store from '../store';
// import Ladda from 'react-ladda';

const RecipePreview = React.createClass({

  propTypes: {
    recipe: React.PropTypes.object.isRequired
  },

  mixins: [BackboneMixin],

  getInitialState: function() {
    return {loading: false};
  },

  getModels() {
    return {
      favorites: store.getFavorites()
    };
  },

  handleFavorite(recipe, e) {
    e.preventDefault();
    this.setState({loading: true});
    store.favoriteRecipe(recipe).then(() => this.setState({loading: false}));
  },

  handleUnfavorite(recipe, e) {
    e.preventDefault();
    this.setState({loading: true});
    store.unfavoriteRecipe(recipe).then(() => this.setState({loading: false}));
  },

  isFavorited(recipe) {
    return _.some(this.state.favorites, (f) => {
      return f.recipe.objectId === recipe.objectId;
    });
  },

  render() {
    var r = this.props.recipe;
    return (
      <li>
        <Link to={`/recipes/${r.objectId}`}>{r.name} - ({r.creator.username})</Link>
        {this.isFavorited(r) ?
          <Ladda loading={this.state.loading} onClick={this.handleUnfavorite.bind(this, r)}>Unfavorite</Ladda>
          : <Ladda loading={this.state.loading} onClick={this.handleFavorite.bind(this, r)}>Favorite</Ladda>
        }
      </li>
    );
  }
});

export default RecipePreview;
