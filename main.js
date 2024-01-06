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
  return element.innerText.includes(text);
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
        containsText(span, "Recommended for you")
      ) {
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
  hidePromos();
}

window.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", handleScroll);
