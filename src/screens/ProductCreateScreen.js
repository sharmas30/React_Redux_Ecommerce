import React, { useRef } from 'react'
import { useState } from 'react/cjs/react.development'
import "../css/ProductCreateScreen.css"
import fire from '../config/fire';
import { getDatabase, ref, set, onValue } from "firebase/database";
import {ref as sRef, getStorage, uploadBytesResumable, uploadString, getDownloadURL} from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SampleImageModal from './SampleImageModal';
import LoaderComponent from './LoaderComponent';
import { getUserInfo } from '../localStorage';
import { useHistory } from 'react-router-dom';

var files = [];
var imgFile;
var prgs = null;
var imageURL;
// var sampleImageURL = [];

const ProductCreateScreen = () => {
    const [image, setImage] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [productDetails, setProductDetails] = useState({
        productName: '',
        productBrand: '',
        productCategory: '',
        productPrice: '',
        ProductCount: '',
    })
    const [progress, setProgress] = useState(0);
    const [progressState, setProgressState] = useState('');
    const [sampleImageStatus, setSampleImageStatus] = useState(false);
    const [sampleImageData, setSampleImageData] = useState(null);

    const [productCreateLoader, setproductCreateLoader] = useState(false);
    const history = useHistory();
    
    const childCompRef = useRef()

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
        e.preventDefault();
        if(image){
            setproductCreateLoader(true);
            var product_id = sampleImageData.imageId;
            var sampleImageURL = sampleImageData.arrayOfImage;
            debugger

            const metadata = {
                contentType: 'image/jpeg',
            };

            // ****** Image Upload Task Start ******* //

            const storage = getStorage();
            const storageRef = sRef(storage, 'images/' + product_id + ".png");

            const uploadTask = uploadBytesResumable(storageRef, files[0]);

            // sampleImageURL = childCompRef.current.uploadSampleImage(product_id)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    prgs = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(prgs <= 100){
                        setProgress(prgs);
                        setProgressState("Uploading...")
                    }
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
                            productId : product_id,
                            productName : productDetails.productName,
                            productBrand : productDetails.productBrand,
                            productCategory : productDetails.productCategory,
                            productPrice : productDetails.productPrice,
                            ProductCount : productDetails.ProductCount,
                            Productimage : imageURL,
                            ProductSampleImage : sampleImageURL
                        })
                        setproductCreateLoader(false)
                        toast.success("Product Created Successfully",
                        {position: toast.POSITION.TOP_CENTER});
                })},
                
            );
        }
        else{
            toast.error("Please Upload Image",
            {position: toast.POSITION.TOP_CENTER});
        }
    }       

    const closeModal = (uploadSTatus) => {
        setModalState(false)
        setSampleImageStatus(uploadSTatus)
    }

    const sampleImageDataFunction = (data) => {
        console.log(data)
        setSampleImageData(data);
        console.log("IIIIIIIIIUUUU", sampleImageData);
        setModalState(false)
        setSampleImageStatus(true)
    }

    if(!getUserInfo().isAdmin)
        history.push('/');

    return (
        <>
            <div className=' row '> 
            <ToastContainer /> 
                <div className='col-lg-12 col-12 productCreateCard' >
                    <div className='productCreateDetails productCreateDetails_1'>
                        <SampleImageModal 
                            show = {modalState}
                            handleClose = {closeModal} 
                            parentImage = {files[0]}
                            sampleImageDataFunction = {sampleImageDataFunction}
                            ref = {childCompRef}
                        />
                        <form>
                            { productCreateLoader ? <LoaderComponent /> : "" }
                            <ul className='productCreateformDetails'>
                                <li>
                                    <h1>Create Product</h1>
                                </li>
                                
                                <li>
                                    <label >Product Name</label>
                                    <input type='text' name='fname' value={productDetails.productName} onChange={(e)=> setProductDetails({...productDetails, productName: e.target.value})} required />
                                </li>

                                <li className='imageFile'>
                                    <img src={image} alt = "image" />
                                </li>
                                <div className="chooseFile">
                                    <input type="file" onChange={onImageChange} />
                                </div>
                                <li>
                                    <h4>{progressState} <span> </span>{progress.toFixed(1)} %</h4>
                                </li>

                                {
                                    image 
                                    ?   <li className='uploadSampleImageProductCreate sampleImageParentBtn'>
                                            <button type="button" onClick={()=>setModalState(true)}><span>Upload Sample Image</span></button>
                                        </li>
                                    : ""
                                }

                                {
                                    sampleImageStatus ?
                                    <li className='sampleImageStatusModal'>
                                        <h3> Sample Image Uploaded Successfully</h3>
                                    </li>
                                    : ""
                                }

                                <li>
                                    <label>Product Price</label>
                                    <input type='text' name='Product_Price' value={productDetails.productPrice} onChange={(e)=> setProductDetails({...productDetails, productPrice: e.target.value})} required/>
                                </li>

                                <li>
                                    <label>Product Brand</label>
                                    <input type="text" name="Product_Brand" value={productDetails.productBrand} onChange={(e)=> setProductDetails({...productDetails, productBrand: e.target.value})} required />
                                </li>

                                <li>
                                    <label>Category</label>
                                    <input type='text' name='Category' value={productDetails.productCategory} onChange={(e)=> setProductDetails({...productDetails, productCategory: e.target.value})} required />
                                </li>

                                <li>
                                    <label>Count in Stock </label>
                                    <input type="number" name="Product_Count" value={productDetails.ProductCount} onChange={(e)=> setProductDetails({...productDetails, ProductCount: e.target.value})} required />
                                </li>
                                
                                <li>
                                    {
                                        sampleImageStatus 
                                        ? <button type='submit' className='shippingContinue' onClick={(e)=>uploadPictureDetails(e)} >Submit </button>
                                        : ""
                                    }
                                </li>

                            </ul>
                        </form>
                        
                    </div>
                </div>
           </div>
          
        </>
    )
}

export default ProductCreateScreen
