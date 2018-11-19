$(document).ready(function(){
  $("#registerform").submit(function(e){
    e.preventDefault();
    var key = createKeyPair();
    $("#key").placeholder(key);
  })

  $("#loginform").submit(function(e){
    e.preventDefault();
    var prikey = $('#privateKey').val();
    initContract(prikey);
  })

})
