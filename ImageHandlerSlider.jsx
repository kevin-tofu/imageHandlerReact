import React from "react";
import {useState} from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ImageHandler from './ImageHandler'
// import "./styles/ImageHandlerSlider.css";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function filterItem (sList, mybool) {
  const temp = sList.filter((item) => { if (item['use'] === mybool) { return item }})
  return temp
}
function myvalues (sList, mybool) {
  // const temp = sList.filter((item, index) => { if (item['use'] === mybool) { return item['value'] }})
  const temp = filterItem(sList, mybool).map((item) => {return item['value']})
  return temp
}
function getParams(sList, alpha){
  const temp0 = myvalues(sList, true)
  return {style1: temp0[0], style2: temp0[1], alpha:alpha}
}

function reducer(state, {idx_style, event}){

  let temp_using;
  if (idx_style === 0){
    temp_using = [event.target.value, state.style_using[1]]
  } else {
    temp_using = [state.style_using[0], event.target.value]
  }
  const temp = {data: state.data.map(item => { 
                        if (item.value === state.style_using[idx_style]) {
                          return {...item, use: false}
                        }else if (item.value === event.target.value) {
                          return {...item, use: true}
                        } else {
                          return item
                        }
                      }), 
                style_using: temp_using}
  
  console.log(state)
  console.log(temp)
  return temp
};


const ImageHandlerSlider = (props) => {

  const handleChange = (event, newValue) => {
    setvalue_slider(newValue)
  }
  const [state, dispatch] = React.useReducer(reducer, {data: props.sSelective, 
                                                       style_using: [myvalues(props.sSelective, true)[0], myvalues(props.sSelective, true)[1]]
                                                       })

  let [value_slider, setvalue_slider] = useState(props.initAlpha)
  

  return (
    <div>
      <div>
        <ImageHandler url_host={props.url_host} api_post={props.api_post}
                      title={props.title}
                      dialog_title = {props.dialog_title} dialog_textcontent={props.dialog_textcontent}
                      nnParams = {getParams(props.sSelective, value_slider)}
        />
      </div>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label1">Style1</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label1"
            id="demo-simple-select-autowidth1"
            value={state.style_using[0]}
            // onChange={handleChangeSelect1}
            onChange={(e) => dispatch({idx_style:0, event:e})}
            autoWidth
            label="Style1"
          >
              <MenuItem value={state.style_using[0]}>{state.data[state.style_using[0]]['name']}</MenuItem>
              {
                filterItem(state.data, false).map(item => { 
                  return <MenuItem key={item['name']} value={item['value']}>{item.name}</MenuItem> 
                })
              }

          </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label2">Style2</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label2"
            id="demo-simple-select-autowidth2"
            value={state.style_using[1]}
            // onChange={handleChangeSelect2}
            onChange={(e) => dispatch({idx_style:1, event:e})}
            autoWidth
            label="Style2"
          >
              <MenuItem value={state.style_using[1]}>{state.data[state.style_using[1]]['name']}</MenuItem>
              {
                filterItem(state.data, false).map(item => { 
                  return <MenuItem key={item['name']} value={item['value']}>{item.name}</MenuItem> 
                })
              }
          </Select>
        </FormControl>

      <div>
        <Box sx={{ width: 200 }} m="auto" >
          <Stack spacing={2} direction="row" sx={{ mb: 1}} alignItems="center" justifyContent="center">
                {/* <VolumeDown /> */}
                    <Slider aria-label="Volume" value={value_slider} onChange={handleChange} 
                            min={0.0}
                            max={1.0}
                            step={0.0001}
                            // sx = {{display: 'flex', alignItems: 'center'}}
                    />
                {/* <VolumeUp /> */}
          </Stack>
        </Box>
        {/* <h3>{style1}</h3>
        <h3>{style2}</h3> */}
        {
          // stylelist.map(item => { 
          //   return <h4>{`${item['name']} , ${item['use']}`}</h4>
          // })
        }
      </div>
    </div>
  )
}

export default ImageHandlerSlider;  
