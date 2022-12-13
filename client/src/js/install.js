const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  // Get the event and store it for use by the click listener
  window.deferredPrompt = event;
  //   Hide the install button
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  // Get the previously stored event that confirms PWA is installable
  const promptEvent = window.deferredPrompt;

  // Abort if PWA is not properly configured
  if (!promptEvent) {
    return;
  }

  // Show prompt to install PWA
  promptEvent.prompt();

  // Reset the value to avoid clash upon multiple installs
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  // Make really sure that the install available event is gone
  window.deferredPrompt = null;
  
  // And also make really sure the button is hidden
  butInstall.classList.toggle("hidden", true);
});
