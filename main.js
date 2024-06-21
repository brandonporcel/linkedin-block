function getParentByHierarchy(element, levels) {
  let parent = element;
  for (let i = 0; i < levels; i++) {
    parent = parent?.parentNode;
  }
  return parent;
}

function hideElement(element, displayValue = "none") {
  if (element) {
    element.style.display = displayValue;
  }
}

function containsText(element, text) {
  return element.innerText.toLowerCase().includes(text.toLowerCase());
}

function hideSuggestedPosts() {
  const headers = document.querySelectorAll(".update-components-header");
  headers.forEach((header) => {
    const spans = header.querySelectorAll("span");
    spans.forEach((span) => {
      if (
        containsText(span, "Suggested") ||
        containsText(span, "Jobs recommended for you") ||
        containsText(span, "Expert answers on") ||
        containsText(span, "Recommended for you") ||
        containsText(span, "Events recommended for you") ||
        containsText(span, "Popular course") ||
        containsText(span, "Follow")
      ) {
        const fatherElem = getParentByHierarchy(span, 6);
        hideElement(fatherElem);
      }
    });
  });
}

function hideFollowPosts() {
  const headers = document.querySelectorAll(".update-components-actor");
  headers.forEach((header) => {
    const buttons = header.querySelectorAll("button");
    const articleHeader = getParentByHierarchy(header, 1);
    if (containsText(articleHeader, "this")) {
      return;
    }
    buttons.forEach((span) => {
      if (containsText(span, "Follow") || containsText(span, "Join")) {
        const fatherElem = getParentByHierarchy(span, 6);
        hideElement(fatherElem);
      }
    });
  });
}

function hidePromos() {
  const promos = document.querySelectorAll(".update-components-promo");

  promos.forEach((promoElem) => {
    hideElement(promoElem);
  });
}

function handleScroll() {
  const spans = document.querySelectorAll("span");

  spans.forEach((span) => {
    if (containsText(span, "Promoted")) {
      const fatherElem = getParentByHierarchy(span, 5);
      hideElement(fatherElem);
    }
  });

  hideSuggestedPosts();
  hideFollowPosts();
  hidePromos();
}

async function hideAsideContent() {
  const asideRight = document.querySelector("aside.scaffold-layout__aside");

  if (asideRight) {
    asideRight.style.display = "none";
  }
}

function main() {
  hideAsideContent();
  handleScroll();
}

window.addEventListener("scroll", handleScroll);
main();
