import React from 'react';
import {Grid, Typography} from '@material-ui/core';

const textStyle = {fontFamily: "courier new", fontSize: "50px", textAlign: 'center'};
const App = ()=>(
  <Grid container justify='center' alignContent="center">
    <Grid item >
      <Grid container justify='center' direction='column'>
        <Grid item alignSelf={'center'}>
          <Typography style={textStyle}>HyperFarms</Typography>
        </Grid>
        <Grid item alignSelf={'center'}>
          <Typography style={textStyle}>Coming Soon!</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default App;