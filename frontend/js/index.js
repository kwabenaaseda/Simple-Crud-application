const tables = document.querySelector(".display");
const deleteBtn = document.getElementById("delete");
const updateBtn = document.getElementById("update");
const updatelist = document.getElementById("updateList")

const clear = document.getElementById("close");
const confirmform =document.getElementById("deleteModal")
const now = new Date();

fetch("http://localhost:5000/api/data/users")
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



function Delete(btn){
    document.getElementById("deleteModal").style.display="block"
    const parent =btn.parentElement.closest("tr");
    const id = parent.children[0].textContent;
    document.querySelector("#confirm").value=id;
clear.addEventListener("click",()=>{
    confirmform.style.display="none";
})
    
}



function Update(btn){
const parent =btn.parentElement.closest("tr");
    const id = parent.children[0].textContent;
    const data = {
        "id":id,
        "userData":{
            "name":parent.children[1].textContent,
            "age":parent.children[2].textContent,
            "mail":parent.children[3].textContent,
            "password":parent.children[4].textContent
        }
    }
      const init = document.createElement("input")
      init.style.display="none"
    init.value=data.id;
    init.name="id"
    updatelist.appendChild(init)
    document.querySelector("#Updatename").value=data.userData.name;
    document.querySelector("#Updateage").value=data.userData.age;
    document.querySelector("#Updatemail").value=data.userData.mail;
    document.querySelector("#Updatepass").value=data.userData.password;

  
console.log(data)
     document.querySelector(".UpdateUser").classList.toggle("active")
}

const show = document.getElementById("show")
show.addEventListener("click",()=>{
    console.log(show.parentElement)
})

