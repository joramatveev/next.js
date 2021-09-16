import React from "react";
import Head from 'next/head'
import Script from 'next/script'
import Nav from './Nav'
import Footer from './Footer'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <>
            <Head>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
                    rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Lato:400,700"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
                    rel="stylesheet"
                />
            </Head>
            <Nav />
            {children}
            <Footer />

            <Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" strategy="beforeInteractive" />
            <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
        </>
    )
}