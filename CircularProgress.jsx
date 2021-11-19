import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
// import Typography from '@mui/material/Typography';

export default function DelayingAppearance (props) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ height: 40 }}>
            <Fade
                in={props.loading}
                style={{
                transitionDelay: props.loading ? '800ms' : '0ms',
                }}
                unmountOnExit
            >
                <CircularProgress style={{alignItems: 'center'}} />
            </Fade>
        </Box>
    </Box>
  );
}