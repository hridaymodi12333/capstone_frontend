import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import TokenContext from '../context/tokenContext/tokenContext';
import Card from './Card'
import "./CSS/gallery.css"

function Gallery() {
    const { loginToken } = useContext(TokenContext)
    const { categoryValue } = useParams();
    const [productData, setProductData] = useState([]);
    const location = useLocation()
    const [sortOption, setSortOption] = useState("name-a");
    // console.log(categoryValue)
    useEffect(() => {
        if (location.pathname === '/') {

            fetch(`http://localhost:9000/user/products/tags/featured`).then(res => res.json()).then(result => {
                setProductData(result);
                console.log(result)
            })
            // axios.get(`http://localhost:9000/user/products/tags/all`).then(result => {
            //     setProductData(result);    
            //     console.log(result)
            //     })
        }
        else {
            // axios.get(`http://localhost:9000/user/products/tags/${categoryValue.toLowerCase()}`).then(result => {
            //     setProductData(result);    
            //     console.log(result)
            //     })  
            fetch(`http://localhost:9000/user/products/tags/${categoryValue.toLowerCase()}`).then(res => res.json()).then(result => {

            if(sortOption === "name-d"){
                result.sort((a,b)=>{return (a.productName<b.productName? -1:1)})
            }
            else if(sortOption === "name-a"){
                result.sort((a,b)=>{return (a.productName<b.productName? 1:-1)})
            }
            if(sortOption === "price-d"){
                result.sort((a,b)=>{return (a.price<b.price? 1:-1)})
            }
            if(sortOption === "price-a"){
                result.sort((a,b)=>{return (a.price<b.price? -1:1)})
            }


                setProductData(result);
                console.log(result)
            })
        }
    }, [categoryValue, location.pathname, sortOption])

    // useEffect(() => {
    //     fetch(`http://localhost:8000/products/comfortable`).then(res => res.json()).then(result => {
    //     setProductData(result);    
    //     console.log(result)
    //     })
    // }, [])


    return (
        <>
            {categoryValue &&
                <div className='container'>
            <div>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("name-d")}} >Name: A - Z</button>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("name-a")}} >Name: Z - A</button>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("price-d")}} >Price: High to Low</button>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("price-a")}} >Price: Low to High</button>
                </div>
            </div>}
            {/* // <div className="row row-cols-1 row-cols-md-3 g-4 my-3 appWrapper galleryView"> */}
            <div className='appWrapper galleryView'>
                {/* {JSON.stringify(productData)} */}

                {productData.map((product) => {

                    return (
                        <Card key={product.productName} productValue={product}></Card>
                    )
                })}

            </div>
        </>
    )
}

export default Gallery
