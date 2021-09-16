import React, {useEffect} from "react";
import { useRouter } from 'next/router'
import Link from "next/link"
import useLocalStorage from "../lib/useLocalStorage";

import { userService } from "../services/user.service"

export default function Nav() {

    const router = useRouter()

    const [authorized, setAuthorized] = useLocalStorage('authorized', false)

    const handleClickLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        userService.logout();
        if (authorized === true) {
            router.push('/login')
        }
        return;
    }

    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <Link href="/">
                        <span className="navbar-brand page-scroll">One Way Ticket</span>
                    </Link>{' '}
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={!authorized ? 'hidden' : ''}>
                            <Link href="/forecast">Forecast</Link>
                        </li>
                        <li className={!authorized ? 'hidden' : ''} onClick={handleClickLogout}>
                            <Link href="#">Sing Out</Link>
                        </li>
                        <li className={authorized ? 'hidden' : ''}>
                            <Link href="/login">Sing In</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
