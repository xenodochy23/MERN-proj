import React, {useEffect, useState} from  'react';
import axios from 'axios';
import {Link, navigate} from "@reach/router";
import DeleteProduct from  "./DeleteProduct";

const ProductDetails = (props) =>{
    const [products, setProduct] = useState({});
    //need useEffect and axios to communicate to database server
    useEffect(() => {
        axios.get("http://localhost:8000/api/products/" + props.id)
        .then((res) =>{
            console.log(res.data);
            setProduct(res.data); //set state from API
        })
        .catch((err) => {
            console.log(err);
        });
    },[props.id]);
    
    const afterDelete =() =>{
        navigate("/products/");
    };
    return(
        <div>
            <h1>Product Details</h1>   
            <p>Title: {products.title}</p>
            <p>Price: ${products.price}</p>
            <p>Description: {products.description}</p>
            <Link to={"/products/"}>
                        <input type="submit" value="Back"/>
            </Link>
            <Link to={"/products/" + props.id + "/edit"}>
                        <input type="submit" value="Edit"/>
            </Link>
            <DeleteProduct  id={props.id } afterDelete= {afterDelete} />
        </div>
    )
}

export default ProductDetails;