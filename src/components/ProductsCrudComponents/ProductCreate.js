import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/UserContext/UserContext'

function ProductCreate() {
    const {token} = useContext(UserContext)
    const [productName, setProductName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [price, setPrice] = useState(0)
    const [tags, setTags] = useState([])
    const [stock, setStock] = useState(0)
    // const [contact, setContact] = useState(0)
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')


    const handleProductNameChange = (e) => {
        setProductName(e.target.value)
    }
    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value)
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }
    const handleTagsChange = (e) => {
        setTags(e.target.value)
    }
    const HandleStockChange = (e) => {
        if (e.target.value !== 'e') {
            setStock(e.target.value)
        }
    }
    

    const createProduct = () => {
        const productObj = {
            productName: productName.toLowerCase(),
            companyName: companyName.toLowerCase(),
            price: price,
            tags: tags.toLowerCase().replace(/, /g,",").split(","),
            stock: stock
        }
        console.log(productObj)
        fetch(`http://localhost:9000/admin/products/create-one`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(productObj)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
            })
    }



    return (
        <div>
            {/* Create User */}

            {/* <form className="d-flex container" role="search">
                <input className="form-control me-2 search_box" type="search" placeholder="Search" aria-label="Search" value={"searchValue"} onChange={() => { }} />
                <NavLink to={`/category/${"searchValue"}`}><button className="btn btn-primary" type="submit">Search</button></NavLink>
            </form> */}




            <div className="container">
                <h3 className="textHeadStyle">Create Product </h3>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleProductNameChange} value={productName} />
                        <label htmlFor="floatingInput">Product Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleCompanyNameChange} value={companyName} />
                        <label htmlFor="floatingInput">Company Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handlePriceChange} value={price} />
                        <label htmlFor="floatingInput">Price</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" placeholder="name@example.com" onChange={handleTagsChange} value={tags} />
                        <label htmlFor="floatingInput">Tags</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" placeholder="name@example.com" onChange={HandleStockChange} value={stock} pattern="^[0-9]*$" />
                        <label htmlFor="floatingInput">Stock</label>
                    </div>

                    

                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={createProduct}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default ProductCreate
