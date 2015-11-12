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
      <div className ="background-fav">
        <div className ="fav-div">
          <h1>Favorites</h1>
          {this.state.favorites.map((f) =>
              <div className="fav-div-info" key={f.objectId}>
                  {console.log(f)}
                  <img src={f.image} alt="" /><h2>{f.name}</h2>
              </div> )}
        </div>
      </div>
    );
  }
});

export default Favorites;
