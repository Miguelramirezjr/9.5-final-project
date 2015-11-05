import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';

var Index = React.createClass({

  mixins: [BackboneMixin],

  componentWillMount() {  /* fetche's sneaker data */
    store.fetchSneakers();
  },

  getModels() {  /* returns sneaker data */
    return {
      sneakers: store.getSneakers()
    }
  },

  render() {
    var sneakers = this.state.sneakers;
    return (
      <div>
        <h1>Index</h1>
        <ul>
          {sneakers.map((s) => {
              {/* Create a Sneaker component and ust <Sneaker sneaker={s} /> instead */}
            return (<li key={s.objectId || Date.now()}><Link to={`/sneakers/${s.objectId}`}><img src={s.image} /> </Link><a href="http://sneakernews.com/release-dates/">{s.name}</a></li>);
          })}
        </ul>
      </div>
    );
  }

});

export default Index;
