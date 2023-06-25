import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const video = document.getElementById('vimeo-player');
const player = new Player(video);

const throttledTimeUpdate = throttle(seconds => {
  localStorage.setItem('videoplayer-current-time', seconds);
}, 1000);

player.on('timeupdate', function (data) {
  throttledTimeUpdate(data.seconds);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}


video.style.position = 'absolute';
video.style.top = '35%';
video.style.left = '50%';
video.style.transform = 'translate(-50%, -50%)';