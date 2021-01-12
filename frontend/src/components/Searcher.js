import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 25,
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));



const Searcher = (props) => {
  const classes = useStyles();
  const [opportunityId, setOpportunityId] = useState('');
  const searchOpportunity = async (opportunityId)=> {
    const res = await fetch('http://localhost:8000/' + `opportunities/${opportunityId}`, {
        headers: { 'Content-Type': 'application/json'}}
    );
    if(res.ok){
        res
        .json()
        .then(res => {console.log(res);props.setOpportunity(res)});
    }
    else{
        console.log("Not Found");
    }
  }
  const submit = (event) => {
      event.preventDefault();
      console.log(opportunityId);
      searchOpportunity(opportunityId);
  }
  return (
    <Paper component="form" className={classes.root} onSubmit={submit}>
      <InputBase
        className={classes.input}
        placeholder="Search Torre Opportunity"
        onInput={ e=>setOpportunityId(e.target.value)}
        inputProps={{ 'aria-label': 'search torre opportunity' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Searcher;