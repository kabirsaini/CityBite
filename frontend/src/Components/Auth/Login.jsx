
import '@/Components/User/Style/Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch('https://food-website-backend-20z8.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await res.json();

            if (res.ok) {
                const { user, token } = result;
                toast.success("Login successful ✅");


                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                if (user.role === "vendor") {
                    navigate("/vendor/Dashboard");
                } else {
                    navigate("/Mainpage");

                }
            } else {
                toast.error(data.message || "Login failed ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong ❌");
        }
    };

    // <GoogleLogin
    //     onSuccess={async (credentialResponse) => {
    //         try {
    //             const res = await fetch('http://localhost:5000/api/users/google-login', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     credential: credentialResponse.credential,
    //                     role: 'customer'  // or 'vendor' based on context
    //                 }),
    //             });

    //             if (!res.ok) {
    //                 const errorData = await res.json();
    //                 throw new Error(errorData.message || 'Login failed');
    //             }

    //             const data = await res.json();
    //             console.log('Login success:', data);

    //             // Store token and user
    //             localStorage.setItem('token', data.token);
    //             localStorage.setItem('user', JSON.stringify(data.user));
    //         } catch (err) {
    //             console.error('Google login failed:', err.message);
    //         }
    //     }}
    //     onError={() => {
    //         console.log('Login Failed');
    //     }}
    // />


    return (

        <>

            <div className='loginpage'>

                <div className='Login-left'>
                    {/* <div className="leftcontent">
                    <h1>Craving For Food?</h1>
                    <h2>Login To find Your Favourite Food in Your City</h2>

                    </div> */}
                </div>


                <div className="login-container">

                    <div className='loginbox'>
                    <h1>Login </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>

                            <label>Email</label><br />
                            <input {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                    message: "Invalid email format"
                                }
                            })} />
                            {errors.email && <p className="error-msg">{errors.email.message}</p>}
                            <br />

                            <label>Password</label><br />
                            <input
                                type="password"
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" }
                                })}
                            />
                            {errors.password && <p className="error-msg">{errors.password.message}</p>}
                            <br />
                            <p id="fpassword">forgot password?</p>


                            <div className="button-wrapper">
                                <button type="submit" disabled={isSubmitting} className='login-button'>
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </form>

                        <div className="divider">
                            <span>or</span>
                        </div>


                        <div className='google-login'>
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
                                                role: 'customer'  // or 'vendor' based on context
                                            }),
                                        });

                                        if (!res.ok) {
                                            const errorData = await res.json();
                                            throw new Error(errorData.message || 'Login failed');
                                        }

                                        const data = await res.json();
                                        toast.success("Google login successful ✅");
                                        console.log('Login success:', data);

                                        // Store token and user
                                        localStorage.setItem('token', data.token);
                                        localStorage.setItem('user', JSON.stringify(data.user));
                                        navigate('/Mainpage');
                                    } catch (err) {
                                        toast.error("Google login Failed ");
                                        console.error('Google login failed:', err.message);
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                auto_select={true}
                            />
                        </div>
                    </div>
                    <div className='signup-footer'>
                        <p>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
