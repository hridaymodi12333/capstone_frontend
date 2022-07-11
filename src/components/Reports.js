import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import Sales from './Reports/Sales'
import Stock from './Reports/Stock'

function Reports() {
    const { isLogin, role } = useContext(UserContext)
    const [reportType, setReportType] = useState("sales")

    return (
        <>
            {isLogin && role === "admin" &&
                <div className="button-group">
                    <button className="btn btn-primary" onClick={()=>{setReportType("stock")}} >Stock Report</button>
                    <button className="btn btn-primary" onClick={()=>{setReportType("sales")}} >Sales Report</button>
                    {/* <button className="btn btn-primary" onClick={()=>{setCrudOption("update")}} >Update Account</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("delete")}} >Delete Account</button> */}
                </div>
            }

            {isLogin && role === "admin" && reportType === "stock" && <Stock></Stock>}
            {isLogin && role === "admin" && reportType === "sales" && <Sales></Sales>}
            {/* {isLogin && role === "admin" && crudOption === "read" && <UserRead></UserRead>}
            {isLogin && role === "admin" && crudOption === "update" && <UserUpdate></UserUpdate>}
            {isLogin && role === "admin" && crudOption === "delete" && <UserDelete></UserDelete>} */}

        </>
    )
}

export default Reports
