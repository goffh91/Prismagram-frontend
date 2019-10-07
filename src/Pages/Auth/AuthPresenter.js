import React from 'react';
import Helmet from "react-helmet";
import styled from 'styled-components';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
    display: flex;
    min-height: 80vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox};
    border-radius:0px;
    width: 100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

const Link = styled.span`
    color: ${props => props.theme.blueColor};
    cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input {
            width: 100%;
            &:not(:last-child) {
                margin-bottom: 7px;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;

export default ({
    action,
    setAction,
    onSubmit,
    userName,
    secret,
    firstName,
    lastName,
    email
}) => (
    <Wrapper>
        <Form>
            {action === "logIn" && (
            <React.Fragment>
                <Helmet>
                    <title>Log In | Prismagram</title>
                </Helmet>
                <form onSubmit={onSubmit}>
                    <Input 
                        type="email"
                        placeholder={"Email"}
                        value={email.value}
                        onChange={email.onChange}
                    />
                    <Button text={"Log in"} />
                </form>
            </React.Fragment>
            )}
            {action === "signUp" && (
            <React.Fragment>
                <Helmet>
                    <title>Sign Up | Prismagram</title>
                </Helmet>
                <form onSubmit={onSubmit}>
                    <Input 
                        placeholder={"First name"}
                        value={firstName.value}
                        onChange={firstName.onChange}
                    />
                    <Input 
                        placeholder={"Last name"}
                        value={lastName.value}
                        onChange={lastName.onChange}
                    />
                    <Input 
                        placeholder={"Email"}
                        value={email.value}
                        onChange={email.onChange}
                        type="email"
                    />
                    <Input 
                        placeholder={"Username"}
                        value={userName.value}
                        onChange={userName.onChange}
                    />
                    <Button text={"Sign up"} />
                </form>
            </React.Fragment>
            )}
            {action === "confirm" && (
            <React.Fragment>
                <Helmet>
                    <title>Confirm Secret | Prismagram</title>
                </Helmet>
                <form onSubmit={onSubmit}>
                    <Input 
                        placeholder={"Paste your secret key."}
                        value={secret.value}
                        onChange={secret.onChange}
                    />
                    <Button text={"Confirm"} />
                </form>
            </React.Fragment>
            )}
        </Form>
        {action !== "confirm" && (
            <StateChanger>
            {action === 'logIn' && (
                <React.Fragment>
                    Don't have an account?{" "}
                    <Link onClick={() => setAction("signUp")}>Sign up</Link>
                </React.Fragment>
            )}
            {action === 'signUp' && (
                <React.Fragment>
                    Have an account?{" "}
                    <Link onClick={() => setAction("logIn")}>Log in</Link>
                </React.Fragment>
            )}
            </StateChanger>
        )}
        
    </Wrapper>
);