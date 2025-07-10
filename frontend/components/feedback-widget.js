document.addEventListener("DOMContentLoaded", () => {
  const feedbackBtn = document.getElementById("feedback-widget");
  const helpdeskBtn = document.getElementById("helpdesk-widget");
  const feedbackForm = document.getElementById("feedback-form");
  const helpdeskForm = document.getElementById("helpdesk-form");
  const feedbackTextarea = document.getElementById("feedbackText");
  const helpdeskTextarea = document.getElementById("helpdeskText");
  const sendFeedbackBtn = document.getElementById("sendFeedback");
  const sendHelpBtn = document.getElementById("sendHelp");
  const overlay = document.getElementById('overlay');
  // Toggle visibility cleanly
  function toggleForm(targetForm) {
    [feedbackForm, helpdeskForm].forEach(form => {
      form.classList.add("hidden");
    });
    overlay.classList.add('active');
    targetForm.classList.toggle("hidden");
    
  }

  feedbackBtn.addEventListener("click", () => toggleForm(feedbackForm));
  helpdeskBtn.addEventListener("click", () => toggleForm(helpdeskForm));
  
  // Feedback submission
  sendFeedbackBtn.addEventListener("click", async () => {
    const feedback = feedbackTextarea.value.trim();
    if (!feedback) return showPopup("Feedback can't be empty", "error");

    try {
      const result = await handleApiRequest("/api/data/feedback", "POST", {
        feedback,
        userLocation: window.location.href,
        user: "anonymous"
      });
      showPopup("Thanks for your feedback!");
      feedbackTextarea.value = "";
      feedbackForm.classList.add("hidden");
    } catch (err) {
      console.error(err);
      showPopup("Error sending feedback", "error");
    }
  });

  // Help desk placeholder
  sendHelpBtn.addEventListener("click", () => {
    showPopup("Help request feature coming soon!");
    helpdeskTextarea.value = "";
    helpdeskForm.classList.add("hidden");
  });

  // Make buttons draggable
 /*  makeDraggable(feedbackBtn);
  makeDraggable(helpdeskBtn); */
});

// Utility to make any element draggable
/* function makeDraggable(el) {
  let offsetX = 0, offsetY = 0, isDragging = false;

  el.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.position = 'fixed';
    el.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
} */
