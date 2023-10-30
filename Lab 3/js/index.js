document.addEventListener("keypress", onKeyPress);
document.getElementById("recordBtn").addEventListener("click", recordSound);

const KeyToSound = {
  q: document.querySelector("#s1"),
  w: document.querySelector("#s2"),
  e: document.querySelector("#s3"),
  r: document.querySelector("#s4"),
};

function onKeyPress(event) {
  const sound = KeyToSound[event.key];
  playSound(sound);
}

function playSound(sound) {
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

const channel = [];
let isRecording = false; // Dodaj zmienną śledzącą, czy nagrywanie jest włączone

function recordSound() {
  isRecording = !isRecording; // Zmień status nagrywania po każdym kliknięciu

  if (isRecording) {
    channel.length = 0; // Wyczyść tablicę, jeśli rozpoczynasz nowe nagranie
  }
}

document.addEventListener("keypress", function (event) {
  if (isRecording) {
    const sound = KeyToSound[event.key];
    if (sound) {
      channel.push(event.key); // Dodaj naciśnięty klawisz do tablicy podczas nagrywania
    }
  }
});
