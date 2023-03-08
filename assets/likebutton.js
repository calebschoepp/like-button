// Called when the like button is clicked to record the like
function clickLikeButton() {
  if (!hasAlreadyLikedPost()) {
    incrementLikeCount();
    recordLikeInLocalStorage();
    fillHeart();
  }
}

// Called when the page loads to properly initialize the like button
function onLoad() {
  getAndSetLikeCount();

  if (hasAlreadyLikedPost()) {
    fillHeart();
  }
}

window.onload = onLoad;

// === UTILITIES ===

const API_BASE_URL = "http://localhost:3000";

function hasAlreadyLikedPost() {
  const postKey = getPostKey();
  const postValue = localStorage.getItem(postKey);
  return postValue ? true : false;
}

function incrementLikeCount() {
  const postKey = getPostKey();

  fetch(`${API_BASE_URL}/api/${postKey}`, {
    method: "POST",
  }).then((res) => {
    res.json().then((data) => {
      setLikeCountText(data.likes);
    });
  });
}

function recordLikeInLocalStorage() {
  const postKey = getPostKey();
  localStorage.setItem(postKey, true);
}

function fillHeart() {
  document.getElementById("empty-heart").classList.add("hidden");
  document.getElementById("empty-heart").classList.remove("block");
  document.getElementById("full-heart").classList.add("block");
  document.getElementById("full-heart").classList.remove("hidden");
}

function getAndSetLikeCount() {
  const postKey = getPostKey();

  fetch(`${API_BASE_URL}/api/${postKey}`).then((res) => {
    res.json().then((data) => {
      setLikeCountText(data.likes);
    });
  });
}

function getPostKey() {
  const urlParams = new URLSearchParams(window.location.search);
  let key = urlParams.get("key");
  if (key === null) {
    key = "default";
  } else {
    // Strip leading slash
    key = key.replace(/^\//, "");
  }
  return key;
}

function setLikeCountText(count) {
  document.getElementById("like-count").textContent = count;
}
