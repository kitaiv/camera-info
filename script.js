"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let contraints = {
    video: {facingMode: "user"}
  }
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    async function getVideoMedia(contraints) {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia(contraints);
        const media = (await navigator.mediaDevices.enumerateDevices())
        const mediaVideoInputs = media && media.map(el => el.kind === "videoinput" && el || null).filter(i => i ?? false)
        console.log('mediaVideoInputs >>> ', mediaVideoInputs)
        mediaVideoInputs.forEach(el => {
          const p = document.createElement('p');
          const {deviceId, kind, label, groupId} = el;
          const { aspectRatio, frameRate, height, width, resizeMode, facingMode } = el.getCapabilities();
          console.log(el.getCapabilities())
          
          p.innerHTML = `deviceId: ${deviceId ?? '-'} ${'\r\n'}<br/>`
          p.innerHTML += `kind: ${kind ?? '-'}<br/>`
          p.innerHTML += `label: ${label ?? '-'}<br/>`
          p.innerHTML += `groupId: ${groupId ?? '-'}<br/>`
          p.innerHTML += `aspectRatio: max: ${aspectRatio.max ?? '-'} min: ${aspectRatio.min ?? '-'}<br/>`
          p.innerHTML += `facingMode: ${facingMode.map(el => el ?? '-')}<br/>`
          p.innerHTML += `frameRate: max: ${frameRate.max ?? '-'} min: ${frameRate.min ?? '-'}<br/>`
          p.innerHTML += `height: max: ${height.max ?? '-'} min: ${height.min ?? '-'}<br/>`
          p.innerHTML += `resizeMode: ${resizeMode.map(el => el ?? '-')}<br/>`
          p.innerHTML += `width: max: ${width.max ?? '-'} min: ${width.min ?? '-'}<br/>`

          document.body.appendChild(p);
        })
      } catch (err) {
        console.error(err);
      }
    }
    getVideoMedia(contraints);
  }

});
