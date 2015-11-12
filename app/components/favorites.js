import React from 'react';
import BackboneMixin from '../mixins/backbone';
import store from '../store';

const Favorites = React.createClass({
  mixins: [BackboneMixin],

  componentWillMount() {
    store.fetchFavorites();
  },

  getModels() {
    return {
      favorites: store.getFavorites()
    };
  },

  render() {
      console.log(this.state.favorites);
    return (
      <div>
        <h1>Favorites</h1>
        {this.state.favorites.map((f) =>
            <div key={f.objectId}>
                {console.log(f)}
                <h2>{f.name}</h2>
                <img src={f.image} alt="" />
            </div> )}            
      </div>
    );
  }
});

export default Favorites;
