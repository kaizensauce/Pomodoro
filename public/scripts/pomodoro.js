
var globalVar = {};

var StartStopButton = React.createClass({
    render: function () {
        return (
            <div><button onClick={this.props.startStopClick} className={this.props.state}></button></div>
        )
    }
})

var Reset25Button = React.createClass({
    render: function () {
        return (
            <button className="reset" onClick={this.props.resetClick}>25</button>
        )
    }
})

var Reset3Button = React.createClass({
    render: function () {
        return (
            <button className="reset" onClick={this.props.resetClick}>3</button>
        )
    }
})

var Time = React.createClass({
    render: function () {
        return (
            <div className="time">{this.props.currentTime}</div>
        )
    }
})

var Date = React.createClass({
    render: function () {
        return (
            <div className="date">{this.props.currentDate}</div>
        )
    }
})


var TimeLeft = React.createClass({
    render: function () {
        return (<div className="countdown"><span className="digits">{this.props.timeLeft}</span></div>)
    }
})

var remainingDuration = undefined;
var isRunning = 'false';
var timer = undefined;

var Main = React.createClass({
    componentWillMount: function () {
        remainingDuration = new moment.duration(25, 'minutes');
        globalVar.callback = () => {
            this.tick();
        }
        this.update();
    },
    
    tick: function () {
        if (isRunning === 'true') {
            remainingDuration.subtract(500);
            if (remainingDuration < 0) {
                var audio = new Audio('glass_ping.mp3');
                audio.play();
                isRunning = 'false';
                this.setState({ state: 'stopped' });
                clearInterval(timer);
            }
        }
        this.update();
    },
    
    update: function () {
        var timeLeftString = Utilities.CreateTimeLeftString(remainingDuration);
        var now = moment();
        var currentTime = now.format('hh:mm:ss');
        var currentDate = now.format('dddd Do MMMM YYYY')
        this.setState({ countdown: timeLeftString, currentTime:currentTime, currentDate:currentDate});
    },
    getInitialState: function () {
        var timeLeftString = '25:00';
        var now = moment();
        var currentTime = now.format('hh:mm:ss');
        return { countdown: timeLeftString, state: 'stopped', currentTime: currentTime };
    },
    startStopClick: function () {
        if (isRunning === 'true') {
            isRunning = 'false';
            this.setState({ state: 'stopped' });
        } else {
            isRunning = 'true';
            this.setState({ state: 'running' });
        }
    },
    reset3Click: function () {
        remainingDuration = new moment.duration(3, 'minutes');
        this.update();
    },
        reset25Click: function () {
        remainingDuration = new moment.duration(25, 'minutes');
        this.update();
    },
    render: function () {
        return (
            <div>
            <div className="pomodoro">
            <div className='buttons'>
                    <StartStopButton startStopClick={this.startStopClick} state={this.state.state}/>
                    <Reset25Button resetClick={this.reset25Click}/>
                    <Reset3Button resetClick={this.reset3Click}/>
                </div>
                <TimeLeft timeLeft={this.state.countdown}/>
            </div>
            <div className="time-panel">
               <Time currentTime={this.state.currentTime}></Time>
               <Date currentDate={this.state.currentDate}></Date>
            </div>
            </div>  
        )
    }
})




ReactDOM.render(<Main />, document.getElementById("content"));
        if (timer === undefined) {
            timer = setInterval(globalVar.callback, 500);
        }

