import "../User/Style/Login.css";

import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch('https://food-website-backend-20z8.onrender.com/api/users/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Signup successful ✅");
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));
                result.user.role === 'vendor'
                    ? navigate('/vendor/KYC')
                    : navigate('/login');
            } else {
                toast.error("Signup failed ❌\n" + result.message);
                
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    return (
        <>
            <div className="signup-page">
                <div className="Login-left">
                    <div className="leftcontent">
                        {/* <h1>Hungry Already?</h1> */}
                        {/* <h2>Sign Up to Discover Iconic Dishes Near You</h2> */}

                    </div>
                </div>

                <div className="signup-container">

                    <div className='signup-box'>
                        <h1 style={{ textAlign: 'center' }}>Sign Up</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                            <label>Name</label><br />
                            <input {...register('name', {
                                required: "Name is required",
                                minLength: { value: 3, message: "Min 3 characters" },
                                maxLength: { value: 20, message: "Max 20 characters" }
                            })} />
                            {errors.name && <p className='error-msg'>{errors.name.message}</p>}<br />

                            <label>Email</label><br />
                            <input type="email" {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                    message: "Invalid email"
                                }
                            })} />
                            {errors.email && <p className='error-msg'>{errors.email.message}</p>}<br />

                            <label>Phone</label><br />
                            <input type="tel" {...register('phone', {
                                required: "Phone is required",
                                pattern: { value: /^\d{10}$/, message: "10-digit phone required" }
                            })} />
                            {errors.phone && <p className='error-msg'>{errors.phone.message}</p>}<br />

                            <label>Password</label><br />
                            <input type="password" {...register('password', {
                                required: "Password is required",
                                minLength: { value: 6, message: "Min 6 characters" }
                            })} />
                            {errors.password && <p className='error-msg'>{errors.password.message}</p>}<br />

                            <label>Role</label><br />

                            <select className='signup-select' {...register("role", { required: "Role is required" })}>
                                <option value="user">Customer</option>
                                <option value="vendor">Vendor</option>
                            </select>
                            {errors.role && <p className="error-msg">{errors.role.message}</p>}<br />

                            <div className="signup-button-wrapper">
                                <button type="submit" disabled={isSubmitting} className="signup-button">
                                    {isSubmitting ? "Signing up..." : "Sign Up"}
                                </button>
                            </div>
                        </form>

                        <div className="signup-divider"><span>or</span></div>

                        <div className="signup-google">
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        const res = await fetch('https://food-website-backend-20z8.onrender.com/api/users/google-login', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                credential: credentialResponse.credential,
                                                role: 'customer'
                                            }),
                                        });

                                        if (!res.ok) {
                                            const errorData = await res.json();
                                            throw new Error(errorData.message || 'Login failed');
                                        }

                                        const data = await res.json();
                                        console.log('Login success:', data);

                                        localStorage.setItem('token', data.token);
                                        localStorage.setItem('user', JSON.stringify(data.user));
                                    } catch (err) {
                                        console.error('Google login failed:', err.message);
                                    }
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
            </div>
        </>
    );
};

export default Signup;
