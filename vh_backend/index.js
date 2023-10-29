import express from 'express'; 
import cors from 'cors'; 
import OpenAI from 'openai'; 
import dotenv from 'dotenv'; 
import sqlite3 from 'sqlite3'; 

dotenv.config(); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 

let idNum = 1; 
let gender = ""; 
const nameToID = new Map(); 


// connnect to userdata db and read allergies, current medications, and medical conditions
// of logged-in user
const accessDB = (callback, med, response) => {
    const db = new sqlite3.Database("./DataBase/userdata.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connection established"); 
    });  

    const data = [response, med]; 
    db.serialize(() => {
        db.get("SELECT Allergies algs, CurrentMedication meds, MedicalCondition conds " + 
            "FROM userdata WHERE id = ?", [idNum], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            
            data.push([row.algs], [row.meds], [row.conds]); 
            
        });

        db.close((err) => {
            if (err) {
            return console.error(err.message);
        }
        callback(data); 
    });
    }); 
}

async function checkHealthConditions(med, other) {
    const req = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
           { role: "system", content: "You are a helpful medical professional who answers first " +
                "in a simple yes or no format then provides further details" },
            { role: "user", content: `In general, are there adverse interactions between ${med} and 
                ${other} for a ${gender}? If yes, please list potential issues separated by commas`}
        ],
    });
    console.log(req.vhoices[0].message.content);
    const msg = req.choices[0].message.content.split(" ");
    
    const problemsExist = msg[0];  
    const otherProbs = msg.slice(1).join(" "); 
    return [problemsExist, otherProbs]; 
}

const getMed = (med, response) => {
    accessDB(checkInteractions, med, response); 
}

const checkInteractions = async (res) => {
    console.log(res); 
    const [response, med, allergies, otherMeds, conditions] = res; 

    let noAdverse = true; 
    const allergic = !(med in allergies); 
    const badMeds = [];
    const medEffects = [];
    const flaggedCondition = [];
    const condEffects = [];

    for (let secondMed of otherMeds) {
        let [notGood, issues] = await checkHealthConditions(med, secondMed); 
        if (notGood.includes("Yes")) {
            badMeds.push(secondMed); 
            medEffects.push(issues); 
            noAdverse = false; 
        }
    }


    for (let cond of conditions) {
        let [notGood, issues] = await checkHealthConditions(med, cond); 
        if (notGood.includes("Yes")) {
            flaggedCondition.push(secondMed); 
            condEffects.push(issues); 
            noAdverse = false; 
        }
    }

    if (noAdverse) {

    }

    response.json({
        added: canAdd, 
        allergic: allergic, 
        medications: badMeds,
        medEffects: medEff, 
        conditions: badCond, 
        condEffects: condEff
    })
    console.log(response.json); 
    // console.log([noAdverse, allergic, badMeds, medEffects, flaggedCondition, condEffects]);
    // return [noAdverse, allergic, badMeds, medEffects, flaggedCondition, condEffects];
}

app.post("/addMed", (request, response) => {
    const med = request.med; 

    // do sqlite stuffs
    getMed(med, response); 

    [canAdd, allergic, badMeds, medEff, badCond, condEff] = checkInteractions(med); 
    if (canAdd) 
    response.json({
        added: canAdd, 
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

console.log(getMed("acetaminophen"));
 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`); 
}); 