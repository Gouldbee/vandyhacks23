const express = require('express'); 
const cors = require('cors'); 
import OpenAI from "openai"; 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 
const openai = new OpenAI(); 

const otherMeds = []; 

const checkAllergy = (med) => {
    return true; 
}

const checkTwoMeds = (med1, med2) => {
    fetch()
}

async function checkHealthConditions(med, healthCond) {
    const req = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful medical professional." },
            { role: "user", content: `Are there any adverse interactions between ${med} and 
                ${healthCond}, yes or no? If yes, please list them. `}
        ],
    });
    const msg = req.choices[0].message.content; 
}

const checkInteractions = (med) => {
    for (let secondMed of otherMeds) {

    }
}

app.post("/addMed", (request, response) => {
    let badInteractions = false;
    const med = request.med; 

    fetch(`https://rxnav.nlm.nih.gov/Prescribe/rxcui.json?name=${med}`, {
        method: 'PUT', 
        headers: {
            "Content-Type": "application/json",
        },
    }) 
        .then((res) => (res.json)) 
        .then((data) => {
            
        })
        .catch(err => console.error(err)); 
    response.json({canAdd: checkAllergy(med) && checkInteractions(med)})
})


const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
}); 