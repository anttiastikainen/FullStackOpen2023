const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
return( 
    <form onSubmit = {handleSubmit}>
        <div>
            username
            <input
            value={username}
            onChange={handleUsernameChange}
        />
    </div>
    <div>
        password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
        />
        </div>
        <button type="submit">login</button>
    </form>
    ) 
}

export default LoginForm
