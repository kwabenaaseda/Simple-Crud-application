const API_BASE_URL = 'https://simple-crud-application-0w9e.onrender.com';

function showPopup(message, type = 'success') {
    const popup = document.createElement('div');
    popup.className = `alert popup-${type}`;
    popup.innerHTML= `${message} <span class="close-popup">&times;</span>`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 5000);

    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });

}

async function handleApiRequest(endpoint, method = 'GET', data = null) {
    try{
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
            
        };
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();

        if(!response.ok || !result.success) {
            throw new Error(result.message || 'Request failed');
        }
        return result;
    }
    catch (error){
        throw error;
    }
}
async function handleFormSubmit(event, endpoint) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent; // Store original button text
        submitBtn.disabled = true; // Disable the submit button to prevent multiple submissions
        submitBtn.textContent = 'Submitting...'; // Change button text to indicate submission


        const result = await handleApiRequest(endpoint, method = "POST",data);
        showPopup(`Success: ${result.message || 'Operation completed successfully'} successfully!`);
        
        if (result.redirectUrl) {
          setTimeout(() => {
              window.location.href = result.redirectUrl;},1500);
        }
    } catch (error) {
        console.error('Error:', error);
        // Show error message to user
        showPopup(`Error: ${error.message || 'An error occurred'}`, 'error');
    }
    finally{
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false; // Re-enable the submit button
            submitBtn.textContent = originalBtnText; // Reset button text
        }
    }
}