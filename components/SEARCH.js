var React = require('react');
// var io = require('socket.io-client');
var Header = require('./parts/Header');
var SEARCH = React.createClass({

    getInitialState() {
        return {
            status: this.props.status
        }
    },

    // componentWillMount() {
    //     this.socket = io('http://localhost:3000');
    //     this.socket.on('connect', this.connect);
    //     this.socket.on('disconnect', this.disconnect);
    // },

    // connect() {
    //     this.setState({ status: 'connected' });
    // },

    // disconnect() {
    //     this.setState({ status: 'disconnected' });
    // },

    // getComponent: function(index){
    //     // alert("you clicked on play button;"+index);
    //     // React.render(<SEARCH />, document.getElementById('loginbuttonhere'));
    //     React.render(<APP />, document.getElementById('react-container'));

    // },

    render() {
        return (
            <div>
                <Header title="Search Page" status={this.state.status} />
            </div>
        );
    }

});

module.exports = SEARCH;