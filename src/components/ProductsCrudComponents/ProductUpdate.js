import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'
import axios from "axios"

function ProductUpdate() {
    const {token} = useContext(UserContext)
    const [productName, setProductName] = useState('')
    const [id, setId] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [price, setPrice] = useState(0)
    const [tags, setTags] = useState("")
    const [stock, setStock] = useState(0)

    const handleIdChange = (e) => {
        setId(e.target.value)
    }
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


    const searchProduct = () => {
        axios.get(`http://localhost:9000/admin/products/id/${id}`, { headers: { "token": token } }).then(res => {
            console.log(res.data)
            setProductName(res.data.productName)
            setCompanyName(res.data.companyName)
            setPrice(res.data.price)
            setTags(res.data.tags)
            setStock(res.data.stock)
            console.log(res.data.tags)
            
        })
    }


    const updateProduct = () => {
        const data = {
            productName: productName,
            companyName: companyName,
            price: price,
            tags: tags.toString().toLowerCase().replace(/, /g, ",").split(","),
            stock: stock
        }


        fetch(`http://localhost:9000/admin/products/update/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', "token": token }, body: JSON.stringify(data) }).then(res => res.json()).then(result => {
            console.log(result)
        })

        // axios.put(`http://localhost:9000/admin/users/update/${name}`, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        // })
        //     .then(result => {
        //         console.log(result.data)
        //     })
    }

    
    return (
        <div>
            {/* Update User */}

            <div className='container'>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="name@example.com" onChange={handleIdChange} value={id} />
                    <label htmlFor="floatingInput">Product ID</label>
                </div>

                <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={searchProduct}>Search</button>
            </div>

            <div className="container">
                <h3 className="textHeadStyle">Update Product</h3>
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

                   
                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={updateProduct}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default ProductUpdate
