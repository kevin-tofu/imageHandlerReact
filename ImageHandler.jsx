import React from "react";
import {useState} from "react"
import {ButtonImport, ButtonPost, AlertDialog, CircularProgress} from "./index";
import axios from "axios"
// import {v4 as uuidv4} from 'uuid';
import "./styles/ImageHandler.css";


// export default class ImageHandler extends React.Component {
const ImageHandler = (props) => {

  let [v_hasfile1, set_v_hasfile1] = useState(false)
  let [v_hasfile2, set_v_hasfile2] = useState(false)
  // let [v_myid, set_v_myid] = useState(null)
  let [v_files, set_v_files] = useState(null)
  // let [url_get, set_url_get] = useState(null)
  let [openAlert, set_openAlert] = useState(false)
  let [open_cpLoading, set_open_cpLoading] = useState(false)
  const [url_host] = useState(props.url_host)
  const [api_post] = useState(props.api_post)
  let [image_get, set_image_get] = useState(null)
  
  const selectFile = (e) => {

    set_v_files(e.target.files)
    set_v_hasfile1(true)
    // set_v_hasfile2(false)
    // set_v_myid(uuidv4())
  }

  const postImage = async (e) => {
    
    if (v_hasfile1 === false){
      set_openAlert(true)
    } else{
      // set_v_hasfile2(false)
      const url = `${url_host}/${api_post}/`;
      var fd = new FormData();
      fd.append('file', v_files[0])

      const config_post = { 
              mode: 'no-cors',
              headers: 
                  { 
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data'
                    // 'Access-Control-Allow-Origin': '*'
              },
              // withCredentials: true,
              // credentials: 'same-origin',
      };
      
      // console.log(url)
      set_open_cpLoading(true)
      axios.post(url, fd, config_post).then(res_post => {
        
        console.log(res_post.data.id_data)
        // https://simplernerd.com/js-image-binary-jfif/
        const config_get = { 
          mode: 'no-cors',
          responseType: "blob",
          'headers': 
              { 'Access-Control-Allow-Origin': '*',
                'idData': res_post.data.id_data
          },
        };
        axios.get(url, config_get)
        .then(res_get => {
          // const url = URL.createObjectURL(res_get.data);
          set_image_get(URL.createObjectURL(res_get.data))
          set_v_hasfile2(true)
        })
        set_open_cpLoading(false)
      }).catch(e => {
        console.log(e)
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
        <h2>Human-Posture Estimator</h2>
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
          submit
        </ButtonPost>

        <AlertDialog open={openAlert} 
                     handleClose={handleClose}
                     textTitle='Choose a photo that includes a human body .'
                     textContent='Image-Button to choose picture is on your left-side. This module is going to estimate human posture after your submitting'>
        </AlertDialog>
        
      </div>

        <table className='mytable'>
            <tbody>
              <tr>
                <td>{v_hasfile1 && <img src={URL.createObjectURL(v_files[0])} className="imagescls" alt='input' />}</td>
                <td>{v_hasfile2 && <img src={image_get} className="imagescls" alt='output' />}</td>
                {/* <td>{v_hasfile2 && <img src={this.state.file_result} alt='Thumb' /> }</td> */}
                {/* <td>{v_hasfile2 && <img src={this.state.url_get} alt='Thumb2' />}</td> */}
              </tr>
            </tbody>
        </table>

        <div>
          {open_cpLoading && <CircularProgress loading={open_cpLoading}></CircularProgress>}
        </div>
    </div>
  )
}

export default ImageHandler;  
