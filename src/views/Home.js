import React, { useState } from 'react'

import { useStore } from '../store/store'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import ProductList from './ProductList'

function Home (props) {
    const user = useStore((state) => state.user)
    const [active, setActive] = useState(true)

    return (
        <>
        {!user ? (
        <>
        {active ? (
            <>
            <Login />
            </>
            ) : (
            <>
            <SignUp />
            </>
            )}
        <button onClick={setActive(!active)}>{active? "Don't have an Account yet? Sign up here." : "Already have an account? Go back to Login."}</button>
        </>
        ) : (
            <>
            <ProductList />
            </>
        )}
        </>
    )
}

export default Home