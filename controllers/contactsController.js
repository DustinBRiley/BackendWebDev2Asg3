const data = {
    contacts: require('../model/contacts.json'),
    setContacts: function (data) { this.contacts = data }
}

const getAllContacts = (req,res) => { // gets all contacts
    res.json(data.contacts) // return the entire contacts.json
}

const createNewContact = (req, res) => { // created new contact and adds it to contacts.json
    const newContact = { // creates new contact object
        id: data.contacts[data.contacts.length -1].id + 1 || 1, // sets newContact id to the last contacts id+1 or 1 if empty
        Name: req.body.Name, // sets name
        Phone: req.body.Phone, // sets phone
        Email: req.body.Email, // sets email
        Address: req.body.Address // sets address
    }

    data.setContacts([...data.contacts, newContact]) // adds new contact to the end of contacts.json
    res.json(data.contacts) // return the entire new contacts.json
}

const updateContact = (req, res) => { //updates contact by id
    const contact = data.contacts.find(con => con.id === parseInt(req.body.id)) // searches contacts.json for requested id
    if(!contact) { // if not found return error message
        return res.status(400).json({ 'message': `Contact ID ${req.body.id} not found`})
    }
    contact.Name = req.body.Name // update contacts name
    contact.Phone = req.body.Phone // update contacts phone
    contact.Email = req.body.Email // update contacts email
    contact.Address = req.body.Address  // update contacts address

    const filteredArray = data.contacts.filter(con => con.id !== parseInt(req.body.id)) // filter found contact from the rest
    const unsortedArray = [...filteredArray, contact] // add updated contact to the end of the filtered array
    data.setContacts(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)) // sort array by id then set as contacts.json
    res.json(data.contacts) // return the entire new contacts.json
}

const deleteContact = (req, res) => { //deletes contacts by id
    const contact = data.contacts.find(con => con.id === parseInt(req.body.id)) // searches contacts.json for requested id
    if(!contact) { // if not found return error message
        return res.status(400).json({ 'message': `Contact ID ${req.body.id} not found`})
    }
    const filteredArray = data.contacts.filter(con => con.id !== parseInt(req.body.id)) // filter found contact from the rest
    data.setContacts([...filteredArray]) // set contacts.json to the filtered array
    res.json(data.contacts) // return the entire new contacts.json
}

const getContact = (req, res) => { //gets a single contact by id
    const contact = data.contacts.find(con => con.id === parseInt(req.params.id)) // searches contacts.json for requested id
    if(!contact) { // if not found return error message
        return res.status(400).json({ 'message': `Contact ID ${req.params.id} not found`})
    }
    res.json(contact) // return the found contacts info
}

module.exports = { // export the functions
    getAllContacts,
    createNewContact,
    updateContact,
    deleteContact,
    getContact
}