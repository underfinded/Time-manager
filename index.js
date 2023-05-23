const stopWatch = document.querySelector('.stopwatch');
const timer = document.querySelector('.timer');
const time = document.querySelector('.time');


const timeDisplay = document.querySelector('.time__display');

const StopWatchDisplay = document.querySelector('.stopwatch__display');
const StopWatchButtonB = document.querySelector('.stopwatch__button-b');
const StopWatchButton = document.querySelector('.stopwatch__button-a');


const TimerWrap = document.querySelector('.timer_timeout-wrapper');
const TimerButtonB = document.querySelector('.timer__button-b');
const TimerButton = document.querySelector('.timer__button-a');
const TimerInput = document.querySelector('.timer__input');


const navParagraph = document.querySelectorAll('.nav__paragraph');

const test = document.querySelectorAll('.test');

const wrap = document.querySelector('.wrapper');
const mainBlock = document.querySelector('.main_block');
const ThemeChanger = document.querySelector('.theme_changer');

let activeWindow = localStorage.getItem('activeWindow');
//time.style.display = 'flex';

const audio = new Audio('audio.mp3');
//audio.play();

const li = document.querySelectorAll('.nav__li-element');

const hourHand = document.querySelector('.hour_hand');
const minuteHand = document.querySelector('.minute_hand');
const secondHand = document.querySelector('.second_hand');

const SWhand = document.querySelector('.stopwatch__hand');

let localnowTheme = localStorage.getItem('nowTheme');

let TimerElem;

let ZZouthours,
    ZZoutminutes,
    ZZoutSeconds;

let Tsecond = 0,
    Tminute = 0,
    hand = 0;

let fixedSeconds = 0;
let ElementHeightOnePiece;

let Sinterval,
    Stime = 0,
    Scheck = true;

let Tcheck = true,
    TtimeInterval;

var sound;
let nowTheme = true;

let timeOut;
let TimeOutBTN;

var elementA,
    elementB,
    elementC,
    elementD;

for (let hh of navParagraph) {
    hh.addEventListener('click', () => {
        for (let jj of navParagraph) {
            jj.classList.remove('active');
        }
        hh.classList.add('active');
    });
};

for (let i = 0; i < navParagraph.length; ++i) {
    navParagraph[i].addEventListener('click', () => {
        for (let a of test) {
            a.style.display = 'none';
        }

        test[i].style.display = 'flex';
        localStorage.setItem('activeWindow', i);
    })
}



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


setInterval(() => {
    clock();
    setTime();
}, 1000);
clock(); setFirstTime(); SetFixedSeconds();


function setFirstTime() {
    hourHand.style.transform = `rotate(${ZZouthours * 30}deg)`;
    minuteHand.style.transform = `rotate(${ZZoutminutes * 6}deg)`;
    secondHand.style.transform = `rotate(${ZZoutSeconds * 6}deg)`;
}

function setTime() {
    hourHand.style.transform = `rotate(${ZZouthours * 30}deg)`;
    minuteHand.style.transform = `rotate(${ZZoutminutes * 6}deg)`;
    secondHand.style.transform = `rotate(${++fixedSeconds * 6}deg)`;
}

function SetFixedSeconds() { fixedSeconds = ZZoutSeconds; }

// -----------------

StopWatchButton.addEventListener('click', () => {
    if (Tcheck == true) {
        TtimeInterval = setInterval(() => {
            Tsecond++;
            StopWatchDisplay.textContent = `${Tminute} : ${Tsecond}`;
            SWhand.style.transform = `rotate(${++hand * 6}deg)`;
            if (Tsecond == 60) {
                Tminute++;
                Tsecond = 0;
            }

        }, 1000);
        StopWatchButton.textContent = 'пауза';
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
    SWhand.style.transform = `rotate(0deg)`;
    hand = 0;
})

// -----------------



TimerInput.addEventListener('change', () => {
    if (TimerInput.value < 1) {
        TimerInput.value = 1;
    }
    else if (TimerInput.value > 999) {
        TimerInput.value = 999;
    }
})


function SetTimerElement() {
    elementD = document.createElement('div');
    elementD.className = `timer_timeout-element`;
    TimerWrap.append(elementD);

    TimerElem = document.querySelector('.timer_timeout-element');
}


let ElementHeight = 220;
let ElementHeightPrend = 0;

Timer();
function Timer() {
    TimerButton.addEventListener('click', () => {
        if (Scheck == true) {
            if (TimerInput.value == 0) {
                TimerInput.value = 1;
            }

            Stime = TimerInput.value;

            SetTimerElement();
            ElementHeightOnePiece = ElementHeight / Stime;
            TimerElem.style.height = `${ElementHeight}px`;

            Sinterval = setInterval(() => {
                TimerInput.value = --Stime;
                ElementHeightPrend = ElementHeight - ElementHeightOnePiece;
                ElementHeight = ElementHeightPrend;
                TimerElem.style.height = `${ElementHeightPrend}px`;

                if (Stime == 0) {
                    addTimeOutWindow(); soundEffect();
                    clearInterval(Sinterval);
                    TimerButton.textContent = 'Старт';
                    TimerElem.style.height = '0px';
                    setTimeout(() => {
                        elementD.remove();
                    }, 500)
                    ElementHeight = 220;

                }
            }, 1000);
            TimerButton.textContent = 'Стоп';
            Scheck = false;
        }
        else if (Scheck == false) {
            clearInterval(Sinterval);
            TimerButton.textContent = 'Старт';
            Scheck = true;

            TimerElem.style.height = '0px';
            setTimeout(() => {
                elementD.remove();
            }, 500)

            ElementHeight = 220;
        }
    })
}



function soundEffect() {
    sound = setInterval(() => {
        audio.play();
    }, 100)
}

TimerButtonB.addEventListener('click', () => {
    clearInterval(Sinterval);
    TimerButton.textContent = 'Старт';
    Scheck = true;
    Stime = 0;
    TimerInput.value = '0';

    TimerElem.style.height = '0px';
    setTimeout(() => {
        elementD.remove();
    }, 500)

    ElementHeight = 220;
    deleteTimeOutWindow();
});


ThemeChanger.addEventListener('click', changeTheme);


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



function checkNull() {
    if (localnowTheme === null) {
        localStorage.setItem('nowTheme', nowTheme);
        location.reload();
    }
    if (activeWindow === null) {
        localStorage.setItem('activeWindow', '0');
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


    if (activeWindow === '0') {
        stopWatch.style.display = 'none';
        timer.style.display = 'none';
        time.style.display = 'flex';
    }
    if (activeWindow === '1') {
        stopWatch.style.display = 'flex';
        timer.style.display = 'none';
        time.style.display = 'none';
    }
    if (activeWindow === '2') {
        stopWatch.style.display = 'none';
        timer.style.display = 'flex';
        time.style.display = 'none';
    }
}
autoApplyData();



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
    })
}

function deleteTimeOutWindow() {
    timeOut.style.top = '-200px';
    setTimeout(() => {
        elementA.remove();
        elementB.remove();
        elementC.remove();
    }, 300);
    clearInterval(sound);
}

//  https://api.openweathermap.org/data/2.5/weather?q=moscow&apikey=d044310d9f2da5fdd577679ae8d330cf