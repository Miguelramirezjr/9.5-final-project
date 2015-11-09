import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';

var Index = React.createClass({

    mixins: [BackboneMixin],

    componentWillMount() {  /* fetch's sneaker data */
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
                <div className="Sneaker">
                    {sneakers.map((s) => {
                        // console.log(s);
                        var imgs = s.image
                        var divStyle = {
                            backgroundImage: 'url(' + imgs + ')'
                        };

                        return (
                            <div className="Sneaker-tile" key={s.objectId || Date.now()}>
                                <Link className="Sneaker-link" to={`/sneakers/${s.objectId}`}>
                                    <div className="Sneaker-link-img" style={divStyle}></div>
                                    <section className="Sneaker-link-img-info">
                                        <h3 className="Sneaker-link-img-name inv">{s.name}</h3>
                                        <h5 className="Sneaker-link-img-name inv">Realease-Date: {s.date}</h5>
                                        <h5 className="Sneaker-link-img-name inv">Price: {s.price}</h5>
                                    </section>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

export default Index;
