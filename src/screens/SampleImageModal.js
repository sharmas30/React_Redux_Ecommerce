import React, {forwardRef, useImperativeHandle, useState } from 'react'
import "../css/SampleImageModal.css"
import fire from '../config/fire';
import {ref as sRef, getStorage, uploadBytesResumable, uploadString, getDownloadURL} from "firebase/storage";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserInfo } from '../localStorage';
import { useHistory } from 'react-router-dom';

var files_1 = [];
var files_2 = [];
var files_3 = [];
var arrayOfImages = []
var arrayOfImageURL = []
var prgs_1 = null;
var prgs_2 = null;
var prgs_3 = null;
var productId = null;
var data = null;

const SampleImageModal = forwardRef((props, ref) => {

    const [image_1, setImage_1] = useState(null);
    const [image_2, setImage_2] = useState(null);
    const [image_3, setImage_3] = useState(null);

    const [progress_1, setProgress_1] = useState(0);
    const [progress_2, setProgress_2] = useState(0);
    const [progress_3, setProgress_3] = useState(0);

    const [sampleImages, setsampleImages] = useState([]);
    const history = useHistory();

    const onSampleImageChange_1 = (e) => {
        e.preventDefault();
        files_1 = e.target.files;
        if(e.target.files[0]) {
            const objURL = URL.createObjectURL(files_1[0])
            console.log("URLL__1 ", objURL);
            setImage_1(URL.createObjectURL(files_1[0]));
        }
    }

    const onSampleImageChange_2 = (e) => {
        e.preventDefault();
        files_2 = e.target.files;
        if(e.target.files[0]) {
            const objURL = URL.createObjectURL(files_2[0])
            console.log("URLL__2 ", objURL);
            setImage_2(URL.createObjectURL(files_2[0]));
        }
    }

    const onSampleImageChange_3 = (e) => {
        e.preventDefault();
        files_3 = e.target.files;
        if(e.target.files[0]) {
            const objURL = URL.createObjectURL(files_3[0])
            console.log("URLL__3 ", objURL);
            setImage_3(URL.createObjectURL(files_3[0]));
        }
    }

    // useImperativeHandle(ref, () => ({
        
        const uploadSampleImage = () =>{

            if(!files_1[0] || !files_2[0] || !files_3[0]){
                toast.error("Please Upload All Sample Images",
                {position: toast.POSITION.TOP_CENTER});
                return;
            }

            arrayOfImageURL = [];

            if(image_1){
                arrayOfImages.push(files_1[0]);
            }else{
                arrayOfImages.push(props.parentImage);
            }

            if(image_2){
                arrayOfImages.push(files_2[0]);
            }else{
                arrayOfImages.push(props.parentImage);
            }
            
            if(image_3){
                arrayOfImages.push(files_3[0]);
            }else{
                arrayOfImages.push(props.parentImage);
            }
        
        // ****** Image Upload Task Start ******* //

            var d = new Date();
            var n = d.toISOString();
            var id = n.split(':')[0] + n.split(':')[1] + n.split(':')[2].slice(0, 6)
            productId = id.replace(/-/g, '').replace('.', '').replace('T', '');

            const metadata = {
                contentType: 'image/png',
            };        

            const storage = getStorage();
            const storageRef_1 = sRef(storage, "images/" + `${productId}_1` + ".png");
            const storageRef_2 = sRef(storage, "images/" + `${productId}_2` + ".png");
            const storageRef_3 = sRef(storage, "images/" + `${productId}_3` + ".png");
                
            const uploadTask_1 = uploadBytesResumable(storageRef_1, files_1[0], metadata);
            const uploadTask_2 = uploadBytesResumable(storageRef_2, files_2[0], metadata);
            const uploadTask_3 = uploadBytesResumable(storageRef_3, files_3[0], metadata);

            console.log("EEEEE__ ", uploadTask_1);

            uploadTask_1.on(
                "state_changed",
                (snapshot) => {
                    prgs_1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(prgs_1 <= 100){
                        console.log("FFFFFF___ 1", prgs_1);
                        setProgress_1(prgs_1.toFixed(1));
                    }
                },
                (error)=>{
                    toast.error("Please Upload Image Again",
                    {position: toast.POSITION.TOP_CENTER});
                },
                () => {
                    getDownloadURL(uploadTask_1.snapshot.ref).then((downloadURL)=>{
                        const imageURL = downloadURL;
                        arrayOfImageURL.push(imageURL);
                        setsampleImages(imageURL)
                        console.log("URLLLLL______1", downloadURL);
                    })
                },                
            );

            uploadTask_2.on(
                "state_changed",
                (snapshot) => {
                    prgs_2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(prgs_2 <= 100){
                        console.log("FFFFFF___ 2", prgs_2);
                        setProgress_2(prgs_2.toFixed(1));
                    }
                },
                (error)=>{
                    toast.error("Please Upload Sample Image Again",
                    {position: toast.POSITION.TOP_CENTER});
                },
                () => {
                    getDownloadURL(uploadTask_2.snapshot.ref).then((downloadURL)=>{
                        const imageURL = downloadURL;
                        arrayOfImageURL.push(imageURL);
                        setsampleImages(imageURL)
                        console.log("URLLLLL______2", downloadURL);
                    })
                },                
            );

            uploadTask_3.on(
                "state_changed",
                (snapshot) => {
                    prgs_3 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(prgs_3 <= 100){
                        console.log("FFFFFF___ 3", prgs_3);
                        setProgress_3(prgs_3.toFixed(1));
                    }
                },
                (error)=>{
                    toast.error("Please Upload Image Again",
                    {position: toast.POSITION.TOP_CENTER});
                },
                () => {
                    getDownloadURL(uploadTask_3.snapshot.ref).then((downloadURL)=>{
                        const imageURL = downloadURL;
                        arrayOfImageURL.push(imageURL);
                        setsampleImages(imageURL)
                        console.log("URLLLLL______3", downloadURL);
                    })
                },                
            );
                    
        return arrayOfImageURL;
    }

    if(!getUserInfo().isAdmin)
        history.push('/');
    
    return (
        <div className={props.show? "sampleImageModal display_block" : "sampleImageModal display_none"}>
            <section className='modal_main'>
                <div className='closeModal'>
                    <i className="fa fa-close" onClick={ ()=>props.handleClose(false) } ></i>
                </div>
                <h2>
                    Welcome to shubh World
                </h2>

                <div className='sampleImage'>
                    <div className='sampleimageFile sample_1'>
                        <img src={image_1} alt="image 1"/>
                        <div>
                            <input type="file" onChange={onSampleImageChange_1} /> 
                        </div>
                        <div className='sampleImageProgress'>
                            <h4>{progress_1} %</h4>
                        </div>
                    </div>

                    <div className='sampleimageFile sample_2'>
                        <img src={image_2}  alt="image 2"/>
                        <div>
                            <input type="file" onChange={onSampleImageChange_2} /> 
                        </div>
                        <div className='sampleImageProgress'>
                            <h4>{progress_2} %</h4>
                        </div>
                    </div>

                    <div className='sampleimageFile sample_3'>
                        <img src={image_3} alt="image 3" />
                        <div>
                            <input type="file" onChange={onSampleImageChange_3} />  
                        </div>
                        <div className='sampleImageProgress'>
                            <h4>{progress_3} %</h4>
                        </div>
                    </div>
                </div>
                <div className='sampleImageUploadModal'>
                    {
                        progress_1 > 1 && progress_1 <= 100 || progress_2 > 1 && progress_2 <= 100  || progress_3 > 1 && progress_3 <= 100 
                        ? arrayOfImageURL.length < 3 ? <div className='imageUploadStatus'><span>Please wait...</span></div> : ''
                        : ""
                    }
                    { progress_1 == 100 && progress_2 == 100 && progress_3 == 100 && arrayOfImageURL.length == 3
                        ? <button type='submit' className='imageSaveBtn' onClick={()=>{
                            data = {
                                arrayOfImage : arrayOfImageURL,
                                imageId : productId
                                }
                            props.sampleImageDataFunction(data)
                        }
                        
                        }><span>Click On Save</span></button> 
                        : <button type='submit' onClick={uploadSampleImage} >Upload Images</button>      
                    }
                </div>
            </section>
        </div>
    )
})

export default SampleImageModal
