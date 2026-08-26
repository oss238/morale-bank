const currencies = {
  USD: { symbol: "$", rate: 1 },
  GBP: { symbol: "£", rate: 0.78 },
  EUR: { symbol: "€", rate: 0.92 },
  NGN: { symbol: "₦", rate: 1500 },
  BRL: { symbol: "R$", rate: 5.4 },
  CAD: { symbol: "C$", rate: 1.36 },
  AUD: { symbol: "A$", rate: 1.52 },
  CHF: { symbol: "CHF ", rate: 0.87 },
  JPY: { symbol: "¥", rate: 155 },
  ZAR: { symbol: "R", rate: 18.2 }
};

let balanceUSD = Number(localStorage.getItem("moraleBalance")) || 3000000;
let selectedCurrency = localStorage.getItem("moraleCurrency") || "USD";
let accountName = localStorage.getItem("moraleName") || "Michael";
let balanceHidden = localStorage.getItem("moraleBalanceHidden") === "true";

/* ---------- THEME ---------- */

function loadTheme() {
  const savedTheme = localStorage.getItem("moraleTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeLabel();
}

function updateThemeLabel() {
  const label = document.getElementById("themeLabel");

  if (label) {
    label.textContent =
      document.body.classList.contains("dark")
        ? "Dark mode"
        : "Light mode";
  }
}

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem(
      "moraleTheme",
      isDark ? "dark" : "light"
    );

    updateThemeLabel();
  });
}

loadTheme();

/* ---------- BALANCE ---------- */

function formatBalance() {
  const currency = currencies[selectedCurrency];

  const converted = balanceUSD * currency.rate;

  return `${currency.symbol}${converted.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )}`;
}

function updateBalance() {
  const balanceDisplay =
    document.getElementById("balanceDisplay");

  if (!balanceDisplay) return;

  balanceDisplay.textContent = balanceHidden
    ? "••••••••"
    : formatBalance();
}

function updateCurrencyText() {
  const accountCurrency =
    document.getElementById("accountCurrency");

  const settingsCurrency =
    document.getElementById("settingsCurrency");

  if (accountCurrency) {
    accountCurrency.textContent = selectedCurrency;
  }

  if (settingsCurrency) {
    settingsCurrency.textContent = selectedCurrency;
  }
}

const toggleBalance =
  document.getElementById("toggleBalance");

if (toggleBalance) {
  toggleBalance.addEventListener("click", () => {
    balanceHidden = !balanceHidden;

    localStorage.setItem(
      "moraleBalanceHidden",
      balanceHidden
    );

    toggleBalance.textContent =
      balanceHidden ? "○" : "◉";

    updateBalance();
  });
}

const currencySelect =
  document.getElementById("currencySelect");

if (currencySelect) {
  currencySelect.value = selectedCurrency;

  currencySelect.addEventListener("change", (event) => {
    selectedCurrency = event.target.value;

    localStorage.setItem(
      "moraleCurrency",
      selectedCurrency
    );

    updateBalance();
    updateCurrencyText();

    const settingsSelect =
      document.getElementById(
        "settingsCurrencySelect"
      );

    if (settingsSelect) {
      settingsSelect.value = selectedCurrency;
    }
  });
}

updateBalance();
updateCurrencyText();

/* ---------- ACCOUNT NAME ---------- */

function updateName() {
  const accountNameElement =
    document.getElementById("accountName");

  const accountHolder =
    document.getElementById("accountHolder");

  const settingsName =
    document.getElementById("settingsName");

  const profileNameText =
    document.getElementById("profileNameText");

  if (accountNameElement) {
    accountNameElement.textContent = accountName;
  }

  if (accountHolder) {
    accountHolder.textContent = accountName;
  }

  if (settingsName) {
    settingsName.textContent = accountName;
  }

  if (profileNameText) {
    profileNameText.textContent = accountName;
  }
}

updateName();

/* ---------- EDIT BALANCE ---------- */

const editBalanceButton =
  document.getElementById("editBalanceButton");

const balanceModal =
  document.getElementById("balanceModal");

const closeBalanceModal =
  document.getElementById("closeBalanceModal");

const saveBalance =
  document.getElementById("saveBalance");

const balanceInput =
  document.getElementById("balanceInput");

if (editBalanceButton && balanceModal) {
  editBalanceButton.addEventListener("click", () => {
    balanceInput.value = balanceUSD;
    balanceModal.classList.add("show");
  });
}

if (closeBalanceModal) {
  closeBalanceModal.addEventListener("click", () => {
    balanceModal.classList.remove("show");
  });
}

if (saveBalance) {
  saveBalance.addEventListener("click", () => {
    const newBalance =
      Number(balanceInput.value);

    if (
      Number.isFinite(newBalance) &&
      newBalance >= 0
    ) {
      balanceUSD = newBalance;

      localStorage.setItem(
        "moraleBalance",
        balanceUSD
      );

      balanceModal.classList.remove("show");

      updateBalance();
    }
  });
}

/* ---------- CUSTOMER SERVICE ---------- */

const supportButton =
  document.getElementById("supportButton");

const supportPanel =
  document.getElementById("supportPanel");

const closeSupport =
  document.getElementById("closeSupport");

const chatForm =
  document.getElementById("chatForm");

const chatInput =
  document.getElementById("chatInput");

const chatMessages =
  document.getElementById("chatMessages");

if (supportButton && supportPanel) {
  supportButton.addEventListener("click", () => {
    supportPanel.classList.add("show");
  });
}

if (closeSupport && supportPanel) {
  closeSupport.addEventListener("click", () => {
    supportPanel.classList.remove("show");
  });
}

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message =
      chatInput.value.trim();

    if (!message) return;

    const sentMessage =
      document.createElement("div");

    sentMessage.className =
      "message sent";

    sentMessage.textContent =
      message;

    chatMessages.appendChild(
      sentMessage
    );

    chatInput.value = "";

    setTimeout(() => {
      const reply =
        document.createElement("div");

      reply.className =
        "message received";

      reply.textContent =
        "Hi, how can we help you?";

      chatMessages.appendChild(reply);

      chatMessages.scrollTop =
        chatMessages.scrollHeight;
    }, 700);
  });
}

/* ---------- SETTINGS CURRENCY ---------- */

const settingsCurrencySelect =
  document.getElementById(
    "settingsCurrencySelect"
  );

if (settingsCurrencySelect) {
  settingsCurrencySelect.value =
    selectedCurrency;

  settingsCurrencySelect.addEventListener(
    "change",
    (event) => {
      selectedCurrency =
        event.target.value;

      localStorage.setItem(
        "moraleCurrency",
        selectedCurrency
      );

      updateCurrencyText();

      const dashboardSelect =
        document.getElementById(
          "currencySelect"
        );

      if (dashboardSelect) {
        dashboardSelect.value =
          selectedCurrency;
      }

      updateBalance();
    }
  );
}

/* ---------- PROFILE NAME ---------- */

const editName =
  document.getElementById("editName");

if (editName) {
  editName.addEventListener("click", () => {
    const newName =
      prompt(
        "Enter profile name:",
        accountName
      );

    if (!newName) return;

    accountName =
      newName.trim();

    if (!accountName) return;

    localStorage.setItem(
      "moraleName",
      accountName
    );

    updateName();

    const avatar =
      document.getElementById(
        "settingsAvatar"
      );

    if (avatar) {
      avatar.textContent =
        accountName.charAt(0).toUpperCase();
    }
  });
}

/* ---------- LOGIN ---------- */

const loginForm =
  document.getElementById("loginForm");

const loginMessage =
  document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      loginMessage.textContent =
        "Signing in...";

      setTimeout(() => {
        window.location.href =
          "dashboard.html";
      }, 500);
    }
  );
}
