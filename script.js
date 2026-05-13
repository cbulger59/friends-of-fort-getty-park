const form = document.querySelector("#signupForm");
const pressForm = document.querySelector("#pressForm");
const comparison = document.querySelector("[data-comparison]");
const signupConfig = {
  provider: "email",
  mailto: "friendsoffortgettypark@gmail.com",
  pressMailto: "caroline.s.niemczyk@gmail.com",
  action: "",
  method: "post",
  target: "_blank",
  fieldNames: {},
  ...window.FFGP_SIGNUP_CONFIG,
};

const submitMailchimpSignup = (action, fields) => {
  const targetName = "mailchimpSignupFrame";
  let frame = document.querySelector(`iframe[name="${targetName}"]`);

  if (!frame) {
    frame = document.createElement("iframe");
    frame.name = targetName;
    frame.title = "Mailchimp signup response";
    frame.hidden = true;
    document.body.appendChild(frame);
  }

  const mailchimpForm = document.createElement("form");
  mailchimpForm.action = action;
  mailchimpForm.method = "post";
  mailchimpForm.target = targetName;
  mailchimpForm.hidden = true;

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    mailchimpForm.appendChild(input);
  });

  document.body.appendChild(mailchimpForm);
  mailchimpForm.submit();
  mailchimpForm.remove();
};

if (!window.location.hash) {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const scrollHome = () => window.scrollTo(0, 0);

  scrollHome();
  window.addEventListener("DOMContentLoaded", scrollHome);
  window.addEventListener("load", () => {
    scrollHome();
    requestAnimationFrame(scrollHome);
    setTimeout(scrollHome, 100);
    setTimeout(scrollHome, 350);
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
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const name = document.querySelector("#name").value.trim();
      const address = document.querySelector("#address").value.trim();
      const email = document.querySelector("#email").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const parkIdeas = document.querySelector("#parkIdeas").value.trim();
      const parkIdeasWithPermission = [
        parkIdeas,
        "",
        `Public name permission: ${publicName}`,
      ].join("\n");

      if (submitButton) {
        submitButton.disabled = true;
      }

      if (formStatus) {
        formStatus.textContent = "Sending your signup...";
      }

      submitMailchimpSignup(form.action, {
        MERGE0: email,
        MERGE7: name,
        MERGE10: publicName,
        MERGE9: volunteer,
        MERGE12: address,
        MERGE8: phone,
        MERGE11: parkIdeasWithPermission,
        EMAIL: email,
        MMERGE7: name,
        MMERGE10: publicName,
        MMERGE9: volunteer,
        MMERGE12: address,
        MMERGE8: phone,
        MMERGE11: parkIdeasWithPermission,
      });

      setTimeout(() => {
        form.reset();

        if (volunteerValue) {
          volunteerValue.value = "No";
        }

        if (publicNameValue) {
          publicNameValue.value = "No";
        }

        if (formStatus) {
          formStatus.innerHTML = 'Welcome to Friends of Fort Getty Park. <a href="index.html">Back to the top</a>';
          formStatus.focus();
        }

        if (submitButton) {
          submitButton.disabled = false;
        }
      }, 650);

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
