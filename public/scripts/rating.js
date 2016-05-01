var Button = React.createClass({
    render: function () {
        return (
            <button onClick={this.props.localHandleClick}></button>
        )
    }
})

var Input = React.createClass({
    render: function(){
        return(
            <div><span>{this.props.label}</span><input type='text' value={this.state.turnover}/></div>
        )
    }
})

var Result = React.createClass({
    render: function () {
        return (
            <div>{this.props.localCounter}</div>
        )
    }
})

var Main = React.createClass({
    getInitialState: function () {
        return { counter: 0, turnover: '0' };
    },
    handleClick: function () {
        this.setState({ counter: this.state.counter + 1 });
    },
    render: function () {
        return (
            <div>
                <Input label="Turnover:" />
                <Button localHandleClick={this.handleClick}/>
                <Result localCounter={this.state.turnover}/>
                
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById("content"));