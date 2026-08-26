/* =========================
   MORale UI SCRIPT
========================= */

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


/* =========================
   SAVED SETTINGS
========================= */

let selectedCurrency =
  localStorage.getItem("moraleCurrency") || "USD";

let accountName =
  localStorage.getItem("moraleName") || "Michael";

let balanceHidden =
  localStorage.getItem("moraleBalanceHidden") === "true";

const defaultBalance = 3000000;


/* =========================
   THEME
========================= */

function loadTheme() {
  const savedTheme =
    localStorage.getItem("moraleTheme") || "light";

  document.body.classList.toggle(
    "dark",
    savedTheme === "dark"
  );

  updateThemeLabel();
}

function updateThemeLabel() {
  const themeLabel =
    document.getElementById("themeLabel");

  if (!themeLabel) return;

  themeLabel.textContent =
    document.body.classList.contains("dark")
      ? "Dark mode"
      : "Light mode";
}

const themeToggle =
  document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    const isDark =
      document.body.classList.toggle("dark");

    localStorage.setItem(
      "moraleTheme",
      isDark ? "dark" : "light"
    );

    updateThemeLabel();
  });
}

loadTheme();


/* =========================
   CURRENCY DISPLAY
========================= */

function getCurrency() {
  return currencies[selectedCurrency] || currencies.USD;
}

function updateCurrencyText() {

  const currency = getCurrency();

  const displayText =
    `${currency.flag} ${selectedCurrency}`;

  const accountCurrency =
    document.getElementById("accountCurrency");

  const accountCurrencyDetails =
    document.getElementById(
      "accountCurrencyDetails"
    );

  const settingsCurrency =
    document.getElementById(
      "settingsCurrency"
    );

  if (accountCurrency) {
    accountCurrency.textContent =
      displayText;
  }

  if (accountCurrencyDetails) {
    accountCurrencyDetails.textContent =
      displayText;
  }

  if (settingsCurrency) {
    settingsCurrency.textContent =
      displayText;
  }
}


/* =========================
   SETTINGS CURRENCY
   Currency can only be
   changed here.
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
    function () {

      selectedCurrency =
        this.value;

      localStorage.setItem(
        "moraleCurrency",
        selectedCurrency
      );

      updateCurrencyText();
    }
  );
}

updateCurrencyText();


/* =========================
   BALANCE
========================= */

function formatBalance() {

  const currency = getCurrency();

  return (
    currency.symbol +
    defaultBalance.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )
  );
}

function updateBalanceVisibility() {

  const balanceDisplay =
    document.getElementById(
      "balanceDisplay"
    );

  const toggleBalance =
    document.getElementById(
      "toggleBalance"
    );

  if (!balanceDisplay || !toggleBalance) {
    return;
  }

  if (balanceHidden) {

    balanceDisplay.textContent =
      "••••••••";

    toggleBalance.textContent =
      "🙈";

    toggleBalance.setAttribute(
      "aria-label",
      "Show balance"
    );

  } else {

    balanceDisplay.textContent =
      formatBalance();

    toggleBalance.textContent =
      "👁️";

    toggleBalance.setAttribute(
      "aria-label",
      "Hide balance"
    );
  }
}

const toggleBalance =
  document.getElementById(
    "toggleBalance"
  );

if (toggleBalance) {

  toggleBalance.addEventListener(
    "click",
    () => {

      balanceHidden =
        !balanceHidden;

      localStorage.setItem(
        "moraleBalanceHidden",
        balanceHidden
      );

      updateBalanceVisibility();
    }
  );
}

updateBalanceVisibility();


/* =========================
   PROFILE NAME
========================= */

function updateName() {

  const accountNameElement =
    document.getElementById(
      "accountName"
    );

  const accountHolder =
    document.getElementById(
      "accountHolder"
    );

  const settingsName =
    document.getElementById(
      "settingsName"
    );

  const profileNameText =
    document.getElementById(
      "profileNameText"
    );

  const settingsAvatar =
    document.getElementById(
      "settingsAvatar"
    );

  const dashboardAvatar =
    document.getElementById(
      "dashboardAvatar"
    );

  const settingsTopAvatar =
    document.getElementById(
      "settingsTopAvatar"
    );

  const firstLetter =
    accountName
      .charAt(0)
      .toUpperCase();

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

  if (settingsTopAvatar) {
    settingsTopAvatar.textContent =
      firstLetter;
  }
}

updateName();


/* =========================
   EDIT PROFILE NAME
========================= */

const editName =
  document.getElementById(
    "editName"
  );

if (editName) {

  editName.addEventListener(
    "click",
    () => {

      const newName =
        prompt(
          "Enter profile name:",
          accountName
        );

      if (newName === null) {
        return;
      }

      const cleanedName =
        newName.trim();

      if (!cleanedName) {
        return;
      }

      accountName =
        cleanedName;

      localStorage.setItem(
        "moraleName",
        accountName
      );

      updateName();
    }
  );
}


/* =========================
   PASSWORD SHOW / HIDE
========================= */

const passwordInput =
  document.getElementById(
    "password"
  );

const togglePassword =
  document.getElementById(
    "togglePassword"
  );

if (
  passwordInput &&
  togglePassword
) {

  togglePassword.textContent =
    "👁️";

  togglePassword.setAttribute(
    "aria-label",
    "Show password"
  );

  togglePassword.addEventListener(
    "click",
    () => {

      const currentlyHidden =
        passwordInput.type ===
        "password";

      passwordInput.type =
        currentlyHidden
          ? "text"
          : "password";

      togglePassword.textContent =
        currentlyHidden
          ? "🙈"
          : "👁️";

      togglePassword.setAttribute(
        "aria-label",
        currentlyHidden
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
  document.getElementById(
    "supportButton"
  );

const supportPanel =
  document.getElementById(
    "supportPanel"
  );

const closeSupport =
  document.getElementById(
    "closeSupport"
  );

const chatForm =
  document.getElementById(
    "chatForm"
  );

const chatInput =
  document.getElementById(
    "chatInput"
  );

const chatMessages =
  document.getElementById(
    "chatMessages"
  );


if (
  supportButton &&
  supportPanel
) {

  supportButton.addEventListener(
    "click",
    () => {
      supportPanel.classList.add(
        "show"
      );

      if (chatInput) {
        chatInput.focus();
      }
    }
  );
}


if (
  closeSupport &&
  supportPanel
) {

  closeSupport.addEventListener(
    "click",
    () => {
      supportPanel.classList.remove(
        "show"
      );
    }
  );
}


/* =========================
   LOCAL CHAT UI
========================= */

if (
  chatForm &&
  chatInput &&
  chatMessages
) {

  chatForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const message =
        chatInput.value.trim();

      if (!message) {
        return;
      }

      const sentMessage =
        document.createElement(
          "div"
        );

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
          document.createElement(
            "div"
          );

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


/* =========================
   CLOSE SUPPORT WITH ESC
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      supportPanel
    ) {

      supportPanel.classList.remove(
        "show"
      );
    }
  }
);
