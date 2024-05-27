// loadingHandler.js

function loadingInit() {
  // Implement your loading start logic here
  // e.g., show a loading spinner and disable inputs
  const loadingElement = document.createElement("div");
  loadingElement.id = "loading-spinner";
  loadingElement.innerHTML = '<div class="spinner"></div>'; // Your spinner HTML
  document.body.appendChild(loadingElement);

  // Disable all inputs
  document.querySelectorAll("input, button, select").forEach((element) => {
    element.disabled = true;
  });
}

function loadingDestroy() {
  // Implement your loading end logic here
  // e.g., hide the loading spinner and enable inputs
  const loadingElement = document.getElementById("loading-spinner");
  if (loadingElement) {
    document.body.removeChild(loadingElement);
  }

  // Enable all inputs
  document.querySelectorAll("input, button, select").forEach((element) => {
    element.disabled = false;
  });
}
