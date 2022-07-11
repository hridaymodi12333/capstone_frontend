import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'

function UserDelete() {
    const {token} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const handleUsernameChange = (e)=>{
        setUsername(e.target.value)
    }


    const deleteUser = ()=>{
        fetch(`http://localhost:9000/admin/users/delete/${username}`,{method:'DELETE', headers:{"token": token}}).then(res=>res.json()).then(result=>{
            console.log(result)
        })
    }
    return (
        <div>
            {/* Delete User */}
            <div className="container">
                <h3 className="textHeadStyle">Delete a user </h3>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleUsernameChange} value={username} />
                        <label htmlFor="floatingInput">Username</label>
                    </div>



                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={deleteUser}>Delete</button>
                </form>
            </div>
        </div>
    )
}

export default UserDelete
