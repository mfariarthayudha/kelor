document.getElementById("nikKetuaRW").addEventListener(
  "input",
  debounce((event) => {
    if (event.target.value !== "") {
      getResidentName(
        event.target.value, // value nik
        "ketuaRwList" // idlist
      );

      // Since the input event listener is debounced, we need to ensure
      // that the change event listener is added only once.
      if (!event.target.hasChangeListener) {
        event.target.addEventListener("change", (changeEvent) => {
          const currentValue = changeEvent.target.value;
          setName("namaKetuaRW", currentValue);
        });
        event.target.hasChangeListener = true;
      }
    } else {
      document.getElementById("namaKetuaRW").value = "";
    }
  }, 700)
);
