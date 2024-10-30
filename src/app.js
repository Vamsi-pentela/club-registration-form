const express = require('express');
const path = require('path');
const usermodel = require('./db/mongo.js'); 
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/submit', async (req, res) => {
    const { name, last, email, phone, date, gender, find, club_type } = req.body;

    try {

        const existingUser = await usermodel.findOne({ 
            $or: [{ email }, { phone }]
        });
        
        if (!existingUser) {
            const parsedDate = new Date(date);  
            const newUser = await usermodel.create({
                name,
                last,
                email,
                phone,
                date: parsedDate,
                gender,
                find: Array.isArray(find) ? find : [find], 
                club_type: Array.isArray(club_type) ? club_type : [club_type],
            });

            res.redirect('/over');
        } else {
           
            res.redirect('/exist');
        }
    } catch (error) {
        console.error("Error saving user data:", error);
        res.status(500).send("An error occurred you have entered the wrong number bro...........");
    }
});


app.get('/view', async (req, res) => {
    try {
        const users = await usermodel.find(); 
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
});

app.get('/exist', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exist.html'));
});

app.get('/over', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rules.html'));
});


app.listen(5000, () => {
    console.log('Server running on port 5000...');
});
