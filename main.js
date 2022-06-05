// Date Picker

const datePickerElemAll = document.querySelectorAll('.date-picker');

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();
if (month < 10) {
    currentMonth = '0' + currentMonth;
}
if (currentDay < 10) {
    currentDay = '0' + currentDay;
}
let week;

let currentFullDate = currentYear+'-'+currentMonth+'-'+currentDay;
datePickerElemAll.forEach((datePickerElem) => {
    const selectedDateElem = datePickerElem.querySelector('.selected-date');
    const datesElem = datePickerElem.querySelector('.dates');
    const mthElem = datePickerElem.querySelector('.dates .month .mth');
    const nextMthBtn = datePickerElem.querySelector('.dates .month .next-mth');
    const prevMthBtn = datePickerElem.querySelector('.dates .month .prev-mth');
    const datePickerLabel = document.querySelector('.date-picker-label');
    const datePickerInput = datePickerLabel.querySelector('.date-input');
    const daysElem = datePickerElem.querySelector('.dates .days');
    populateDates();
    selectedDateElem.style.color = '#ABACAF';
    selectedDateElem.textContent = '03 / 02 / 2022';

    datePickerElem.addEventListener('click', toggleDatePicker);
    nextMthBtn.addEventListener('click', goToNextMonth);
    prevMthBtn.addEventListener('click', goToPrevMonth);

    function toggleDatePicker(e) {
        e.preventDefault();
        let path = e.path || (e.composedPath && e.composedPath());
        if (!checkEventPath(path, 'dates')) {
            month = date.getMonth();
            datePickerElem.classList.toggle('active');
            datesElem.classList.toggle('active');
            populateDates();
        }
    }

    function checkEventPath(path, selector) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains(selector)) {
                return true;
            }
        }
        return false;
    }

    function formatDate(date) {

        let day = date.getDate();
        let month = date.getMonth() +1;
        let year = date.getFullYear();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        datePickerInput.setAttribute('value', year + '-' + month + '-' + day);
        selectedDateElem.classList.add('chose');
        return day + ' / ' + month + ' / ' + year;
    }

    function goToNextMonth() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        mthElem.textContent = months[month] + ' ' + year;

        populateDates();
    }

    function goToPrevMonth() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        mthElem.textContent = months[month] + ' ' + year;
        populateDates();
    }

    function populateDates(e) {
        week = document.createElement('tr');
        daysElem.innerHTML = '';
        let amountDays = 0;
        let shiftDays = 0;
        if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
            amountDays = 31;
        } else if (month == 1 && year % 4 === 0) {
            amountDays = 29;
        } else if (month == 1 && year % 4 !== 0) {
            amountDays = 28;
        } else {
            amountDays = 30;
        }

        let firstDayOfMonth = [];
        firstDayOfMonth.push(month + 1);
        firstDayOfMonth.push(1);
        firstDayOfMonth.push(year);
        let currentDayOfMonth = new Date(firstDayOfMonth).toLocaleString('ru', {
            weekday: 'short',
        });
        switch (currentDayOfMonth) {
            case 'пн':
                shiftDays = 0;
                break;
            case 'вт':
                shiftDays = 1;
                break;
            case 'ср':
                shiftDays = 2;
                break;
            case 'чт':
                shiftDays = 3;
                break;
            case 'пт':
                shiftDays = 4;
                break;
            case 'сб':
                shiftDays = 5;
                break;
            case 'вс':
                shiftDays = 6;
                break;
            default:
                break;
        }
        if (shiftDays == 6) {
            daysElem.classList.add('long');
        } else if (shiftDays == 5 && amountDays === 31) {
            daysElem.classList.add('long');
        } else {
            daysElem.classList.remove('long');
        }

        for (let i = 0; i < shiftDays; i++) {
            let emptyDay = document.createElement('td');
            week.appendChild(emptyDay);
        }
        mthElem.textContent = months[month] + ' ' + year;

        for (let i = 1; i <= amountDays; i++) {
            const dayElem = document.createElement('td');
            dayElem.classList.add('day');
            dayElem.textContent = i;
            let currentMonthOfYear = [];
            currentMonthOfYear.push(month + 1);
            currentMonthOfYear.push(i);
            currentMonthOfYear.push(year);
            let currentDayOfWeek = new Date(currentMonthOfYear).toLocaleString('ru', {
                weekday: 'short',
            });
            
            if (currentMonthOfYear[0] < 10) {
                monthDate = '0' + currentMonthOfYear[0];
            } else {
                monthDate = currentMonthOfYear[0]
            }
            if (currentMonthOfYear[1] < 10) {
                dayDate = '0' + currentMonthOfYear[1]
            } else {
                dayDate = currentMonthOfYear[1];
            }

            let test = currentMonthOfYear[2]+'-'+monthDate+'-'+dayDate;
            if (test < currentFullDate) {
                dayElem.classList.add('disabled');
            }
            if (currentDayOfWeek == 'сб' || currentDayOfWeek == 'вс') {
                dayElem.classList.add('disabled');
            }

            if (selectedDay == i && selectedYear == year && selectedMonth == month && currentDayOfWeek !== 'сб' && currentDayOfWeek !== 'вс') {
                dayElem.classList.add('current');
            }

            dayElem.addEventListener('click', function (e) {
                e.target.classList.add('current');
                selectedDate = new Date(year,(month),i);
                selectedDay = i;
                selectedMonth = month;
                selectedYear = year;
                selectedDateElem.style.color = '';
                selectedDateElem.textContent = formatDate(selectedDate);
                selectedDateElem.dataset.value = selectedDate;
                populateDates();
            });

            console.log(currentDayOfWeek);
            if (currentDayOfWeek == 'вс') {
                daysElem.appendChild(week)
            }
            if (currentDayOfWeek == 'пн') {
                week = document.createElement('tr');
            }
            if (i == amountDays-1) {
                daysElem.appendChild(week)
            }

            week.appendChild(dayElem);

            if (i == amountDays) {
                switch (currentDayOfWeek) {
                    case 'пн':
                        shiftDays = 6;
                        break;
                    case 'вт':
                        shiftDays = 5;
                        break;
                    case 'ср':
                        shiftDays = 4;
                        break;
                    case 'чт':
                        shiftDays = 3;
                        break;
                    case 'пт':
                        shiftDays = 2;
                        break;
                    case 'сб':
                        shiftDays = 1;
                        break;
                    case 'вс':
                        shiftDays = 0;
                        break;
                    default:
                        break;
                }
                for (let i = 0; i < shiftDays; i++) {
                    const dayElem = document.createElement('td');
                    week.appendChild(dayElem);


                }
            }
        }
    }
});
