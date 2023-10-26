fetch('/api')
.then(response => response.json())
.then(data => {
    listdiv = document.getElementById('contactlist')
    ul = document.createElement('ul')
    for (const contact of data) {
        li = document.createElement('li')
        btn = document.createElement('button')
        btn.addEventListener('click', () => {
            d = document.getElementById(`${contact.Name}`)
            if(d.style.display === "none") {
                d.style.display = "block";
            }
            else {
                d.style.display = "none";
            }
        })
        btn.innerHTML = contact.Name
        div = document.createElement('div')
        div.setAttribute("id", `${contact.Name}`)
        div.style.display = "none"
        ul2 = document.createElement('ul')
        id = document.createElement('li')
        id.innerHTML = `ID: ${contact.id}`
        Name = document.createElement('li')
        Name.innerHTML = `Name: ${contact.Name}`
        Phone = document.createElement('li')
        Phone.innerHTML = `Phone: ${contact.Phone}`
        Email = document.createElement('li')
        Email.innerHTML = `Email: ${contact.Email}`
        Address = document.createElement('li')
        Address.innerHTML = `Address: ${contact.Address}`
        ul2.appendChild(id)
        ul2.appendChild(Name)
        ul2.appendChild(Phone)
        ul2.appendChild(Email)
        ul2.appendChild(Address)
        div.appendChild(ul2)
        li.appendChild(btn)
        li.appendChild(div)
        ul.appendChild(li)
    }
    listdiv.appendChild(ul)
})

document.getElementById('cbtn').addEventListener('click', () => {
    c = document.getElementById('createform')
    if(c.style.display === "none") {
        c.style.display = "block";
    }
    else {
        c.style.display = "none";
    }
})
document.getElementById('ubtn').addEventListener('click', () => {
    u = document.getElementById('updateform')
    if(u.style.display === "none") {
        u.style.display = "block";
    }
    else {
        u.style.display = "none";
    }
})
document.getElementById('dbtn').addEventListener('click', () => {
    d = document.getElementById('deleteform')
    if(d.style.display === "none") {
        d.style.display = "block";
    }
    else {
        d.style.display = "none";
    }
})

document.getElementById('createform').addEventListener('submit', async () => {
    const jsonFormData = [{}]
    for(const pair of new FormData(this)) {
        jsonFormData[pair[0]] = pair[1]
    }
    await fetch("/api", {method: "POST", body: jsonFormData})
    location.reload()
})