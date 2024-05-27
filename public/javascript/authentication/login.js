"use strict";

const loginForm = document.querySelector("#login-form");
const usernameInput = document.querySelector("#username-input");
const usernameInputErrorMessage = document.querySelector(
  "#username-input-error-message"
);
const passwordInput = document.querySelector("#password-input");
const passwordInputErrorMessage = document.querySelector(
  "#password-input-error-message"
);
const loginButton = document.querySelector("#login-button");

loginForm.addEventListener("submit", async (event) => {
  try {
    loadingInit();
    event.preventDefault();

    usernameInputErrorMessage.textContent = "";
    passwordInputErrorMessage.textContent = "";
    await axios({
      url: `${baseUrl}/api/authentication/login`,
      method: "post",
      headers: { "content-type": "application/json" },
      data: {
        username: usernameInput.value,
        password: passwordInput.value,
      },
    }).catch((error) => {
      switch (error?.response?.data?.code) {
        case "validation-fails":
          Object.entries(error.response.data.errorMessages).forEach(
            ([field, errorMessage]) => {
              document.querySelector(
                `#${field}-input-error-message`
              ).textContent = errorMessage;
            }
          );

          break;

        case "user-not-found":
          usernameInputErrorMessage.textContent =
            "Nama Pengguna tidak ditemukan";

          break;

        case "invalid-password":
          passwordInputErrorMessage.textContent = "Kata Sandi salah";

          break;
      }

      throw "error";
    });

    window.location.href = `${baseUrl}/`;
  } catch (error) {
    return;
  } finally {
    loadingDestroy();
  }
});
