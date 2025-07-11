fetch('https://simple-crud-application-0w9e.onrender.com/api/data/history', {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json'}
})
.then(res => res.json())
.then(data =>{
    const history = data.data; // <- this is the actual array
    const tbody= document.querySelector("#historyTableBody");
    history.forEach(user => {
        const row = `<tr id="${user.id}">
        <td class="id">${user.message}</td>
        <td class="name">${user.timestamp}</td>
        </tr>`
        tbody.innerHTML+= row
    });
})
.catch(error=>{
    console.log(`Error:${error}`)
})
