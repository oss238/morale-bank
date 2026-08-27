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
   TEST AMOUNT
========================= */

let testAmount = Number(
  localStorage.getItem("moraleTestAmount")
);

if (!Number.isFinite(testAmount)) {
  testAmount = 3000000;
}


/* =========================
   CURRENCY
========================= */

function getCurrency() {
  return currencies[selectedCurrency] || currencies.USD;
}

function formatAmount() {
  const currency = getCurrency();

  return (
    currency.symbol +
    testAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

function updateCurrencyText() {
  const currency = getCurrency();
  const displayText =
    `${currency.flag} ${selectedCurrency}`;

  const accountCurrency =
    document.getElementById("accountCurrency");

  const accountCurrencyDetails =
    document.getElementById("accountCurrencyDetails");

  const settingsCurrency =
    document.getElementById("settingsCurrency");

  if (accountCurrency) {
    accountCurrency.textContent = displayText;
  }

  if (accountCurrencyDetails) {
    accountCurrencyDetails.textContent = displayText;
  }

  if (settingsCurrency) {
    settingsCurrency.textContent = displayText;
  }
}

function updateAmount() {
  const amountText =
    document.getElementById("testAmountText");

  const balanceDisplay =
    document.getElementById("balanceDisplay");

  if (amountText) {
    amountText.textContent = formatAmount();
  }

  if (balanceDisplay) {
    balanceDisplay.textContent =
      balanceHidden ? "••••••••" : formatAmount();
  }
}


/* =========================
   EDIT TEST AMOUNT
========================= */

function setupAmountEditor() {
  const editAmount =
    document.getElementById("editAmount");

  if (!editAmount) {
    return;
  }

  editAmount.addEventListener("click", function () {

    const enteredAmount = prompt(
      "Enter Test Amount:",
      testAmount.toFixed(2)
    );

    if (enteredAmount === null) {
      return;
    }

    const cleanedAmount =
      enteredAmount.replace(/,/g, "").trim();

    const newAmount = Number(cleanedAmount);

    if (
      cleanedAmount === "" ||
      !Number.isFinite(newAmount) ||
      newAmount < 0
    ) {
      alert("Please enter a valid Test Amount.");
      return;
    }

    testAmount = newAmount;

    localStorage.setItem(
      "moraleTestAmount",
      String(testAmount)
    );

    updateAmount();
  });
}


/* =========================
   PROFILE NAME
========================= */

function updateName() {
  const elements = [
    document.getElementById("accountName"),
    document.getElementById("accountHolder"),
    document.getElementById("settingsName"),
    document.getElementById("profileNameText")
  ];

  elements.forEach(function (element) {
    if (element) {
      element.textContent = accountName;
    }
  });

  const firstLetter =
    accountName.charAt(0).toUpperCase();

  const dashboardAvatar =
    document.getElementById("dashboardAvatar");

  const settingsTopAvatar =
    document.getElementById("settingsTopAvatar");

  if (
    !localStorage.getItem("moraleProfilePicture")
  ) {
    if (dashboardAvatar) {
      dashboardAvatar.textContent = firstLetter;
    }

    if (settingsTopAvatar) {
      settingsTopAvatar.textContent = firstLetter;
    }
  }
}


/* =========================
   EDIT PROFILE NAME
========================= */

function setupNameEditor() {
  const editName =
    document.getElementById("editName");

  if (!editName) {
    return;
  }

  editName.addEventListener("click", function () {

    const newName = prompt(
      "Enter profile name:",
      accountName
    );

    if (newName === null) {
      return;
    }

    const cleanedName = newName.trim();

    if (!cleanedName) {
      alert("Please enter a profile name.");
      return;
    }

    accountName = cleanedName;

    localStorage.setItem(
      "moraleName",
      accountName
    );

    updateName();
  });
}


/* =========================
   WEBSITE NAME
========================= */

function updateWebsiteName() {
  document
    .querySelectorAll("#websiteName")
    .forEach(function (element) {
      element.textContent = websiteName;
    });

  const websiteNameText =
    document.getElementById("websiteNameText");

  if (websiteNameText) {
    websiteNameText.textContent = websiteName;
  }

  const brandMark =
    document.getElementById("brandMark");

  if (brandMark) {
    brandMark.textContent =
      websiteName.charAt(0).toUpperCase();
  }

  const title =
    document.querySelector("title");

  if (title) {
    title.textContent =
      window.location.pathname.includes("settings")
        ? websiteName + " — Settings"
        : websiteName + " — Account";
  }
}


/* =========================
   EDIT WEBSITE NAME
========================= */

function setupWebsiteEditor() {
  const editWebsiteName =
    document.getElementById("editWebsiteName");

  if (!editWebsiteName) {
    return;
  }

  editWebsiteName.addEventListener("click", function () {

    const newWebsiteName = prompt(
      "Enter website name:",
      websiteName
    );

    if (newWebsiteName === null) {
      return;
    }

    const cleanedName =
      newWebsiteName.trim();

    if (!cleanedName) {
      alert("Please enter a website name.");
      return;
    }

    websiteName = cleanedName;

    localStorage.setItem(
      "moraleWebsiteName",
      websiteName
    );

    updateWebsiteName();
  });
}


/* =========================
   BALANCE VISIBILITY
========================= */

function updateBalanceVisibility() {
  const balanceDisplay =
    document.getElementById("balanceDisplay");

  const toggleBalance =
    document.getElementById("toggleBalance");

  if (balanceDisplay) {
    balanceDisplay.textContent =
      balanceHidden ? "••••••••" : formatAmount();
  }

  if (toggleBalance) {
    toggleBalance.textContent =
      balanceHidden ? "🙈" : "👁️";
  }
}

function setupBalanceVisibility() {
  const toggleBalance =
    document.getElementById("toggleBalance");

  if (!toggleBalance) {
    return;
  }

  toggleBalance.addEventListener("click", function () {

    balanceHidden = !balanceHidden;

    localStorage.setItem(
      "moraleBalanceHidden",
      String(balanceHidden)
    );

    updateBalanceVisibility();
  });
}


/* =========================
   THEME
========================= */

function updateThemeLabel() {
  const themeLabel =
    document.getElementById("themeLabel");

  if (!themeLabel) {
    return;
  }

  themeLabel.textContent =
    document.body.classList.contains("dark")
      ? "Dark mode"
      : "Light mode";
}

function loadTheme() {
  const savedTheme =
    localStorage.getItem("moraleTheme") || "light";

  document.body.classList.toggle(
    "dark",
    savedTheme === "dark"
  );

  updateThemeLabel();
}

function setupTheme() {
  const themeToggle =
    document.getElementById("themeToggle");

  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", function () {

    const isDark =
      document.body.classList.toggle("dark");

    localStorage.setItem(
      "moraleTheme",
      isDark ? "dark" : "light"
    );

    updateThemeLabel();
  });
}


/* =========================
   CURRENCY SELECTOR
========================= */

function setupCurrency() {
  const select =
    document.getElementById("settingsCurrencySelect");

  if (!select) {
    return;
  }

  select.value = selectedCurrency;

  select.addEventListener("change", function () {

    selectedCurrency = this.value;

    localStorage.setItem(
      "moraleCurrency",
      selectedCurrency
    );

    updateCurrencyText();
    updateAmount();
  });
}


/* =========================
   PROFILE PICTURE
========================= */

function createProfileImage(src) {
  const image =
    document.createElement("img");

  image.src = src;
  image.alt = "Profile picture";

  return image;
}

function updateProfilePicture() {
  const savedPicture =
    localStorage.getItem("moraleProfilePicture") || "";

  const dashboardAvatar =
    document.getElementById("dashboardAvatar");

  const settingsTopAvatar =
    document.getElementById("settingsTopAvatar");

  const settingsProfileImage =
    document.getElementById("settingsProfileImage");

  if (savedPicture) {

    if (settingsProfileImage) {
      settingsProfileImage.src = savedPicture;
    }

    if (dashboardAvatar) {
      dashboardAvatar.innerHTML = "";
      dashboardAvatar.appendChild(
        createProfileImage(savedPicture)
      );
    }

    if (settingsTopAvatar) {
      settingsTopAvatar.innerHTML = "";
      settingsTopAvatar.appendChild(
        createProfileImage(savedPicture)
      );
    }

  } else {

    const firstLetter =
      accountName.charAt(0).toUpperCase();

    if (settingsProfileImage) {
      settingsProfileImage.src = "avatar.png";
    }

    if (dashboardAvatar) {
      dashboardAvatar.textContent = firstLetter;
    }

    if (settingsTopAvatar) {
      settingsTopAvatar.textContent = firstLetter;
    }
  }
}

function setupProfilePicture() {
  const changePicture =
    document.getElementById("changePicture");

  const input =
    document.getElementById("profilePictureInput");

  if (!changePicture || !input) {
    return;
  }

  changePicture.addEventListener("click", function () {
    input.click();
  });

  input.addEventListener("change", function () {

    const file = this.files && this.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

      localStorage.setItem(
        "moraleProfilePicture",
        event.target.result
      );

      updateProfilePicture();
    };

    reader.readAsDataURL(file);
  });
}


/* =========================
   START
========================= */

function initializeApp() {
  loadTheme();
  setupTheme();

  setupCurrency();
  updateCurrencyText();

  setupAmountEditor();
  updateAmount();

  setupBalanceVisibility();
  updateBalanceVisibility();

  setupNameEditor();
  updateName();

  setupWebsiteEditor();
  updateWebsiteName();

  setupProfilePicture();
  updateProfilePicture();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApp
  );
} else {
  initializeApp();
}
