// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
	info: {
		color: "green"
	},
	warning: {
		color: "orange",
		threshold: WARNING_THRESHOLD
	},
	alert: {
		color: "red",
		threshold: ALERT_THRESHOLD
	}
};

const TIME_LIMIT = 1800;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
	timeLeft
)}</span>
</div>
`;

startTimer();

function onTimesUp() {
	clearInterval(timerInterval);
}

function startTimer() {
	timerInterval = setInterval(() => {
		timePassed = timePassed += 1;
		timeLeft = TIME_LIMIT - timePassed;
		document.getElementById("base-timer-label").innerHTML = formatTime(
			timeLeft
		);
		setCircleDasharray();
		setRemainingPathColor(timeLeft);

		if (timeLeft === 0) {
			onTimesUp();
		}
	}, 1000);
}

function formatTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = time % 60;

	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
	const { alert, warning, info } = COLOR_CODES;
	if (timeLeft <= alert.threshold) {
		document
			.getElementById("base-timer-path-remaining")
			.classList.remove(warning.color);
		document
			.getElementById("base-timer-path-remaining")
			.classList.add(alert.color);
	} else if (timeLeft <= warning.threshold) {
		document
			.getElementById("base-timer-path-remaining")
			.classList.remove(info.color);
		document
			.getElementById("base-timer-path-remaining")
			.classList.add(warning.color);
	}
}

function calculateTimeFraction() {
	const rawTimeFraction = timeLeft / TIME_LIMIT;
	return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
	const circleDasharray = `${(
		calculateTimeFraction() * FULL_DASH_ARRAY
	).toFixed(0)} 283`;
	document
		.getElementById("base-timer-path-remaining")
		.setAttribute("stroke-dasharray", circleDasharray);
}









document.addEventListener('DOMContentLoaded', () => {

	//===== MICRO-SLIDER begin
	const __ms = document.querySelector('.micro-slider');
	const __msSlider = new MicroSlider(__ms, { indicators: true, indicatorText: '' });
	const hammer = new Hammer(__ms);
	const __msTimer = 2000;
	let __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);

	//detect mouseenter event
	__ms.onmouseenter = function (e) {
		clearInterval(__msAutoplay);
		console.log(e.type + ' mouse detected');
	}

	//detect mouseleave event
	__ms.onmouseleave = function (e) {
		clearInterval(__msAutoplay);
		__msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
		console.log(e.type + ' mouse detected');
	}

	//detect mouseclick event
	__ms.onclick = function (e) {
		clearInterval(__msAutoplay);
		console.log(e.type + ' mouse detected');
	}

	//detect gesture tap event with hammer js library
	hammer.on('tap', function (e) {
		clearInterval(__msAutoplay);
		console.log(e.type + ' gesture detected');
	});

	//detect gesture swipe event with hammer js library
	hammer.on('swipe', function (e) {
		clearInterval(__msAutoplay);
		__msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
		console.log(e.type + ' gesture detected');
	});

	let slideLink = document.querySelectorAll('.slider-item');
	if (slideLink && slideLink !== null && slideLink.length > 0) {
		slideLink.forEach(el => el.addEventListener('click', e => {
			e.preventDefault();
			let href = el.dataset.href;
			let target = el.dataset.target;
			if (href !== '#') window.open(href, target);
		}));
	}

	//===== MICRO-SLIDER end

});