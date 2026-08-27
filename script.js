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
   PROFILE PICTURE
========================= */

let savedProfilePicture =
  localStorage.getItem("moraleProfilePicture") || "";


function updateProfilePicture() {

  const dashboardAvatar =
    document.getElementById("dashboardAvatar");

  const settingsAvatar =
    document.getElementById("settingsAvatar");

  const settingsTopAvatar =
    document.getElementById("settingsTopAvatar");

  const settingsProfileImage =
    document.getElementById(
      "settingsProfileImage"
    );

  if (savedProfilePicture) {

    if (settingsProfileImage) {
      settingsProfileImage.src =
        savedProfilePicture;
    }

    if (dashboardAvatar) {

      dashboardAvatar.innerHTML =
        "";

      const image =
        document.createElement("img");

      image.src =
        savedProfilePicture;

      image.alt =
        "Profile picture";

      dashboardAvatar.appendChild(
        image
      );
    }

    if (settingsTopAvatar) {

      settingsTopAvatar.innerHTML =
        "";

      const image =
        document.createElement("img");

      image.src =
        savedProfilePicture;

      image.alt =
        "Profile picture";

      settingsTopAvatar.appendChild(
        image
      );
    }

  } else {

    if (settingsProfileImage) {
      settingsProfileImage.src =
        "avatar.png";
    }

    if (dashboardAvatar) {
      dashboardAvatar.textContent =
        accountName
          .charAt(0)
          .toUpperCase();
    }

    if (settingsTopAvatar) {
      settingsTopAvatar.textContent =
        accountName
          .charAt(0)
          .toUpperCase();
    }
  }
}


const changePicture =
  document.getElementById(
    "changePicture"
  );

const profilePictureInput =
  document.getElementById(
    "profilePictureInput"
  );


if (
  changePicture &&
  profilePictureInput
) {

  changePicture.addEventListener(
    "click",
    () => {

      profilePictureInput.click();

    }
  );


  profilePictureInput.addEventListener(
    "change",
    function () {

      const file =
        this.files &&
        this.files[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        return;
      }

      const reader =
        new FileReader();

      reader.onload =
        function (event) {

          savedProfilePicture =
            event.target.result;

          localStorage.setItem(
            "moraleProfilePicture",
            savedProfilePicture
          );

          updateProfilePicture();

        };

      reader.readAsDataURL(file);

    }
  );
}


updateProfilePicture();


/* =========================
   WEBSITE NAME
========================= */

let websiteName =
  localStorage.getItem(
    "moraleWebsiteName"
  ) || "Morale";


function updateWebsiteName() {

  const websiteNameElements =
    document.querySelectorAll(
      "#websiteName"
    );

  const websiteNameText =
    document.getElementById(
      "websiteNameText"
    );

  const brandMark =
    document.getElementById(
      "brandMark"
    );

  const pageTitle =
    document.querySelector("title");


  websiteNameElements.forEach(
    (element) => {

      element.textContent =
        websiteName;

    }
  );


  if (websiteNameText) {

    websiteNameText.textContent =
      websiteName;

  }


  if (brandMark) {

    brandMark.textContent =
      websiteName
        .charAt(0)
        .toUpperCase();

  }


  if (pageTitle) {

    const separator =
      pageTitle.textContent.indexOf(" — ");

    const pageSection =
      separator !== -1
        ? pageTitle.textContent.substring(
            separator
          )
        : "";

    pageTitle.textContent =
      websiteName +
      pageSection;

  }
}


updateWebsiteName();


const editWebsiteName =
  document.getElementById(
    "editWebsiteName"
  );


if (editWebsiteName) {

  editWebsiteName.addEventListener(
    "click",
    () => {

      const newWebsiteName =
        prompt(
          "Enter website name:",
          websiteName
        );

      if (newWebsiteName === null) {
        return;
      }

      const cleanedWebsiteName =
        newWebsiteName.trim();

      if (!cleanedWebsiteName) {
        return;
      }

      websiteName =
        cleanedWebsiteName;

      localStorage.setItem(
        "moraleWebsiteName",
        websiteName
      );

      updateWebsiteName();

    }
  );
}

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

/* =========================
   LOGIN PAGE NAVIGATION
   ========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    window.location.href = "dashboard.html";
  });
}
