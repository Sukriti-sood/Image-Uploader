import React, { useState, useRef } from  "react";
import Loader from "./loader";
import axios from "axios";
function Uploader(){

    const[File,setFile]=useState([]);
    const[loading,setloading]=useState(false);
    const[error,setError]=useState(null)
    const [uploadurl,setuploadurl]=useState(null);
    const [copied, setCopied] = useState(false);
    const[imgsrc,setimg]=useState();

    const fileinputref=useRef();
    const file2inputref=useRef();
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
console.log(file);
console.log(file.size);
setloading(true);
setTimeout(()=>{
    let url;
    try{
        const body=new FormData();
        body.append("image",File);
        axios({
            method: 'post',
            url: 'https://localhost:5000/uploader',
            data: body,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then((res)=>{
                if(res.statusCode!=200)
                setError("Error")
                console.log(res);
                url=res.url;
            });
          
    }
    catch(err)
    {
        setError(err.message);
    }
    setTimeout(()=>{
    setuploadurl(url);
    setimg(url);
    setCopied(url);
    setloading(false)
    },2000)
    
},5000)
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
<h1><i class="fa fa-check-circle" aria-hidden="true"></i></h1>
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