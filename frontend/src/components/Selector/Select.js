// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// export default function BasicSelect(props) {
//   return (
//     <Box sx={{ minWidth: 320 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">hello everyone</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           label="Age"
//           style={{color: "white"}}
//         >
//             {props.items.map((item, idx) => {
//                 return (
//                     <MenuItem value={idx}> {item} </MenuItem>
//                 );
//             })}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }


import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
    return (    
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" style={{ marginRight: "0.3rem", color: "white"}}>{props.selectorName}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                style={{color:"white"}}
                onChange={(e)=>props.handleChange(e)}
            >
                {props.items.map((item, idx) => {
                    return (
                        <MenuItem value={idx+1}> {item} </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
        </Box>
    );
}