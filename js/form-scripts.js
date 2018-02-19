
var userID;


$("#SignUpForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
    } else {
        // everything looks good!
        event.preventDefault();
        submitSignUpForm();
    }
});

$("#Edit-Form").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
    } else {
        // everything looks good!
        event.preventDefault();
        submitEditForm();
    }
});


$("#add-Info").click(function(){
  $("#Edit-window").toggleClass("d-none");
});


$("#LoginForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
    } else {
        // everything looks good!
        event.preventDefault();
        submitLogInForm();
    }
});


function submitSignUpForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var Sex = $("#SignUpForm input[type='radio']:checked").val();

    var user = {
      Name : name,
      Password : password,
      eMail : email,
      sex : Sex
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/signup",
      dataType : 'json',
      data:  user ,
      success : SignInSuccess(),
  });
}

function submitLogInForm(){
    // Initiate Variables With Form Content
    var email = $("#loginemail").val();
    var password = $("#loginpassword").val();

    var user = {
      Password : password,
      eMail : email
    };

    $.ajax({
      type: "post",
      url: "http://localhost:3000/login",
      dataType : 'json',
      data:  user,
      success : function(msg){
        if(msg.message == "passwordnotmatched"){
          alert("wrong email id or password");
        } else {
          loginSuccess(msg);

        }
      }
  });
}

function SignInSuccess(){
  console.log("form submit sent");
    $( "#msgSubmit" ).removeClass( "d-none" );
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
}

function loginSuccess(data){

  $("#First").addClass("d-none");
  $("#Secound").removeClass("d-none");

  var obj = data ;

//############ showing and updating dashboard ########

$("#UserName-h1").html(obj.Name);
$("#User-Pic").attr('src',obj.sex);
$("#UserName").html(obj.Name);
$("#UserEmail").html(obj.eMail);
$("#UserPhoneNo").html(obj.PhoneNo);
//######## Hobies
var array = obj.hobies.split(',');
for(var i =0 ; i < array.length; i++){
  $("#hobies-list").append("<li>"+array[i]+"</li>");
}
$("#aboutme-text").html(obj.aboutMe);

userID = obj._id;

}


function submitEditForm(){
  var name = $("#edit-name").val();
  var pn = $("#edit-PhoneNumber").val();
  var Hobies = $("#edit-Hobies").val();
  var Sex = $("#Edit-Form input[type='radio']:checked").val();
  var AboutMe = $("#edit-aboutme").val();
  var user = {
    Name : name,
    PhoneNo : pn,
    aboutMe : AboutMe,
    sex : Sex,
    hobies : Hobies,
    _id : userID
  };
  $.ajax({
    type: "post",
    url: "http://localhost:3000/edit ",
    dataType : 'json',
    data:  user,
    success : function(msg){
      if(msg){
        loginSuccess(msg);
      }else {
        console.log("no reply");
      }
    }
});

}
