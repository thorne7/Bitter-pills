const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default prompt
  deferredPrompt = event; // Save the event for later use
  butInstall.style.display = 'block'; // Display the install button
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log('User choice:', result.outcome);

    // Reset the deferredPrompt variable
    deferredPrompt = null;
    butInstall.style.display = 'none'; // Hide the install button after installation
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed:', event);
});
