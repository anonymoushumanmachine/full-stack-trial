let username = document.getElementById("username");
let password = document.getElementById("password");
let image = document.getElementById("profile-pic");
let signupButton = document.getElementById("signup-button");
let passwordEye = document.querySelector(".fa-solid");

let url = "https://full-stack-trial-lmcb.onrender.com/";
signupButton.addEventListener("click", sendData);
passwordEye.onclick = () => {
  if (passwordEye.classList.contains("fa-eye")) {
    password.type = "text";
    passwordEye.classList.replace("fa-eye", "fa-eye-slash");
  } else if (passwordEye.classList.contains("fa-eye-slash")) {
    password.type = "password";
    passwordEye.classList.replace("fa-eye-slash", "fa-eye");
  }
};

//   send data to backend
async function sendData() {
  let imageFile = image.files[0];
  let formData = new FormData();
  // appending
  if (!username.value || !password.value || !imageFile) {
    alert("Please fill all data");
    return;
  }
  formData.append("username", username.value);
  formData.append("password", password.value);
  formData.append("profilePic", imageFile);
  console.log("file", formData);
  let request = await fetch(`${url}signup`, {
    method: "POST",
    body: formData,
  });
  let response = await request.json();
  if (response.message) {
    document.querySelector(".output-message").textContent = response.message;
    document.querySelector(".output-message").style.color = "rgb(71, 234, 71)";
  } else if (response.errMessage) {
    document.querySelector(".output-message").textContent = response.errMessage;
    document.querySelector(".output-message").style.color = "red";
  }
  setTimeout(() => {
    document.querySelector(".output-message").textContent = "";
  }, 3000);
}
