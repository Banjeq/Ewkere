var date = new Date();
      var currentYear = date.getFullYear();
      var currentMonth = date.getMonth();
      var calendar = document.querySelector('#calendar');
      var prev = calendar.querySelector('.prev');
      var next = calendar.querySelector('.next');
      var notes = document.querySelector('.notes');
      var notesArr = [];

      // Календарь

      initCalendar(currentYear, currentMonth, calendar, date);

      prev.addEventListener('click', function() {
        currentYear = getPrevYear(currentYear, currentMonth);
        currentMonth = getPrevMonth(currentMonth);
        changeMonth(-1, currentYear, currentMonth, calendar, date);
      });

      next.addEventListener('click', function() {
        currentYear = getNextYear(currentYear, currentMonth);
        currentMonth = getNextMonth(currentMonth);
        changeMonth(1, currentYear, currentMonth, calendar, date);
      });

      function changeMonth(n, currentYear, currentMonth, calendar, date) {
        date.setMonth(date.getMonth() + n);
        initCalendar(currentYear, currentMonth, calendar, date);
      }

      function initCalendar(year, month, calendar, date) {
        var dates = calendar.querySelector('.dates');
        var info = calendar.querySelector('.info');
        var prev = calendar.querySelector('.prev');
        var next = calendar.querySelector('.next');
        createCalendar(currentYear, currentMonth, dates, date);
        showInfo(year, month, info);
      }

      function createCalendar(year, month, dates, date) {
        dates.innerHTML = '';
        var firstDay = new Date(year, month);
        var lastDay = new Date(year, month + 1, 0);
        var nextFirstDay = new Date(year, month + 1);
        var monthLength = (nextFirstDay - firstDay) / (3600 * 24000);
        var daysToMon = getNumDayToMon(year, month);
        var daysToSun = getNumDayToSun(year, month);

        var startDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - daysToMon);
        fillCalendar(dates, monthLength, daysToMon, daysToSun, startDay);
      }

      function fillCalendar(dates, monthLength, daysToMon, daysToSun, startDay) {
        for (var i = 0; i < (monthLength + daysToMon + daysToSun) / 7; i++) {
          var tr = document.createElement('tr');
          dates.appendChild(tr);
          for (var j = 0; j < 7; j++) {
            var td = document.createElement('td');
            td.dataset.date = startDay.getDate() + '-' + startDay.getMonth() + '-' + startDay.getFullYear();
            tr.appendChild(td);
            td.innerHTML = startDay.getDate();

            if (startDay.getMonth() != date.getMonth()) {
              td.classList.add('disabled');
            } else {
              td.classList.add('enabled');
            }

            startDay.setDate(startDay.getDate() + 1);

            if (!td.classList.contains('disabled')) {
              td.addEventListener('click', function() {
                var self = this;
                selectCellHandler(self, document.querySelectorAll('.enabled'));
              })
            }
          }
        }
      }

      function getNumDayToMon(year, month) {
        var date = new Date(year, month, 1);
        return date.getDay() - 1;
      }

      function getNumDayToSun(year, month) {
        var date = new Date(year, month + 1, 0);
        var num = Math.abs(date.getDay() - 7);

        if (num == 7) {
          return 0;
        } else {
          return num;
        }
      }

      function showInfo(year, month, elem) {
        elem.innerHTML = getMonthName(month) + ' ' + year;
      }

      function getMonthName(num) {
        var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август', 'Сентябрь','Октябрь','Ноябрь','Декабрь'];
        return months[num];
      }


      function getPrevMonth(month) {
        if (month == 0) {
          return 11;
        } else {
          return month -1;
        }
      }

      function getPrevYear(year, month) {
        if (month == 0) {
          return year - 1;
        } else {
          return year;
        }
      }

      function getNextMonth(month) {
        if (month == 11) {
          return 0;
        } else {
          return month + 1;
        }
      }

      function getNextYear(year, month) {
        if (month == 11) {
          return year + 1;
        } else {
          return year;
        }
      }

      // Список дел

      function selectCellHandler(self, cells) {
        for (var i = 0; i < cells.length; i++) {
          if (cells[i].classList.contains('active')) {
            cells[i].classList.toggle('active');
          }
        }

        self.classList.toggle('active');
        initNotes(notes, self);
      }

      function initNotes(notes, elem) {
        if (!notes.children.length) {
          createNote(notes, elem);
        } else {
          notes.removeChild(notes.firstElementChild);
          loadNotes(elem.dataset.date, notes, elem);
        }
      }

      function createNote(notes, elem) {
        var div = document.createElement('div');

        var input = document.createElement('input');

        var addBtn = document.createElement('button');
        addBtn.innerHTML = 'add note';

        var selectedDate = document.createElement('span');
        selectedDate.style.display = 'block';
        selectedDate.innerHTML = getCurrentDate(elem.dataset.date);

        var notesList = document.createElement('ul');
        fillList(elem.dataset.date, notesList);

        notes.appendChild(div);
        div.appendChild(input);
        div.appendChild(addBtn);
        div.appendChild(selectedDate);
        div.appendChild(notesList);

        console.log(elem);

        addBtn.addEventListener('click', function() {
          addNewNote(notesList, false, input.value);
          saveNotes(elem.dataset.date, div);
        });

        div.addEventListener('click', function() {
          saveToStorage(elem.dataset.date, notesList);
        });
      }

      function fillList(currentDate, list) {
        let obj = JSON.parse(localStorage.getItem(currentDate));
        console.log(obj);

        if (obj) {
          for (let i = 0; i < obj.text.length; i++) {
            addNewNote(list, obj.checked[i], obj.text[i], obj.active[i]);
          }
        }
      }

      function saveToStorage(currentDate, list) {
        let checkbox = list.querySelectorAll('li > input');
        let pars = list.querySelectorAll('li > p');
        let obj = {
          checked: [],
          text: [],
          active: [],
        };

        for (let i = 0; i < pars.length; i++) {
          obj.checked.push(checkbox[i].checked);
          obj.text.push(pars[i].innerHTML);

          if (pars[i].classList.contains('complete')) {
            obj.active.push(true);
          }
        }

        localStorage.setItem(currentDate, JSON.stringify(obj));
      }

      function saveNotes(date, elem) {
        var flag = false;
        for (var i = 0; i < notesArr.length; i++) {
          if (notesArr[i].date == date) {
            notesArr[i].notes = elem;
            flag = true;
            return;
          }
        }
        if (!flag) {
          var obj = {
            notes: elem,
            date: date
          }

          notesArr.push(obj);
        }
      }

      function loadNotes(date, notes, elem) {
        var flag = false;
        for (i = 0; i < notesArr.length; i++) {
          if (notesArr[i].date == date) {
            notes.appendChild(notesArr[i].notes);
            flag = true;
            return;
          }
        }
        if (!flag) {
          createNote(notes, elem);
        }
      }

      function addNewNote(list, checked, text, active) {
        var li = document.createElement('li');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked;

        var p = document.createElement('p');
        p.style.display = 'inline-block';
        p.innerHTML = text;

        if (active) {
          p.classList.add('complete');
        }

        var a = document.createElement('a');
        a.href = '#';
        a.innerHTML = ' X';

        li.appendChild(checkbox);
        li.appendChild(p);
        li.appendChild(a);
        list.appendChild(li);

        checkbox.addEventListener('click', completeNote);
        p.addEventListener('dblclick', editNote);
        a.addEventListener('click', removeNote);
      }

      function completeNote() {
        if (this.nextElementSibling.classList.contains('complete')) {
          this.nextElementSibling.classList.remove('complete');
        } else {
          this.nextElementSibling.classList.add('complete');
        }
      }

      function editNote() {
        var input = document.createElement('input');
        var self = this;
        input.type = 'text';
        input.value = this.innerHTML;

        this.innerHTML = '';
        this.appendChild(input);

        this.removeEventListener('dblclick', editNote);
        input.addEventListener('keydown', function(evt) {
          if (evt.keyCode == '13') {
            setText(self, input.value);
          }
        });
      }

      function setText(elem, text) {
        elem.innerHTML = text;
      }

      function removeNote() {
        this.parentElement.remove();
      }

      function getCurrentDate(elem) {
        var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        var arr = elem.split('-');
        var newDate = arr[0] + ' ' + months[arr[1]] + ' ' + arr[2];
        return newDate;
      }