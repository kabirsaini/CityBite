import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './Style/Signup.css';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
    };

    return (
        <>
            <div>
                <div className='signup-cont'>
                    <div className='signup-form'>
                        <h1>SignUp</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Name</label>
                            <br />
                            <input {...register('firstName', {
                                required: { value: true, message: "Firstname is required buddy" },
                                minLength: { value: 3, message: "Minimum length should be 3" },
                                maxLength: { value: 10, message: "Maximum length should be 10" }
                            })} />
                            {errors.firstName && <p className='error-msg'>{errors.firstName.message}</p>}
                            <br />

                            <label>Email</label>
                            <br />
                            <input {...register('email',
                                {
                                    required: { value: true, message: "Email is required buddy" },
                                    pattern: { value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, message: "Invalid Email" }
                                })} />
                            {errors.email && <p className='error-msg'>{errors.email.message}</p>}
                            <br />

                            <label>Password</label>
                            <br />
                            <input type="password" {...register('password', {
                                required: { value: true, message: "Password is required" },
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })} />
                            {errors.password && <p className='error-msg'>{errors.password.message}</p>}
                            <br />

                            <input
                                type="submit"
                                disabled={isSubmitting}
                                value={isSubmitting ? "Submitting..." : "Submit"}
                            />
                        </form>
                    </div>
                    <div className='google-login'>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </div>
                <div className='signup-footer'>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>

            </div>
        </>
    );
};

export default SignUp;
