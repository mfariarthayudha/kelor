function showError(error) {
  console.log(error.response.data.errorMessages);
  let resError = "";
  if (typeof error.response.data.errorMessages == "object") {
    for (const key in error.response.data.errorMessages) {
      if (error.response.data.errorMessages.hasOwnProperty(key)) {
        resError += error.response.data.errorMessages[key] + "<br />";
      }
    }
  } else {
    resError = error.response.data.errorMessages;
  }

  Swal.fire({
    icon: "error",
    title: resError,
    showConfirmButton: true,
  });
}

function showSuccess(message) {
  Swal.fire({
    title: message,
    icon: "success",
    showConfirmButton: false,
    timer: 1000,
  });
}

function showConfirmationDialog(title, html, confirmCallback, denyCallback) {
  Swal.fire({
    icon: "question",
    showDenyButton: true,
    confirmButtonText: "Ya",
    denyButtonText: `Tidak`,
    title: title,
    html: html,
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    } else if (result.isDenied) {
      denyCallback();
    }
  });
}
