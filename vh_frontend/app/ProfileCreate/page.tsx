import React from "react";
import Image from "next/image"


export default function SignIn() {
    return (
        <main className="outercontainer">

            <div className="leftSide">
                <Image
                    className="logo"
                    alt="Element"
                    width={300}
                    height={110}
                    src="/LogoB.png"
                />
                <div className="signin-container">
                    <h1 className="text">Profile Creation</h1>
                </div>

                <div className="name-container">
                    <h4 className="text">Name</h4>
                </div>

                <div className="gender">
                    <h4 className="text">Gender</h4>
                </div>

                <div className="gender">
                    <button id="genderButtonM">M</button>
                    <button id="genderButtonF">F</button>
                </div>

                <button id="signInButton">Create Profile</button>

            </div>
            <div className="rightSide">

                <div className="name-container">
                    <h4 className="text">Allergies</h4>
                </div>

                <div className="name-container">
                    <h4 className="text">Current Medication</h4>
                </div>

                <div className="name-container">
                    <h4 className="text">Medical Conditions</h4>
                </div>


            </div>
        </main>
    );
};
