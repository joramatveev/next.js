import Layout from "../components/Layout"

export default function Page () {
    const authorized = true;
    return (
        <Layout>
            <header id="home">
                <div className="intro">
                    <div className="overlay">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 intro-text">
                                    <h1>
                                        Experience Ukraine
                                    </h1>
                                    <p>This website created with U.S.-Ukraine Foundation and serves as an independent
                                        national tourism guide and forum for Ukraine.</p>
                                    <a
                                        href={authorized === true ? '/forecast' : '/login'}
                                        className="btn btn-custom btn-lg page-scroll"
                                    >
                                        Join Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Layout>
    )
}