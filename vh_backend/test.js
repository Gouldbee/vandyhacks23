import sqlite3 from 'sqlite3'

const myFunc = (callback) => {
    let db = new sqlite3.Database("./DataBase/userdata.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("connection established"); 
    });  

    const data = []; 
    db.serialize(() => {
        db.get("SELECT Allergies algs, CurrentMedication meds, MedicalCondition conds " + 
            "FROM userdata WHERE id = ?", [1], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            
            data.push([row.algs, row.meds, row.conds]); 
            return row ? [row.algs, row.meds, row.conds] : [null, null, null];
            
        });

        db.close((err) => {
            if (err) {
            return console.error(err.message);
        }
        callback(data); 
    });
    });
}

const func2 = (data) => {
    console.log(data); 
}

myFunc(func2);

