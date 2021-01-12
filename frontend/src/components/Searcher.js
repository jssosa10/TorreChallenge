import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import '../App.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 25,
    width: 400,
    border: '1px solid #ffffff',
    backgroundColor: '#222326',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    backgroundColor: '#222326',
    paddingTop: '4px',
    color: '#9EA0A3',
    "&::placeholder": {
      color: '#9EA0A3'
    },
  },
  iconButton: {
    padding: 10,
    color: '#D3D936'
  },
}));



const Searcher = (props) => {
  const classes = useStyles();
  const [opportunityId, setOpportunityId] = useState('');
  const [error, setError] = useState(false);
  const handleClose = ()=>{
    setError(false);
  }
  const searchOpportunity = async (opportunityId) => {
    const res = await fetch(`https://torre-back-pel3jonw4q-uc.a.run.app/opportunities/${opportunityId}`, {
      headers: { 'Content-Type': 'application/json' }
    }
    );
    if (res.ok) {
      res
        .json()
        .then(res => { console.log(res); setError(false); props.setOpportunity(res) });
    }
    else {
      setError(true);
      console.log("Not Found");
    }
  }
  const submit = (event) => {
    event.preventDefault();
    console.log(opportunityId);
    searchOpportunity(opportunityId);
  }
  return (
    <div className='Container'>
      <div className='Searcher'>
        <h1 style={{ color: 'white', textAlign: 'center', paddingBottom: '3%' }}>torre matcher</h1>
        <Paper component="form" className={classes.root} onSubmit={submit}>
          <InputBase
            className={classes.input}
            placeholder="Type your opportunity ID"
            onInput={e => setOpportunityId(e.target.value)}
            inputProps={{ 'aria-label': 'search torre opportunity' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          No such Job Opportunity with that ID.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Searcher;