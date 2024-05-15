const express = require('express');
const router = express.Router();
const Members = require('../../Members');
const uuid = require('uuid');


// GET ALL MEMBERS
router.get('/', (req, res) => res.json(Members));

// GET ONE MEMBER
router.get('/:id', (req, res) => {
    const found = Members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json(Members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// CREATE MEMBER
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.email || !newMember.name) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }
    Members.push(newMember);
    res.json(Members);
    // res.redirect('/');
})

// UPDATE MEMEBER

router.put('/:id', (req, res) => {
    const found = Members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updMember = req.body;
        Members.forEach((member) => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg: `Updated member: `, member});
            }
        });
    } else {
        res.status(400).json({msg: 'Please include a name and email'});
    }
});

// DELETE MEMBER
router.delete('/:id', (req, res) => {
    const found = Members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({msg: "Member deleted", members: Members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;