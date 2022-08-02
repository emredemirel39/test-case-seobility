const router = require('express').Router();
const Form = require('../models/Form');

router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();

        res.status(200).json({ok: true, data: forms});

    } catch (error) {
        
        res.status(500).json({ok: false, message: error.message});
    };
})

router.post('/', async (req, res) => {

    try {

        const newForm = await new Form(req.body).save();

        res.status(201).json({ok: true, message: `Form is successfuly sent!`})
        
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
})

module.exports = router;