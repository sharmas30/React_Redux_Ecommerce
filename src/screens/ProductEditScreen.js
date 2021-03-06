import React from 'react'
import { useEffect, useState} from 'react';
import "../css/ProductCreateScreen.css"
import fire from '../config/fire';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import {ref as sRef, getStorage, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../localStorage';
import { useHistory } from 'react-router-dom';
import LoaderComponent from './LoaderComponent';

var files = [];
var imgFile;
var prgs = null;
var imageURL;

const ProductEditScreen = () => {
    const [image, setImage] = useState({});
    const [updateLoader, setUpdateLoader] = useState(false);
    const [productDetails, setProductDetails] = useState({
        productName: '',
        productBrand: '',
        productCategory: '',
        productPrice: '',
        ProductCount: '',
    })
    const [progress, setProgress] = useState(0);
    const [progressState, setProgressState] = useState('');
    const param = useParams()
    const history = useHistory();

    useEffect(()=>{
        var userRef
        var userRefC2
        var userRefC3
        const db = getDatabase();
        const storage = getStorage();
        userRef = ref(db, `allProducts/${param.id}`);
        userRefC2 = ref(db, `allProductsCategory_2/${param.id}`);
        userRefC3 = ref(db, `allProductsCategory_3/${param.id}`);

        onValue(userRef, (snapshot) => {
            var data = snapshot.val();
            console.log("TTTTt___4444",data )
            if(data){
                setProductDetails(data);
                setImage(data.Productimage)
                files = [];
            }
        })

        onValue(userRefC2, (snapshot) => {
            var dataC2 = snapshot.val();
            console.log("TTTTt___5555", dataC2 )
            if(dataC2){
                setProductDetails(dataC2);
                setImage(dataC2.Productimage)
                files = [];
            }
        })

        onValue(userRefC3, (snapshot) => {
            var dataC3 = snapshot.val();
            console.log("TTTTt___5555", dataC3 )
            if(dataC3){
                setProductDetails(dataC3);
                setImage(dataC3.Productimage)
                files = [];
            }
        })
    },[])

    const onImageChange = (e) => {
        e.preventDefault();
        files = e.target.files;
        if(e.target.files[0]) {
            const objURL = URL.createObjectURL(files[0])
            console.log("URLL__EDITTTT ", objURL);
            imgFile = files[0]
            setImage(URL.createObjectURL(files[0]));
            console.log("URLL__EDITTTT_____222 ", files[0]);
        }
    } 

    const uploadPictureDetails = (e) => {
        e.preventDefault();
        setUpdateLoader(true);
        if(image){
    
            const metadata = {
                contentType: 'image/jpeg',
            };

            if(files[0]){  
            const storage = getStorage();
            const storageRef = sRef(storage, 'images/' + productDetails.productId + ".png");

            const uploadTask = uploadBytesResumable(storageRef, files[0]);
            console.log("CCCCCC___ ", uploadTask);
            console.log("TASKKKK___1 ", files[0]);

                console.log('IFFFFFFF___');
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
                                console.log(" downloadURL_BBB ", downloadURL);

                                const db = getDatabase();
                                update(ref(db, 'allProducts/' + productDetails.productId), {
                                    // productId: product_id,
                                    productName: productDetails.productName,
                                    productBrand: productDetails.productBrand,
                                    productCategory: productDetails.productCategory,
                                    productPrice: productDetails.productPrice,
                                    ProductCount : productDetails.ProductCount,
                                    Productimage: imageURL,
                                })
                                setUpdateLoader(false);
                                toast.success("Product Updated Successfully",
                                {position: toast.POSITION.TOP_CENTER});

                                setTimeout(() => {
                                    history.push(`/`);
                                }, 2700);
                            })},
                );
            }

            else if(!files[0]){
                console.log('ELSEEEEEE____');
                const db = getDatabase();
                update(ref(db, 'allProducts/' + productDetails.productId), {
                    // productId: product_id,
                    productName: productDetails.productName,
                    productBrand: productDetails.productBrand,
                    productCategory: productDetails.productCategory,
                    productPrice: productDetails.productPrice,
                    ProductCount : productDetails.ProductCount,
                })
                setUpdateLoader(false);
                toast.success("Product Updated Successfully",
                {position: toast.POSITION.TOP_CENTER});

                setTimeout(() => {
                    history.push(`/`);
                }, 2700);
            }
        }
        else{
            toast.error("Please Upload The Image",
            {position: toast.POSITION.TOP_CENTER});
        }
    }       

    if(!getUserInfo().isAdmin)
        history.push('/');

    return (
        <>
            <div className=' row '> 
            <ToastContainer /> 
                <div className='col-lg-12 col-12 productCreateCard' >
                    <div className='productCreateDetails productCreateDetails_1'>
                        <form>
                            { updateLoader ? <LoaderComponent /> : "" }
                            <ul className='productCreateformDetails'>
                                <li>
                                    <h1>Update Product</h1>
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
                                    <h4>{progressState} <span> </span>{progress.toFixed(1)} %</h4>
                                </li>


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
                                    <button type='submit' className='shippingContinue' onClick={(e)=>uploadPictureDetails(e)} >Update </button>
                                </li>

                            </ul>
                        </form>
                    </div>
                </div>
           </div>
          
        </>
    )
}

export default ProductEditScreen
