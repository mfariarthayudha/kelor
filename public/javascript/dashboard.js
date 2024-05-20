class ButtonHandler {
  constructor(buttonIds, callback) {
    this.buttons = buttonIds.map((id) => document.getElementById(id));
    this.callback = callback;
    this.buttons.forEach((button) => {
      button.addEventListener("click", this.handleButtonClick.bind(this));
    });
  }

  handleButtonClick(event) {
    const button = event.target;
    const isActive = button.classList.contains("btn-clicked");

    loadingInit();

    if (isActive) {
      button.classList.remove("btn-clicked");
      location.reload();
    } else {
      this.toggleButton(button);
      this.deactivateOtherButtons(button);
      this.callback(button.id);
    }

    loadingDestroy();
  }

  toggleButton(button) {
    button.classList.toggle("btn-clicked");
  }

  deactivateOtherButtons(activeButton) {
    this.buttons.forEach((button) => {
      if (button !== activeButton) {
        button.classList.remove("btn-clicked");
      }
    });
  }
}

// Class responsible for fetching data
class DataFetcher {
  async fetchCounts(period) {
    try {
      let response;
      switch (period) {
        case "today":
          response = await axios.get("/api/dashboard/today");
          break;
        case "monthly":
          response = await axios.get("/api/dashboard/monthly");
          break;
        case "annual":
          response = await axios.get("/api/dashboard/annual");
          break;
        default:
          console.error("Invalid period");
          return;
      }

      const counts = response.data;
      this.updateCounts(counts);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  }

  updateCounts(counts) {
    document.getElementById("dusunCount").textContent = counts.dusun;
    document.getElementById("rwCount").textContent = counts.rw;
    document.getElementById("rtCount").textContent = counts.rt;
    document.getElementById("residentCount").textContent = counts.residents;
    document.getElementById("documentCount").textContent = counts.documents;
  }
}

// Dependency Injection: Create instances and link them
const dataFetcher = new DataFetcher();
const buttonHandler = new ButtonHandler(
  ["today", "monthly", "annual"],
  (period) => {
    dataFetcher.fetchCounts(period);
  }
);
