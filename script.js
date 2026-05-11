const form = document.querySelector("#signupForm");
const pressForm = document.querySelector("#pressForm");
const comparison = document.querySelector("[data-comparison]");
const signupConfig = {
  provider: "email",
  mailto: "hello@friendsoffortgettypark.com",
  pressMailto: "caroline.s.niemczyk@gmail.com",
  action: "",
  method: "post",
  target: "_blank",
  fieldNames: {},
  ...window.FFGP_SIGNUP_CONFIG,
};

if (!window.location.hash) {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const scrollHome = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  window.addEventListener("load", () => {
    scrollHome();
    requestAnimationFrame(scrollHome);
    setTimeout(scrollHome, 100);
  });
  window.addEventListener("pageshow", scrollHome);
}

if (form) {
  const formStatus = document.querySelector("#formStatus");
  const volunteerCheckbox = document.querySelector("#volunteer");
  const volunteerValue = document.querySelector("#volunteerValue");
  const publicNameCheckbox = document.querySelector("#publicName");
  const publicNameValue = document.querySelector("#publicNameValue");
  const providerReady = signupConfig.provider !== "email" && Boolean(signupConfig.action);

  Object.entries(signupConfig.fieldNames || {}).forEach(([field, providerName]) => {
    const input = form.querySelector(`[data-signup-field="${field}"]`);

    if (input && providerName) {
      input.name = providerName;
    }
  });

  if (providerReady) {
    form.action = signupConfig.action;
    form.method = signupConfig.method || "post";

    if (signupConfig.target) {
      form.target = signupConfig.target;
    }
  }

  form.addEventListener("submit", (event) => {
    const volunteer = volunteerCheckbox.checked ? "Yes" : "No";
    const publicName = publicNameCheckbox.checked ? "Yes" : "No";

    if (volunteerValue) {
      volunteerValue.value = volunteer;
    }

    if (publicNameValue) {
      publicNameValue.value = publicName;
    }

    if (providerReady) {
      if (formStatus) {
        formStatus.textContent = "Welcome to Friends of Fort Getty Park.";
      }

      setTimeout(() => {
        form.reset();

        if (volunteerValue) {
          volunteerValue.value = "No";
        }

        if (publicNameValue) {
          publicNameValue.value = "No";
        }
      }, 500);

      return;
    }

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const address = document.querySelector("#address").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const parkIdeas = document.querySelector("#parkIdeas").value.trim();
    const body = [
      "Please add me to the Friends of Fort Getty Park contact list.",
      "",
      `Name: ${name}`,
      `Jamestown street address: ${address}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "Phone: Not provided",
      `Would like to volunteer: ${volunteer}`,
      `May list my name publicly on the Friends page: ${publicName}`,
      "",
      "What I would like to see at Fort Getty Park:",
      parkIdeas,
    ].filter(Boolean).join("\n");

    const mailto = `mailto:${signupConfig.mailto}?subject=${encodeURIComponent("Friends of Fort Getty Park signup")}&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.textContent = "Opening an email draft with your signup details.";
    }

    window.location.href = mailto;
  });
}

if (pressForm) {
  const pressStatus = document.querySelector("#pressStatus");

  pressForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#pressName").value.trim();
    const email = document.querySelector("#pressEmail").value.trim();
    const phone = document.querySelector("#pressPhone").value.trim();
    const outlet = document.querySelector("#pressOutlet").value.trim();
    const body = [
      "Press inquiry for Friends of Fort Getty Park.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "Phone: Not provided",
      `Publication or Outlet: ${outlet}`,
    ].filter(Boolean).join("\n");

    const pressMailto = signupConfig.pressMailto || signupConfig.mailto;
    const mailto = `mailto:${pressMailto}?subject=${encodeURIComponent("Friends of Fort Getty Park press inquiry")}&body=${encodeURIComponent(body)}`;

    if (pressStatus) {
      pressStatus.textContent = "Opening an email draft with your press inquiry.";
    }

    window.location.href = mailto;
  });
}

if (comparison) {
  const range = comparison.querySelector(".comparison-range");
  const setSplit = (value) => {
    comparison.style.setProperty("--split", `${value}%`);
  };

  setSplit(range.value);
  range.addEventListener("input", () => setSplit(range.value));
}
