define(["react"], function(React){
       return React.createClass({
        render: function () {
            return (
                <button className={this.props.className} onClick={this.props.onClick}>{this.props.label}</button>
            )
        }
    });
});