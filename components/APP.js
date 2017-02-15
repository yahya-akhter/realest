var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');
var SEARCH = require('./SEARCH.js');
var APP = React.createClass({

    getInitialState() {
        return {
            status: 'disconnected'
        }
    },

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
    },

    connect() {
        this.setState({ status: 'connected' });
    },

    disconnect() {
        this.setState({ status: 'disconnected' });
    },

    getComponent: function(index){
        // alert("you clicked on play button;"+index);
        React.render(<SEARCH status={this.state.status} />, document.getElementById('react-container'));
        // React.render(<h1>Searching</h1>, document.getElementById('react-container'));

    },

    render() {
        return (
            <div>
                <Header title="Home Page" status={this.state.status} />
                <button onClick={this.getComponent.bind(this, 1)}>Battel</button>
                <div id="searching-page"></div>
            </div>
        );
    }

});

module.exports = APP;