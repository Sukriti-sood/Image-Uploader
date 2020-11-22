import React, { useState, useRef, useEffect } from  "react";
import Loader from "./loader";
import axios from "axios";
function Uploader(){

    const[File,setFile]=useState([]);
    const[loading,setloading]=useState(false);
    const[error,setError]=useState(null)
    const [uploadurl,setuploadurl]=useState(null);
    const [copied, setCopied] = useState(false);
    const[imgsrc,setimg]=useState();

    const[isFile,setisFile]=useState(false);
    const fileinputref=useRef();
    const file2inputref=useRef();

    useEffect(()=>{
        if(isFile)
        {
            console.log("I am here")
            let url;
        const body=new FormData();
        body.append("image",File);
        
        console.log("I am here")
      setTimeout(()=>{
        try{

            console.log("I am here")
            var formData = new FormData();
            var imagefile = File;
            console.log(imagefile)
            formData.append("image", imagefile);
          console.log(formData.get("image"))
            axios.post( '/uploader', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
                    .then((res)=>{

            console.log("I am here")
                        if(res.status!==200)
                        setError("Error");
                        else
                        {
                        console.log(res);
                        url=res.url;
                        setuploadurl(url);
                        setimg(url);
                        setCopied(url)
                        setloading(false);
                        }
                    });
                }
                catch(err)
                {
                    setError(err.message);
                }
      },5000)
           

    }

    },[File,isFile])
function drop(ev)
{
    ev.preventDefault();

    const files = ev.dataTransfer.files;
    if(files.length)
    handleFile(files[0]);
    
}
const handleFile=(file)=>{
if(validateFile(file)){
setFile(file);

setloading(true);
setisFile(true);
console.log(file);
console.log(file.size);
}
else
setError('File type not permitted');
}

const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function fileInputClicked(){
    fileinputref.current.click();
}

const fileSelected = () => {
    if (fileinputref.current.files.length) {
        handleFile(fileinputref.current.files[0]);
    }
}
const file2selected = () => {
    if (file2inputref.current.files.length) {
        handleFile(file2inputref.current.files[0]);
    }
}

    return (
        <>
        <div className="app">

        {
            error?(
                <>
                <h1>Error:</h1>
                <p>{error}</p>
                </>
            ):!loading?(
                uploadurl?(
                    <div className="firstcard">
<h1> <i class="fa fa-check-circle" aria-hidden="true"></i></h1>
<h2>Uploaded Successfully</h2>
<img src={imgsrc} alt=""></img>
<span className="copy">
    <span contentEditable="false">{copied}</span>
    <button className="btn1 btn-primary">Copy Link</button>
</span>
</div>
                ):(
                    <div className="firstcard">
    <h2>Upload your image</h2>
    <p className="color"> Files should be Jpeg,Png,...</p>
    <div className="drop-img" onDrop={drop} onDragOver={allowDrop} onClick={fileInputClicked}>
        <img src="/images/image.svg" alt="img"></img>
        
        <h5 className="color drg">Drag & Drop your image here</h5>
        <input ref={fileinputref}
        className="file-input"
        type="file"
        onChange={fileSelected}/>
    </div>
    <p className="color">or</p>
    <label className="btn btn-primary" for="upload">Choose s File</label>
    <input id="upload" ref={file2inputref} onChange={file2selected} type="file"></input>
</div>
                )
            ):(
                <div>
                <Loader/>
                {/* {setloading(false)
             }
             {setuploadurl("xfgh")} */}
                </div>
          
                
            )
        }


</div>
        </>
    )
}

export default Uploader;