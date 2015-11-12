var HelloMessage = React.createClass ({
	render: function(){
		return (
			<h1>Olá mundo escrito em React!!</h1>
		);
	}
});

ReactDOM.render(<HelloMessage />, document.getElementById("content"));