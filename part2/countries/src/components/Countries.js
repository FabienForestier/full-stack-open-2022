import Country from "./Country"

const Countries = ({ countries }) => {
    if (countries.length === 0) {
        return <p>No matching found</p>
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    if (countries.length <= 10) {
        return countries.map((country) => <p key={country.name.common}>{country.name.common}</p>)
    }

    return <p>Too many matches, be more specific in your query</p>
}

export default Countries;