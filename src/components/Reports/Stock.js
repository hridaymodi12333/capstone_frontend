import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'

function Stock() {
    const [productList, setProductList] = useState([])
    const {token} = useContext(UserContext)
    useEffect(() => {
        fetch(`http://localhost:9000/admin/products/read-all`, {headers: {"token": token}}).then(res => res.json()).then(result => {
            console.log(result)
            setProductList(result)
        })
    }, [])
    return (
        <div>
            <h1 >Stock Report</h1>
            
            <table className="table table-hover my3">
                <thead>
                    <tr>
                        <th scope="col">Product Id</th>
                        <th scope="col">Product Name</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Status</th>

                        </tr>
                        </thead>
                        <tbody>

                            {productList.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product._id}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.companyName}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.stock<10?"Need to mail":""}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>


                </div>
                )
}

                export default Stock
