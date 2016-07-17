var socket = io.connect('http://localhost:3000');
var chatBox = document.getElementById('chatBox');
var chatField = document.getElementById('chatField');

var username = null;
while (username == null || username == '') {
  var username = prompt("Please enter your username: ");
}
socket.emit('join', { username: username });

socket.on('message', function (data) {
  var html = chatBox.innerHTML;
  html += '<p>' + data.username + ': ' + data.message + '</p>';
  chatBox.innerHTML = html;
});

new Vue({
  el: '#chatApp',
  methods: {
    sendMessage: function () {
      var text = chatField.value;
      socket.emit('send', { username: username, message: text });
      chatField.value = '';
    }
  }
});
