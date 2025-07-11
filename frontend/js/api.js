// scripts/api.js

function showPopup(message, type = 'success') {
    const popup = document.createElement('div');
    popup.className = `alert popup-${type}`;
    popup.innerHTML = `${message} <span class="close-popup">&times;</span>`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 300);
    }, 5000);

    popup.querySelector('.close-popup').addEventListener('click', () => popup.remove());
}

async function handleApiRequest(endpoint, method = 'GET', data = null) {
    try {
        const token = localStorage.getItem('authToken'); // Save token on login

const options = {
  method,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  },
  body: data ? JSON.stringify(data) : undefined
};


        const response = await fetch(`${CONFIG.API_BASE}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Request failed');
        }
        return result;
    } catch (error) {
        throw error;
    }
}

async function handleFormSubmit(event, endpoint) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const result = await handleApiRequest(endpoint, "POST", data);

    // ✅ Store token if it's returned
    if (result.token) {
  localStorage.setItem('authToken', result.token);
/*   localStorage.setItem('user', JSON.stringify(result.user)); */ // optional
}
/* const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log(user.username); */

    showPopup(`Success: ${result.message || 'Operation completed successfully'}`);
    submitBtn.textContent = 'Submitted';

    if (result.redirectUrl) {
      setTimeout(() => (window.location.href = result.redirectUrl), 1500);
    }
  } catch (error) {
    console.error('Error:', error);
    showPopup(`Error: ${error.message || 'An error occurred'}`, 'error');
    submitBtn.textContent = originalBtnText;
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }
}

