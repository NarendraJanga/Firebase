document.addEventListener('DOMContentLoaded', function () {
    const toggleFormButton = document.getElementById('toggleForm');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    toggleFormButton.addEventListener('click', function () {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
        signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';

        const buttonText = loginForm.style.display === 'none' ? "Already have an account? Login" : "Don't have an account? Sign Up";
        toggleFormButton.value = buttonText;
    });
});


document.title = "Sign Up Page"
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, signInWithPhoneNumber, TwitterAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, signInWithRedirect, getRedirectResult, FacebookAuthProvider, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVfy7yQkS3QQGAVHqFq83MZ_ttcIJjQOg",
    authDomain: "verification-5578c.firebaseapp.com",
    projectId: "verification-5578c",
    storageBucket: "verification-5578c.appspot.com",
    messagingSenderId: "186686093145",
    appId: "1:186686093145:web:58841080cfcdd7b5e6be48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider(app);
const Fprovider = new FacebookAuthProvider(app);
const Tprovider = new TwitterAuthProvider(app);


const signup = document.getElementById("signup")
signup.addEventListener('click', (e) => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var number = document.getElementById("number").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: username,
                Email: email,
                Password: password,
                Number: number,
            })
            alert("Succesfully User Created Account........")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

})

// const loginbtn = document.getElementById("loginbtn")
// loginbtn.addEventListener('click', (e) => {
//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             const dt = new Date();
//             update(ref(database, 'users/' + user.uid), {
//                 last_login: dt,
//             })
//             window.location.href = `http://127.0.0.1:5500/src/Firebase%20Project/Signout.html#`;
//         })

//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             alert(errorMessage)

//         });
// })


const googleLogin = document.getElementById("googleLogin")
googleLogin.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;

            // IdP data available using getAdditionalUserInfo(result)
            // ...
            alert("account is created")
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage);
            // ...
        });
})


const facebookLogin = document.getElementById("facebookLogin")
facebookLogin.addEventListener('click', (e) => {
    signInWithRedirect(auth, Fprovider);
    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
        });
})
const twitterLogin = document.getElementById("twitterLogin")
twitterLogin.addEventListener('click', (e) => {
    signInWithRedirect(auth, Tprovider);
    getRedirectResult(auth)
        .then((result) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;
            // ...

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });

})


//...................................................................................................
