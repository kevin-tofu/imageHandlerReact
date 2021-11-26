import React from "react";
// import {useState} from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ImageHandler from './ImageHandler'
// import "./styles/ImageHandlerSlider.css";


function getParams(paramList){

  return paramList.map( item => {
    return {[item['name']]: item.value }
  }).reduce((prev, current) => {
    return Object.assign(prev, current)
  }, 
  {})
}

function reducer(state, {index, value}){
  
  const temp = state.map((item, index_loop) => { 
                        if (index_loop === index) {
                          return {...item, value: value}
                        } else {
                          return item
                        }
  });
  return temp
};


const ImageHandlerSlider = (props) => {

  const [state, dispatch] = React.useReducer(reducer, props.nnParams)

  return (
    <>
      <div>
        <ImageHandler url_host={props.url_host} api_post={props.api_post}
                      title={props.title}
                      dialog_title = {props.dialog_title} dialog_textcontent={props.dialog_textcontent}
                      nnParams = {getParams(state)}
        />
      </div>

      <div>
        <Box sx={{ width: 400 }} m="auto" >
          <Stack spacing={2} sx={{ mb: 1}} alignItems="center" justifyContent="center">
                { state.map((item, idx) => {
                    return <>
                              <Slider aria-label= {item.name} //"Volume" 
                                  value={item.value} 
                                  onChange={ (e, val) => { dispatch({index:idx, value:val}) }} 
                                  min={item.min}
                                  max={item.max}
                                  step={item.step}
                              />
                              <h4>{item.name} : {item.value}</h4>
                            </>
                  })
                }
          </Stack>
        </Box>
      </div>
    </>
  )
}

export default ImageHandlerSlider;  
