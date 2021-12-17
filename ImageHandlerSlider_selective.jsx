import React from "react";
// import {useState} from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ImageHandler from './ImageHandler'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function get_styles(state, logic_use){

  if (state !== undefined) {
    const temp = state.reduce((accumlator, currentValue, index) => {
      if (currentValue.use === logic_use){
        accumlator.push(currentValue);
      }
      return accumlator
    }, [])
    return temp
  } else {
    return undefined
  }
}

function get_nnParams(state, alpha){

  const temp = get_styles(state, true)
  if (temp !== undefined){
    return {style1: temp[0].value, style2: temp[1].value, alpha:alpha}
  } else {
    return {style1:0, style2:1, alpha: alpha}
  }

}

function reducer(state, action){
  
  const temp = state.map((item, index_loop) => { 
    if (item.value === action.value) {
      return {...item, use: true}
    } else 
    if (item.value === action.value_old) {
      return {...item, use: false}
    } else {
      return item
    }
  });
  return temp
};

const ImageHandler2SelectiveSlider = (props) => {

  const [state, dispatch] = React.useReducer(reducer, props.sSelective);
  const [slider_value, setSlider_value] = React.useState(0.2);

  const onChangeSelective = (e, value_old) => {
    dispatch({value: e.target.value, value_old: value_old})
  }

  return (
    <>
      <div>
        <ImageHandler url_host={props.url_host} api_post={props.api_post}
                      title={props.title}
                      dialog_title = {props.dialog_title} dialog_textcontent={props.dialog_textcontent}
                      nnParams = {get_nnParams(state, slider_value)}
        />
      </div>

      <Box Box sx={{ minWidth: 120 }}>
      </Box>

      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-label1">Style-1</InputLabel>
          <Select
              labelId="select-label1"
              id="select-label1"
              value={get_styles(state, true)[0].value}
              label="Style1"
              onChange={e => { onChangeSelective(e, get_styles(state, true)[0].value) }}
            >
            <MenuItem key='now0' value={get_styles(state, true)[0].value}>{get_styles(state, true)[0].name}</MenuItem>
            {
              get_styles(state, false).map((item, idx) => {
                return <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-label2">Style-2</InputLabel>
          <Select
              labelId="select-label2"
              id="select-label2"
              value={get_styles(state, true)[1].value}
              label="Style2"
              onChange={e => { onChangeSelective(e, get_styles(state, true)[1].value) }}
            >
              <MenuItem key='now1' value={get_styles(state, true)[1].value}>{get_styles(state, true)[1].name}</MenuItem>
              {
                get_styles(state, false).map((item, idx) => {
                  return <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
                })
              }
            </Select>
        </FormControl>
      </div>

      <Box sx={{ width: 400 }} m="auto" >
        <Stack spacing={2} sx={{ mb: 1}} alignItems="center" justifyContent="center">
          <Slider aria-label= '' //"Volume" 
                  value={slider_value} 
                  onChange={ (e, val) => { setSlider_value(val) }} 
                  min={0.0}
                  max={1.0}
                  step={0.01}
          />
        </Stack>
      </Box>
    </>
  )
}

export default ImageHandler2SelectiveSlider;  
