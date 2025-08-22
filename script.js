const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const generateBtn = document.getElementById("generateBtn");
const linksDiv = document.getElementById("links");

let uploadedFiles = [];

uploadBtn.addEventListener("click", async () => {
  const files = fileInput.files;
  if (!files.length) return alert("Please select some files first!");

  for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.ok) {
      uploadedFiles.push(data.url);
      linksDiv.innerHTML += `<p>Uploaded: <a href="${data.url}" target="_blank">${file.name}</a></p>`;
    } else {
      alert("Upload failed: " + data.error);
    }
  }
});

generateBtn.addEventListener("click", () => {
  if (!uploadedFiles.length) return alert("No files uploaded yet!");
  const privateLink = uploadedFiles.join("\n");
  alert("Private links:\n\n" + privateLink);
});

/* Purple snowflakes effect */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flakes = [];
for (let i = 0; i < 100; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
    d: Math.random() + 1
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(200,0,255,0.8)";
  ctx.beginPath();
  for (let i = 0; i < flakes.length; i++) {
    const f = flakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveSnow();
}

let angle = 0;
function moveSnow() {
  angle += 0.01;
  for (let i = 0; i < flakes.length; i++) {
    const f = flakes[i];
    f.y += Math.pow(f.d, 2) + 1;
    f.x += Math.sin(angle) * 2;
    if (f.y > canvas.height) {
      flakes[i] = { x: Math.random() * canvas.width, y: 0, r: f.r, d: f.d };
    }
  }
}

setInterval(drawSnow, 25);
