import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { signInUser, signUpUser } from '../../helpers/api-communicator';
import { useNavigate } from 'react-router-dom';
import styles from './Enroll.module.css';

const Enroll = () => {
    const [toggle, setToggle] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const resetForm = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
    };

    const validateForm = () => {
        let formErrors = {};

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
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
            toast.error('Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character.');
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
            let toastId;
            try {
                if (toggle) {
                    toastId = toast.loading('Logging in...');
                    const response = await signInUser(email, password);
                    if (response.status === 200) {
                        toast.success('Logged in successfully', { id: toastId });
                        resetForm();
                        localStorage.setItem('token', response.data.token);
                        navigate('/workspace');
                    } else if (response.msg === 'Invalid Email') {
                        setErrors({ email: 'Invalid Email' });
                        toast.error('Invalid Email', { id: toastId });
                    } else if (response.msg === 'Invalid Password') {
                        setErrors({ email: 'Invalid Password' });
                        toast.error('Invalid Password', { id: toastId });
                    } else {
                        toast.error('Login failed', { id: toastId });
                    }
                } else {
                    toastId = toast.loading('Signing up...');
                    const response = await signUpUser(userName, email, password);
                    if (response.status === 201) {
                        toast.success('Signed up successfully', { id: toastId });
                        resetForm();
                        localStorage.setItem('token', response.data.token);
                        navigate('/workspace');
                    } else {
                        toast.error('Sign up failed', { id: toastId });
                    }
                }
            } catch (error) {
                toast.error('An error occurred', { id: toastId });
            }
        }
    };

    const handleToggle = (newToggle) => {
        setToggle(newToggle);
        resetForm();
    };

    return (
        <div className={styles.enrollWrapper}>
            <div className={styles.enrollContainer}>
                <div className={styles.enrollHeading}>
                    <h1>QUIZZIE</h1>
                </div>
                <div className={styles.enrollType}>
                    <button
                        className={toggle ? '' : styles.selectedType}
                        onClick={() => handleToggle(false)}>Sign Up</button>
                    <button
                        className={toggle ? styles.selectedType : ''}
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
