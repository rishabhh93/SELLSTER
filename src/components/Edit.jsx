import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import { toast } from 'react-toastify';

function Edit() {
    const [products,setproducts] = useContext(ProductContext);
    const navigate =useNavigate();
    const {id} = useParams();
    const [product ,setproduct] = useState({
        title:" ",
        image:" ",
        category:" ",
        price:" ",
        description:" ",
    });
    const changeHandler = (e)=>{
        // console.log(e.target.name,e.target.value);
        setproduct({...product, [e.target.name]:[e.target.value]});
    }
    // const [title ,settitle] = useState("");
    // const [image ,setimage] = useState("");
    // const [category ,setcategory] = useState("");
    // const [price ,setprice] = useState("");
    // const [description,setdescription]=useState("");


    useEffect(()=>{
        setproduct(products.filter((p)=>p.id==id)[0]);
    },[id]);

    const addProductHandler = (e)=>{
        e.preventDefault();
        if(product.title.length <1 ||  
            product.image.length <1 || 
            product.category.length <1 || 
            product.price.length <1 || 
            product.description.length <1 ){
            alert("Please fill all the fields(atleast 1 character in every field)");
            return;
        }
        
        const pi = products.findIndex((p)=> p.id == id);
        const copyData=[...products];
        copyData[pi]={...products[pi],...product};
        setproducts(copyData);
        localStorage.setItem("products",JSON.stringify(copyData));
        toast.success("Product updated successfully");
        navigate(-1);
    };
  return (
    <form onSubmit={addProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='text-3xl w-1/2 mb-5'>Edit Product</h1>
        <input type="text" 
        placeholder='title' 
        className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-1/2' 
        name="title"
        onChange={changeHandler}
        value={product &&  product.title} />

        <input type="url" 
        placeholder='image link' 
        className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-1/2' 
        name="image"
        onChange={changeHandler}
        value={product && product.image} />

        <div className='w-1/2 flex justify-between'>
                <input type="text" 
                placeholder='category' 
                className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-[48%]' 
                name="category"
                onChange={changeHandler}
                value={product &&  product.category} />

                <input type="number" 
                placeholder='price' 
                className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-[45%]' 
                name="price"
                onChange={changeHandler}
                value={product &&  product.price} />
        </div>
        <textarea 
            placeholder='enter product description here' 
            className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-1/2' 
            rows="10" 
            name="description"
            onChange={changeHandler}
            value={product &&  product.description} ></textarea>
         <button  className='w-fit p-2 h-10 bg-green-700 text-white rounded-full mb-5 text-center hover:scale-105 '>Update Product</button>
        
    </form>
  )
}

export default Edit