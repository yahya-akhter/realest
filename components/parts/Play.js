var React = require('react');

var Play = React.createClass({


	play() {
		//var memberName = React.findDOMNode(this.refs.name).value;
		this.props.update('action','searching');
		this.props.emit('playGame','');
		// setTimeout(function(){this.props.update('action','running');}.bind(this),3000);
	},
	
	render() {
		return (
			<button className="btn btn-primary" onClick={this.play} >Play</button>
		);
	}

});

module.exports = Play;