var Utilities = (function() {
   function calculateEndTime() {
        var endTime = moment().add(5, 'seconds');
        return endTime;
    }
    function getRemainingDuration(endTime, nowTime) {
        return moment.duration(endTime.diff(nowTime, 'seconds'), 'seconds');
    }
    function createTimeLeftString(duration) {
        if (duration.asMilliseconds() < 500) {
            return "Time's Up!"
        }
        var seconds = duration.seconds();
        var padding = '';
        if (seconds < 10) {
            padding = '0';
        }

        return duration.minutes() + ':' + padding + seconds;
    }
    return {
    CalculateEndTime : calculateEndTime,
    GetRemainingDuration : getRemainingDuration,
    CreateTimeLeftString:createTimeLeftString
  }; 
})();