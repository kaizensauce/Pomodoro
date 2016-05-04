
define(["utilities", "react", "react-dom", "moment", "services"], function (utilities, React, ReactDOM, moment, services) {
    var Utilities = utilities;
    var Services = services;
    var globalVar = {};

    var StartStopButton = React.createClass({
        render: function () {
            return (
                <button onClick={this.props.startStopClick} className={this.props.state}></button>
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

    var TaskSummary = React.createClass({
        render: function () {
            return (<div className="tasksummarycontainer">&gt; <input className="taskSummary" onChange={this.props.onChange}></input></div>)
        }
    }
    )

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
        onChange: function (e) {
            this.setState({ task: e.target.value });
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
                    services.SaveStatusUpdate(
                        {
                            date: moment().format('DD/MM/YYYY'),
                            time: moment().format('hh:mm:ss'),
                            taskSummary: this.state.task,
                            state: "Complete",
                            remainingDuration: this.state.countdown
                        });
                }
            }
            this.update();
        },

        update: function () {
            var timeLeftString = Utilities.CreateTimeLeftString(remainingDuration);
            var now = moment();
            var currentTime = now.format('hh:mm:ss');
            var currentDate = now.format('dddd Do MMMM YYYY')
            this.setState({ countdown: timeLeftString, currentTime: currentTime, currentDate: currentDate });
        },
        getInitialState: function () {
            var timeLeftString = '25:00';
            var now = moment();
            var currentTime = now.format('hh:mm:ss');
            return { countdown: timeLeftString, state: 'stopped', currentTime: currentTime };
        },
        startStopClick: function () {
            var now = moment();
            var stateChange = undefined;

            if (isRunning === 'true') {
                stateChange = "Stopped";
                isRunning = 'false';
                this.setState({ state: 'stopped' });
            } else {
                isRunning = 'true';
                stateChange = "Started";

                this.setState({ state: 'started' });
            }

            services.SaveStatusUpdate(
                {
                    date: now.format('DD/MM/YYYY'),
                    time: now.format('hh:mm:ss'),
                    taskSummary: this.state.task,
                    state: stateChange,
                    remainingDuration: this.state.countdown
                });
        },
        reset3Click: function () {
            remainingDuration = new moment.duration(3, 'seconds');
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
                        <TimeLeft timeLeft={this.state.countdown}/>

                        <div className='buttons'>

                            <Reset25Button resetClick={this.reset25Click}/>
                            <Reset3Button resetClick={this.reset3Click}/>
                            <StartStopButton startStopClick={this.startStopClick} state={this.state.state}/>
                        </div>
                        <TaskSummary onChange={this.onChange}/>
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

});