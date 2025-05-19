// Custom validation messages
// Set msg on 'data-validation-msg' input attribute
// -------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Get all input elements and form/button references
  var inputs = document.getElementsByTagName("input"),
    inputsLen = inputs.length,
    input,
    inputMsg,
    inputValidationMsg,
    label,
    button = document.getElementsByClassName("submit-btn")[0],
    form = document.getElementsByTagName("form")[0];

  // Prevent default browser validation tooltips
  form.addEventListener(
    "invalid",
    function (e) {
      e.preventDefault();
    },
    true
  );

  // Validate form on submit - display tooltip if input has no value
  button.onclick = function () {
    inputsLen = inputs.length;

    // Loop through inputs, show validation message if empty
    while (inputsLen--) {
      if (inputs[inputsLen].value.length > 0) {
        return true;
      }
      next(inputs[inputsLen]).nextSibling.style.display = "block";
    }

    // Special handling for country selector
    var countrySelector = document.getElementById("country-selector");
    if (countrySelector && countrySelector.value) {
      document.querySelector(".custom-error").style.display = "none";
      return true;
    } else {
      document.querySelector(".custom-error").style.display = "block";
    }
  };

  // Add custom validation message spans after each input label
  inputsLen = inputs.length; // Reset inputsLen for the next loop
  while (inputsLen--) {
    input = inputs[inputsLen];
    label = next(input);

    if (input.hasAttribute("data-validation-msg")) {
      // Create span element for our validation msg
      inputValidationMsg = input.getAttribute("data-validation-msg");
      inputMsg = document.createElement("span");
      inputMsg.innerHTML = inputValidationMsg;

      // Insert the validation message after the label
      label.parentNode.insertBefore(inputMsg, label.nextSibling);

      // On blur, show/hide validation message and update styles
      input.onblur = function (e) {
        e.target.classList.add("blur");
        if (!this.value || this.validity.valid === false) {
          // Show error
          next(e.target).nextSibling.style.display = "block";
          e.target.style.border = "1px solid #ff7777";
          next(e.target).style.color = "#ff7777";
        } else {
          // Hide error
          next(e.target).nextSibling.style.display = "none";
          if (!e.target.value) {
            e.target.style.border = "1px solid #ffffffb2";
            next(e.target).style.color = "#ffffffb2";
          } else {
            e.target.style.border = "1px solid #fff";
            next(e.target).style.color = "#fff";
          }
        }
      };
    }
  }

  // Add focus/blur classes to form groups for styling
  var inputElements = document.querySelectorAll("input");
  inputElements.forEach(function (input) {
    input.addEventListener("focus", function () {
      var formGroup = input.closest(".form-group");
      if (formGroup) {
        formGroup.classList.add("focused");
      }
    });

    input.addEventListener("blur", function () {
      var formGroup = input.closest(".form-group");
      if (formGroup) {
        formGroup.classList.remove("focused");
      }
    });
  });

  // -------------------------
  // Custom Modal Implementation
  // -------------------------
  const sampleVideoModal = document.getElementById("samplevideo");
  const video = document.getElementById("video1");
  const closeModalButton = sampleVideoModal.querySelector(".btn-close");
  const modalTrigger = document.querySelector(
    '[data-bs-target="#samplevideo"]'
  );

  // Open Modal: show modal and play video
  function openModal() {
    sampleVideoModal.style.display = "block";
    sampleVideoModal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    if (video) {
      video.play();
    }
  }

  // Close Modal: hide modal and pause/reset video
  function closeModal() {
    sampleVideoModal.style.display = "none";
    sampleVideoModal.classList.remove("show");
    document.body.style.overflow = ""; // Restore background scrolling
    if (video) {
      video.pause();
      video.currentTime = 0; // Reset video to the beginning
    }
  }

  // Event Listener for Modal Trigger
  if (modalTrigger) {
    modalTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  // Event Listener for Close Button
  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      closeModal();
    });
  }

  // Close Modal on Outside Click
  sampleVideoModal.addEventListener("click", function (e) {
    if (e.target === sampleVideoModal) {
      closeModal();
    }
  });

  // -------------------------
  // Custom Tooltip Implementation
  // -------------------------
  const tooltipTriggers = document.querySelectorAll(
    "[data-bs-toggle='tooltip']"
  );
  tooltipTriggers.forEach((trigger) => {
    const tooltipText = trigger.getAttribute("data-bs-title");
    const tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    tooltip.innerText = tooltipText;
    document.body.appendChild(tooltip);

    // Show Tooltip on mouseenter
    trigger.addEventListener("mouseenter", function () {
      const rect = trigger.getBoundingClientRect();
      tooltip.style.left = `${
        rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2
      }px`;
      tooltip.style.top = `${
        rect.top + window.scrollY - tooltip.offsetHeight - 5
      }px`;
      tooltip.style.display = "block";
    });

    // Hide Tooltip on mouseleave
    trigger.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  });

  // -------------------------
  // Testimonial Slider Implementation
  // -------------------------
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".item");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create navigation dots for each slide
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Go to specific slide by index
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  // Update slider position and active dot
  function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Show next slide (circular/infinite)
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  // Show previous slide (circular/infinite)
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Auto-slide every 3 seconds
  let autoSlideInterval = setInterval(nextSlide, 3000);

  // Pause auto-slide on user interaction (hover)
  [prevBtn, nextBtn, dotsContainer].forEach((element) => {
    element.addEventListener("mouseenter", () =>
      clearInterval(autoSlideInterval)
    );
    element.addEventListener("mouseleave", () => {
      autoSlideInterval = setInterval(nextSlide, 3000);
    });
  });

  // Add event listeners for navigation buttons
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Touch support for slider (swipe left/right)
  let startX = 0;
  sliderWrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  sliderWrapper.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) nextSlide();
    if (startX < endX - 50) prevSlide();
  });

  // -------------------------
  // Navbar Toggler for Mobile
  // -------------------------
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("show");
  });
});

// Helper function to get the next element sibling (skipping text nodes)
function next(elem) {
  do {
    elem = elem.nextSibling;
  } while (elem && elem.nodeType !== 1);
  return elem;
}
