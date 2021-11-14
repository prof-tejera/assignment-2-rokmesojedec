const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;
const MONTH = YEAR / 12;

// Time Enums in milliseconds
export const TIME_ENUM = {
    MILLISECOND: MILLISECOND,
    SECOND: SECOND,
    MINUTE: MINUTE,
    HOUR: HOUR,
    DAY: DAY,
    YEAR: YEAR,
    MONTH: MONTH
}

// Creates Timer Object
export class Timer {
    constructor({
        years = 0,
        months = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0,
        rounds = 1,
        tickSize = MILLISECOND * 52, // sets the amount increased/decreased on each tick
        countdownMode = true, // when set to true, we count down to passed time values
        // and when countdownMode is true, we count up to the passed value
        intervalFunctions = [], // functions which are executed during each tick of the timer,
        onFinished = null,
        stopWatchMode = false
    } = {}) {
        // Convert args to milliseconds

        this._years = years;
        this._months = months;
        this._days = days;
        this._hours = hours;
        this._minutes = minutes;
        this._seconds = seconds;
        this._milliseconds = milliseconds;
        this._rounds = this._currentRound = rounds;
        this._roundsCompleted = 0;
        this.tickSize = tickSize;
        this.countdownInterval = null;
        this.intervalFunctions = [...intervalFunctions];
        this.countdownMode = countdownMode;
        this.onFinished = onFinished;
        this.stopWatchMode = stopWatchMode;
        this._isRunning = false;

        // defines getters and setters for time components
        ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"].forEach(
            prop => {
                Object.defineProperty(this, prop, {
                    get: function () {
                        return this[`_${prop}`];
                    },
                    set: function (value) {
                        // if (isNaN(value) || (!isNaN(value) && value < 0))
                        //     throw new Error(`${prop} paramter is not a number greater or equal to 0`);
                        this[`_${prop}`] = parseInt(value);
                        this.initializeTime(this.stopWatchMode || this.countdownMode);
                    }
                });
            }
        )
        this.initializeTime();
    }

    initializeTime(resetToCurrentTime = true) {
        // Converts all time components to milliseconds;
        let millisecondsTotal = 0
            + this._milliseconds
            + this._seconds * SECOND
            + this._minutes * MINUTE
            + this._hours * HOUR
            + this._days * DAY
            + this._months * MONTH
            + this._years * YEAR;

        if (this.countdownMode || resetToCurrentTime) {
            // Counting down from Start Time to 0
            this._currentTime = millisecondsTotal;
        } else {
            // Counting up form 0 to End Time
            this._currentTime = 0;
        }


        this._currentRound = this.rounds;
        this._roundsCompleted = 0;
        this._totalTime = millisecondsTotal * this.rounds;
        this._roundTime = millisecondsTotal;
    }

    tick() {
        // increases or decreases time on each tick
        if (this.countdownMode) {
            // COUNTING DOWN
            this._currentTime -= this.tickSize;
            if (this._currentTime <= 0) {
                if (this._currentRound > 0) this._currentRound--;
                if (this._currentRound > 0) {
                    this._currentTime = this._roundTime - this._currentTime;
                } else {
                    this._roundsCompleted++;
                    this._currentTime = 0;
                }
            }
        }
        else {
            // CONTING UP
            this._currentTime += this.tickSize;
            if (!this.stopWatchMode && this._currentTime >= this._roundTime) {
                if (this._currentRound > 0) this._currentRound--;
                if (this._currentRound > 0) {
                    this._currentTime = this._currentTime - this._roundTime;
                } else {
                    this._roundsCompleted++;
                    this._currentTime = this._roundTime;
                }
            }
        }
    }

    start(initializeTime = true) {
        if (this.countdownInterval === null) {
            if (initializeTime || this.isTimerComplete) this.initializeTime();
            this._isRunning = true;
            this.countdownInterval = setInterval(() => {
                this.tick();
                this.intervalFunctions.forEach(func => { func(this); });
                if (this.isTimerComplete) this.clear();
            }, this.tickSize);
        }
    }

    clean() {
        this.intervalFunctions.length = 0;
    }

    clear(triggerOnFinished = true) {
        clearInterval(this.countdownInterval);
        this._isRunning = false;
        this.countdownInterval = null;
        if (triggerOnFinished && (this.onFinished && typeof this.onFinished === "function")) {
            console.log("triggering on finished", this, triggerOnFinished);
            this.onFinished();
        } else {
            console.log("not triggering on finished", this, triggerOnFinished);
        }
    }

    reset() {
        this.initializeTime();
        this.intervalFunctions.forEach(func => { func(this); });
    }

    finishRound() {
        if (!this.isTimerComplete) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
            if (this.countdownMode) {
                // COUNTING DOWN
                this._currentTime = 0;
            }
            else {
                // COUNTING UP
                this._currentTime = this._roundTime;
            }
            // this._currentRound--;

            this.intervalFunctions.forEach(func => { func(this); });
            if (this.onFinished && typeof this.onFinished === "function") {
                this.onFinished();
            }
        }
    }

    pushIntervalFunction(intervalFunction) {
        this.intervalFunctions.push(intervalFunction);
    }

    valueOf() {
        return this._currentTime;
    }

    get rounds(){
        return this._rounds;
    }

    set rounds(value){
        this._rounds = parseInt(value);
        this.initializeTime();
    }

    get isRunning() {
        return this._isRunning;
    }

    get roundPercentComplete() {
        return Math.floor((10000 * (this._currentTime / this._roundTime)));
    }

    get percentComplete() {
        let rounds;
        if (this.countdownMode) {
            if (this._currentRound - 1 < 0) return 0;
            rounds = this._currentRound - 1;
        }
        else rounds = this._roundsCompleted;

        return Math.floor((10000 *
            (rounds * this._roundTime + this._currentTime) / this._totalTime));
    }

    get minutePercentComplete() {
        return Math.floor((10000 *
            (this._currentTime % MINUTE) / MINUTE));
    }

    get currentRound() {
        return this._currentRound;
    }

    get currentYears() {
        return Math.floor(this._currentTime / YEAR);
    }

    get currentMonths() {
        return Math.floor((this._currentTime % YEAR) / MONTH);
    }

    get currentDays() {
        return Math.floor((this._currentTime % MONTH) / DAY);
    }

    get currentHours() {
        return Math.floor((this._currentTime % DAY) / HOUR);
    }

    get currentMinutes() {
        return Math.floor((this._currentTime % HOUR) / MINUTE);
    }

    get currentSeconds() {
        return Math.floor((this._currentTime % MINUTE) / SECOND);
    }

    get currentMilliseconds() {
        return Math.floor((this._currentTime % SECOND) / MILLISECOND);
    }

    get isRoundComplete() {
        if (this.countdownMode)
            return this._currentTime === 0;
        return this._currentTime === this._roundTime;
    }

    get totalTime() {
        return this._totalTime;
    }

    get isTimerComplete() {
        // stopwatch has no end time
        if (this.stopWatchMode) return false;
        // tells weather times is finished
        if (this.countdownMode)
            return this._currentRound === 0 && this._currentTime === 0;
        return this._currentRound === 0 && this._currentTime === this._roundTime;
    }

    destroy() {
        clearInterval(this.countdownInterval);
        this.intervalFunctions = null;
    }

    static get TIME_ENUM() {
        return TIME_ENUM;
    }
}