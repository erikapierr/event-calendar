(function(){	
	var app = angular.module('eventsCalendar', []);

	app.controller('eventController', function() {
		this.currentMonth = currentMonth;
		this.nextMonth = nextMonth;
		this.prevMonth = prevMonth;
		this.startDay = setStartDay(currentDate, currentDay);
		calcDays(monthDays);
		this.monthDaysArray = monthDaysArray;
		this.monthForward = function(){
			this.currentMonth = monthArray[monthNumber+1];
			// setMonth(); setStartDay; calcDays
		}
	});

	//date functionality
	todaysDate = new Date();
	currentDay = todaysDate.getDay();
	currentDate = todaysDate.getDate();
	monthNumber = todaysDate.getMonth();
	monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	currentMonth = monthArray[monthNumber];
	prevMonth = 0;
	nextMonth = 0;
	monthDays = 0;	
	monthDaysArray = [];
	//how to use this function to do past present or future month...
	setMonth = function() {
		if (monthNumber > 0) {
			prevMonth = monthArray[monthNumber - 1];
		} else {
			prevMonth = monthArray[11];
		}
		if (monthNumber < 11) {
			nextMonth = monthArray[monthNumber + 1]; 
		} else {
			nextMonth = monthArray[0];
		}
		if (currentMonth == "January" || "March" || "May" || "July" || "August" || "October" || "December") {
			monthDays = 31;
		} else if (currentMonth = "February" && todaysDate.getYear() % 4 == 0) {
			monthDays = 29;
		} else if (currentMonth = "February" && todaysDate.getYear() % 4 != 0) {
			monthDays = 28;
		} else {
			monthDays = 30;
		}
	};
	calcDays = function(days) {
		var totalDays = 35;
		for (var i=1;i<=days;i++) {
			monthDaysArray.push(i);
		}
		for (var i=0;i<startDay;i++) {
			monthDaysArray.unshift("");
		}
		for (var i=0;i<35 - startDay - days; i++){
			monthDaysArray.push(i);
		}
	};
	setStartDay = function (myDate, myDay) {
		for (var i=0;i<7;i++) {
			if ((myDate + i) % 7 == 0) {
				startDay = myDay + i + 1;
				if (startDay >= 7) {
					startDay = startDay - 7;
				}
			}
		}
		startDayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		return startDayArray[startDay];
	};			
})();
