import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import BulkUpload from './ProductsCrudComponents/BulkUpload'
import ProductCreate from './ProductsCrudComponents/ProductCreate'
import ProductDelete from './ProductsCrudComponents/ProductDelete'
import ProductRead from './ProductsCrudComponents/ProductRead'
import ProductUpdate from './ProductsCrudComponents/ProductUpdate'
import Stock from './Reports/Stock'

function ProductCRUD() {
    // const { isLogin, role } = useContext(UserContext)

    const { isLogin, role } = useContext(UserContext)
    const [crudOption, setCrudOption] = useState("read")
    return (
        <>
            {isLogin && role === "admin" &&
                <div className="button-group">
                    <button className="btn btn-primary" onClick={() => { setCrudOption("bulk") }} >Bulk Upload</button>
                    <button className="btn btn-primary" onClick={() => { setCrudOption("create") }} >Create New Product</button>
                    <button className="btn btn-primary" onClick={() => { setCrudOption("read") }} >Show Products</button>
                    <button className="btn btn-primary" onClick={() => { setCrudOption("update") }} >Update Product</button>
                    <button className="btn btn-primary" onClick={() => { setCrudOption("delete") }} >Delete Product</button>
                </div>
            }

            {isLogin && role === "admin" && crudOption === "bulk" && <BulkUpload></BulkUpload>}
            {isLogin && role === "admin" && crudOption === "create" && <ProductCreate></ProductCreate>}
            {isLogin && role === "admin" && crudOption === "read" && <Stock></Stock>}
            {isLogin && role === "admin" && crudOption === "update" && <ProductUpdate></ProductUpdate>}
            {isLogin && role === "admin" && crudOption === "delete" && <ProductDelete></ProductDelete>}

        </>
    )

}

export default ProductCRUD
