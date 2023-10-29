'use client'

import React, { useState } from "react"

export default function mainLand() {
    const [allergyInfo, setAllergyInfo] = useState(""); 
    const [condInfo, setCondInfo] = useState(""); 
    const [medInfo, setMedInfo] = useState(""); 
    const [medProbs, setMedProbs] = useState(""); 

    function allergySubmit(event: any) {
        event.preventDefault()
     
        const formData = event.target.elements.allergyField.value; 
        fetch("http://localhost:8000/addAllergy", {
            method: 'PATCH', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({allergy:formData}) 
        }) 
            .then((res) => res.json())
            .then((data) => {
                if (data.worked) setAllergyInfo(formData);  
        }).catch(err => console.error(err)); 
    }

    function conditionSubmit(event: any) {
        event.preventDefault()
     
        const formData = event.target.elements.conditionField.value;
        fetch("http://localhost:8000/addCondition", {
            method: 'PATCH', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({cond:formData})  
        }) 
            .then((res) => res.json())
            .then((data) => {
                if (data.worked) setCondInfo(formData);  
        }).catch(err => console.error(err)); 
    }

    function medSubmit(event: any) {
        event.preventDefault()
     
        const formData = event.target.elements.medField.value; 
        fetch("http://localhost:8000/addMed", {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({med: formData}) 
        }) 
            .then((res) => res.json())
            .then((data) => {
                if (data.added) setMedInfo(formData + " added to med list");
                else {
                    setMedInfo(formData + " could not be added");
                    let diagnosis:string = data.allergic + data.medEffects + data.condEffects; 
                    setMedProbs(diagnosis);  
                } 
                // setMedInfo(data.added + " " + data.allergic + " " + data.medications + " " + data.medEffects + " " + data.conditions + " " + data.condEffects);  
        }).catch(err => console.error(err)); 
    }

    return (
        <main>
            <form className="allergies" onSubmit={allergySubmit}>
                <label>Enter an allergy: </label>
                <input type="text" id="allergyField" name="allergyField"></input>
                <button type="submit">Submit</button>
            </form>

            <form className="conditions" onSubmit={conditionSubmit}>
                <label>Enter a medical condition: </label>
                <input type="text" id="conditionField" name="conditionField"></input>
                <button type="submit">Submit</button>
            </form>

            <form className="medicines" onSubmit={medSubmit}>
                <label>Enter a drug: </label>
                <input type="text" id="medField" name="medField"></input>
                <button type="submit">Submit</button>
            </form>

            <text>{allergyInfo}</text>
            <text>{condInfo}</text>
            <text>
                {medInfo}
            </text>
        </main>
    )
}