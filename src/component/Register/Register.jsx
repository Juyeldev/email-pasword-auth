import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
const auth = getAuth(app);


const Register = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('')
        setError('');
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        if (!/(?=.*?[A-Z])/.test(password)) {
            setError('Password must contain at least one uppercase letter')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Password must contain at least two number')
            return;
        }
        else if (password.length < 6) {
            setError('Password must be at least 6 characters in your password')
            return;
        }

        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setError('')
                event.target.reset()
                setSuccess('User created successfully')
                sendVerificationEmail(result.user)
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message)
            })
    };

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
        .then(result=>{
            console.log(result)
            alert('Verification email sent')
        })
        .catch(error => {
            console.error(error.message);
        
        })
    }

    const handleRegister = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    };

    const handlePasswordBlur = (event) => {
        console.log(event.target.value);

    }

    return (
        <div>
            <h2>Register page</h2>
            <form onSubmit={handleSubmit} >
                <input className='mb-4 rounded' onChange={handleRegister} type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input className='mb-4 rounded' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already Have an Account? Please <Link to='/login'>Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;