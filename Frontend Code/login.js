let username = document.getElementById("username");
let password = document.getElementById("password");

let loginButton = document.getElementById("login-button");
let passwordEye = document.querySelector(".fa-solid");

let url = "https://full-stack-trial-lmcb.onrender.com/";

loginButton.addEventListener("click", sendData);
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
  // appending
  if (!username.value || !password.value) {
    alert("Please fill all data");
    return;
  }
  let data = { username: username.value, password: password.value };
  let request = await fetch(`${url}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let response = await request.json();
  console.log("out: ", response);

  if (response.message) {
    document.querySelector(".output-message").textContent = response.message;
    document.querySelector(".output-message").style.color = "rgb(71, 234, 71)";
  } else if (response.errMessage) {
    document.querySelector(".output-message").textContent = response.errMessage;
    document.querySelector(".output-message").style.color = "red";
  }
  if (!response.errMessage) {
    username.value = "";
    password.value = "";
  }
  //   storing token in local storage
  if (response.token) {
    localStorage.setItem("tokenString", response.token);
    window.location.href = "./dashboard.html";
  }
  setTimeout(() => {
    document.querySelector(".output-message").textContent = "";
  }, 3000);
}
