var SvgComponent = React.createClass({
	render: function(){
		return (<svg {...this.props}>{this.props.children}</svg>);
	}
                
});

var Circle = React.createClass({
    render: function() {
        return (<circle {...this.props}></circle>);
    }
});

var DesenharSvg = React.createClass({
	render: function() {
		return (
	    <SvgComponent height="100" width="230">
	        <Circle
	            cx="50" cy="50" r="25"
	            fill="mediumorchid" />
	        <Circle
	            cx="125" cy="50" r="25"
	            fill="#ff0099" />
	        <Circle
	            cx="200" cy="50" r="25"
	            fill="none"
	            stroke="crimson" />
	    </SvgComponent>
		)
	}
});

ReactDOM.render(
	<DesenharSvg />,
    document.getElementById('content')
);