const webcam = {
  init() {
    this.cacheElements();
    this.addListeners();
    this.getCameraSelection();
  },

  cacheElements() {
    this.controls = document.querySelector(".controls");
    this.cameraOptions = document.querySelector(".video-options>select");
    this.video = document.querySelector("video");
    this.canvas = document.querySelector("canvas");
    this.screenshotImage = document.querySelector("img");
    this.buttons = [...controls.querySelectorAll("button")];
    this.streamStarted = false;
    this.play = document.querySelector(".button-play");
    this.pause = document.querySelector(".button-pause");
    this.screenshot = document.querySelector(".button-screenshot");
    // [this.play, this.pause, this.screenshot]

    this.constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
      },
    };
  },
  addListeners() {
    this.pause.addEventListener("click", this.pauseStream.bind(this));
    this.screenshot.addEventListener("click", this.doscreenshot.bind(this));
    this.play.addEventListener("click", () => {
      if (this.streamStarted) {
        this.video.play();
        this.play.classList.add("hidden");
        this.pause.classList.remove("hidden");
        return;
      }
      if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
          ...this.constraints,
          deviceId: {
            exact: this.cameraOptions.value,
          },
        };
        this.startStream(updatedConstraints);
      }
    }),
      this.cameraOptions.addEventListener("onchange", () => {
        const updatedConstraints = {
          ...this.constraints,
          deviceId: {
            exact: this.cameraOptions.value,
          },
        };
        this.startStream(updatedConstraints);
      });
  },
  async getCameraSelection() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    const options = videoDevices.map((videoDevice) => {
      return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
    });
    this.cameraOptions.innerHTML = options.join("");
  },

  async startStream(constraints) {
    const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    this.handleStream(stream);
  },

  handleStream(stream) {
    this.video.srcObject = stream;
    this.play.classList.add("hidden");
    this.pause.classList.remove("hidden");
    this.screenshot.classList.remove("hidden");
    this.streamStarted = true;
  },

  pauseStream() {
    this.video.pause();
    this.play.classList.remove("hidden");
    this.pause.classList.add("hidden");
  },

  doscreenshot() {
    this.canvas.width = video.videoWidth;
    this.canvas.height = video.videoHeight;
    this.canvas
      .getContext("2d")
      .drawImage(document.getElementById("canvas-effect"), 0, 0);

    this.screenshotImage.src = this.canvas.toDataURL("image/webp");
    this.screenshotImage.classList.remove("hidden");
  },
};
export default webcam;
