const tables = document.querySelector(".display");
const deleteBtn = document.getElementById("delete");
const updateBtn = document.getElementById("update");
const updatelist = document.getElementById("updateList")

const clear = document.getElementById("close");
const confirmform =document.getElementById("deleteModal")
const now = new Date();

fetch('https://simple-crud-application-0w9e.onrender.com/api/data/users', {
    method: 'GET'
})
.then(res => res.json())
.then(data =>{
    const tbody= document.querySelector("#userTable tbody");
    data.forEach(user => {
        const row = `<tr id="${user.id}">
        <td class="id">${user.id}</td>
        <td class="name">${user.userData.name}</td>
        <td class="age">${user.userData.age}</td>
        <td class="mail">${user.userData.mail}</td>
        <td class="password">${user.userData.password}</td>
        <td><button id="update" class="${user.id}" onclick="Update(this)">update</button><button id="delete" class="${user.id}" onclick="Delete(this)">delete</button><button id="viewUser">View</button></td>
        </tr>`
        tbody.innerHTML+= row
    });
})
.catch(error=>{
    console.log(`Error:${error}`)
})

document.querySelector("#toggle").addEventListener("click",()=>{
    document.querySelector(".addUser").classList.toggle("active")
})
console.log()



// Update the Delete function
function Delete(btn) {
    document.getElementById("deleteModal").style.display = "block";
    const parent = btn.parentElement.closest("tr");
    const id = parent.children[0].textContent;
    document.querySelector("#confirm").value = id;
    
    clear.addEventListener("click", () => {
        confirmform.style.display = "none";
    });
}

// Update the Update function
function Update(btn) {
    const parent = btn.parentElement.closest("tr");
    const id = parent.children[0].textContent;
    const data = {
        "id": id,
        "userData": {
            "name": parent.children[1].textContent,
            "age": parent.children[2].textContent,
            "mail": parent.children[3].textContent,
            "password": parent.children[4].textContent
        }
    };
    
    document.querySelector("#Updatename").value = data.userData.name;
    document.querySelector("#Updateage").value = data.userData.age;
    document.querySelector("#Updatemail").value = data.userData.mail;
    document.querySelector("#Updatepass").value = data.userData.password;
    
    // Add hidden input for ID
    let idInput = document.querySelector('input[name="id"]');
    if (!idInput) {
        idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'id';
        document.querySelector('form[action="/api/data/users/update/"]').appendChild(idInput);
    }
    idInput.value = id;
}
const show = document.getElementById("show")
show.addEventListener("click",()=>{
    console.log(show.parentElement)
})

