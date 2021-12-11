import React from 'react'
import { useState } from 'react/cjs/react.development'
import "../css/ProductCreateScreen.css"
import fire from '../config/fire';
import {ref as sRef, getStorage, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var files = [];
var imgFile;
var prgs = null;
var imageURL;

const ProductCreateScreen = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({})
    const [progress, setProgress] = useState(0);
    const [progressState, setProgressState] = useState('');

    const onImageChange = (e) => {
        e.preventDefault();
        files = e.target.files;
        if(e.target.files[0]) {
            const objURL = URL.createObjectURL(files[0])
            console.log("URLL ", objURL);
            imgFile = files[0]
            setImage(URL.createObjectURL(files[0]));
        }
    }

    const uploadPictureDetails = (e) => {
            var d = new Date();
            var n = d.toISOString();
            var id = n.split(':')[0] + n.split(':')[1] + n.split(':')[2].slice(0, 6)
            var product_id = id.replace(/-/g, '').replace('.', '').replace('T', '');

            console.log("SS__1 ", product_id);

            const metadata = {
                contentType: 'image/jpeg',
            };

            const storage = getStorage();
            const storageRef = sRef(storage, 'images/' + product_id + ".png");

            const uploadTask = uploadBytesResumable(storageRef,files[0], metadata)

            uploadTask.on(
                "state_changed",
                function(snapshot) {
                    prgs =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if(prgs <= 100)
                            setProgress(prgs);
                            setProgressState("Uploading...")
                },
                (error)=>{
                    toast.error("Please Upload Image Again",
                    {position: toast.POSITION.TOP_CENTER});
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        imageURL = downloadURL;
                        console.log(" downloadURL ", downloadURL);

                        const db = getDatabase();
                        set(ref(db, 'allProducts/' + product_id), {
                            productId: product_id,
                            productName: productDetails.productName,
                            productBrand: productDetails.productBrand,
                            productCategory: productDetails.productCategory,
                            productPrice: productDetails.productPrice,
                            Productimage: imageURL,
                        })
                        toast.success("Product Created Successfully",
                        {position: toast.POSITION.TOP_CENTER});
                })},
                
            );
    }       

    return (
        <>
            <div className=' row '> 
            <ToastContainer /> 
                <div className='col-lg-12 col-12 productCreateCard' >
                    <div className='productCreateDetails productCreateDetails_1'>
                        <ul className='productCreateformDetails'>
                            <li>
                                <h1>Create Product</h1>
                            </li>
                            
                            <li>
                                <label >Product Name</label>
                                <input type='text' name='fname' value={productDetails.productName} onChange={(e)=> setProductDetails({...productDetails, productName: e.target.value})} required />
                            </li>

                            <li className='imageFile'>
                                <img src={image}  />
                            </li>
                            <div className="chooseFile">
                                <input type="file" onChange={onImageChange} />
                            </div>

                            <li>
                                <h4>{progressState} <span> </span>{progress} %</h4>
                            </li>

                            <li>
                                <label>Product Price</label>
                                <input type='text' name='Product_Price' value={productDetails.productPrice} onChange={(e)=> setProductDetails({...productDetails, productPrice: e.target.value})} required='required' />
                            </li>

                            <li>
                                <label>Product Brand</label>
                                <input type="text" name="Product_Brand" value={productDetails.productBrand} onChange={(e)=> setProductDetails({...productDetails, productBrand: e.target.value})} required='required' />
                            </li>

                            <li>
                                <label>Category</label>
                                <input type='text' name='Category' value={productDetails.productCategory} onChange={(e)=> setProductDetails({...productDetails, productCategory: e.target.value})} required='required' />
                            </li>

                            <li>
                                <button type='submit' className='shippingContinue' onClick={(e)=>uploadPictureDetails(e)} >Submit </button>
                            </li>

                        </ul>
                    </div>
                </div>
           </div>
          
        </>
    )
}

export default ProductCreateScreen
