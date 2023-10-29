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
                    Current Medication
                </h1>
                <p>

                </p>
            </main>
        </main>

    );
};
