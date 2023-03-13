
//Make an image reddish, blueish, or greenish:
function makeImageColor(image, color) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];
    let newRed, newGreen, newBlue;
    if (color === "reddish") {
      if (red <= green + blue) {
        newRed = green + blue;
        newGreen = green;
        newBlue = blue;
      } else {
        newRed = red;
        newGreen = green;
        newBlue = blue;
      }
    } else if (color === "greenish") {
      if (green <= red + blue) {
        newRed = red;
        newGreen = red + blue;
        newBlue = blue;
      } else {
        newRed = red;
        newGreen = green;
        newBlue = blue;
      }
    } else if (color === "blueish") {
      if (blue <= red + green) {
        newRed =
}
}
}
}

//Duplicate an image.
        function duplicateImage(image) {
          const newImage = document.createElement("img");
          newImage.src = image.src;
          image.parentNode.insertBefore(newImage, image.nextSibling);
        }

        const originalImage = document.getElementById("myImage");
        duplicateImage(originalImage);


//increaseBrightness
        function increaseBrightness(image, amount) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            data[i] += amount;
            data[i + 1] += amount;
            data[i + 2] += amount;
          }
          ctx.putImageData(imageData, 0, 0);
          image.src = canvas.toDataURL();
        }

        const myImage = document.getElementById("myImage");
        increaseBrightness(myImage, 50);


//createAvatar
        function createAvatar(image, size, bgColor, borderColor, borderWidth) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = size;
          canvas.height = size;
          ctx.save();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size, size);
          ctx.restore();
          const avatarCanvas = document.createElement("canvas");
          const avatarCtx = avatarCanvas.getContext("2d");
          avatarCanvas.width = size + borderWidth * 2;
          avatarCanvas.height = size + borderWidth * 2;
          avatarCtx.beginPath();
          avatarCtx.arc(
            size / 2 + borderWidth,
            size / 2 + borderWidth,
            size / 2,
            0,
            Math.PI * 2,
            true
          );
          avatarCtx.closePath();
          avatarCtx.fillStyle = bgColor;
          avatarCtx.fill();
          avatarCtx.lineWidth = borderWidth;
          avatarCtx.strokeStyle = borderColor;
          avatarCtx.stroke();
          avatarCtx.drawImage(canvas, borderWidth, borderWidth);
          const avatarURL = avatarCanvas.toDataURL();
          return avatarURL;
        }

        const myImage = document.getElementById("myImage");
        const avatar = createAvatar(myImage, 100, "#fff", "#000", 5);


//QR code
        function generateQRCode(text, size, imgSrc) {
          const canvas = document.createElement("canvas");
          const qr = qrcode(0, "L");
          qr.addData(text);
          qr.make();
          canvas.width = canvas.height = size;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, size, size);
          ctx.fillStyle = "#000";
          const cells = qr.getModuleCount();
          const cellWidth = size / cells;
          for (let row = 0; row < cells; row++) {
            for (let col = 0; col < cells; col++) {
              if (qr.isDark(row, col)) {
                ctx.fillRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
              }
            }
          }
          if (imgSrc) {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, size / 4, size / 4, size / 2, size / 2);
            };
            img.src = imgSrc;
          }
          return canvas.toDataURL();
        }

        const qrCode = generateQRCode("Hello, world!", 200, "https://example.com/logo.png");


//filterImages
        function filterImages(filter) {
          const images = document.querySelectorAll("img");
          images.forEach(image => {
            if (image.alt === filter || filter === "all") {
              image.style.display = "block";
            } else {
              image.style.display = "none";
            }
          });
        }


//createThumbnails
        function createThumbnails() {
          const images = document.querySelectorAll("img");
          images.forEach(image => {
            const canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            image.src = canvas.toDataURL();
          });
        }

        window.addEventListener("load", createThumbnails);
