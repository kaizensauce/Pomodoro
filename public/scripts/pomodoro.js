
var globalVar = {};

var StartStopButton = React.createClass({
    render: function () {
        return (
            <button onClick={this.props.startStopClick}>{this.props.label}</button>
        )
    }
})

var ResetButton = React.createClass({
    render:function() {
        return ( 
            <button onClick={this.props.resetClick}>Reset</button>
        )
    }
})

var NowTime = React.createClass({
    render: function () {
        return (
            <div>Start Time: {this.props.nowTime}</div>
        )
    }
})

var EndTime = React.createClass({
    render: function () {
        return (
            <div>End Time: {this.props.endTime}</div>
        )
    }
})

var TimeLeft = React.createClass({
    render: function () {
        return(<div>{this.props.timeLeft}</div>)
    }
})

var utilities = {
    calculateEndTime: function()
    {
        var endTime = new moment().add(5, 'seconds');    
        return endTime;
    },
    getRemainingDuration: function (endTime, nowTime){
         return moment.duration(endTime.diff(nowTime, 'seconds'),'seconds');
    },
    createTimeLeftString(duration)
    {
        if(duration.asMilliseconds() < 500)
        {
            return "Time's Up!"
        }
        var seconds = duration.seconds();
        var padding = '';
        if (seconds < 10)
        {
            padding = '0';
        }
        
        return duration.minutes() + ':' + padding + seconds;
    }
}
var remainingDuration = undefined;
var isRunning = 'false';
var timer = undefined;

var Main = React.createClass({
    startTime:'????',
    endTime:'????',
    componentWillMount:function(){
        remainingDuration = new moment.duration(25, 'minutes');
        globalVar.callback = () => {
            this.tick();
        }  
    },
    tick:function(){
        if(remainingDuration < 0)
        {
            var audio = new Audio('glass_ping.mp3');
            audio.play();
            isRunning = 'false';
            this.setState({startstoplabel:'Start'});
            clearInterval(timer);
        }
        remainingDuration.subtract(500);
        this.update();
    },
    update: function()
    {
      var timeLeftString = utilities.createTimeLeftString(remainingDuration);
      this.setState({countdown:timeLeftString});  
    },
    getInitialState: function () {
        var timeLeftString = '25:00';
        return {countdown:timeLeftString, startstoplabel:'Go'};
    },
    startStopClick: function () {
        if(isRunning === 'true'){
            isRunning = 'false';
            this.setState({startstoplabel:'Start'});
            clearInterval(timer);
        }else{
            isRunning = 'true';
            this.setState({startstoplabel:'Stop'});
            timer = setInterval(globalVar.callback, 500);
        }
            },
    resetClick: function () {
        remainingDuration = new moment.duration(25, 'minutes');
        this.update();
    },
    render: function () {
        return (
            <div>
                <StartStopButton startStopClick={this.startStopClick} label={this.state.startstoplabel}/>
                <ResetButton resetClick={this.resetClick}/>
                <TimeLeft timeLeft={this.state.countdown}/>
            </div>
        )
    }
})


 

ReactDOM.render(<Main />, document.getElementById("content"));


