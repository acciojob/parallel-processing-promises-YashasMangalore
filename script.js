const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download and display images
function downloadImages() {
  const imagePromises = images.map((image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image.url;

      img.onload = () => resolve(img); // Resolve the promise with the image element
      img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject if the image fails to load
    });
  });

  // Use Promise.all to download all images in parallel
  Promise.all(imagePromises)
    .then((imgs) => {
      output.innerHTML = ""; // Clear previous content
      imgs.forEach((img) => {
        output.appendChild(img); // Append each image to the output div
      });
    })
    .catch((error) => {
      output.innerHTML = `<p style="color:red;">${error}</p>`; // Display error message if any image fails to load
    });
}

// Attach event listener to the button
btn.addEventListener("click", downloadImages);
