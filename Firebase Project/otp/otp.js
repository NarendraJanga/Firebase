window.onload=function () {
    render();
    
 };

function render() {
    window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}




function phoneAuth() {

      
   var loginbutton = document.getElementById("login-btn");
   loginbutton.innerHTML='Loading...';
   loginbutton.disabled=true;

    var numbers=document.getElementById('phone').value;
      var phnumber="+91"+numbers;
     
      firebase.auth().signInWithPhoneNumber(phnumber,window.recaptchaVerifier).then(function (confirmationResult) {
         
          window.confirmationResult=confirmationResult;
          coderesult=confirmationResult;
          document.getElementById("errorlogin").innerHTML='';
          var a=document.getElementById("phonecontent");
          a.remove();
          document.getElementById("enterotp").style.visibility="visible";

        }).catch(function (error) {
            document.getElementById("errorlogin").innerHTML=error.message;
            loginbutton.disabled=false;
            loginbutton.innerHTML="Send OTP"
         
       });
   
     }

     function codeverify() {

  
      var verifybtn = document.getElementById("verify-btn");
      verifybtn.innerHTML='Loading...';
      verifybtn.disabled=true;

        var code=document.getElementById('otpvalue').value;
        coderesult.confirm(code).then(function (result) {
            
            var user=result.user;
            var pagegot = localStorage.getItem("page")
            console.log("phoneNumber",user.phoneNumber);
             document.getElementById("wrongotp").innerHTML='';
        })
    }