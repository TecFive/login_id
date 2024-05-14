import React from "react"

const HomePage = () => {
    const logout =() =>{
        localStorage.clear("token")
    }

    return(
        <>
            <h1>Home</h1>
            <button onClick={logout}>Log out</button>
        </>
    )
}

export default HomePage

