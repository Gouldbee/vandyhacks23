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
                    <h1 className="text">Sign In to continue</h1>
                </div>

                <div className="text-container">
                    <h4 className="text">Don't have an account?</h4>
                    <button id="signUpButton">Sign up</button>
                </div>

                <div className="email-container">
                    <h4 className="text">Email</h4>
                </div>

                <div className="pass-container">
                    <h4 className="text">Password</h4>
                </div>

                <button id="signInButton">Sign In</button>

            </div>
            <div className="rightSide">
                <Image
                    className="woman"
                    alt="Element"
                    width={750}
                    height={1400}
                    src="/Woman.jpg"
                />
            </div>
        </main>
    );
};
