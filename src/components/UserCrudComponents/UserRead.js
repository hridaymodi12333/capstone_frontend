import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import UserContext from '../../context/UserContext/UserContext'

function UserRead() {
    const {token} = useContext(UserContext)
    const [userData, setUserData] = useState([])

    useEffect(() => {
        // fetch(`http://localhost:9000/admin/users/read-all`)
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log(result)
        //         setUserData(result)
        //     })

        axios.get(`http://localhost:9000/admin/users/read-all`, {headers:{"token": token}}).then(res => {
            console.log(res.data)
            setUserData(res.data)
        }).catch(err => { console.log(err) })
    }, [])
    return (
        <div>
            Read User
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => {
                        return (
                            <tr key={user.username}>
                                <th scope="row">{index+1}</th>
                                <td>{user.username}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    )
}

export default UserRead
