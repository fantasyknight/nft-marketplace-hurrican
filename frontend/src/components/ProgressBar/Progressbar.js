import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '90%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(props.value,)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
  const [progress, setProgress] = useState(0);
  console.log("start:",props.start);

  React.useEffect(() => {
    // console.log(start);
    if(props.start){
      let timer = setInterval(() => {
        
        setProgress((prev) => {
          if(prev >= 100){
            clearInterval(timer);
            setTimeout(()=>{
              setProgress(0);
            },1000);
            return 100;
          } else {
            return prev + 10;
          }
        });
      }, 800);
      return () => {
        clearInterval(timer);
      };  
    }
  }, [props.start, progress]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
