var React = require('react');

var Running = React.createClass({


	turn() {
		//var memberName = React.findDOMNode(this.refs.name).value;
		// this.props.update('action','searching');
		alert("Turn");
		// setTimeout(function(){this.props.update('action','running');}.bind(this),3000);
	},
	
	render() {
		return (
			<button className="btn btn-primary" onClick={this.turn} >Turn</button>
		);
	}

});

module.exports = Running;