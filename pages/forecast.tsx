import React, {useEffect} from "react";
import { useRouter } from 'next/router'
import Layout from "../components/Layout";

import { api, WeatherData } from "../services/api.service";
import useLocalStorage from "../lib/useLocalStorage";

export default function Forecast() {

    const router = useRouter()

    const [authorized, setAuthorized] = useLocalStorage('authorized', false)

    useEffect(() => {
        if (!authorized) {
            router.push('/login')
        }
    }, [authorized])

    const [city, setCity] = React.useState('')

    const [error, setError] = React.useState('')

    const [submitted, setSubmitted] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [hasWeatherData, setHasWeatherData] = React.useState(false)
    const [weatherMain, setWeatherMain] = React.useState('')
    const [mainTemp, setMainTemp] = React.useState('')
    const [weatherDescription, setWeatherDescription] = React.useState('')
    const [windSpeed, setWindSpeed] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        let name: any, value: any;
        ({name, value} = e.target);
        switch (name) {
            case 'city':
                setCity(value);
                break;
        }
        return;
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!city) {
            return;
        }
        setSubmitted(true)
        setLoading(true)
        try {
            const result: WeatherData = await api.getWeatherData(city);
            if (result) {
                setHasWeatherData(true);
                setWeatherMain(result.weatherMain);
                setWeatherDescription(result.weatherDescription);
                setMainTemp(result.mainTemp);
                setWindSpeed(result.windSpeed);
            } else {
                setHasWeatherData(false);
            }
            console.log(result)

        } catch (err) {
            setHasWeatherData(false);
            setError(`${err}`);
        } finally {
            setLoading(false)
            setSubmitted(false)
        }
        // return;
    }

    return (
        <Layout>
            <div id="forecast">
                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="section-title">
                                <h2>Forecast Weather</h2>
                                <p>
                                    Current & Forecast weather data collection
                                </p>
                            </div>
                            <form name="forecastForm" noValidate onSubmit={e => {e.preventDefault();}}>
                                {error &&
                                <div className={'alert alert-danger'}>{error}</div>
                                }
                                <div className="col-md-12">
                                    <div className={'form-group' + (submitted && !city ? ' has-error' : '')}>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={city}
                                            className="form-control input-lg"
                                            placeholder="Enter city name"
                                            required
                                            onChange={handleChange}
                                            // @ts-ignore
                                            onBlur={handleSubmit}
                                        />
                                        {submitted && !city &&
                                        <div className="help-block">City is required</div>}
                                    </div>
                                </div>
                                {hasWeatherData ? (
                                    <div className="col-md-12">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td>Weather:</td>
                                                <td>{weatherMain}</td>
                                            </tr>
                                            <tr>
                                                <td>Temperature:</td>
                                                <td>{mainTemp}</td>
                                            </tr>
                                            <tr>
                                                <td>Weather description:</td>
                                                <td>{weatherDescription}</td>
                                            </tr>
                                            <tr>
                                                <td>Wind speed:</td>
                                                <td>{windSpeed}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : null}
                                <div className="col-md-12">
                                    <div
                                        className={'form-group'}>
                                        <button type="button" onClick={handleSubmit} className="btn btn-custom btn-lg"
                                                disabled={loading}>
                                            Show Forecast
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
