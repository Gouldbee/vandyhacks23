import React from "react";
import Image from "next/image"


export default function SignIn() {
    return (
        <main className="topbar">
            <main>
                <Image
                    className="LogoW"
                    alt="Element"
                    width={450}
                    height={150}
                    src="/LogoW.png"
                />
                <h2>Hello, Daniel</h2>
            </main>
        </main >
    );
};
