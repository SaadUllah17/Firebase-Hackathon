import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { addDoc, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Login Function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    // Firebase Authentication login method
    auth.signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User logged in successfully
            const user = userCredential.user;
            console.log("Login successful:", user);
            errorMsg.textContent = "Login successful!";
            errorMsg.style.color = "green";

            // Redirect or take action after successful login
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            // Handle errors
            console.error("Login error:", error);
            errorMsg.textContent = "Error: " + error.message;
            errorMsg.style.color = "red";
        });
}

// Add Student Function
async function addStudent() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("studentEmail").value;
    const password = document.getElementById("studentPassword").value;
    const cnic = document.getElementById("cnic").value;

    try {
        await addDoc(collection(db, "students"), {
            firstName,
            lastName,
            email,
            password,
            cnic,
            userType: 'Student'
        });
        alert('Student added successfully!');
    } catch (error) {
        console.error("Error adding student: ", error);
    }
}

// Upload Marks Function
async function uploadMarks() {
    const course = document.getElementById("course").value;
    const studentId = document.getElementById("studentId").value;
    const marks = document.getElementById("marks").value;
    const totalMarks = document.getElementById("totalMarks").value;
    const grade = document.getElementById("grade").value;

    try {
        await addDoc(collection(db, "marks"), {
            course,
            studentId,
            marks,
            totalMarks,
            grade
        });
        alert('Marks uploaded successfully!');
    } catch (error) {
        console.error("Error uploading marks: ", error);
    }
}

async function editProfile() {
    const cnic = document.getElementById("editCnic").value;
    const firstName = document.getElementById("editFirstName").value;
    const lastName = document.getElementById("editLastName").value;

    const studentRef = doc(db, "students", cnic);
    await updateDoc(studentRef, {
        firstName,
        lastName
    }).then(() => {
        alert('Profile updated successfully!');
    }).catch((error) => {
        console.error("Error updating profile: ", error);
    });
}

async function checkResult() {
    const cnic = document.getElementById("resultCnic").value;
    const marksRef = collection(db, "marks");

    const snapshot = await getDocs(marksRef);
    let result = "";

    snapshot.forEach((doc) => {
        if (doc.data().studentId === cnic) {
            result += `Course: ${doc.data().course}, Marks: ${doc.data().marks}/${doc.data().totalMarks}, Grade: ${doc.data().grade}<br>`;
        }
    });

    if (result) {
        document.getElementById("resultDisplay").innerHTML = result;
    } else {
        document.getElementById("resultDisplay").innerText = "No results found.";
    }
}



