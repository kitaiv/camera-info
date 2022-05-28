"use strict";

function getCameraData() {
  let contraints = {
    video: { facingMode: "user" },
  };
  if (
    "mediaDevices" in navigator &&
    "getUserMedia" in navigator.mediaDevices
  ) {
    async function getVideoMedia(contraints) {
      let stream = null;
      let data = [];

      try {
        stream = await navigator.mediaDevices.getUserMedia(contraints);
        const media = await navigator.mediaDevices.enumerateDevices();
        const mediaVideoInputs =
          media &&
          media
            .map(el => (el.kind === "videoinput" && el) || null)
            .filter(i => i ?? false);
        const coreVideoInput =
          mediaVideoInputs && mediaVideoInputs.length && mediaVideoInputs[0];
        if (coreVideoInput) {
          const {
            aspectRatio,
            frameRate,
            height,
            width,
            resizeMode,
            facingMode,
            deviceId,
          } = coreVideoInput.getCapabilities();

          const { kind, label } = coreVideoInput;

          data.push(
            width &&
              height &&
              width.max.toString() + "x" + height.max.toString(),
            aspectRatio && aspectRatio.max,
            facingMode &&
              facingMode.length &&
              facingMode.map((el) => el.toString()).join("/"),
            resizeMode &&
              resizeMode.length &&
              resizeMode.map((el) => el.toString()).join("/"),
            deviceId && deviceId,
            frameRate && frameRate.max,
            kind && kind,
            label && label
          );
          console.log(data)
          return data;
        }
        return [];
      } catch (err) {
        console.error(err);
      }
    }
    getVideoMedia(contraints);
  }
  return new Error("Not supported");
}
getCameraData();
