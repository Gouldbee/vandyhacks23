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

const nameToID = new Map(); 
let currID = 1; 
let gender = ""; 

const writeDB = (name, sex, algs, meds, conds) => {
    const db = new sqlite3.Database("./DataBase/userdata.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });

    db.serialize(() => {
        db.run("INSERT INTO userdata (Named, Gender, Allergies, CurrentMedication, MedicalCondition)"
            +" VALUES(?, ?, ?, ?, ?)", [name, sex, algs, meds, conds], (err) => {
                if (err) {
                    return console.log(err.message);
                }

                nameToID.set(name, currID);
                console.log(nameToID); 
                currID++; 
                gender = sex; 
            })

        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
        }); 
    }); 
}

const updateDB = (field, newData) => {
    const db = new sqlite3.Database("./DataBase/userdata.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        } 
    });

    console.log(field, newData, currID);

    db.serialize(() => {
        db.run(`UPDATE userdata SET ${field} = ? WHERE id = ?`, [newData, currID], (err) => {
            if (err) {
                return console.log(err.message);
            }
        }); 

        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
        }); 
    }); 
}

const checkAllergies = (med, allergies) => {
    for (let allergy of allergies) {
        if (allergy.toLowerCase().includes(med)) return true;  
    }
    return false; 
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
    console.log("gpt response: ", req.choices[0].message.content);
    const msg = req.choices[0].message.content.split(" ");
    
    const problemsExist = msg[0];  
    const otherProbs = msg.slice(1).join(" "); 
    return [problemsExist, otherProbs]; 
}



app.post("/addMed", (request, response) => {
    const med = request.body.med; 
    console.log("med: ", med); 

    const accessDB = (callback) => {
        const db = new sqlite3.Database("./DataBase/userdata.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
        });  

        const data = []; 
        db.serialize(() => {
            db.get("SELECT Allergies algs, CurrentMedication meds, MedicalCondition conds " + 
                "FROM userdata WHERE id = ?", [currID], (err, row) => {
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
    // connnect to userdata db and read allergies, current medications, and medical conditions
    // of logged-in user
    const getMed = (med) => {
        accessDB(checkInteractions, med); 
    }

    const checkInteractions = async (res) => {
        console.log("in checkInteract", res); 
        const [allergies, otherMeds, conditions] = res; 

        let noAdverse = true; 
        const allergic = checkAllergies(med, allergies); 
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
                flaggedCondition.push(cond); 
                condEffects.push(issues); 
                noAdverse = false; 
            }
        }

        if (noAdverse) {
            updateDB("CurrentMedication", med); 
        }

        response.json({
            added: noAdverse, 
            allergic: allergic, 
            medications: badMeds,
            medEffects: medEffects, 
            conditions: flaggedCondition, 
            condEffects: condEffects
        });
    }

    // do sqlite stuffs
    getMed(med); 
})

app.patch("/addAllergy", (request, response) => {
    const allergy = request.body.allergy; 

    updateDB("Allergies", allergy); 
    response.send({ worked: true }); 
})

app.patch("/addCondition", (request, response) => {
    const cond = request.body.cond; 

    updateDB("MedicalCondition", cond);  
    response.send({ worked: true }); 
})


writeDB("Jim", "male", "acetaminophen", "Prozac", "liver disease"); 
fetch("http://localhost:8000/addAllergy", {
    method: 'PATCH', 
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({allergy:'peanuts'}) 
})
fetch("http://localhost:8000/addCondition", {
    method: 'PATCH', 
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({cond: 'heart problems'})
})
fetch("http://localhost:8000/addMed", {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({med: 'acetaminophen'}) 
}) .then ((res) => {res.json();})
    .then ((data) => {
        console.log("raw data: ", data); 
        console.log("data received: ", data.added, data.allergic, data.medications, data.medEffects, data.conditions, data.condEffects); 
    })
    .catch(err => console.error(err)); 
 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`); 
}); 