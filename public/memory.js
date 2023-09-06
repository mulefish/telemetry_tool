const MEMORY_CONTROLLER_LOG_COLOR = 'background:lightgreen';
const modal = document.getElementById('myModal');
function launchModal() {
  const msg = {
    verb: 'setLocalstorageKey',
    noun: LOCAL_STORAGE_GLOBAL_EVENTS_KEY,
  };
  sendMessage(msg);
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
///////////// FROM CHILD TO PARENT
window.addEventListener('message', gotMessageFromIFrame, false);
function gotMessageFromIFrame(event) {
  const command = event.data;
  if (command.verb === 'checkLocalstorage') {
    const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
    const events = JSON.parse(rawString);
  } else if (command.verb === 'updateUI') {
    log('gotMessageFromIFrame ' + command.verb);
    populateDropdown();
  } else if (command.verb === 'eraseLocalstorage') {
    localStorage.removeItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
    const dropdown = document.getElementById('definedEventsSelector');
    dropdown.innerHTML = '';
    document.getElementById('title').value = '';
    document.getElementById('creationDate').innerHTML = '';
    document.getElementById('event').value = '';
    document.getElementById('editableJsonTextarea').value = '';

  } else {
    // FUN! Uncaught errors bubble up to here! Good to know!
    // Note: This will happen when a illformed SAVE is attempted in the modal
    // Note note: This is not bad; merely interesting: a happy accident.
    console.log('Uncaught error! ' + JSON.stringify(event.data));
  }
}
////////////// FROM PARENT TO CHILD
const iframe = document.getElementById('modalContent');
function sendMessage(command) {
  try {
    console.log('%c' + 'command:' + command.verb, MEMORY_CONTROLLER_LOG_COLOR);
    iframe.contentWindow.postMessage(command, '*');
  } catch (boom) {
    console.error(boom);
  }
}
