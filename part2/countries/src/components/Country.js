const Country = ({ country }) => <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital.map((capital) => <span key={capital}>{capital}</span>)}</p>
    <p>Area: {country.area}</p>

    <h2>Languages</h2>
    <ul>
        {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
    </ul>

    <img alt={`${country.name.common} flag`} src={country.flags.png}></img>
</div >

export default Country;