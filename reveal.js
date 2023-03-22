// Get all elements with class="col-3 post-meta text-right user-controls hidden"
const elements = document.querySelectorAll('.col-3.post-meta.text-right.user-controls.hidden');

// Loop through each element and remove the "hidden" class
elements.forEach((element) => {
  element.classList.remove('hidden');
});