const Country = ({ country , handleClick}) => {
    return (
        <li>
        {country.name}
        <button onClick={() => handleClick()}>{`show`}</button>
        </li>
    )
}

export default Country
