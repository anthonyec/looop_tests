import { TimelineLoop } from 'looop.js';

const playPauseButton = document.querySelector('#play-pause-button');
const range = document.querySelector('input[type="range"]');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const timeline = new TimelineLoop();

timeline.onUpdate = (time, totalTime) => {
  const percent = time / totalTime;

  range.value = percent * 1000;

  // Called after and not before track updates :(
  context.clearRect(0, 0, 300, 300);
};

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
    context.fillRect(value * 100, 100, 10, 10);
  },
});

/* UI Stuff */

let isPlaying = false;

const onRangeChange = function(evt) {
  const value = evt.target.value;

  timeline.seek(value / 1000);
}

const onPlayPauseClick = function() {
  if (!isPlaying) {
    timeline.play();
  } else {
    timeline.pause();
  }

  isPlaying = !isPlaying;
}

range.addEventListener('input', onRangeChange);
playPauseButton.addEventListener('click', onPlayPauseClick);
