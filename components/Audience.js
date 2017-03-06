var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Play = require('./parts/Play');
var Running = require('./parts/Running');

var Audience = React.createClass({

	render() {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>

					<Display if={this.props.member.name}>
						<Display if={this.props.action === 'default'}>
							<h2>Welcome {this.props.member.name}</h2>
							<Play emit={this.props.emit} update={this.props.update} />
						</Display>

						<Display if={this.props.action === 'searching'}>
							<h2>Searching</h2>
						</Display>

						<Display if={this.props.action === 'running'}>
							<h2>Running</h2>
							<Running />
						</Display>

					</Display>

					<Display if={!this.props.member.name}>
						<h1>Join the session</h1>
					    <Join emit={this.props.emit} />
					</Display>

				</Display>
			</div>
		);
	}
});

module.exports = Audience;