import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'

function ProductDelete() {

    const {token} = useContext(UserContext)
    const [id, setId] = useState("")
    const handleIdChange = (e)=>{
        setId(e.target.value)
    }

    const deleteProduct = ()=>{
        fetch(`http://localhost:9000/admin/products/delete/${id}`,{method:'DELETE', headers:{"token": token}}).then(res=>res.json()).then(result=>{
            console.log(result)
        })
    }
    return (
        <div>
            {/* Delete User */}
            <div className="container">
                <h3 className="textHeadStyle">Delete Product </h3>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleIdChange} value={id} />
                        <label htmlFor="floatingInput">Product ID</label>
                    </div>



                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={deleteProduct}>Delete</button>
                </form>
            </div>
        </div>
    )
}

export default ProductDelete
