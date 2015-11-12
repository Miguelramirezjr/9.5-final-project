// import React from 'react';
// import _ from 'underscore';
// import BackboneMixin from '../mixins/backbone';
// import { Link } from 'react-router';
// import store from '../store';
//
// const RecipePreview = React.createClass({
//
//   propTypes: {
//     sneaker: React.PropTypes.object.isRequired
//   },
//
//   mixins: [BackboneMixin],
//
//   getInitialState: function() {
//     return {loading: false};
//   },
//
//   getModels() {
//     return {
//       favorites: store.getFavorites()
//     };
//   },
//
//   handleFavorite(sneaker, e) {
//     e.preventDefault();
//     this.setState({loading: true});
//     store.favoriteSneaker(sneaker).then(() => this.setState({loading: false}));
//   },
//
//   handleUnfavorite(sneaker, e) {
//     e.preventDefault();
//     this.setState({loading: true});
//     store.unfavoriteSneaker(sneaker).then(() => this.setState({loading: false}));
//   },
//
//   isFavorited(sneaker) {
//     return _.some(this.state.favorites, (f) => {
//       return f.sneaker.objectId === sneaker.objectId;
//     });
//   },
//
//   render() {
//     var r = this.props.sneaker;
//     return (
//       <li>
//         <Link to={`/favorites/${s.objectId}`}>{f.name} - ({f.creator.username})</Link>
//         {this.isFavorited(r) ?
//           <Ladda loading={this.state.loading} onClick={this.handleUnfavorite.bind(this, r)}>Unfavorite</Ladda>
//           : <Ladda loading={this.state.loading} onClick={this.handleFavorite.bind(this, r)}>Favorite</Ladda>
//         }
//       </li>
//     );
//   }
// });
//
// export default RecipePreview;
