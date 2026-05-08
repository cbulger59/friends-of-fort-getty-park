const form = document.querySelector("#signupForm");
const comparison = document.querySelector("[data-comparison]");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const address = document.querySelector("#address").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const volunteer = document.querySelector("#volunteer").checked ? "Yes" : "No";
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

    const mailto = `mailto:hello@friendsoffortgettypark.com?subject=${encodeURIComponent("Friends of Fort Getty Park signup")}&body=${encodeURIComponent(body)}`;
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
