const Country = ({ countryName, onShow }) => <div>
    <p>
        {countryName} <button onClick={() => onShow(countryName)}>Show</button>
    </p>
</div>

export default Country;