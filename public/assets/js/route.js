const {
    remote
} = require('electron');

const ipc = require('electron').ipcRenderer;


$('#logout').on('click', function () {
    let window = remote.getCurrentWindow();
    window.hide();
    ipc.sendSync('entry-accepted', 'logout');
});

// Book A Room
$('#book_a_room').on('click', function () {
    remote.getCurrentWindow().loadFile('public/view/book_a_room.html')
});

// Dashboard
$('#all_rooms').on('click', function () {
    remote.getCurrentWindow().loadFile('public/view/index.html')
});