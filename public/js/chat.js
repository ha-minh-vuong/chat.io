/**
 * chat.js
 * chat.io
 *
 * Copyright (c) 2013 Vuong. All rights reserved.
 *
 */


$(document).ready(function(){

  var user = prompt('Please, enter your nick: ');
  var socket = io.connect();

  socket.on('message', function(data) {
    console.log(data);
    insertMessage(data);
  });


  function sendMessage() {
    var message = $("input#input").val();
    var data = {user: user, message: message};
    socket.emit('message', data);
    insertMessage(data);
    return data;
  }


  function insertMessage(data){
    $("ul#message").append('<li>' + data.user + ' : '+ data.message + '</li>');
  }


  $("button#send").click(function(){
    sendMessage();
    $("input#input").val('');
  });


  $("input#input").keypress(function(e){
    // Enter key.
    if (e.which == 13){
      sendMessage();
      $("input#input").val('');
    }
  });

});
