import React from 'react';
import { History } from 'react-router';
import store from '../store';

const Login = React.createClass({

  propTypes: {
    location: React.PropTypes.object
  },

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    let username = this.refs.email.value
    let password = this.refs.password.value

    store.authenticateSession({username, password}).then((loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      var { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname)
      } else {
        this.history.replaceState(null, '/')
      }
    })
  },

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <div className="login">
                        <div className="login-email">
                            <input ref="email" placeholder="email" />
                            <label>Email</label>
                        </div>
                        <div className="login-password">
                            <input ref="password" placeholder="password" />
                            <label>Password</label>
                        </div>
                        <div className="login-login">
                            <button type="submit">Login</button>
                        </div>
                        <div>
                            {this.state.error && (
                                <p>Bad login information</p>
                            )};
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});

export default Login;
