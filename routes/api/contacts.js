const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactsController')

router.route('/')   //json crud
    .get(contactsController.getAllContacts)
    .post(contactsController.createNewContact)
    .put(contactsController.updateContact)
    .delete(contactsController.deleteContact)

router.route('/:id')    //id in url parameter
    .get(contactsController.getContact)

module.exports = router;