import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'

function BulkUpload() {
    const [csvData, setCsvData] = useState("")
    const {token} = useContext(UserContext)


    const handleCsvDataChange = (e)=>{
        console.log(e.target.value)
        setCsvData(e.target.value)
    }


    const uploadProducts = ()=>{
        fetch('http://localhost:9000/admin/products/bulk-upload',{method: 'POST',headers:{'Content-Type':'application/json', "token": token},body: JSON.stringify({data: csvData.replace(/, /g,",")})}).then(res=>res.json()).then(result=>{
            console.log(result)
        })
    }
  return (
    <div className='container'>
      bulk
      <textarea className="form-control" aria-label="With textarea" style={{resize:"none", height:"300px"}} onChange={handleCsvDataChange} value={csvData}></textarea>
      <button className="btn btn-primary" onClick={uploadProducts} >Upload Products</button>

    </div>
  )
}

export default BulkUpload
