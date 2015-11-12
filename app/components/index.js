import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import RecipePreview from './recipe-preview';


var Index = React.createClass({

    mixins: [BackboneMixin],

    componentWillMount() {  /* fetch's sneaker data */
        store.fetchSneakers();
        store.fetchFavorites();
    },

    getModels() {  /* returns sneaker data */
        return {
            sneakers: store.getSneakers(),
            favorites: store.getFavorites()
        }
    },

    handleFavorite(sneaker, e) {
        e.preventDefault();
        store.favoriteSneaker(sneaker);
    },

    handleUnfavorite(sneaker, e) {
        e.preventDefault();
        store.unfavoriteSneaker(sneaker);
    },

    isFavorited(sneaker) {
        return _.some(this.state.favorites, (f) => {
            return f.sneaker.objectId === sneaker.objectId;
        });
     },


    render() {
        var sneakers = this.state.sneakers;

        return (
            <div>
                <div className="Sneaker">
                        {sneakers.map((s) => {
                        // console.log(s);
                            var imgs = s.image
                            var divStyle = {
                            backgroundImage: 'url(' + imgs + ')'
                        };
                        return (
                            <div className="Sneaker-tile" key={s.objectId || Date.now()}>
                                <div>
                                    <a target="_blank" className="Sneaker-link" href={`http://sneakernews.com/?s=${encodeURI(s.name)}`}>
                                        <div className="Sneaker-link-img" style={divStyle}></div>
                                        <section className="Sneaker-link-img-info">
                                            <h4 className="Sneaker-link-img-name inv">{s.name}</h4>
                                            <h6 className="Sneaker-link-img-name inv">Realease-Date: {s.date}</h6>
                                            <h6 className="Sneaker-link-img-name inv">Price: {s.price}</h6>
                                        </section>
                                    </a>
                                </div>
                                <div>
                                {this.isFavorited(s) ?
                                    <button className="unfav-button" onClick={this.handleUnfavorite.bind(this, s)}>Unfavorite</button>
                                    : <button className="fav-button" onClick={this.handleFavorite.bind(this, s)}>Favorite</button>
                                }
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
});


export default Index;
