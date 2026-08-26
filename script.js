/* =========================
   CURRENCY DATA
========================= */

const currencies = {
  USD: { symbol: "$", flag: "🇺🇸" },
  GBP: { symbol: "£", flag: "🇬🇧" },
  EUR: { symbol: "€", flag: "🇪🇺" },
  NGN: { symbol: "₦", flag: "🇳🇬" },
  BRL: { symbol: "R$", flag: "🇧🇷" },
  CAD: { symbol: "C$", flag: "🇨🇦" },
  AUD: { symbol: "A$", flag: "🇦🇺" },
  CHF: { symbol: "CHF", flag: "🇨🇭" },
  JPY: { symbol: "¥", flag: "🇯🇵" },
  ZAR: { symbol: "R", flag: "🇿🇦" }
};

let selectedCurrency =
  localStorage.getItem("moraleCurrency") || "USD";

let accountName =
  localStorage.getItem("moraleName") || "Michael";

let balanceHidden =
  localStorage.getItem("moraleBalanceHidden") === "true";


/* =========================
   THEME
========================= */

function loadTheme() {
  const savedTheme =
    localStorage.getItem("moraleTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeLabel();
}

function updateThemeLabel() {
  const label =
    document.getElementById("themeLabel");

  if (!label) return;

  label.textContent =
    document.body.classList.contains("dark")
      ? "Dark mode"
      : "Light mode";
}

const themeToggle =
  document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "moraleTheme",
      document.body.classList.contains("dark")
        ? "dark"
        : "light"
    );

    updateThemeLabel();
  });
}

loadTheme();


/* =========================
   CURRENCY DISPLAY
========================= */

function updateCurrencyText() {
  const currency =
    currencies[selectedCurrency] || currencies.USD;

  const accountCurrency =
    document.getElementById("accountCurrency");

  const accountCurrencyDetails =
    document.getElementById("accountCurrencyDetails");

  const settingsCurrency =
    document.getElementById("settingsCurrency");

  const text =
    `${currency.flag} ${selectedCurrency}`;

  if (accountCurrency) {
    accountCurrency.textContent = text;
  }

  if (accountCurrencyDetails) {
    accountCurrencyDetails.textContent = text;
  }

  if (settingsCurrency) {
    settingsCurrency.textContent = text;
  }
}

updateCurrencyText();


/* =========================
   SETTINGS CURRENCY
========================= */

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
    }
  );
}


/* =========================
   BALANCE VISIBILITY
========================= */

function updateBalanceVisibility() {
  const balanceDisplay =
    document.getElementById("balanceDisplay");

  const toggleBalance =
    document.getElementById("toggleBalance");

  if (!balanceDisplay || !toggleBalance) {
    return;
  }

  if (balanceHidden) {
    balanceDisplay.textContent = "••••••••";
    toggleBalance.textContent = "🙈";
    toggleBalance.setAttribute(
      "aria-label",
      "Show balance"
    );
  } else {
    /*
      The displayed amount remains whatever
      is already present in the page.
    */
    toggleBalance.textContent = "👁️";
    toggleBalance.setAttribute(
      "aria-label",
      "Hide balance"
    );
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

    updateBalanceVisibility();
  });
}

updateBalanceVisibility();


/* =========================
   ACCOUNT NAME
========================= */

function updateName() {
  const accountNameElement =
    document.getElementById("accountName");

  const accountHolder =
    document.getElementById("accountHolder");

  const settingsName =
    document.getElementById("settingsName");

  const profileNameText =
    document.getElementById("profileNameText");

  const settingsAvatar =
    document.getElementById("settingsAvatar");

  const dashboardAvatar =
    document.getElementById("dashboardAvatar");

  const firstLetter =
    accountName.charAt(0).toUpperCase();

  if (accountNameElement) {
    accountNameElement.textContent =
      accountName;
  }

  if (accountHolder) {
    accountHolder.textContent =
      accountName;
  }

  if (settingsName) {
    settingsName.textContent =
      accountName;
  }

  if (profileNameText) {
    profileNameText.textContent =
      accountName;
  }

  if (settingsAvatar) {
    settingsAvatar.textContent =
      firstLetter;
  }

  if (dashboardAvatar) {
    dashboardAvatar.textContent =
      firstLetter;
  }
}

updateName();


/* =========================
   EDIT PROFILE NAME
========================= */

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

    const cleanedName =
      newName.trim();

    if (!cleanedName) return;

    accountName =
      cleanedName;

    localStorage.setItem(
      "moraleName",
      accountName
    );

    updateName();
  });
}


/* =========================
   PASSWORD VISIBILITY
========================= */

const passwordInput =
  document.getElementById("password");

const togglePassword =
  document.getElementById("togglePassword");

if (passwordInput && togglePassword) {

  togglePassword.textContent = "👁️";

  togglePassword.addEventListener(
    "click",
    () => {

      const isHidden =
        passwordInput.type === "password";

      passwordInput.type =
        isHidden
          ? "text"
          : "password";

      togglePassword.textContent =
        isHidden
          ? "🙈"
          : "👁️";

      togglePassword.setAttribute(
        "aria-label",
        isHidden
          ? "Hide password"
          : "Show password"
      );
    }
  );
}


/* =========================
   CUSTOMER SERVICE
========================= */

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
  supportButton.addEventListener(
    "click",
    () => {
      supportPanel.classList.add("show");
    }
  );
}

if (closeSupport && supportPanel) {
  closeSupport.addEventListener(
    "click",
    () => {
      supportPanel.classList.remove("show");
    }
  );
}

if (chatForm && chatInput && chatMessages) {
  chatForm.addEventListener(
    "submit",
    (event) => {
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

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

      setTimeout(() => {
        const reply =
          document.createElement("div");

        reply.className =
          "message received";

        reply.textContent =
          "Thanks for your message. How can we help?";

        chatMessages.appendChild(
          reply
        );

        chatMessages.scrollTop =
          chatMessages.scrollHeight;

      }, 700);
    }
  );
}
