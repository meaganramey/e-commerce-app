import React from 'react'
import {Link} from 'react-router-dom'

import {useStore} from '../store/store'


function NavBar (props) {
    const cart = useStore((state) => state.cart)

    const handleLogout = () => {

    }

    return (
        <>
        <Link to='/'>Home</Link>
        <Link to='/products'>Products</Link>
        <Link to='/add-product'>Add Product</Link>
        <Link to='/cart'>Cart <span>{cart.length}</span>
        </Link>
        <Link to='/login'>Login</Link>
        <Link to='/' onClick={handleLogout}>Logout</Link>
        </>
    )
}

export default NavBar