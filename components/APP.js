var React = require('react');
// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;

var io = require('socket.io-client');
var Header = require('./parts/Header');
var Audience = require('./Audience');

var APP = React.createClass({

    getInitialState() {
        return {
            status: 'disconnected',
            title: '',
            action: 'default',
            roomId:'',
            member: {},
            audience: []
        }
    },

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.welcome);
        this.socket.on('joined', this.joined);
        this.socket.on('audience', this.updateAudience);
        this.socket.on('startGame', this.startGame);
    },

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    },

    update(actionKey,actionValue){
        console.log(actionKey+"="+actionValue);
        if(actionKey==='action'){this.setState({ action: actionValue });}
    },

    connect() {

        // var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

        // if (member) {
        //     this.emit('join', member);
        // }

        this.setState({ status: 'connected' });
    },

    disconnect() {
        this.setState({ status: 'disconnected' });
    },

    welcome(serverState) {
        this.setState({ title: serverState.title });
    },

    joined(member) {
        // sessionStorage.member = JSON.stringify(member);
        this.setState({ member: member });
    },

    updateAudience(newAudience) {
        this.setState({ audience: newAudience });
    },

    startGame(data) {
        this.setState({ action: "running", roomId:data.roomId });
    },

    render() {
        return (
            <div>
                <Header title={this.state.title} status={this.state.status} />
                <Audience emit={this.emit} update = {this.update} {...this.state} />
            </div>
        );
    }

});

module.exports = APP;