import express from 'express'; 
import cors from 'cors'; 
import OpenAI from 'openai'; 
import dotenv from 'dotenv'; 

dotenv.config(); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 

const allergies = []; 
const otherMeds = []; 
const conditions = []; 
const sex = ""; 

async function checkAllergies(med) {
    return !(med in allergies); 
}

async function checkHealthConditions(med, other) {
    const req = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful medical professional who answers first " +
                "in a simple yes or no format then provides further details" },
            { role: "user", content: `In general, are there adverse interactions between ${med} and 
                ${other} for a ${sex}? If yes, please list potential issues separated by commas`}
        ],
    });
    const msg = req.choices[0].message.content.split(" ");
    const problemsExist = msg[0];  
    const otherProbs = msg.slice(1).join(" "); 
    return [problemsExist, otherProbs]; 
}

const checkInteractions = (med) => {
    let noAdverse = true; 
    
    const allergic = checkAllergies(med); 
    const badMeds = [];
    const medEffects = [];
    const flaggedCondition = [];
    const condEffects = [];

    for (let secondMed of otherMeds) {
        [notGood, issues] = checkHealthConditions(med, secondMed); 
        if (notGood.includes("Yes")) {
            badMeds.push(secondMed); 
            medEffects.push(issues); 
        }
    }


    for (let cond of conditions) {
        [notGood, issues] = checkHealthConditions(med, cond); 
        if (notGood.includes("Yes")) {
            flaggedCondition.push(secondMed); 
            condEffects.push(issues); 
        }
    }

    return [noAdverse, allergic, badMeds, medEffects, flaggedCondition, condEffects]
}

app.post("/addMed", (request, response) => {
    const med = request.med; 

    [canAdd, allergic, badMeds, medEff, badCond, condEff] = checkInteractions(med); 
    response.json({
        canAdd: canAdd, 
        allergic: allergic, 
        medications: badMeds,
        medEffects: medEff, 
        conditions: badCond, 
        condEffects: condEff
    })
})

app.post("/addAllergy", (request, response) => {
    const allergy = request.allergy; 

    allergies.push(allergy); 
    response.json({ worked: true }); 
})

app.post("/addCondition", (request, response) => {
    const cond = request.cond; 

    conditions.push(cond); 
    response.json({ worked: true }); 
})
 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`); 
}); 