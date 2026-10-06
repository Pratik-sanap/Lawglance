/* =====================================================================
   LawGlance — front-end interactions only.
   Nothing here calls a backend yet — see the "BACKEND INTEGRATION
   POINTS" section at the bottom for exactly where to wire things up.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActionButtons();
  initChips();
});

/* ---------------------------------------------------------------------
   Mobile nav: shows/hides the nav links on small screens.
   --------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ---------------------------------------------------------------------
   Primary call-to-action buttons (Ask the assistant, Open research,
   Browse the catalog, Agreement Intelligence, Register as lawyer...).
   Right now they just log to the console — wire these to real
   navigation / modals / API calls once the backend is ready.
   --------------------------------------------------------------------- */
function initActionButtons() {
  document.querySelectorAll('[data-action]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const action = el.getAttribute('data-action');
      handleAction(action, event);
    });
  });
}

function handleAction(action, event) {
  switch (action) {
    case 'ask-assistant':
      // TODO: open the chat view / route to the assistant page.
      console.log('Ask the assistant clicked');
      break;
    case 'open-research':
      // TODO: route to the research / search view.
      console.log('Open research clicked');
      break;
    case 'browse-corpus':
      // TODO: route to the catalog / browse view.
      console.log('Browse corpus clicked');
      break;
    case 'open-agreement-intelligence':
      // TODO: route to Agreement Intelligence (likely behind auth).
      console.log('Open Agreement Intelligence clicked');
      break;
    case 'register-lawyer':
      // TODO: route to the lawyer registration flow.
      console.log('Register as Lawyer clicked');
      break;
    default:
      console.log('Unhandled action:', action);
  }
}

/* ---------------------------------------------------------------------
   "Try one of these" example-query chips on the research section.
   Right now they just log the query text — wire this to actually
   populate and submit the research search box once it exists.
   --------------------------------------------------------------------- */
function initChips() {
  document.querySelectorAll('.chip:not(.chip-static)').forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.textContent.trim();
      console.log('Example query selected:', query);
      // TODO: send `query` to the research search box / API.
    });
  });
}

/* =====================================================================
   BACKEND INTEGRATION POINTS
   =====================================================================
   This page is intentionally backend-agnostic. When you're ready to
   wire it up to your Python side, these are the places to touch:

   1. Nav links & CTA buttons (data-action="...") in handleAction()
      above — replace each console.log with either:
        - a route change (if this becomes a multi-page/SPA app), or
        - a fetch() call to your API, e.g.:

          async function askAssistant(question) {
            const res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question })
            });
            return res.json();
          }

   2. Stats row (5,168 judgments / 9 Acts / 4,807 summaries) is static
      HTML in index.html — fetch these from your corpus metadata
      endpoint instead and populate them on load.

   3. "Try one of these" chips — once you have a search box, submitting
      a chip's text should run the same request as typing it manually.

   4. Agreement Intelligence upload flow isn't built yet on this page
      (the current section is just the pitch/explainer) — that will
      need its own upload form + progress UI wired to your backend.
   ===================================================================== */
