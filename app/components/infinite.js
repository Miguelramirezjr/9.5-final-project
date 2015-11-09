import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import InfiniteGrid from 'react-infinite-grid';
import React from 'react/addons';

var PureRenderMixin = React.addons.PureRenderMixin;

var GridItemRenderer = React.createClass({

    mixins: [ PureRenderMixin ],

    propTypes: {
        index: React.PropTypes.number
        height: React.PropTypes.number
        width: React.PropTypes.number
        wrapperHeight: React.PropTypes.number
        lazyCallback: React.PropTypes.func
    },

    render: function() {
        return(
            <div className="infinite-grid">
                This is {this.props.index}
            </div>
        );
    },
});

var items = [];
for (var i = 0; i <= 50; i++) {
    items.push({
        index: i
    });
}

React.render(<InfiniteGrid ItemRenderer={GridItemRenderer} entries={items} />, document.getElementById('grid'));
// export default Infinite;
