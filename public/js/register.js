document.getElementById("register-form").addEventListener("submit", (e) => {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorMessage = document.getElementById("error-message");

  // Reset error message
  errorMessage.textContent = "";

  if (password !== confirmPassword) {
    e.preventDefault(); // Prevent form submission
    errorMessage.textContent = "Passwords do not match!";
    return;
  }

  if (password.length < 8) {
    e.preventDefault(); // Prevent form submission
    errorMessage.textContent = "Password must be at least 8 characters long.";
  }
});
