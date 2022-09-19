import Country from "./Country"
import CountryDetails from "./CountryDetails"

const Countries = ({ countries, onShowCountry }) => {
    if (countries.length === 0) {
        return <p>No matching found</p>
    }

    if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }

    if (countries.length <= 10) {
        return countries.map((country) => <Country key={country.name.common} countryName={country.name.common} onShow={onShowCountry} />)
    }

    return <p>Too many matches, be more specific in your query</p>
}

export default Countries;