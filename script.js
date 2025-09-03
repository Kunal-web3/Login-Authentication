// ------------------ Toggle Between Forms ------------------
const container = document.getElementById("container");
document.querySelector(".register-btn").addEventListener("click", () => {
    container.classList.add("active");
});
document.querySelector(".login-btn").addEventListener("click", () => {
    container.classList.remove("active");
});

// ------------------ Registration Form ------------------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("reg-username").value.trim();
        const email = document.getElementById("reg-email").value.trim().toLowerCase(); 
        const password = document.getElementById("reg-password").value.trim();

        if (username === "" || email === "" || password === "") {
            showMessage("⚠️ Please fill all fields!", "error");
            return;
        }

        // ✅ Get all users from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // ✅ Check duplicate email
        if (users.some(u => u.email === email)) {
            showMessage("⚠️ Email already registered!", "error");
            return;
        }

        // ✅ Add new user
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        showMessage("✅ Registration Successful! Please login.", "success");

        setTimeout(() => {
            container.classList.remove("active"); 
        }, 1500);

        registerForm.reset();
    });
}

// ------------------ Login Form ------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let foundUser = users.find(u => u.username === username && u.password === password);

        if (foundUser) {
            showMessage("🎉 Login Successful! Redirecting...", "success");
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); // ✅ Save session
            setTimeout(() => {
                window.location.href = "welcome.html";
            }, 1500);
        } else {
            showMessage("❌ Invalid Username or Password!", "error");
        }
    });
}

// ------------------ Forgot Password Handling ------------------
const forgotLink = document.getElementById("forgotLink");
const loginBox = document.getElementById("loginBox");
const forgotBox = document.getElementById("forgotBox");
const forgotForm = document.getElementById("forgotForm");
const backToLogin = document.getElementById("backToLogin");

if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginBox.style.display = "none";
        forgotBox.style.display = "flex";
    });
}

if (backToLogin) {
    backToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        forgotBox.style.display = "none";
        loginBox.style.display = "flex";
    });
}

if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("forgot-email").value.trim().toLowerCase();
        const newPassword = document.getElementById("new-password").value.trim();

        if (email === "" || newPassword === "") {
            showMessage("⚠️ Please fill all fields!", "error");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userIndex = users.findIndex(u => u.email === email);

        if (userIndex === -1) {
            showMessage("❌ Email not found! Please register first.", "error");
            return;
        }

        // ✅ Update password
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));

        showMessage("✅ Password reset successful! Please login.", "success");

        setTimeout(() => {
            forgotBox.style.display = "none";
            loginBox.style.display = "flex";
        }, 2000);
    });
}

// ------------------ Helper: Message Display ------------------
function showMessage(msg, type) {
    let oldMsg = document.getElementById("msgBox");
    if (oldMsg) oldMsg.remove();

    let div = document.createElement("div");
    div.id = "msgBox";
    div.innerText = msg;
    div.style.position = "absolute";
    div.style.top = "10px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.padding = "10px 20px";
    div.style.borderRadius = "8px";
    div.style.fontWeight = "bold";
    div.style.zIndex = "1000";
    div.style.color = "#fff";
    div.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    div.style.textAlign = "center";
    div.style.maxWidth = "80%";
    div.style.opacity = "0";
    div.style.transition = "opacity 0.5s ease";

    if (type === "success") {
        div.style.background = "green";
    } else {
        div.style.background = "red";
    }

    const parent = document.querySelector(".container") || document.body;
    parent.prepend(div);

    setTimeout(() => {
        div.style.opacity = "1";
    }, 50);

    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 500);
    }, 3000);
}
