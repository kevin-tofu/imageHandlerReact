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


// const MenuList = (props) => (
//     props.items.map(item => item.use === false ? <MenuItem value={item.value}>{item.name}</MenuItem> : {})
    
// );

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


const ImageHandlerSlider = (props) => {

  

  const handleChange = (event, newValue) => {
    setvalue_slider(newValue)
  }
  const [style1, setStyle1] = React.useState(myvalues(props.sSelective, true)[0]);
  const [style2, setStyle2] = React.useState(myvalues(props.sSelective, true)[1]);
  const [stylelist, setStylelist] = React.useState(props.sSelective);
  let [value_slider, setvalue_slider] = useState(props.initAlpha)
  
  const handleChangeSelect1 = (event) => {

    // console.log(event)
    // console.log('style1', style1, '->', event.target.value)
    setStylelist(stylelist.map(item => { 
      if (item.value === style1) {
        return {...item, use: false}
      }else if (item.value === event.target.value) {
        return {...item, use: true}
      } else {
        return item
      }
    }))
    setStyle1(event.target.value);
  };

  const handleChangeSelect2 = (event) => {

    // console.log(event)
    // console.log('style2', style2, '->', event.target.value)
    setStylelist(stylelist.map(item => { 
      if (item.value === style2) {
        return {...item, use: false}
      }else if (item.value === event.target.value) {
        return {...item, use: true}
      } else {
        return item
      }
    }))
    setStyle2(event.target.value);
  };

  

  return (
    <div>
      <div>
        <ImageHandler url_host={props.url_host} api_post={props.api_post}
                      title={props.title}
                      dialog_title = {props.dialog_title} dialog_textcontent={props.dialog_textcontent}
                      nnParams = {getParams(stylelist, value_slider)}
        />
      </div>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label1">Style1</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label1"
            id="demo-simple-select-autowidth1"
            value={style1}
            onChange={handleChangeSelect1}
            autoWidth
            label="Style1"
          >
              {/* <MenuItem value=""><em>None</em></MenuItem> */}
              {/* <MenuItem value={1}>Style-0</MenuItem> */}
              <MenuItem value={style1}>{stylelist[style1]['name']}</MenuItem>
              {
                filterItem(stylelist, false).map(item => { 
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
            value={style2}
            onChange={handleChangeSelect2}
            autoWidth
            label="Style2"
          >
              {/* <MenuItem value={2}>Style-1</MenuItem>
              <MenuItem value={3}>Style-2</MenuItem>
              <MenuItem value={4}>Style-3</MenuItem> */}
              <MenuItem value={style2}>{stylelist[style2]['name']}</MenuItem>
              {
                filterItem(stylelist, false).map(item => { 
                  return <MenuItem key={item['name']} value={item['value']}>{item['name']}</MenuItem> 
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
