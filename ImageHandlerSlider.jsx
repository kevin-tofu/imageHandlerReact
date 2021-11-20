import React from "react";
import {useState} from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ImageHandler from './ImageHandler'


const ImageHandlerSlider = (props) => {

  let [nnparams, setnnParams] = useState(props.nnParams)
  let [value_slider, setvalue_slider] = useState(0.2)

  const handleChange = (event, newValue) => {
    setvalue_slider(newValue)
    setnnParams({...nnparams, 
      alpha: newValue
    })
    console.log(nnparams)
  }
    
  return (
    <div>
      <div>
      <ImageHandler url_host={props.url_host} api_post={props.api_post}
                    title={props.title}
                    dialog_title = {props.dialog_title} dialog_textcontent={props.dialog_textcontent}
                    nnParams = {nnparams}
      />
      </div>


      <Box sx={{ width: 200 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            {/* <VolumeDown /> */}
                <Slider aria-label="Volume" value={value_slider} onChange={handleChange} 
                        min={0.0}
                        max={1.0}
                        step={0.0001}
                />
            {/* <VolumeUp /> */}
        </Stack>
      </Box>

        

    </div>
  )
}

export default ImageHandlerSlider;  
