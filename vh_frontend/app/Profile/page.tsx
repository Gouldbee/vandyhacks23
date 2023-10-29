import React from "react";
import Image from "next/image"


export default function SignIn() {
    return (
        <main>
            <main className="topbar">
                <main className="topbaritems">
                    <Image
                        className="LogoW"
                        alt="Element"
                        width={300}
                        height={100}
                        src="/LogoW.png"
                    />
                    <h1 className="welcome">Hello, Daniel</h1>
                </main>
            </main >
            <main className="bottomspace">
                <main className="bottomspacetop">
                    <main className="personinfo">
                        <Image
                            className="DD"
                            alt="Element"
                            width={350}
                            height={400}
                            src="/DD.png"
                        />
                    </main>
                    <main className="personname">
                        <h1 className="username">
                            DANIEL DEIRMEIER
                        </h1>
                        <h3 className="gender">
                            Male
                        </h3>
                        <div className="newmed">
                            <button className="newmedbutton">
                                <h2>New Medication</h2>
                            </button>
                        </div>

                    </main>
                </main>
                <main className="medicalbuttons">
                    <button className="button"><h2>Allergies</h2></button>
                    <button className="button"><h2>Curent Medication</h2></button>
                    <button className="button"><h2>Medical Conditions</h2></button>
                </main>
            </main>
        </main>
    );
};
