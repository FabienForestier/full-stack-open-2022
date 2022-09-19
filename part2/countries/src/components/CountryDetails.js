import Weather from "./Weather";

const CountryDetails = ({ country }) => {
    const capital = country.capital.map((capital) => <span key={capital}>{capital}</span>);
    return <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {country.area}</p>

        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>

        <img alt={`${country.name.common} flag`} src={country.flags.png}></img>

        <h2>Weather in {capital}</h2>
        <Weather lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]} />
    </div >
}

export default CountryDetails;