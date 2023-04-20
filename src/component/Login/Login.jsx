import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';


const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const emailRef = useRef()

    const auth = getAuth(app);

    const handleLogin = event => {
        event.preventDefault();
        setError('');
        setSuccess('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // validation

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

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                if (!loggedUser.emailVerified) {
                    alert('please verify your email')
                }
                setError('')
                event.target.reset()
                setSuccess('User Login successful')
            })
            .catch(error => {
                setError(error.message)

            })
    }

    const handleResetPassword = event => {
        const email = (emailRef.current.value)
        if (!email) {
            alert('please provide email address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(result=>{
            console.log(result)
            setSuccess('Password reset email sent')
        })
        .catch(error => {
            console.log(error)
            setError(error.message)
        })
    }
    return (
        <div className='mt-4'>
            <h2>Please Login </h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" ref={emailRef} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New this Site? Please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;