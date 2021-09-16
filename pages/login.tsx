import React, {useEffect} from "react";
import { useRouter } from 'next/router'
import Layout from "../components/Layout"

import { userService } from "../services/user.service"
import useLocalStorage from "../lib/useLocalStorage"

export default function Login() {

    const router = useRouter()

    const [authorized, setAuthorized] = useLocalStorage('authorized', false)


    useEffect(() => {
        if (authorized === true) {
            router.push('/forecast')
        }
    }, [authorized])


    // const [authorized, setAuthorized] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [submitted, setSubmitted] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [redirect, setRedirect] = React.useState('')
    const [error, setError] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name: any, value: any;
        ({name, value} = e.target);
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!(email && password)) {
            return;
        }
        setSubmitted(true)
        setLoading(true)
        try {
            const result = userService.login(email, password);
            console.log(result)
            if (result === true) {
                setAuthorized(true);
                return true;
            }
        } catch (err) {
            setError(`${err}`);
        } finally {
            setLoading(false)
            setSubmitted(false)
        }
        return;
    }

    return (
        <Layout>
            <div id="login">
                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="section-title">
                                <h2>Sign In</h2>
                                <p>
                                    Enter your email address or username and password to sign in.
                                </p>
                            </div>
                            <form name="signIn" noValidate>
                                <div className="row">
                                    {error &&
                                    <div className={'alert alert-danger'}>{error}</div>
                                    }
                                    <div className="col-md-12">
                                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                            <label htmlFor="password">Email:</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                className="form-control"
                                                placeholder="Enter your email"
                                                required
                                                onChange={handleChange}
                                            />
                                            {submitted && !email &&
                                            <div className="help-block">Email is required</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div
                                            className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                            <label htmlFor="password">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                className="form-control"
                                                placeholder="Enter your password"
                                                required
                                                onChange={handleChange}
                                            />
                                            {submitted && !password &&
                                            <div className="help-block">Password is required</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={handleSubmit} className="btn btn-custom btn-lg" disabled={loading}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
