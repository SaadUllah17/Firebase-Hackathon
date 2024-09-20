// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBi2qs-AYq1ScTbtNee_knopDKsVpGB0eg",
  authDomain: "hackathonlogin-d2a53.firebaseapp.com",
  projectId: "hackathonlogin-d2a53",
  storageBucket: "hackathonlogin-d2a53.appspot.com",
  messagingSenderId: "42090392879",
  appId: "1:42090392879:web:30a801016132cea26485da",
  measurementId: "G-J9PJYLJD4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
auth.languageCode='en'
const provider=new GoogleAuthProvider();

const loginbtn=document.getElementById("loginbtn");
loginbtn.addEventListener("click",function(){
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
    //   window.location.href="";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
})

