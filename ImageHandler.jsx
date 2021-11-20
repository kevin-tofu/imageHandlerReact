import React from "react";
import {useState} from "react"
import {ButtonImport, ButtonPost, AlertDialog, CircularProgress} from "./index";
import axios from "axios"
import "./styles/ImageHandler.css";
import Resizer from "react-image-file-resizer";

const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    },
    'file'
    );
});

// export default class ImageHandler extends React.Component {
const ImageHandler = (props) => {

  let [v_hasfile1, set_v_hasfile1] = useState(false)
  let [v_hasfile2, set_v_hasfile2] = useState(false)
  let [v_files, set_v_files] = useState(null)
  let [openAlert, set_openAlert] = useState(false)
  let [open_cpLoading, set_open_cpLoading] = useState(false)
  const [url_host] = useState(props.url_host)
  const [api_post] = useState(props.api_post)
  let [image_get, set_image_get] = useState(null)
  // let [value, setValue] = React.useState(0.15)
  // const [nnparams, setnnParams] = useState(props.nnParams)

  let [PostProgress, setPostProgress] = React.useState(0.0)

//   const [file_ext, setfile_ext] = useState('')
  let [alert1, set_alert1] = useState('')
  
  // let [alert2, set_alert2] = useState('')
  // let [alert3, set_alert3] = useState('')
  


  const selectFile = (e) => {

    const file = e.target.files[0];
    resizeFile(file).then((image) =>{
        set_v_files(image)
        set_v_hasfile1(true)
        // console.log(image) // file or base64
    });

    // set_v_files(e.target.files[0])
    set_v_hasfile2(false)
    set_image_get(null)
    set_open_cpLoading(false)
    set_alert1(`${e.target.files[0].name}`)
  }

  const getImage = async (url_get, idData) => {
    const config_get = { 
        //   mode: 'no-cors',
          responseType: "blob",
          headers: { 
                // 'Access-Control-Allow-Origin': '*',
                'idData': idData
            },
          onDownloadProgress: (progressEvent) => {
            setPostProgress(Math.round( 50 + 50 * progressEvent.loaded / progressEvent.total))
            console.log('Uploading...' + PostProgress)
          },
          
          timeout: 15000
    }
    axios.get(url_get, config_get).then(res_get => {
        // const url = URL.createObjectURL(res_get.data);
        set_image_get(URL.createObjectURL(res_get.data))
        set_v_hasfile2(true)
    }).catch(e => {
        
        set_v_hasfile2(false)
        // set_alert3(`failed getting': ${url_get}`)
    }).finally(()=> {
        set_open_cpLoading(false)
    })
  }

  const postImage = async (e) => {
    
    if (v_hasfile1 === false){
      set_openAlert(true)
    } else {
      var fd = new FormData();
      fd.append('file', v_files)
      const url_post = `${url_host}/${api_post}/`
      const url_get = `${url_host}/${api_post}/`
      const config_post = { headers:{ 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*',},
                            timeout: 15000,
                            onUploadProgress: (progressEvent) => {
                                setPostProgress(Math.round( 50 * progressEvent.loaded / progressEvent.total))
                                console.log('Uploading...' + PostProgress)
                            },
                            params: props.nnParams
        }
      

    //   console.log(url_post)
      set_open_cpLoading(true)
      // set_alert3(url_post)
      axios.post(url_post, fd, config_post).then(res_post => {
        
        console.log(res_post.data.id_data)
        // set_alert2(res_post.data.id_data)
        getImage(url_get, res_post.data.id_data)

      }).catch(e => {
        // set_alert3(`failed posting: ${url_post}`)
        // set_alert2(e.response)
        
      }).finally(() => {
        set_open_cpLoading(false)
      })
      
    }
  }

  const handleClose = () => {
    set_openAlert(false)
  }
  
    
  return (
    <div>
      <div>
        
        <h2>{props.title}</h2>
        <ButtonImport
          className="image"
          name="image"
          onChange={e => selectFile(e)}
        >
          image
        </ButtonImport>

        <ButtonPost
          className="submit"
          name="submit"
          onClick={e => postImage(e)}
        >
          convert
        </ButtonPost>

        <AlertDialog open={openAlert} 
                     handleClose={handleClose}
                     textTitle={props.dialog_title}
                     textContent={props.dialog_textcontent}>
        </AlertDialog>
        
      </div>

        <table className='mytable'>
            <tbody>
              <tr>
                <td>{v_hasfile1 && <img src={URL.createObjectURL(v_files)} className="imagescls" alt='input' />}</td>
                {/* <td>{v_hasfile1 && <img src={v_files} className="imagescls" alt='input' />}</td> */}
                <td>{v_hasfile2 && <img src={image_get} className="imagescls" alt='output' />}</td>
                {/* <td>{v_hasfile2 && <img src={this.state.file_result} alt='Thumb' /> }</td> */}
                {/* <td>{v_hasfile2 && <img src={this.state.url_get} alt='Thumb2' />}</td> */}
              </tr>
            </tbody>
        </table>

        <div>
          {open_cpLoading && <CircularProgress loading={open_cpLoading}></CircularProgress>}
        </div>
        <h3>{PostProgress}</h3>
        <h2 color='red' >{alert1}</h2>
        {/* <h3>{alert3}</h3>
        <h3>{alert2}</h3> */}
        

    </div>
  )
}

export default ImageHandler;  
