import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const Filter = (props) => {
    return(
        <div> find countries <input value={props.newFilter} onChange={props.handleFilterChange}/></div>
    )
}

const CountryInfo = (props) => {
    return(
        <div>
        <div>{props.capital}</div>  
        <div>{props.area}</div>
        <br/>
        {props.languages && (
            <div>
            <strong> Languages:</strong>
            <ul>
            {props.languages.map(language => (
                <li key={language}>{language}</li>
            ))}
            </ul>
            {props.flag && <img src={props.flag} alt="Flag" />}
            </div>
        )}
        <p>
        Weather in {props.capital}
        </p>
        </div>
    )
}


function App() {

    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [notification, setNotification] = useState('Too many matches, specify another filter')
    const [languages, setLanguages] = useState(null)
    const [capital, setCapital] = useState('')
    const [area, setArea] = useState('')
    const [flag, setFlag] = useState(null)
    const [showInfo, setShowInfo] = useState(false)
    const [header, setHeader] = useState('')

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        if(filteredCountries.length < 10){
            setNotification('') 
        }
        if(filteredCountries.length ===1){
            handleInformation(filteredCountries[0].name)
        }
        else
        {
            setNotification('Too many matches, specify another filter')
            setLanguages(null)
            setCapital('')
            setArea('')
            setFlag(null)
            setShowInfo(false)
        }
    }

    const Countries = ({ countriesToShow }) => {
        if(countriesToShow.length<10)
            return(
                countriesToShow.map(country =>
                    <Country
                    key={country.name}
                    country={country}
                    handleClick = {() =>handleClick(country.name)}
                    />
                )
            )
    }

    const handleClick = (name) =>
    {
        console.log(name)
        handleInformation(name)
        setShowInfo(true)
    }


    const handleInformation = (name) => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                setLanguages(Object.values(response.data.languages))
                setCapital(`capital ${response.data.capital}`)
                setArea(`area ${response.data.area}`)
                setFlag(response.data.flags.png)
                setHeader(name)
                setNotification('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(newFilter.toLowerCase())
    )

    const countriesToShow = newFilter ? filteredCountries : countries

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                //haetaan kaikki maiden nimet
                const countryNames = response.data.map(country => country.name.common)
                //tehdään objekti jokaiselle nimelle
                const countryObjects = countryNames.map(countryName => ( {name: countryName }))
                // asetetaan objektit näkymään 
                setCountries(countryObjects)
            })
        .catch(error=> {
            console.log(error)
        })
    }, [])

    return (
        <div> 
        <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
        {(countriesToShow.length  === 1)|| showInfo ? (
            <div> 
            <h2>{header}</h2> 
            <CountryInfo
            capital = {capital} 
            area = {area}
            languages = {languages}
            flag = {flag}/>
            </div>
        ) : 
            (<Countries countriesToShow={countriesToShow.slice(0,10)}/>)}
        {countriesToShow.length > 10 ? notification : ""}
        <div>
        </div>
        </div>
    );
}

export default App;
