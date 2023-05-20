import { useEffect, useState } from 'react'
import countryService from '../services/Country.service'

const useCountry = (name) => {
  console.log(name)
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if(name) {
      countryService.find(name).then((countryDetails) => { setCountry(countryDetails) })
    }
  } , [name])

  return country
}

export default useCountry;