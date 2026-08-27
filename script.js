/* =========================
   MORALE UI SCRIPT
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

let websiteName =
  localStorage.getItem("moraleWebsiteName") || "Morale";

let balanceHidden =
  localStorage.getItem("moraleBalanceHidden") === "true";


/* =========================
   TEST / AMOUNT
========================= */

let Amount = Number(
  localStorage.getItem("moraleAmount")
);

if (!Number.isFinite(Amount)) {
  Amount = 3000000;
}

function formatAmount() {
  const currency = getCurrency();

  return (
    currency.symbol +
    demo.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

function updateAmount() {
  const AmountText =
    document.getElementById("demoAmountText")

  const balanceDisplay =
    document.getElementById("balanceDisplay");

  if (demoAmountText) {
    demoAmountText.textContent =
      formatDemoAmount();
  }

  if (balanceDisplay) {
    if (balanceHidden) {
      balanceDisplay.textContent = "••••••••";
    } else {
      balanceDisplay.textContent =
        formatDemoAmount();
    }
  }
}

function setupDemoAmountEditor() {
  const editDemoAmount =
    document.getElementById("editDemoAmount");

  if (!editDemoAmount) {
    return;
  }

  editDemoAmount.addEventListener("click", function () {

    const enteredAmount = prompt(
      "Enter Test/Demo Amount:",
      demoAmount.toFixed(2)
    );

    if (enteredAmount === null) {
      return;
    }

    const cleanedAmount =
      enteredAmount
        .replace(/,/g, "")
        .trim();

    const newAmount = Number(cleanedAmount);

    if (
      cleanedAmount === "" ||
      !Number.isFinite(newAmount) ||
      newAmount < 0
    ) {
      alert("Please enter a valid Test/Demo Amount.");
      return;
    }

    demoAmount = newAmount;

    localStorage.setItem(
      "moraleDemoAmount",
      String(demoAmount)
    );

    updateDemoAmount();
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      setupDemoAmountEditor();
      updateDemoAmount();
    }
  );
} else {
  setupDemoAmountEditor();
  updateDemoAmount();
}

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
   CURRENCY
========================= */

function getCurrency() {
  return (
    currencies[selectedCurrency] ||
    currencies.USD
  );
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
      updateDemoAmount();
    }
  );
}

updateCurrencyText();


/* =========================
   AMOUNT
========================= */

let Amount = Number(
  localStorage.getItem("moraleAmount")
);

if (!Number.isFinite(Amount)) {
  Amount = 3000000;
}

function formatAmount() {
  const currency = getCurrency();

  return (
    currency.symbol +
    Amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

function updateAmount() {
  const AmountText =
    document.getElementById("AmountText");

  const balanceDisplay =
    document.getElementById("balanceDisplay");

  if (AmountText) {
    AmountText.textContent =
      formatAmount();
  }

  if (balanceDisplay) {
    if (balanceHidden) {
      balanceDisplay.textContent = "••••••••";
    } else {
      balanceDisplay.textContent =
        formatAmount();
    }
  }
}

function setupAmountEditor() {
  const editAmount =
    document.getElementById("editAmount");

  if (!editAmount) {
    return;
  }

  editAmount.addEventListener("click", function () {

    const enteredAmount = prompt(
      "Enter Amount:",
      demoAmount.toFixed(2)
    );

    if (enteredAmount === null) {
      return;
    }

    const cleanedAmount =
      enteredAmount
        .replace(/,/g, "")
        .trim();

    const newAmount = Number(cleanedAmount);

    if (
      cleanedAmount === "" ||
      !Number.isFinite(newAmount) ||
      newAmount < 0
    ) {
      alert("Please enter a valid Amount.");
      return;
    }

    Amount = newAmount;

    localStorage.setItem(
      "moraleAmount",
      String(Amount)
    );

    updateAmount();
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      setupAmountEditor();
      updateAmount();
    }
  );
} else {
  setupAmountEditor();
  updateAmount();
}

/* =========================
   BALANCE VISIBILITY
========================= */

function updateBalanceVisibility() {

  const balanceDisplay =
    document.getElementById(
      "balanceDisplay"
    );

  const toggleBalance =
    document.getElementById(
      "toggleBalance"
    );

  if (!balanceDisplay) {
    return;
  }

  if (balanceHidden) {

    balanceDisplay.textContent =
      "••••••••";

    if (toggleBalance) {
      toggleBalance.textContent =
        "🙈";

      toggleBalance.setAttribute(
        "aria-label",
        "Show Test/Demo Amount"
      );
    }

  } else {

    balanceDisplay.textContent =
      formatDemoAmount();

    if (toggleBalance) {
      toggleBalance.textContent =
        "👁️";

      toggleBalance.setAttribute(
        "aria-label",
        "Hide Test/Demo Amount"
      );
    }
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
        String(balanceHidden)
      );

      updateBalanceVisibility();
    }
  );
}

updateBalanceVisibility();
updateDemoAmount();


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

  const dashboardAvatar =
    document.getElementById(
      "dashboardAvatar"
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

  /*
    Only use the first letter when
    there is no saved profile picture.
  */

  if (
    !localStorage.getItem(
      "moraleProfilePicture"
    )
  ) {

    if (dashboardAvatar) {
      dashboardAvatar.textContent =
        firstLetter;
    }

    const settingsTopAvatar =
      document.getElementById(
        "settingsTopAvatar"
      );

    if (settingsTopAvatar) {
      settingsTopAvatar.textContent =
        firstLetter;
    }
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
        alert(
          "Please enter a profile name."
        );
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
   WEBSITE NAME
========================= */

function updateWebsiteName() {

  const websiteNameElements =
    document.querySelectorAll(
      "#websiteName"
    );

  websiteNameElements.forEach(
    (element) => {
      element.textContent =
        websiteName;
    }
  );


  const websiteNameText =
    document.getElementById(
      "websiteNameText"
    );

  if (websiteNameText) {
    websiteNameText.textContent =
      websiteName;
  }


  const brandMark =
    document.getElementById(
      "brandMark"
    );

  if (brandMark) {
    brandMark.textContent =
      websiteName
        .charAt(0)
        .toUpperCase();
  }


  const title =
    document.querySelector("title");

  if (title) {

    if (
      window.location.pathname.includes(
        "settings"
      )
    ) {

      title.textContent =
        websiteName +
        " — Settings";

    } else {

      title.textContent =
        websiteName +
        " — Account";
    }
  }
}

updateWebsiteName();


/* =========================
   EDIT WEBSITE NAME
========================= */

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

      const cleanedName =
        newWebsiteName.trim();

      if (!cleanedName) {
        alert(
          "Please enter a website name."
        );
        return;
      }

      websiteName =
        cleanedName;

      localStorage.setItem(
        "moraleWebsiteName",
        websiteName
      );

      updateWebsiteName();
    }
  );
}


/* =========================
   PROFILE PICTURE
========================= */

let savedProfilePicture =
  localStorage.getItem(
    "moraleProfilePicture"
  ) || "";


function createProfileImage(
  src,
  alt = "Profile picture"
) {

  const image =
    document.createElement("img");

  image.src = src;
  image.alt = alt;

  return image;
}


function updateProfilePicture() {

  const dashboardAvatar =
    document.getElementById(
      "dashboardAvatar"
    );

  const settingsTopAvatar =
    document.getElementById(
      "settingsTopAvatar"
    );

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

      dashboardAvatar.appendChild(
        createProfileImage(
          savedProfilePicture
        )
      );
    }

    if (settingsTopAvatar) {

      settingsTopAvatar.innerHTML =
        "";

      settingsTopAvatar.appendChild(
        createProfileImage(
          savedProfilePicture
        )
      );
    }

  } else {

    const firstLetter =
      accountName
        .charAt(0)
        .toUpperCase();

    if (settingsProfileImage) {
      settingsProfileImage.src =
        "avatar.png";
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

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        alert(
          "Please select an image."
        );

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

const loginForm =
  document.getElementById(
    "loginForm"
  );

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      window.location.href =
        "dashboard.html";
    }
  );
}
