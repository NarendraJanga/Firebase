const firebaseConfig = {
    apiKey: "AIzaSyCsa1_nBO5KeUxX3zYd441Ln83gTaIeaD4",
    authDomain: "cyberclipstamil.firebaseapp.com",
    databaseURL: "https://cyberclipstamil-default-rtdb.firebaseio.com",
    projectId: "cyberclipstamil",
    storageBucket: "cyberclipstamil.appspot.com",
    messagingSenderId: "401127340612",
    appId: "1:401127340612:web:5f69c1a7ca45e2a3419a11",
    measurementId: "G-7PCYZ0XY3W"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()
  var database_ref = database.ref()




  function firebasesri(){
    window.alert("entered")
  }

  function request222(){

    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
     
        var user = auth.currentUser
        var id=auth.currentUser.uid;
        var numberss=auth.currentUser.phoneNumber
        firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
          try{
          
           var name=snapshot.val().name;
           console.log(name)
  
           if(name==undefined||name=="undefined"||name==""||name==null){
              localStorage.setItem("page1","index")
              //window.location.href="register.html"
              window.open(
                "register.html", "_blank");
           }
                var a=localStorage.getItem("firebase");
                //window.location.href=a+".html";
                window.open(
                  a+".html", "_blank");
          }
          catch(err){
            localStorage.setItem("page1","index")
            //window.location.href="register.html";
            window.open(
              "register.html", "_blank");
          }
  
        })
  
      }
      else{
        var a = localStorage.getItem("loginforaccess")
        if(a==""){
          a="index"
        }
        localStorage.setItem("page",a)
        localStorage.clear("loginforaccess")
       // window.location.href="login.html";
        window.open(
          "login.html", "_blank");
  
      }
  
    })
  
  }


  function checksubscriberfirebase(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;
      var numberss=auth.currentUser.phoneNumber 

        firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
          try{
          
          var name=snapshot.val().name;
          firebase.database().ref('secret/'+numberss).once('value').then(function(snapshot){
            var plan=snapshot.val().plan;
            if(plan=='pro'){
           
            }
            else{
              window.location.replace("needpro.html");
            }
          })

          }
        
          catch(err){
            localStorage.setItem("page1","firebaseauth")
            window.location.replace("register.html");
          }

        })

      }
      else{
        localStorage.setItem("page","firebaseauth");
        window.location.replace("login.html");

    }

  })

  }





  function checklogged(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;
      var numberss=auth.currentUser.phoneNumber 

      firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
        try{
        
         var name=snapshot.val().name;
        }
       
        catch(err){
          localStorage.setItem("page1","top10bots")
          window.location.replace("register.html");
        }

      })

    }
    else{
      localStorage.setItem("page","top10bots");
      window.location.replace("login.html");

    }

  })

  }



  function checklogged_connect(){
    const meetingForm = document.getElementById("meeting-form");
    document.getElementById("schedule-button").innerHTML="Loading..."
    document.getElementById("meetings-btn").style.display="none"

    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;
      var numberss=auth.currentUser.phoneNumber 


      firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
        try{
         var name=snapshot.val().name;
         var email = snapshot.val().email;

         if(name==undefined || name=="undefined"|| name=="null"|| name==null){
          
          document.getElementById("schedule-button").remove()
          localStorage.setItem("page1", "meetings")
          meetingForm.innerHTML = `
          <h2>Not Signed Up!</h2>
          <i class="fa fa-exclamation-circle"></i> 
          <button onclick="window.location.href='register.html';" id="loginButton">Signup</button>
      ` ;  
      meetingForm.style.display="block"
         }
         else{
          check_pro_meetings();
         
         }
        }
       
        catch(err){
          localStorage.setItem("page1", "meetings")
          meetingForm.innerHTML = `
          <h2>Not Signed Up!</h2>
          <i class="fa fa-exclamation-circle"></i> 
          <button  onclick="window.location.href='register.html';" id="loginButton">Signup</button>
      `;   meetingForm.style.display="block"
        }

      })
    }
    else{
      console.log("not logged in")
      localStorage.setItem("page","meetings")
    
      document.getElementById("schedule-button").remove()
      meetingForm.innerHTML = `
      <h2>Not Logged In!</h2>
      <i class="fa fa-exclamation-circle"></i>
      <button  onclick="window.location.href='login.html';" id="loginButton">Login</button>
  `;
 
  meetingForm.style.display="block"
    }
    })

  }

  function check_pro_meetings(){
    const meetingForm = document.getElementById("meeting-form");

    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;
      var userPhoneNumber=auth.currentUser.phoneNumber 
      const database = firebase.database();
   
    const meetingsRef = database.ref(`meetings/${userPhoneNumber}`);
    meetingsRef.on('value', (snapshot) => {
      var date="loading.."

      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        date = data.date;
      })
      
      if (snapshot.exists()) {
        document.getElementById("schedule-button").remove()
        meetingForm.innerHTML = `
          <h2>Already used!</h2>
          <p>You had a meeting already with us dated <b> ${date} </b>, and you cannot schedule a second meeting now! <br><b> You can pay Rs.50/- for your second meeting.. Contact us to book your second meeting! </b>
          <i class="fa fa-exclamation-circle"></i> <br> 
          <br>
          <button  onclick="window.location.href='https://wa.me/+919965522208?text=Need%20second%20meeting%20-Cyberclips%20connect';" id="second-meeting">Book second meeting</button>
      `;   meetingForm.style.display="block"
      }
      else{
        meetingForm.style.display="block"
        document.getElementById("schedule-button").remove()
        document.getElementById("number").value=userPhoneNumber;

      }
      })
    }
  })
  }

  function populateCards() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var user = auth.currentUser;
            var id = auth.currentUser.uid;
            var userPhoneNumber = auth.currentUser.phoneNumber;

            const cardContainer = document.getElementById('card-container');
            const database = firebase.database();

            const meetingsRef = database.ref(`meetings/${userPhoneNumber}`);
            meetingsRef.on('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <h3>${data.doubt}</h3>
                        <p>Date: ${data.date}</p>
                        <h4>Recorded meeting</h4>
                        <video controls width="100%">
                            <source src="${data.video}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <a href="${data.download}" target="_blank">
                            <button>Download resources</button>
                        </a>
                    `;
                    cardContainer.appendChild(card);
                });
            });
        }
    });
}


  function schedule(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("number").value;
    var date = document.getElementById("date").value;
    var doubt = document.getElementById("doubt").value;

    let phone_number = "";

    user_data={
      email: email,
      phone: phone,
      name : name,
      date: date,
      doubt: doubt
    }
   
  for (let i = 3; i < phone.length; i++) {
    phone_number += phone[i];
  }

  if(name==""||email==""||phone==""||date==""||doubt==""){
    document.getElementById("error").innerHTML="Please fill all the details!"
  }
  else{
    database_ref.child('meetings/'+phone+'/').set(user_data)

    document.getElementById("meeting-form").remove()
    window.location.href=`https://calendly.com/cyberclipstamil/schedule/?name=${name}&email=${email}&date=${date}&phone=${phone_number}&doubt=${doubt}`  
    
  }

  }
  

  function random123(){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result)
    return result;
  }

function unsubscribe(){
  var email=document.getElementById("emailid").value;
  if (ValidateEmail(email) == false) {
    window.alert("Incorrect Email address");
    return;
  }
 
  var result=random123();

  user_data={
    emailid: email
  }

  database_ref.child('unsubscribe/' +result).set(user_data)
  window.alert("Successfully unsubscribed..")
  window.location.href="index.html";
}


  function logincheck(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;
      var numberss=auth.currentUser.phoneNumber 

      firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
        try{
        
         var name=snapshot.val().name;
        }
       
        catch(err){
          window.location.replace("register.html");
        }

      })

    }
    else{
      window.location.replace("login.html");

    }

  })

  }

  function tolog(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;

      auth.signOut().then(()=>{
        console.log('User signed out');
        localStorage.clear();
        alert('Logged out successfully!');
       
      })
      .catch(function(error){
        console.log("Error occured");
      });


    }
    else{

      localStorage.setItem("page","normal");
      window.location.replace("login.html")
    }
  })


   
  }


  function filllogin(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;
      var numberss=auth.currentUser.phoneNumber 
      firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
        var name=snapshot.val().name;
        document.getElementById("fillname").innerHTML=name;

      })
    }
  })

  setTimeout(() => {
    window.location.replace("index.html")
  }, 5000);
  }

  function paynow22(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;
      var numberss=auth.currentUser.phoneNumber 
      var amount=localStorage.getItem("amount")
      window.alert(amount)
      firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
        var name=snapshot.val().name;
        var email=snapshot.val().email;
        
        window.location.replace("https://pages.razorpay.com/pl_KnnYFrjiZ4HGr3/view?phone="+numberss+"&name="+name+"&email="+email+"&amount="+amount);

      })
    }
    else{
      localStorage.setItem("page","needpro")
      window.location.replace("login.html");
    }
  })

  }

  function fill(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
        var id=auth.currentUser.uid;
       var numberss=auth.currentUser.phoneNumber

       document.getElementById("number").innerHTML=numberss;

    }
  });
  }


  function newregister(){

  
    document.getElementById("registernew").innerHTML="Saving..."

    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
     var user = auth.currentUser
       var id=auth.currentUser.uid;
      var numberss=auth.currentUser.phoneNumber
      
      var mobile = numberss.replace("+91","")
      
      

      var firstname=document.getElementById("fname").value;
      var lastname=document.getElementById("lname").value;
      var email=document.getElementById("email2").value;

      if(firstname==""||lastname==""||email==""){
        document.getElementById("form-message-warning mt-4").innerHTML="Please fill all the required details..!"
        document.getElementById("registernew").innerHTML="Submit"
      }
     else{
      var name=firstname+" "+lastname;
      console.log(name);

      var user_data = {
        name:name,
        email:email,
      }
      var user_data2={
        plan:"fresher"
      }
      var templateParams = {
        toemail: email,
        name: name
      };

      emailjs.send('service_3r6pxfp', 'template_czr7qha', templateParams)
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
     
     database_ref.child('subscriber/' +numberss).update(user_data)
     database_ref.child('secret/' +numberss).set(user_data2)

     var title = "User%20Signed%20Up"
     var body = "New%20User%20"+name+"%20with%20phonenumber%20"+mobile+"%20has%20signedup%20in%20Cyberclips"
     triggermessage(title, body)
     var a=localStorage.getItem("page1");
     window.location.replace(a+".html");

  }, function(error) {
     console.log('FAILED...', error);
     database_ref.child('subscriber/' +numberss).set(user_data)
     database_ref.child('secret/' +numberss).set(user_data2)
     var title = "User%20Signed%20Up"
     var body = "New%20User%20"+name+"%20with%20phonenumber%20"+mobile+"%20has%20signedup%20in%20Cyberclips"
     triggermessage(title, body)
     var a=localStorage.getItem("page1");
     window.location.replace(a+".html");
  });


  }
     }
 })

    
  }


  function triggermessage(title, body){

    
    
  const apiUrl = 'https://cyberclips.onrender.com/notify/?title='+title+'&&body='+body
    console.log(apiUrl)

  
  fetch(apiUrl).then(response=>response.json()).then(data=>{
                    var message= data.message
                    console.log(message)
                    
  })
  .catch(error=>{
    console.log(error)
    
    
  })
  // Using fetch to make the API request
 

  }


  function needprocheck(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
        var id=auth.currentUser.uid;
       var numberss=auth.currentUser.phoneNumber
       firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
        try{
        
         var name=snapshot.val().name;
        }
        catch(err){
          window.location.replace("register.html");
        }
      })
         }
        else{
          window.location.replace("login.html");
        }  
      
    })
      }

      function factscheck(){
        firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
          var user = auth.currentUser
            var id=auth.currentUser.uid;
           var numberss=auth.currentUser.phoneNumber
           firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
            try{
            
             var name=snapshot.val().name;
            }
            catch(err){
              localStorage.setItem("page1","facts1")
              window.location.replace("register.html");
            }
          })
             }
            else{
              localStorage.setItem("page","facts1")
              window.location.replace("login.html");
            }  
          
        })
      
          }

          function appscheck(){
            firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
              var user = auth.currentUser
                var id=auth.currentUser.uid;
               var numberss=auth.currentUser.phoneNumber
               firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
                try{
                
                 var name=snapshot.val().name;
                }
                catch(err){
                  localStorage.setItem("page1","apps")
                  window.location.replace("register.html");
                }
              })
                 }
                else{
                  localStorage.setItem("page","apps")
                  window.location.replace("login.html");
                }  
              
            })
          
              }
      
              function aicheck(){
                firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
                  var user = auth.currentUser
                    var id=auth.currentUser.uid;
                   var numberss=auth.currentUser.phoneNumber
                   firebase.database().ref('subscriber/'+numberss).once('value').then(function(snapshot){
                    try{
                    
                     var name=snapshot.val().name;
                    }
                    catch(err){
                      localStorage.setItem("page1","ai")
                      window.location.replace("register.html");
                    }
                  })
                     }
                    else{
                      localStorage.setItem("page","ai")
                      window.location.replace("login.html");
                    }  
                  
                })
              
                  }



function login(){

  
  lemail = document.getElementById('lemail').value
  lpassword= document.getElementById('lpass').value
  auth.signInWithEmailAndPassword(lemail, lpassword)
  .then(() => {
    // Assign user
    var user = auth.currentUser
    var id=auth.currentUser.uid;
    var d=new Date();
    var date=d.getDate();
    var month=d.getMonth();
    var year=d.getFullYear();
    var hour=d.getHours();
    var minutes=d.getMinutes();
    var seconds=d.getSeconds();
    var fulldate= date+":"+month+":"+year;
    var fulltime=hour+":"+minutes+":"+seconds;
    var fulldt=fulldate+"-"+fulltime;
    var osversion=navigator.platform;
    var browserv=navigator.userAgent;
    var user_data = {
        date: fulldate,
        time: fulltime,
        os: osversion,
        fulldetail: browserv,
      }

      

      database_ref.child('security/' +id+"/"+fulldt+"/").set(user_data)
 
      

        var user = auth.currentUser
        var id=auth.currentUser.uid;
      firebase.database().ref('confidential/'+id).once('value').then(function(snapshot){
        var plan=snapshot.val().plan;
        if(plan=='editor'){
          window.location.replace("editor.html");
        }
        else if(plan=='content'){
          window.location.replace('content.html')
        }
        else{
          window.location.replace('user.html')
        }
      })
   

      
    })  .catch((error) => {
     
        var errorCode = error.code
        var errorMessage = error.message
        var newerror= errorfunc(errorCode)

         document.getElementById("errorlogin").innerHTML=newerror;
      });
     


}

function save(){

  var d=new Date();
  var date=d.getDate();
  var month=d.getMonth();
  var year=d.getFullYear();
  var hour=d.getHours();
  var minutes=d.getMinutes();
  var seconds=d.getSeconds();
  var fulldate= date+":"+month+":"+year;
  var fulltime=hour+":"+minutes+":"+seconds;

  firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
    var user = auth.currentUser
    var id=auth.currentUser.uid;
    var email=auth.currentUser.email;

  var vtitle=document.getElementById("vtitle").value;
  var link=document.getElementById("link").value;
  var userdate=document.getElementById("date").value;

  if (vtitle.length <= 0) {
    document.getElementById("errorsave").innerHTML='Fill the title'
    return
  }
  else{
    document.getElementById("errorsave").innerHTML='';
  }
  if (link.length <= 0) {
    document.getElementById("errorsave").innerHTML='Enter google drive link';
    return
  }
  else{
    document.getElementById("errorsave").innerHTML='';
  }
  if (date.length <= 0) {
    document.getElementById("errorsave").innerHTML='Enter date & time'
    return
  }
  else{
    document.getElementById("errorsave").innerHTML='';
  }

 
 
  firebase.database().ref('users/'+id).once('value').then(function(snapshot){
    var full_name=snapshot.val().full_name;

    user_data={
      title: vtitle,
      name: full_name,
      link: link,
      userdate: userdate,
      realdate: fulldate,
      realtime: fulltime,
      email: email
    }
  
var templateParams = {
  email: "cyberclipstamil@gmail.com",
  email2: "selvarajselvam166@gmail.com",
  link: link,
  from_name: full_name,
  teamname:"Idea & Content Development",
  from_team:"Editing Team",
  message: "The content has been editted and submitted for review. Thank you."
};

emailjs.send('service_3r6pxfp', 'template_qvdtkqx', templateParams)
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
  }, function(error) {
     console.log('FAILED...', error);
  });

  
  database_ref.child('editor/'+vtitle).set(user_data);
  document.getElementById("successsave").innerHTML='<i class="fa-solid fa-check"></i> Saved successfully <br> Reload to save new details...';
  })
}
})
}





function save1(){

  var d=new Date();
  var date=d.getDate();
  var month=d.getMonth();
  var year=d.getFullYear();
  var hour=d.getHours();
  var minutes=d.getMinutes();
  var seconds=d.getSeconds();
  var fulldate= date+":"+month+":"+year;
  var fulltime=hour+":"+minutes+":"+seconds;

  firebase.auth().onAuthStateChanged(async function(user) {  if (user) { 
    var user = auth.currentUser
    var id=auth.currentUser.uid;
    var email=auth.currentUser.email;

  var vtitle=document.getElementById("vtitle").value;
  var link=document.getElementById("link").value;
  var userdate=document.getElementById("date").value;

  
  if (vtitle.length <= 0) {
    document.getElementById("errorsave").innerHTML='Fill the title'
    return
  }
  else{
    document.getElementById("errorsave").innerHTML='';
  }
  if (link.length <= 0) {
    document.getElementById("errorsave").innerHTML='Enter google drive link';
    return
  }
  else{
    document.getElementById("errorsave").innerHTML='';
  }
  if (date.length <= 0) {
    document.getElementById("errorsave").innerHTML='Enter date & time'
    return
  }
  else{
    document.getElementById("errorsave").innerHTML='';
  }



 
  firebase.database().ref('common/').once('value').then(function(snapshot){
    var editor=snapshot.val().editor;
    var editor2=snapshot.val().editor2;
  firebase.database().ref('users/'+id).once('value').then(function(snapshot){
    var full_name=snapshot.val().full_name;

    user_data={
      title: vtitle,
      link: link,
      userdate: userdate,
      realdate: fulldate,
      realtime: fulltime,
      email: email,
      name: full_name
    }

var templateParams = {
  email: editor,
  email2: editor2,
  link: link,
  from_name: full_name,
  teamname:"Editing Team",
  from_team:"Content Development",
  message: "The content has been ready and submitted to you for Editing. Please finish editing within time. Thank you."
};

emailjs.send('service_3r6pxfp', 'template_qvdtkqx', templateParams)
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
  }, function(error) {
     console.log('FAILED...', error);
  });

  
  database_ref.child('content/'+vtitle).set(user_data);
  document.getElementById("successsave").innerHTML='<i class="fa-solid fa-check"></i> Saved successfully <br> Reload to save new details...';
  })
})
}
})
}


function signup(){

    email = document.getElementById('semail').value
    password= document.getElementById('spass').value
    confirmp =document.getElementById('repass').value
    full_name = document.getElementById('sname').value
    snumber=document.getElementById("snumber").value

    if(password!=confirmp){
        document.getElementById("errorregister").innerHTML='Password does not match'
        return
      }
      else{
        document.getElementById("errorregister").innerHTML=''
      }
      // Validate email
      if (ValidateEmail(email) == false) {
        document.getElementById("errorregister").innerHTML='Incorrect Email'
        return
      }
      else{
        document.getElementById("errorregister").innerHTML='';
      }
     
      // Check if other values are empty
      if (full_name.length <= 0) {
        document.getElementById("errorregister").innerHTML='Fill your name'
        return
      }
      else{
        document.getElementById("errorregister").innerHTML='';
      }
      if (snumber.length < 10) {
        document.getElementById("errorregister").innerHTML='Enter correct mobile number'
        return
      }
      else{
        document.getElementById("errorregister").innerHTML='';
      }
  

      auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
     
      var user = auth.currentUser
      var database_ref = database.ref()
    
      var user_data = {
        
        full_name: full_name,
        email: email,
        mobile: snumber
        
      }
      database_ref.child('users/' + user.uid).set(user_data)
      database_ref.child('confidential/' + user.uid).set({
        plan:"free",
      })
     
      
    
      setTimeout(function () {

        window.location.replace("success.html");
      }, 1000)
    })
    .catch((error) => {
     
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
      var newerror= errorfunc(errorCode)
       document.getElementById("errorregister").innerHTML=newerror;
    });
   


}


function forgot_password(){
    
    var emailaddress = document.getElementById("femail").value;
    if (ValidateEmail(emailaddress) == false) {
      document.getElementById("errorfp").innerHTML='Incorrect Email'
      return
    }
    else{

    auth.sendPasswordResetEmail(emailaddress)
    .then(function() {  
        document.getElementById("sendlink").innerHTML='<i class="fa-solid fa-check"></i>We have sent you an email to reset your password.<br> <i class="fa-solid fa-triangle-exclamation"></i>If you not received, please check it in spam folder too'

})
.catch(function(error) {
  var errorMessage = error.message
  document.getElementById("errorfp").innerHTML=errorMessage;
});
  }
}


function ValidateEmail (email) {
    if (email.length <= 0) {
      return false
    }
  
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return true
    } else {
      return false
    }
  }

  function fillcontent(){

    firebase.database().ref('content').on('value',(snap)=>{
      var totalRecord =  snap.numChildren();
      console.log("Total Record : "+totalRecord);
      document.getElementById("totalvideos").innerHTML=totalRecord;
    
    firebase.database().ref('editor').on('value',(snap)=>{
      var editted =  snap.numChildren();
      console.log("Total Record : "+editted);
      document.getElementById("editted").innerHTML=editted;

    

    });
    });
    
    firebase.database().ref('content').once('value',   function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
       
        // ...
      });
    });

  }

  function filldetails(){


    
    firebase.database().ref('content').once('value',   function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var title=childSnapshot.val().title;
        var realdate=childSnapshot.val().realdate;
      var link1=childSnapshot.val().link;
        var name=childSnapshot.val().name;
        
        var elem = document.querySelector('#develop_iter');
        var clone = elem.cloneNode(true);

        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
              
        //specify the length for the new string  
var lenString = 7;  

clone.classList.add('why-box');


document.getElementById("filldetails").innerHTML=title;
document.getElementById("fillemail").innerHTML=realdate;
document.getElementById("fillname").innerHTML=name;
document.getElementById("fill_link").innerHTML=link1;


// Inject it into the DOM
elem.after(clone);
       
        // ...
      });
    });

    firebase.database().ref('editor').once('value',   function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childData)
        var title=childSnapshot.val().title;
        var realdate=childSnapshot.val().realdate;
      var link1=childSnapshot.val().link;
        var name=childSnapshot.val().name;
        var elem = document.querySelector('#develop_iter1');
        var clone = elem.cloneNode(true);

       
              
        //specify the length for the new string  
var lenString = 7;  

clone.classList.add('why-box1');


document.getElementById("filldetails1").innerHTML=title;
document.getElementById("fillemail1").innerHTML=realdate;

document.getElementById("fill_link1").innerHTML=link1;
elem.after(clone);
      })
    })

  }



  function contact(){

    email = document.getElementById('cemail').value
    subject= document.getElementById('csubject').value
    message =document.getElementById('cmessage').value
    full_name = document.getElementById('cname').value
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
              
            //specify the length for the new string  
    var lenString = 7;  
    var randomstring = '';  
  
            //loop to select a new character in each iteration  
    for (var i=0; i<lenString; i++) {  
        var rnum = Math.floor(Math.random() * characters.length);  
        randomstring += characters.substring(rnum, rnum+1);  
    }

    if (ValidateEmail(email) == false) {
        document.getElementById("errorcontact").innerHTML='Incorrect Email'
        return
      }
      else{
        document.getElementById("errorcontact").innerHTML='';
      }
     
      // Check if other values are empty
      if (full_name.length <= 0) {
        document.getElementById("errorcontact").innerHTML='Fill your name'
        return
      }
      else{
        document.getElementById("errorcontact").innerHTML='';
      }

      var d=new Date();
      var date=d.getDate();
      var month=d.getMonth();
      var year=d.getFullYear();
      var hour=d.getHours();
      var minutes=d.getMinutes();
      var seconds=d.getSeconds();
      var fulldate= date+":"+month+":"+year;
      var fulltime=hour+":"+minutes+":"+seconds;

      user_data={
        date: fulldate,
        time: fulltime,
        name: full_name,
        email: email,
        subject: subject,
        message: message


      }
  
      database_ref.child('contact/'+fulldate +"id="+randomstring+"/").set(user_data)
      document.getElementById("successcontact").innerHTML="Saved successfully. We will connect you soon..."
  
  }

  function email(){
    nemail=document.getElementById("nemail").value;

    if (ValidateEmail(nemail) == false) {
        document.getElementById("errornews").innerHTML='Incorrect Email'
        return
      }
      else{
        document.getElementById("errornews").innerHTML='';
      }
    
    user_data={
        email: nemail
    }

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
              
    //specify the length for the new string  
var lenString = 7;  
var randomstring = '';  

    //loop to select a new character in each iteration  
for (var i=0; i<lenString; i++) {  
var rnum = Math.floor(Math.random() * characters.length);  
randomstring += characters.substring(rnum, rnum+1);  
}  
    database_ref.child('newsletter/'+randomstring).set(user_data)
    document.getElementById("successnews").innerHTML="Thank you.. You're Subscribed."
  }

 

  


  function logout(){
    auth.signOut().then(()=>{
      console.log('User signed out');
      alert('User signed out');
      localStorage.clear();
      window.location.replace("index.html");
    })
    .catch(function(error){
      console.log("Error occured");
    });
    }



   
  





    function errorfunc(errorcode){
  
      
      authErrors = {
        "admin-restricted-operation": "This operation is restricted to administrators only.",
        "argument-error": "",
        "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
        "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
        "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
        "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
        "cordova-not-ready": "Cordova framework is not ready.",
        "cors-unsupported": "This browser is not supported.",
        "credential-already-in-use": "This credential is already associated with a different user account.",
        "custom-token-mismatch": "The custom token corresponds to a different audience.",
        "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
        "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
        "email-change-needs-verification": "Multi-factor users must always have a verified email.",
        "email-already-in-use": "This email ID is already in use by other user.",
        "expired-action-code": "The action code has expired. ",
        "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
        "internal-error": "An internal error has occurred.",
        "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
        "invalid-app-id": "The mobile app identifier is not registed for the current project.",
        "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
        "invalid-auth-event": "An internal error has occurred.",
        "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
        "invalid-continue-uri": "The continue URL provided in the request is invalid.",
        "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
        "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
        "invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
        "invalid-email": "The email address is badly formatted.",
        "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
        "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
        "invalid-credential": "The supplied auth credential is malformed or has expired.",
        "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
        "invalid-multi-factor-session": "The request does not contain a valid proof of first factor successful sign-in.",
        "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
        "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
        "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
        "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
        "wrong-password": "The Username or Password is wrong",
        "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
        "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
        "invalid-provider-id": "The specified provider ID is invalid.",
        "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
        "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
        "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
        "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
        "multi-factor-info-not-found": "The user does not have a second factor matching the identifier provided.",
        "multi-factor-auth-required": "Proof of ownership of a second factor is required to complete sign-in.",
        "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
        "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
        "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
        "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
        "missing-continue-uri": "A continue URL must be provided in the request.",
        "missing-iframe-start": "An internal error has occurred.",
        "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
        "missing-multi-factor-info": "No second factor identifier is provided.",
        "missing-multi-factor-session": "The request is missing proof of first factor successful sign-in.",
        "missing-or-invalid-nonce": "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
        "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
        "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
        "app-deleted": "Something wrong at our end. Try again later.",
        "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
        "network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
        "no-auth-event": "An internal error has occurred.",
        "no-such-provider": "User was not linked to an account with the given provider.",
        "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
        "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
        "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
        "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
        "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
        "provider-already-linked": "User can only be linked to one identity for the given provider.",
        "quota-exceeded": "Something wrong at our end. Please try again later",
        "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
        "redirect-operation-pending": "A redirect sign-in operation is already pending.",
        "rejected-credential": "The request contains malformed or mismatching credentials.",
        "second-factor-already-in-use": "The second factor is already enrolled on this account.",
        "maximum-second-factor-count-exceeded": "The maximum allowed number of second factors on a user has been exceeded.",
        "tenant-id-mismatch": "The provided tenant ID does not match the Auth instance's tenant ID",
        "timeout": "The operation has timed out.",
        "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
        "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
        "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
        "unsupported-first-factor": "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
        "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
        "unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
        "unverified-email": "The operation requires a verified email.",
        "user-cancelled": "The user did not grant your application the permissions it requested.",
        "user-not-found": "There is no user with this account. Please sign up below.",
        "user-disabled": "The user account has been blocked due to:<br>1. Provided signup details are not true.<br>2. You  may have violated our terms<br>3. Tried illegal activities.<br>Please write Mail to becomesmarter01@gmail.com with your details to reactivate your account.",
        "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
        "user-signed-out": "",
        "weak-password": "The password must be 8 characters long or more.",
        "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
    }
  
    
    var dictkeys= Object.keys(authErrors);
    var dictvalues= Object.values(authErrors);
    var define="auth/";
  
       for(var i=0; i<=dictkeys.length; i++){
  
        var dictkeyss= define+dictkeys[i];
        
  
       if(errorcode==dictkeyss){
  
     
          var msg= dictvalues[i];
       }
  }
  
  return msg;
  }

  function checkuser(){
    firebase.auth().onAuthStateChanged(function(user) {  if (user) { 
      var user = auth.currentUser
      var id=auth.currentUser.uid;

      
      firebase.database().ref('users/'+id).once('value').then(function(snapshot){
        var fname=snapshot.val().full_name;
        var email=snapshot.val().email;
        var mobile=snapshot.val().mobile;
        
      document.getElementById("fillname").innerHTML=fname;
     document.getElementById("fillemail").innerHTML=email;
   
      })
      
    }
   else{
    alert("please login to continue...");
    window.location.replace("login.html")
   }
  })
  
  }