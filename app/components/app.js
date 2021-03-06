import React from 'react';
import { Link, IndexLink } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import store from '../store';

var App = React.createClass({

  propTypes: {
    children: React.PropTypes.node
  },

  mixins: [BackboneMixin],

  getModels() {
    return {
      session: store.getSession()
    }
  },

  handleLogout(e) {
    e.preventDefault();
    store.invalidateSession();
  },

  render() {
    let session = this.state.session;
    let loggedIn = session.isAuthenticated;
    let currentUser = session.currentUser;
    let username = (currentUser && currentUser.username) || 'Me';

    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
         <ul className="title-area">
            <li className="name">
              <h1><IndexLink to="/">Home</IndexLink></h1>
            </li>
         </ul>

          <section className="top-bar-section">


            <ul className="right">
                {!loggedIn &&
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                }
              {loggedIn &&
              <li className="has-dropdown">
                <a>{username}</a>
                <ul className="dropdown">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><a onClick={this.handleLogout}>Logout</a></li>
                </ul>
              </li>
              }
            </ul>
          </section>
        </nav>

        {this.props.children}
      </div>
    );
  }

});

export default App;
