const stopWatch = document.querySelector('.main_block__stopwatch');
const timer = document.querySelector('.main_block__timer');
const time = document.querySelector('.main_block__time');


const timeDisplay = document.querySelector('.main_block__time__display');

const StopWatchDisplay = document.querySelector('.main_block__stopwatch__display');
const StopWatchButtonB = document.querySelector('.main_block__stopwatch__button_b');
const StopWatchButton = document.querySelector('.main_block__stopwatch__button');

const TimerButtonB = document.querySelector('.main_block__timer__button_b');
const TimerButton = document.querySelector('.main_block__timer__button');
const TimerInput = document.querySelector('.main_block__timer__input');

const navParagraph = document.querySelectorAll('.main_block__nav__paragraph');

let activeWindow = localStorage.getItem('activeWindow');
//time.style.display = 'flex';

let audio = new Audio('audio.mp3');
//audio.play();

const li = document.querySelectorAll('.li');

for (let hh of navParagraph) {
    hh.addEventListener('click', () => {
        for (let jj of navParagraph) {
            jj.classList.remove('active');
        }
        hh.classList.add('active');
    });
};

li[0].addEventListener('click', () => {
    stopWatch.style.display = 'none';
    timer.style.display = 'none';
    time.style.display = 'flex';
    //    localStorage.clear('activeWindow');
    localStorage.setItem('activeWindow', '1');
})
li[1].addEventListener('click', () => {
    stopWatch.style.display = 'flex';
    timer.style.display = 'none';
    time.style.display = 'none';
    //    localStorage.clear('activeWindow');
    localStorage.setItem('activeWindow', '2');
})
li[2].addEventListener('click', () => {
    stopWatch.style.display = 'none';
    timer.style.display = 'flex';
    time.style.display = 'none';
    //    localStorage.clear('activeWindow');
    localStorage.setItem('activeWindow', '3');
})


function clock() {
    var date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    timeDisplay.textContent = `${hours} : ${minutes}`;
}
setInterval(clock, 1000);
clock();

// -----------------

let Tsecond = 0;
let Tminute = 0;

let Tcheck = true;
let TtimeInterval;
StopWatchButton.addEventListener('click', () => {
    if (Tcheck == true) {
        TtimeInterval = setInterval(() => {
            Tsecond++;
            StopWatchDisplay.textContent = `${Tminute} : ${Tsecond}`;

            if (Tsecond == 60) {
                Tminute++;
                Tsecond = 0;
            }
        }, 1000);
        StopWatchButton.textContent = 'стоп';
        Tcheck = false;
    }
    else if (Tcheck == false) {
        clearInterval(TtimeInterval);
        StopWatchButton.textContent = 'старт';
        Tcheck = true;
    }
})

StopWatchButtonB.addEventListener('click', () => {
    StopWatchDisplay.textContent = `0 : 0`;
    clearInterval(TtimeInterval);
    StopWatchButton.textContent = 'старт';
    Tcheck = true;
    Tminute = 0;
    Tsecond = 0;
})

// -----------------

var Stime = 0;
let Scheck = true;
let Sinterval;

TimerInput.addEventListener('change', () => {
    if (TimerInput.value < 1) {
        TimerInput.value = 1;
    }
    else if (TimerInput.value > 999) {
        TimerInput.value = 999;
    }
})

var gdz;

Timer();
function Timer() {
    TimerButton.addEventListener('click', () => {
        Stime = TimerInput.value;

        if (Scheck == true) {
            Stime = TimerInput.value;
            Sinterval = setInterval(() => {
                TimerInput.value = --Stime;
                if (Stime == 0) {
                    addTimeOutWindow(); soundEffect();
                    clearInterval(Sinterval);
                    TimerButton.textContent = 'Старт';
                }
            }, 1000);
            TimerButton.textContent = 'Стоп';
            Scheck = false;
        }
        else if (Scheck == false) {
            clearInterval(Sinterval);
            TimerButton.textContent = 'Старт';
            Scheck = true;
        }
    })
}

function soundEffect(){
    gdz = setInterval(()=>{
        audio.play();
    },100)
}

TimerButtonB.addEventListener('click', () => {
    clearInterval(Sinterval);
    TimerButton.textContent = 'Старт';
    Scheck = true;
    Stime = 0;
    TimerInput.value = '0';
});

const wrap = document.querySelector('.wrapper');
const mainBlock = document.querySelector('.main_block');
const ThemeChanger = document.querySelector('.theme_changer');
ThemeChanger.addEventListener('click', changeTheme);

let nowTheme = true;

function changeTheme() {
    if (nowTheme === true) {
        wrap.style.background = '#fff';
        mainBlock.style.boxShadow = '0 0 10px #000';
        nowTheme = false;

        for (let z of navParagraph) {
            z.classList.remove('white');
            z.classList.add('black');
        }

        document.querySelector('.main_block__time__text').style.color = '#000';
        timeDisplay.style.color = '#000';
        StopWatchDisplay.style.color = '#000';
        StopWatchButtonB.style.color = '#000';
        StopWatchButton.style.color = '#000';
        TimerButtonB.style.color = '#000';
        TimerButton.style.color = '#000';
        TimerInput.style.color = '#000';
        //        localStorage.clear('nowTheme');
        localStorage.setItem('nowTheme', nowTheme);
        //        console.log(localStorage.getItem('nowTheme'));
    }
    else if (nowTheme === false) {
        wrap.style.background = '#000';
        mainBlock.style.boxShadow = '0 0 10px #fff';
        nowTheme = true;

        for (let z of navParagraph) {
            z.classList.remove('black');
            z.classList.add('white');
        }

        document.querySelector('.main_block__time__text').style.color = '#fff';
        timeDisplay.style.color = '#fff';
        StopWatchDisplay.style.color = '#fff';
        StopWatchButtonB.style.color = '#fff';
        StopWatchButton.style.color = '#fff';
        TimerButtonB.style.color = '#fff';
        TimerButton.style.color = '#fff';
        TimerInput.style.color = '#fff';
        //        localStorage.clear('nowTheme');
        localStorage.setItem('nowTheme', nowTheme);
        //        console.log(localStorage.getItem('nowTheme'));
    }
}

let localnowTheme = localStorage.getItem('nowTheme');

function checkNull() {
    if (localnowTheme === null) {
        localStorage.setItem('nowTheme', nowTheme);
    }
    if (activeWindow === null) {
        localStorage.setItem('activeWindow', '1');
    }
}
checkNull();

function autoApplyData() {
    if (localnowTheme === 'false') {
        wrap.style.background = '#fff';
        mainBlock.style.boxShadow = '0 0 10px #000';
        nowTheme = false;

        for (let z of navParagraph) {
            z.classList.remove('white');
            z.classList.add('black');
        }

        document.querySelector('.main_block__time__text').style.color = '#000';
        timeDisplay.style.color = '#000';
        StopWatchDisplay.style.color = '#000';
        StopWatchButtonB.style.color = '#000';
        StopWatchButton.style.color = '#000';
        TimerButtonB.style.color = '#000';
        TimerButton.style.color = '#000';
        TimerInput.style.color = '#000';
    }
    else if (localnowTheme === 'true') {
        wrap.style.background = '#000';
        mainBlock.style.boxShadow = '0 0 10px #fff';
        nowTheme = true;

        for (let z of navParagraph) {
            z.classList.remove('black');
            z.classList.add('white');
        }

        document.querySelector('.main_block__time__text').style.color = '#fff';
        timeDisplay.style.color = '#fff';
        StopWatchDisplay.style.color = '#fff';
        StopWatchButtonB.style.color = '#fff';
        StopWatchButton.style.color = '#fff';
        TimerButtonB.style.color = '#fff';
        TimerButton.style.color = '#fff';
        TimerInput.style.color = '#fff';
    }



    if (activeWindow === '1') {
        stopWatch.style.display = 'none';
        timer.style.display = 'none';
        time.style.display = 'flex';
    }
    if (activeWindow === '2') {
        stopWatch.style.display = 'flex';
        timer.style.display = 'none';
        time.style.display = 'none';
    }
    if (activeWindow === '3') {
        stopWatch.style.display = 'none';
        timer.style.display = 'flex';
        time.style.display = 'none';
    }
}
autoApplyData();

let timeOut;
let TimeOutBTN;

var elementA;
var elementB;
var elementC;

function addTimeOutWindow(){
    elementA = document.createElement('div');
    elementA.className = 'time_out';
    document.body.append(elementA);

    timeOut = document.querySelector('.time_out');

    elementB = document.createElement('p');
    elementB.className = 'time_out__p';
    elementB.textContent = 'ВРЕМЯ ТАЙМЕРА ИСТЕКЛО';
    timeOut.prepend(elementB);

    elementC = document.createElement('button');
    elementC.className = 'time_out__btn';
    elementC.textContent = 'OK';
    timeOut.append(elementC);

    TimeOutBTN = document.querySelector('.time_out__btn');
    n2();
}

function n2(){
    TimeOutBTN.addEventListener('click', ()=>{
        deleteTimeOutWindow();
        clearInterval(gdz);
    })
}

function deleteTimeOutWindow(){
    timeOut.style.top = '-200px';
    setTimeout(()=>{
        elementA.remove();
        elementB.remove();
        elementC.remove();
    }, 300)
}