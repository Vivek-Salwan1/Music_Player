// first import / select all tags
// then create song database - songsrc,title,artist,imgsrc
// 
const mainCard = document.querySelector("#ContentWrapper");
// load music
const audio = document.querySelector('audio');
const songName = document.querySelector('#SongName');
const artistname = document.querySelector('#Artist');
const songImg = document.querySelector('#SongImg');

// play pause next previus
const nextBtn = document.querySelector('#Next');
const previousBtn = document.querySelector('#Previous');
const playpause = document.querySelector('#PausePlay');
const songImgattheTop = document.querySelector('img')

// progress bar
const startDuration = document.querySelector('#Start');
const endDuration = document.querySelector('#End');
const meter = document.querySelector('#ProgrssMeterChild');
const progressBar = document.querySelector('#ProgressMeterContainer');

let isPlaying = false;
let index = 0;

const songDatabase = [
    {
        songSrc: './music/music1.mp3',
        title: 'alone the vivek',
        artist: 'alon walker',
        imgSrc: './img/music1.jpg'
    },
    {
        songSrc: './music/music2.mp4',
        title: 'Imagine Dragon',
        artist: 'bones',
        imgSrc: './img/music2.jpg'
    },
    {
        songSrc: './music/music3.mp4',
        title: 'Safari',
        artist: 'sarena',
        imgSrc: './img/music3.jpg'
    },
    {
        songSrc: './music/music4.mp4',
        title: 'Believer',
        artist: 'dan reynods',
        imgSrc: './img/music4.jpg'
    },
    {
        songSrc: './music/music5.mp4',
        title: 'Justine baiber',
        artist: 'ft ludacris',
        imgSrc: './img/music5.jpg'
    },
    {
        songSrc: './music/music6.mp4',
        title: 'Unstoppable',
        artist: 'sia',
        imgSrc: './img/music6.jpg'
    }
]
// for loading music after clicking on song make loadmusic function 
// add event listner to the audio and increse index++
// in fucntion put sources for audio,artist,

const loadMusic = () => {

    audio.src = songDatabase[index].songSrc;
    artistname.textContent = songDatabase[index].artist;
    songName.textContent = songDatabase[index].title;
    songImgattheTop.src = songDatabase[index].imgSrc
}
audio.addEventListener('ended', () => {
    loadMusic(index++)
    play();
})
loadMusic();
// attach click events to next,previous btn  
// then create play and pause function and then event listerners for it
nextBtn.addEventListener('click', () => {
    if (index < songDatabase.length - 1) {
        loadMusic(index++);
        play();
    }
    else {
        pause();
    }
})
previousBtn.addEventListener('click', () => {
    if (index > 0) {
        loadMusic(index--)
        play();
    }
    else {
        pause();
    }
})
const play = () => {
    isPlaying = true;
    audio.play();
    playpause.classList.replace('fa-play', 'fa-pause');
    songImg.classList.add('anime')
}

const pause = () => {
    isPlaying = false;
    audio.pause();
    playpause.classList.replace('fa-pause', 'fa-play')
    songImg.classList.remove('anime')
}

playpause.addEventListener('click', () => {
    if (isPlaying) {
        pause()
    }
    else {
        play()
    }

})
let minute, second;
const timeStamp = (event) => {
    let { duration, currentTime } = event.srcElement;
    const full_second = Math.floor(duration % 60)
    const full_minute = Math.floor(duration / 60)
    const start_second = Math.floor(currentTime % 60)
    const start_minute = Math.floor(currentTime / 60)
    const totalDuration = `${full_minute} : ${full_second}`;
    const currenDuration = `${start_minute} : ${start_second}`;

    if (duration) {
        endDuration.textContent = totalDuration;

    }
    startDuration.textContent = currenDuration
    const percentage = (currentTime / duration) * 100
    meter.style.width = `${percentage}%`;
}
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
    const { duration } = audio;
    const moreProgress =
        (event.offsetX / event.srcElement.clientWidth) * duration;
    audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
    const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
    const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
    mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
    songImg.style.transform = `rotate(${xAxis}deg)`;
    controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
    mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    songImg.style.transform = "rotate(0deg)";
    controlButtons.style.transform = "rotate(0deg)";
});
