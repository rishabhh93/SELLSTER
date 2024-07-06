import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context';
import{ nanoid } from "nanoid";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Create() {
    const navigate =useNavigate();
    const [products,setproducts] = useContext(ProductContext);
    const [title ,settitle] = useState("");
    const [image ,setimage] = useState("");
    const [category ,setcategory] = useState("");
    const [price ,setprice] = useState("");
    const [description,setdescription]=useState("");

    const addProductHandler = (e)=>{
        e.preventDefault();
        if(title.trim().length <1 ||  image.trim().length <1 || category.trim().length <1 || price.trim().length <1 || description.trim().length <1 ){
            alert("Please fill all the fields(atleast 1 character in every field)");
            return;
        }
        const product = {
            id:nanoid(),
            title,
            image,
            category,
            price,
            description,
        }
        setproducts([...products,product]);
        localStorage.setItem("product",JSON.stringify([...products,product]));

        toast.success("Product added successfully!");
        navigate("/");
    }



  return (
    <form onSubmit={addProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='text-3xl w-1/2 mb-5'>Add New Product</h1>
        <input type="text" placeholder='title' className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-1/2' onChange={(e)=> settitle(e.target.value)}
        value={title} />

        <input type="url" placeholder='image link' className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-1/2' onChange={(e)=> setimage(e.target.value)}
        value={image} />

        <div className='w-1/2 flex justify-between'>
                <input type="text" placeholder='category' className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-[48%]' onChange={(e)=> setcategory(e.target.value)}
                value={category} />

                <input type="number" placeholder='price' className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-[45%]' onChange={(e)=> setprice(e.target.value)}
                value={price} />
        </div>
        <textarea placeholder='enter product description here' className='text-2xl mb-3 bg-zinc-100 rounded p-3 w-1/2' rows="10" onChange={(e)=> setdescription(e.target.value)}
                value={description} ></textarea>
         <button  className='w-fit p-2 h-10 bg-green-700 text-white rounded-full mb-5 text-center hover:scale-105 '>Add Product</button>
        
    </form>
  )
}

export default Create