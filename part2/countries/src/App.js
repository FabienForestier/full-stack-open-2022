import Filter from './components/Filter';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const countriesUrl = 'https://restcountries.com/v3.1/name/';
  const [filterValue, setFilterValue] = useState('');
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      if (!filterValue) {
        setCountries([]);
        return;
      }
      const query = `${countriesUrl}${filterValue}`;
      const { data: countries } = await axios.get(query);

      setCountries(countries);
    }

    getCountries();
  }, [filterValue])
  return <div>
    <Filter filterValue={filterValue} onChange={(event) => setFilterValue(event.target.value)} />
    {filterValue && <Countries countries={countries} onShowCountry={(countryName) => setFilterValue(countryName)} />}
  </div>
}

export default App;
