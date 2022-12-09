const height = 480;
const width = 360;

let processor = {
  init() {
    this.grabElements();
    this.video.addEventListener("play", this.onVideoStart.bind(this), false);
    this.counter = 0;
  },
  timerCallback() {
    console.log('test')
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    window.requestAnimationFrame(this.timerCallback.bind(this));
    
  },
  grabElements() {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.c1.width = this.video.videoWidth;
    this.c1.height = this.video.videoHeight;
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
  },
  onVideoStart() {
    console.log(this);
    this.width = this.video.videoWidth;
    this.height = this.video.videoHeight;
    this.c1.width = this.c2.width = this.video.videoWidth;
    this.c1.height = this.c2.height = this.video.videoHeight;
    this.ctx1 = this.c1.getContext("2d");
    window.requestAnimationFrame(this.timerCallback.bind(this));
  },

  computeFrame() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    let l = frame.data.length / 4;
    this.ctx2.fillStyle = 'white';
    this.ctx2.fillRect(0,0,this.width, this.height);
    //getImageData(0, 0, this.width, this.height);
    let frame2 = this.ctx2.getImageData(0, 0, this.width, this.height);
    for (let i = 0; i < l; i++) {
      // let r = frame.data[i * 4 + 0];
      // let g = frame.data[i * 4 + 1];
      // let b = frame.data[i * 4 + 2];
      //if (g > 100 && r > 100 && b < 43) frame.data[i * 4 + 3] = 0;
      // let constant = Math.random() * 4 * l;
      // let r = frame.data[constant + 0];
      // let g = frame.data[constant + 1];
      // let b = frame.data[constant + 2];
      
      // frame.data[i * 4 + 0] = r;
      // frame.data[i * 4 + 1 ] = g;
      // frame.data[i * 4 + 2 ] = b;
      // frame.data[i * 4 + 3] = 255 ;
      frame2.data[i * 4 + 0] = frame.data[(i + Math.floor(this.counter))*4] ;
      frame2.data[i * 4 + 1 ] =  frame.data[(i - Math.round(Math.random()*10+this.counter))* 4 + 1 ];
      // frame2.data[i * 4 + 2 ] = frame.data[i * 4 + 2 ];
      frame2.data[i * 4 + 3] = frame.data[i * 4 + 3 ] ;
      this.counter * 4 == frame.data.length ? this.counter = 0 : this.counter++;
    }
    this.ctx2.putImageData(frame2, 0, 0);
    return;
  },
};

let webcam = {
  init() {
    this.grabElements();
    this.startCam();
  },
  grabElements() {
    const video = document.querySelector("#video");
  },
  startCam() {
    let constraints = { 
      audio: false, 
      video: { 
        width: { min: 360, ideal: 1280, max: 1920 },
        height: { min: 360, ideal: 720, max: 1080 }
      }
  };
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          let stream_settings = stream.getVideoTracks()[0].getSettings();
          stream_settings.width = stream_settings.width / 10;
          stream_settings.height = stream_settings.height / 10;
          video.srcObject = stream;
          // let stream_settings = stream.getVideoTracks()[0].getSettings();

    // actual width & height of the camera video
    // let stream_width = stream_settings.width;
    // let stream_height = stream_settings.height;

    // stream_width = stream_settings.width;
    // stream_height = stream_settings.height;
    // console.log('Width: ' + stream_width + 'px');
    // console.log('Height: ' + stream_height + 'px');
        })
        .catch((e) => {
          console.log("Something went wrong!", e.message);
        });
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  webcam.init();
  processor.init();
});
