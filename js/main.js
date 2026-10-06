/* Mobile nav and quote form → mailto:shali@pureavigems.com */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  var onScroll = function () {
    document.body.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var DEST = "shali@pureavigems.com";

  function buildMailto(fields) {
    var subject = "AviGems — quote request";
    var body =
      "Name: " + (fields.name || "") + "\n" +
      "Business: " + (fields.business || "") + "\n" +
      "Email: " + (fields.email || "") + "\n" +
      "Interest: " + (fields.interest || "") + "\n\n" +
      (fields.message || "");
    return (
      "mailto:" + DEST +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body)
    );
  }

  // Export for smoke test in Node/browser console
  window.aviGemsQuoteMailto = buildMailto;

  var form = document.getElementById("quote-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var fields = {
      name: (document.getElementById("name") || {}).value || "",
      business: (document.getElementById("business") || {}).value || "",
      email: (document.getElementById("buyer-email") || {}).value || "",
      interest: (document.getElementById("interest") || {}).value || "",
      message: (document.getElementById("message") || {}).value || "",
    };
    var href = buildMailto(fields);
    if (href.indexOf("mailto:" + DEST) !== 0) {
      var status = document.getElementById("form-status");
      if (status) status.textContent = "Could not build email to " + DEST;
      return;
    }
    var status = document.getElementById("form-status");
    if (status) {
      status.textContent = "Opening email to " + DEST + "…";
    }
    window.location.href = href;
  });
})();
