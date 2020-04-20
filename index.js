import { TimelineLoop } from 'looop.js';

const playPauseButton = document.querySelector('#play-pause-button');
const range = document.querySelector('input[type="range"]');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const timeline = new TimelineLoop();

timeline.addTrack({
  id: 'blue',
  interpolation: {
    type: 'linear',
  },
  duration: 5000,
  delay: 0,
  wrap: true,
  segments: [
    {
      position: 0,
      value: 0,
      type: 'expoInOut',
    },
    {
      position: 0.5,
      value: 1,
      type: 'expoInOut',
    }
  ],
  onUpdate: ({ value, currentTime }) => {
    context.fillStyle = 'blue';
    context.clearRect(0, 0, 115, 10);
    context.fillRect(value * 100, 0, 10, 10);
  },
});

timeline.addTrack({
  id: 'red',
  interpolation: {
    type: 'linear',
  },
  duration: 1000,
  delay: 0,
  segments: [
    {
      position: 0,
      value: 0,
      type: 'expoInOut',
    },
    {
      position: 0.3,
      value: 1,
      type: 'expoInOut',
    }
  ],
  onUpdate: ({ value, currentTime }) => {
    context.fillStyle = 'red';
    context.clearRect(0, 50, 115, 15);
    context.fillRect(value * 100, 50, 10, 10);
  },
});

timeline.addTrack({
  id: 'green',
  interpolation: {
    type: 'linear',
  },
  duration: 300,
  delay: 0,
  wrap: true,
  segments: [
    {
      position: 0,
      value: 0,
      type: 'linear',
    },
    {
      position: 0.1,
      value: 1,
      type: 'linear',
    }
  ],
  onUpdate: ({ value, currentTime }) => {
    context.fillStyle = 'green';
    context.clearRect(0, 100, 115, 15);
    context.fillRect(value * 100, 100, 10, 10);
  },
});

console.log(timeline);

const onRangeChange = function(evt) {
  const value = evt.target.value;
  timeline.seek(value / 1000);
}

range.onchange = onRangeChange;
range.onmousemove = onRangeChange;

timeline.seek(1);

let isPlaying = false;

const onPlayPauseClick = function(evt) {
  if (!isPlaying) {
    timeline.play();
  } else {
    timeline.pause();
  }

  isPlaying = !isPlaying;
}

playPauseButton.onclick = onPlayPauseClick;
