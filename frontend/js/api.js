const API_BASE_URL = 'https://simple-crud-application-0w9e.onrender.com';

async function handleFormSubmit(event, endpoint) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
        } else {
            console.log('Success:', result);
            // Handle success case if no redirect
        }
    } catch (error) {
        console.error('Error:', error);
        // Show error message to user
        alert('An error occurred. Please try again.');
    }
}