import React, {useState} from 'react'
import {addProductRequest} from '../fetchRequests'
import {ADDAPRODUCT, useStore} from '../store/store'


function AddProduct (props) {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        stock: 0,
        shortDesc: "",
        description: ''
    })
    const dispatch = useStore((state) => state.dispatch)
    const user = useStore((state) => state.user)

    const saveProduct = (e) => {
        e.preventDefault()
        addProductRequest(formData, user.token).then((res) => dispatch({type: ADDAPRODUCT, payload: res}))
    }


    const handleChange = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        setFormData((state) => ({...state, [inputName]:inputValue}))
    }

    return (
        <>
        <h4>

        AddProduct
        </h4>
        <form onSubmit={saveProduct}>
        <div>
            <label htmlFor='name'>Product Name :</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor='price'>Price :</label>
            <input
            type="number"
            name='price'
            value={formData.price}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="stock">Available in Stock :</label>
            <input 
            type="number"
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="shortdesc">Short Description :</label>
            <input
            type="text"
            name="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            required 
            />
        </div>
        <div>
            <label htmlFor="description">Description :</label>
            <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required 
            />
        </div>
        <button type='submit'>Submit Product</button>
        </form>
        </>
    )
}

export default AddProduct