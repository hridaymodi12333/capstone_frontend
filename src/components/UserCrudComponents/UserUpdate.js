import React, { useContext, useState } from 'react'
import axios from "axios"
import UserContext from '../../context/UserContext/UserContext'

function UserUpdate() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState('')
    const [contact, setContact] = useState(0)

    const userData = useContext(UserContext)


    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleContactChange = (e) => {
        if (e.target.value !== 'e') {
            setContact(e.target.value)
        }
    }
    const handleUserTypeChange = (e) => {
        if (e.target.value !== 'e') {
            setUserType(e.target.value.toLowerCase())
        }
    }

    const searchUser = () => {
        axios.get(`http://localhost:9000/admin/users/username/${name}`, {headers:{"token": userData.token}}).then(res => {
            console.log(res.data)
            setUsername(res.data.username)
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setEmail(res.data.email)
            setContact(res.data.phone)
            setUserType(res.data.role)
        })
    }


    const updateUser = () => {
        const data = {
            // username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: contact,
            role: userType
        }
        console.log(JSON.stringify(data))

        fetch(`http://localhost:9000/admin/users/update/${name}`,{method:'PUT', headers:{'Content-Type': 'application/json', "token": userData.token},body:JSON.stringify(data)}).then(res=>res.json()).then(result=>{
            console.log(result)
        })

     
    }

return (
    <div>
        {/* Update User */}
        <div className='container'>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" placeholder="name@example.com" onChange={handleNameChange} value={name} />
                <label htmlFor="floatingInput">Username</label>
            </div>

            <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={searchUser}>Search</button>
        </div>


        <div className="container">
            <h3 className="textHeadStyle">Update a user </h3>
            <form>
                {/* <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="name@example.com" onChange={handleUsernameChange} value={username} />
                    <label htmlFor="floatingInput">Username</label>
                </div> */}

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="name@example.com" onChange={handleFirstNameChange} value={firstName} />
                    <label htmlFor="floatingInput">First Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="name@example.com" onChange={handleLastNameChange} value={lastName} />
                    <label htmlFor="floatingInput">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" placeholder="name@example.com" onChange={handleEmailChange} value={email} />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" placeholder="name@example.com" onChange={handleContactChange} value={contact} pattern="^[0-9]*$" />
                    <label htmlFor="floatingInput">Contact Number</label>
                </div>

                {/* <div className="form-floating mb-3">
                        <input type="password" className="form-control" placeholder="Password" onChange={handlePasswordChange} value={password} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" placeholder="Password" onChange={handleConfirmPasswordChange} value={confirmPassword} />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div> */}

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="User Type" onChange={handleUserTypeChange} value={userType} />
                    <label htmlFor="floatingInput">User Type</label>
                </div>




                <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={updateUser}>Update</button>
            </form>
        </div>
    </div>
)
}

export default UserUpdate
