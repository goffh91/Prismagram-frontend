import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../Hooks/useInput';
import AuthPresenter from './AuthPresenter';
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET } from './AuthQueries';
import { toast } from 'react-toastify';


export default () => {
    const [action, setAction] = useState('logIn');
    const userName = useInput('');
    const secret = useInput('');
    const firstName = useInput('');
    const lastName = useInput('');
    const email = useInput('');

    const [ requestSecret ] = useMutation(LOG_IN, {
        variables: { email: email.value }
    });

    const [ createAccount ] = useMutation(CREATE_ACCOUNT, {
        variables: {
            userName: userName.value,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });
    
    const [ confirmSecret ] = useMutation(CONFIRM_SECRET, {
        variables: {
            email: email.value,
            secret: secret.value
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (action === 'logIn') {
            // Login process.
            if (email.value !== '') {
                try {
                    const { data: { requestSecret:result } } = await requestSecret();
                    if (result) {
                        toast.success('Check your email for your login secret key.');
                        setAction('confirm');
                    } else {
                        toast.error('You don\'t have an account yet, create one.');
                        setTimeout(() => setAction('signUp'), 2000);
                    }
                } catch (error) {
                    toast.error('Can\'t request secret, try again.');
                }
            } else {
                toast.error('Email is required.');
            }
        } else if (action === 'signUp') {
            // Signup process.
            let isError = false;
            if (userName.value === '') {
                toast.error('Username is required.');
                isError = true;
            }
            if (email.value === '') {
                toast.error('Email is required.');
                isError = true;
            }
            if (firstName.value === '') {
                toast.error('FirstName is required.');
                isError = true;
            }
            if (lastName.value === '') {
                toast.error('LastName is required.');
                isError = true;
            }
            if (! isError) {
                try {
                    const { data: { createAccount:result } } = await createAccount();
                    if (result) {
                        toast.success('Success to create account, Log in now.');
                        setTimeout(() => { setAction('logIn') }, 2000);
                    } else {
                        toast.error('Fail to create account, try again.');
                    }
                } catch(error) {
                    toast.error((error.message).substring((error.message).indexOf(':') + 1));
                    //toast.error('Can\'t create account, try again.');
                }
            }
        } else if (action === 'confirm') {
            // Confirm process.
            if (secret.value !== '') {
                try {
                    const { data } = await confirmSecret();
                    console.log(data);
                } catch {
                    toast.error('Can\'t confirm secret.');
                }
            }
        }
    };

    return (
        <AuthPresenter 
            action={action} 
            setAction={setAction} 
            onSubmit={onSubmit} 
            userName={userName} 
            secret={secret} 
            firstName={firstName} 
            lastName={lastName} 
            email={email} 
        />
    );
}