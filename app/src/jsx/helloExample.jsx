var ShowMessage = React.createClass({
	render: function(){
		var msg;
		this.props.mensagem === undefined ? msg = 'mundo!' : msg = this.props.mensagem;
		return (<h1>Olá {msg}</h1>);
	}
});

var FillInput = React.createClass({
	getInitialState: function(){
		return {value: undefined};
	},
	handleChange: function(event){
		this.setState({value: event.target.value});
	},
	render: function(){
		var value = this.state.value;
		return (
			<div>
				<ShowMessage mensagem={value}/>
				<input 
					type="text"
					value={value}
					onChange={this.handleChange}
				/>
			</div>
		);
	}

});

ReactDOM.render(
	<div>
		<FillInput />
	</div>,
	document.getElementById('content')
);
