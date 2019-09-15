import React from 'react';
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

export default (
    action,
    setAction,
    username,
    password,
    firstName,
    lastName,
    email
) => (
    <Wrapper>
        <Form>
            {action === "logIn" ? (
            <form>
                <Input placeholder={"Username"} {...username}/>
                <Input placeholder={"Password"} {...password} type="password"/>
                <Button text={"Log in"} />
            </form>
            ) : (
            <form>
                <Input placeholder={"First name"} {...firstName}/>
                <Input placeholder={"Last name"} {...lastName}/>
                <Input placeholder={"Email"} {...email} type="email"/>
                <Input placeholder={"Username"} {...username}/>
                <Input placeholder={"Password"} {...password} type="password"/>
                <Button text={"Sign up"} />
            </form>
            )}
        </Form>
        <StateChanger>
        {
            action === 'logIn' ? (
                <React.Fragment>
                    Don't have an account?{" "}
                    <Link onClick={() => setAction("signUp")}>Sign up</Link>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    Have an account?{" "}
                    <Link onClick={() => setAction("logIn")}>Log in</Link>
                </React.Fragment>
            )
        }
        </StateChanger>
    </Wrapper>
);