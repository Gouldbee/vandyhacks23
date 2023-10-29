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
                <h1 className="title">
                    New Medication
                </h1>

                <div className="newmed">
                    <button className="checkbutton">
                        <h2>Check</h2>
                    </button>
                </div>
            </main>
        </main>

    );
};
