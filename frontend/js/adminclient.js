fetch('https://simple-crud-application-0w9e.onrender.com/api/data/admin', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'}
})
.then(res => res.json())
.then(data =>{
    const admins = data.data; // <- this is the actual array
    const tbody= document.querySelector("#adminTableBody");
    admins.forEach(user => {
        const row = `<tr id="${user._id}">
        <td class="id">${user._id}</td>
        <td class="name">${user.name}</td>
        <td class="email">${user.email}</td>
        </tr>`
        tbody.innerHTML+= row
    });
})
.catch(error=>{
    console.log(`Error:${error}`)
})
