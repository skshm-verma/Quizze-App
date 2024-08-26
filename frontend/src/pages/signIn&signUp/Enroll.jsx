import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { signInUser } from '../../helpers/api-communicator';
import styles from './Enroll.module.css';

const Enroll = () => {
    const [toggle, setToggle] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
    };

    const validateForm = () => {
        let formErrors = {};

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const validNameRegex = /^[A-Za-z\s]{3,}$/;

        if (!email.trim()) {
            formErrors.email = 'Invalid Email';
            setEmail('');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Invalid Email';
            setEmail('');
        }

        if (!password) {
            formErrors.password = 'Password is required';
            formErrors.confirmPassword = 'Password is required';
            setPassword('');
            setConfirmPassword('');
        } else if (!strongPasswordRegex.test(password)) {
            formErrors.password = 'Weak password';
            toast.error('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.');
            setPassword('');
        }

        if (!toggle) {
            if (!userName.trim()) {
                formErrors.name = 'Invalid name';
                setUserName('');
            } else if (!validNameRegex.test(userName)) {
                formErrors.name = 'Invalid name';
                toast.error('Name must be at least 3 characters and contain only letters and spaces.');
                setUserName('');
            }

            if (password !== confirmPassword) {
                formErrors.confirmPassword = "Password doesn't match";
                setConfirmPassword('');
            }
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (toggle) {
                // Handle Log In logic here
                try {
                    console.log(email,password);
                    const response = await signInUser(email, password);
                    console.log(response);
                    // if (response.ok) {
                    //     toast.success('Logged in successfully');
                    //     resetForm(); // Clear form after successful login
                    // } else if (response.status === 401) {
                    //     setErrors({ password: 'Invalid password' });
                    //     toast.error('Invalid password');
                    // } else {
                    //     toast.error('Login failed');
                    // }
                } catch (error) {
                    toast.error('An error occurred');
                }
            } else {
                // Handle Sign Up logic here
                try {
                    const response = await fetch('/api/signup', { // Update with your API endpoint
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userName, email, password }),
                    });

                    if (response.ok) {
                        toast.success('Signed up successfully');
                        resetForm(); // Clear form after successful sign-up
                    } else {
                        toast.error('Sign up failed');
                    }
                } catch (error) {
                    toast.error('An error occurred');
                }
            }
        }
    };

    const handleToggle = (newToggle) => {
        setToggle(newToggle);
        resetForm(); // Clear all fields when toggling
    };

    return (
        <div className={styles.enrollWrapper}>
            <div className={styles.enrollContainer}>
                <div className={styles.enrollHeading}>
                    <h1>QUIZZIE</h1>
                </div>
                <div className={styles.enrollType}>
                    <button
                        className={toggle ? '': styles.selectedType}
                        onClick={() => handleToggle(false)}>Sign Up</button>
                    <button
                        className={toggle ?  styles.selectedType : '' }
                        onClick={() => handleToggle(true)}
                    >Log In</button>
                </div>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        {!toggle && (
                            <div className={styles.usernameContainer}>
                                <label>Name</label>
                                <input
                                    className={errors.name ? styles.errorInput : ''}
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder={errors.name ? errors.name : ''}
                                />
                            </div>
                        )}
                        <div className={styles.emailContainer}>
                            <label>Email</label>
                            <input
                                className={errors.email ? styles.errorInput : ''}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={errors.email ? errors.email : ''}
                            />
                        </div>
                        <div className={styles.passwordContainer}>
                            <label>Password</label>
                            <input
                                className={errors.password ? styles.errorInput : ''}
                                type={errors.password ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={errors.password ? errors.password : ''}
                            />
                        </div>
                        {!toggle && (
                            <div className={styles.confirmPasswordContainer}>
                                <label>Confirm Password</label>
                                <input
                                    className={errors.confirmPassword ? styles.errorInput : ''}
                                    type={errors.confirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder={errors.confirmPassword ? errors.confirmPassword : ''}
                                />
                            </div>
                        )}
                        <button type='submit'>{toggle ? 'Log In' : 'Sign-Up'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Enroll;
