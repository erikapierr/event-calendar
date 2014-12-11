(function(){	
	var app = angular.module('eventsCalendar', []);

	app.controller('CalendarController', function() {
		this.todaysDate = new Date();
		this.currentYear = this.todaysDate.getYear();
		this.currentDay = this.todaysDate.getDay();
		this.currentDate = this.todaysDate.getDate();
		this.monthNumber = this.todaysDate.getMonth();
		this.monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.currentMonth = this.monthArray[this.monthNumber];
		this.prevMonth = 0;
		this.nextMonth = 0;
		this.monthDays = 0;	
		this.monthDaysArray = [];

		//set initial values for calendar
		//calculates number of days in month & pushes to array based on start date
		this.calcDays = function(days) {
			var totalDays = 35;
			for (var i=0;i<this.startDay;i++) {
				this.monthDaysArray.unshift(" ");
			}
			for (var i=1;i<=days;i++) {
				this.monthDaysArray.push(i);
			}
			for (var i=0;i<35 - this.startDay - days; i++){
				this.monthDaysArray.push(" ");
			}
		};
		//sets initial starting date
		this.setStartDay = function (myDate, myDay) {
			for (var i=0;i<7;i++) {
				if ((myDate + i) % 7 == 0) {
					this.startDay = myDay + i + 1;
					if (this.startDay >= 7) {
						this.startDay = this.startDay - 7;
					}
				}
			}
			this.startDayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			return this.startDayArray[this.startDay];
		};
		//sets current, previous, and next month, plus # of days in month			
		this.setMonth = function() {
			if (this.monthNumber > 0) {
				this.prevMonth = this.monthArray[this.monthNumber - 1];
			} else {
				this.prevMonth = this.monthArray[11];
			}
			if (this.monthNumber < 11) {
				this.nextMonth = this.monthArray[this.monthNumber + 1]; 
			} else {
				this.nextMonth = this.monthArray[0];
			}
			if (this.currentMonth == "January" || this.currentMonth == "March" || this.currentMonth == "May" || this.currentMonth == "July" || this.currentMonth == "August" || this.currentMonth == "October" || this.currentMonth == 	"December") {
				this.monthDays = 31;
				} else if (this.currentMonth == "February" && this.currentYear % 4 == 0) {
				this.monthDays = 29;
			} else if (this.currentMonth == "February" && this.currentYear % 4 != 0) {
				this.monthDays = 28;
			} else {
				this.monthDays = 30;
			}
		};
		this.setMonth();
		this.setStartDay(this.currentDate, this.currentDay);
		this.calcDays(this.monthDays);

		//changing month - back or forward
		this.monthChange = function(newMonth) {
			this.startDay = (this.startDay + this.monthDays) % 7;
			if (this.startDay > 7) {
				this.startDay = this.startDay - 7;
			}
			this.monthDaysArray=[];
			if (newMonth == "forward") {
				if (this.monthNumber != 11) {
					this.monthNumber++;
					this.currentYear++;
				} else if (this.monthNumber == 11) {
					this.monthNumber = 0;
				}
			} else if (newMonth == "back") {
				if (this.monthNumber != 0) {
					this.monthNumber--;
					this.currentYear--;	
				} else if (this.monthNumber == 0) {
					this.monthNumber = 11;
				}
			}
			this.currentMonth = this.monthArray[this.monthNumber];
			this.setMonth();
			this.calcDays(this.monthDays);
		};
	});
})();
