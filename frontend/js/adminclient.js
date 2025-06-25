fetch('https://simple-crud-application-0w9e.onrender.com/api/data/admin', {
    method: 'GET'
})
.then(res => res.json())
.then(data =>{
    const tbody= document.querySelector("#adminTableBody");
    data.forEach(user => {
        const row = `<tr id="${user.id}">
        <td class="id">${user.id}</td>
        <td class="name">${user.adminData.name}</td>
        <td class="email">${user.adminData.mail}</td>
        </tr>`
        tbody.innerHTML+= row
    });
})
.catch(error=>{
    console.log(`Error:${error}`)
})
