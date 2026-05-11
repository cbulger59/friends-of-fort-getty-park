const form = document.querySelector("#signupForm");
const comparison = document.querySelector("[data-comparison]");
const signupConfig = {
  provider: "email",
  mailto: "hello@friendsoffortgettypark.com",
  action: "",
  method: "post",
  target: "_blank",
  fieldNames: {},
  ...window.FFGP_SIGNUP_CONFIG,
};

if (form) {
  const formStatus = document.querySelector("#formStatus");
  const volunteerCheckbox = document.querySelector("#volunteer");
  const volunteerValue = document.querySelector("#volunteerValue");
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

    if (volunteerValue) {
      volunteerValue.value = volunteer;
    }

    if (providerReady) {
      if (formStatus) {
        formStatus.textContent = "Opening the signup confirmation in a new tab.";
      }

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

if (comparison) {
  const range = comparison.querySelector(".comparison-range");
  const setSplit = (value) => {
    comparison.style.setProperty("--split", `${value}%`);
  };

  setSplit(range.value);
  range.addEventListener("input", () => setSplit(range.value));
}
