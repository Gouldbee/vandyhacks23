
import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { createContext } from 'react';


export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onFormSubmit = (data: any) => console.log(data);

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
                    <h1 className="text">Sign Up</h1>
                </div>

                <div className="text-container">
                    <h4 className="text">Already have an account</h4>
                    <button id="signUpButton">Sign In</button>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="name-container">
                        <h4 className="text">Name</h4>
                        <input type="text" {...register('name', { required: true })} />
                    </div>

                    <div className="email-container">
                        <h4 className="text">Email</h4>
                        <input type="email" {...register('email', { required: true })} />
                        {errors.email && <span className="error">Email is required</span>}
                    </div>

                    <div className="pass-container">
                        <h4 className="text">Password</h4>
                        <input type="password" {...register('password', { required: true })} />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>

                    <button id="signInButton" type="submit">Sign Up</button>
                </form>
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
}
