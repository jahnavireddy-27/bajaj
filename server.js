// console.log('Server script loaded');

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors=require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// app.post('/bfhl', (req, res) => {
//     console.log("Received POST request at /bfhl");
//     const data = req.body.data || [];

//     console.log("Received data:", data);
//     const numbers = data.filter(item => /^\d+$/.test(item));
//     const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

//     const highestAlphabet = alphabets.length > 0 
//         ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
//         : [];

//     const response = {
//         "is_success": true,
//         "user_id": "john_doe_17091999", 
//         "email": "john@xyz.com",  
//         "roll_number": "AP21110011335",  
//         "numbers": numbers,
//         "alphabets": alphabets,
//         "highest_alphabet": highestAlphabet
//     };
    
//     res.json(response);
// });

// app.get('/bfhl', (req, res) => {
//     res.json({ "operation_code": 1 });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log('Server script loaded'); // Added for debugging

app.post('/bfhl', (req, res) => {
    console.log("Received POST request at /bfhl"); // Check if this log appears
    const data = req.body.data || [];
    
    console.log("Received data:", data); // Log the data received

    const numbers = data.filter(item => /^\d+$/.test(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

    console.log("Filtered numbers:", numbers); // Log filtered numbers
    console.log("Filtered alphabets:", alphabets); // Log filtered alphabets

    const highestAlphabet = alphabets.length > 0 
        ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
        : [];
        
    console.log("Highest alphabet:", highestAlphabet); // Log highest alphabet

    const response = {
        "is_success": true,
        "user_id": "john_doe_17091999", 
        "email": "john@xyz.com",  
        "roll_number": "AP21110011335",  
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highestAlphabet
    };
    
    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.json({ "operation_code": 1 });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

