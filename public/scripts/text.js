define(["react"], function (React) {

    return React.createClass({
        render: function () {
            return (
                <div className={this.props.className}>{this.props.value}</div>
            )
        }
    })
})
