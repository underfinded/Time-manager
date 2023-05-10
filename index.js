const stopWatch = document.querySelector('.stopwatch');
const timer = document.querySelector('.timer');
const time = document.querySelector('.time');


const timeDisplay = document.querySelector('.time__display');

const StopWatchDisplay = document.querySelector('.stopwatch__display');
const StopWatchButtonB = document.querySelector('.stopwatch__button-b');
const StopWatchButton = document.querySelector('.stopwatch__button-a');

const TimerButtonB = document.querySelector('.timer__button-b');
const TimerButton = document.querySelector('.timer__button-a');
const TimerInput = document.querySelector('.timer__input');

const navParagraph = document.querySelectorAll('.nav__paragraph');

let activeWindow = localStorage.getItem('activeWindow');
//time.style.display = 'flex';

let audio = new Audio('audio.mp3');
//audio.play();

const li = document.querySelectorAll('.nav__li-element');

for (let hh of navParagraph) {
    hh.addEventListener('click', () => {
        for (let jj of navParagraph) {
            jj.classList.remove('active');
        }
        hh.classList.add('active');
    });
};

const hourHand = document.querySelector('.hour_hand');
const minuteHand = document.querySelector('.minute_hand');
const secondHand = document.querySelector('.second_hand');
let ZZouthours,
    ZZoutminutes,
    ZZoutSeconds;

navParagraph[0].addEventListener('click', () => {
    stopWatch.style.display = 'none';
    timer.style.display = 'none';
    time.style.display = 'flex';
    //    localStorage.clear('activeWindow');
    localStorage.setItem('activeWindow', '1');
})
navParagraph[1].addEventListener('click', () => {
    stopWatch.style.display = 'flex';
    timer.style.display = 'none';
    time.style.display = 'none';
    //    localStorage.clear('activeWindow');
    localStorage.setItem('activeWindow', '2');
})
navParagraph[2].addEventListener('click', () => {
    stopWatch.style.display = 'none';
    timer.style.display = 'flex';
    time.style.display = 'none';
    //    localStorage.clear('activeWindow');
    localStorage.setItem('activeWindow', '3');
})

let nado = 0;

function clock() {
    var date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    timeDisplay.textContent = `${hours} : ${minutes}`;

    ZZouthours = hours;
    ZZoutminutes = minutes;
    ZZoutSeconds = seconds;
}



setInterval(()=>{
    clock();
    setTime();
}, 1000);
clock();setFirstTime();nadoF();


function setFirstTime(){
    hourHand.style.transform = `rotate(${ZZouthours * 30}deg)`;
    minuteHand.style.transform = `rotate(${ZZoutminutes * 6}deg)`;
    secondHand.style.transform = `rotate(${ZZoutSeconds * 6}deg)`;
}

function setTime(){
    hourHand.style.transform = `rotate(${ZZouthours * 30}deg)`;
    minuteHand.style.transform = `rotate(${ZZoutminutes * 6}deg)`;
    secondHand.style.transform = `rotate(${++nado * 6}deg)`;
}

function nadoF(){
    nado = ZZoutSeconds;
}

// -----------------

const SWhand = document.querySelector('.stopwatch__hand');

let Tsecond = 0;
let Tminute = 0;
let ha = 0;

let Tcheck = true;
let TtimeInterval;
StopWatchButton.addEventListener('click', () => {
    if (Tcheck == true) {
        TtimeInterval = setInterval(() => {
            Tsecond++;
            StopWatchDisplay.textContent = `${Tminute} : ${Tsecond}`;
            SWhand.style.transform = `rotate(${++ha * 6}deg)`;
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
        SWhand.style.transform = `rotate(0deg)`;
        ha = 0;
    }
})

StopWatchButtonB.addEventListener('click', () => {
    StopWatchDisplay.textContent = `0 : 0`;
    clearInterval(TtimeInterval);
    StopWatchButton.textContent = 'старт';
    Tcheck = true;
    Tminute = 0;
    Tsecond = 0;
    SWhand.style.transform = `rotate(0deg)`;
    ha = 0;
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

function soundEffect() {
    gdz = setInterval(() => {
        audio.play();
    }, 100)
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

        document.querySelector('.time__text').style.color = '#000';
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

        document.querySelector('.time__text').style.color = '#fff';
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
    if (localnowTheme <= 0) {
        localStorage.setItem('nowTheme', nowTheme);
        location.reload();
    }
    if (activeWindow <= 0) {
        localStorage.setItem('activeWindow', '1');
        location.reload();
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

        document.querySelector('.time__text').style.color = '#000';
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

        document.querySelector('.time__text').style.color = '#fff';
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

function addTimeOutWindow() {
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

function n2() {
    TimeOutBTN.addEventListener('click', () => {
        deleteTimeOutWindow();
        clearInterval(gdz);
    })
}

function deleteTimeOutWindow() {
    timeOut.style.top = '-200px';
    setTimeout(() => {
        elementA.remove();
        elementB.remove();
        elementC.remove();
    }, 300)
}