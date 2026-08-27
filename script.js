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
  const displayText = `${currency.flag} ${selectedCurrency}`;

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


/* =========================
   BALANCE / TEST AMOUNT
========================= */

function updateAmount() {
  const amountText =
    document.getElementById("testAmountText");

  const balanceDisplay =
    document.getElementById("balanceDisplay");

  const formattedAmount = formatAmount();

  if (amountText) {
    amountText.textContent = formattedAmount;
  }

  if (balanceDisplay) {
    balanceDisplay.textContent =
      balanceHidden
        ? "••••••••"
        : formattedAmount;
  }
}

function setupAmountEditor() {
  const editButton =
    document.getElementById("editTestAmount") ||
    document.getElementById("editAmount");

  if (!editButton) {
    return;
  }

  editButton.addEventListener("click", function () {
    const enteredAmount = window.prompt(
      "Enter Test Amount:",
      testAmount.toFixed(2)
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
      window.alert("Please enter a valid Test Amount.");
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
   BALANCE SHOW / HIDE
========================= */

function updateBalanceVisibility() {
  const balanceDisplay =
    document.getElementById("balanceDisplay");

  const toggleBalance =
    document.getElementById("toggleBalance");

  if (balanceDisplay) {
    balanceDisplay.textContent =
      balanceHidden
        ? "••••••••"
        : formatAmount();
  }

  if (toggleBalance) {
    toggleBalance.textContent =
      balanceHidden ? "🙈" : "👁️";

    toggleBalance.setAttribute(
      "aria-label",
      balanceHidden
        ? "Show balance"
        : "Hide balance"
    );
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

  updateAvatars();
}

function setupNameEditor() {
  const editName =
    document.getElementById("editName");

  if (!editName) {
    return;
  }

  editName.addEventListener("click", function () {
    const newName = window.prompt(
      "Enter profile name:",
      accountName
    );

    if (newName === null) {
      return;
    }

    const cleanedName = newName.trim();

    if (!cleanedName) {
      window.alert("Please enter a profile name.");
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

function setupWebsiteEditor() {
  const editWebsiteName =
    document.getElementById("editWebsiteName");

  if (!editWebsiteName) {
    return;
  }

  editWebsiteName.addEventListener("click", function () {
    const newWebsiteName = window.prompt(
      "Enter website name:",
      websiteName
    );

    if (newWebsiteName === null) {
      return;
    }

    const cleanedName = newWebsiteName.trim();

    if (!cleanedName) {
      window.alert("Please enter a website name.");
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

function updateAvatars() {
  const savedPicture =
    localStorage.getItem("moraleProfilePicture") || "";

  const firstLetter =
    accountName.charAt(0).toUpperCase();

  const dashboardAvatar =
    document.getElementById("dashboardAvatar");

  const settingsTopAvatar =
    document.getElementById("settingsTopAvatar");

  if (savedPicture) {
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
    if (dashboardAvatar) {
      dashboardAvatar.textContent = firstLetter;
    }

    if (settingsTopAvatar) {
      settingsTopAvatar.textContent = firstLetter;
    }
  }
}

function updateProfilePicture() {
  const savedPicture =
    localStorage.getItem("moraleProfilePicture") || "";

  const settingsProfileImage =
    document.getElementById("settingsProfileImage");

  if (settingsProfileImage) {
    settingsProfileImage.src =
      savedPicture || "avatar.png";
  }

  updateAvatars();
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
    const file =
      this.files && this.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image.");
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
   PASSWORD SHOW / HIDE
========================= */

function setupPasswordToggle() {
  const passwordInput =
    document.getElementById("password");

  const togglePassword =
    document.getElementById("togglePassword");

  if (!passwordInput || !togglePassword) {
    return;
  }

  togglePassword.addEventListener("click", function () {
    const showing =
      passwordInput.type === "text";

    passwordInput.type =
      showing ? "password" : "text";

    togglePassword.textContent =
      showing ? "👁️" : "🙈";

    togglePassword.setAttribute(
      "aria-label",
      showing
        ? "Show password"
        : "Hide password"
    );
  });
}


/* =========================
   LOGIN FORM
========================= */

function setupLoginForm() {
  const loginForm =
    document.getElementById("loginForm");

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    window.location.href = "dashboard.html";
  });
}


/* =========================
   CUSTOMER SERVICE
========================= */

function setupCustomerService() {
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
    supportButton.addEventListener("click", function () {
      supportPanel.classList.add("show");

      if (chatInput) {
        chatInput.focus();
      }
    });
  }

  if (closeSupport && supportPanel) {
    closeSupport.addEventListener("click", function () {
      supportPanel.classList.remove("show");
    });
  }

  if (
    chatForm &&
    chatInput &&
    chatMessages
  ) {
    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const message =
        chatInput.value.trim();

      if (!message) {
        return;
      }

      const sentMessage =
        document.createElement("div");

      sentMessage.className = "message sent";
      sentMessage.textContent = message;

      chatMessages.appendChild(sentMessage);

      chatInput.value = "";

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

      window.setTimeout(function () {
        const reply =
          document.createElement("div");

        reply.className = "message received";
        reply.textContent =
          "Thanks for your message. How can we help?";

        chatMessages.appendChild(reply);

        chatMessages.scrollTop =
          chatMessages.scrollHeight;
      }, 700);
    });
  }
}


/* =========================
   ESCAPE KEY
========================= */

function setupEscapeKey() {
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    const supportPanel =
      document.getElementById("supportPanel");

    if (supportPanel) {
      supportPanel.classList.remove("show");
    }
  });
}


/* =========================
   INITIALIZE
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

  setupPasswordToggle();
  setupLoginForm();

  setupCustomerService();
  setupEscapeKey();
}


/* =========================
   START
========================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApp
  );
} else {
  initializeApp();
}
