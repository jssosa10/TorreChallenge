import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

import CandidatesList from './CandidatesList';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: '#D3D936',
        },
        '&:after': {
            borderColor: '#D3D936',
        }
    },
    icon: {
        fill: '#D3D936',
    }
}));

const Mathcher = (props) => {
    const classes = useStyles();
    const [primarySkill, setPrimarySkill] = useState('');
    const opportunity = props.opportunity;
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const updateCandidates = async(skill) =>{
        setLoading(true);
        const res = await fetch(`https://torre-back-pel3jonw4q-uc.a.run.app/users/${skill}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(opportunity)
            }
        );
        if(res.ok){
            res
            .json()
            .then(res => {console.log(res);setCandidates(res.users)});
        }
        else{
            console.log("Not Found");
        }
        setLoading(false);
    }
    const handleChange = (event) => {
        setPrimarySkill(event.target.value);
        if(event.target.value!==""){
            updateCandidates(event.target.value);
        }
        else{
            setCandidates([]);
        }
    };
    
    return (
        <div className='ContainerMatcher'>
        <div className='Matcher'>
            <div className='Header'>
            <h1 style={{paddingBottom: '15px'}}>{opportunity.objective}</h1>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel style={{color: '#9EA0A3'}} id="demo-simple-select-outlined-label">Primary Skill</InputLabel>
                <Select
                    value={primarySkill}
                    onChange={handleChange}
                    label="Primary Skill"
                    style={{color: '#9EA0A3'}}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        opportunity.skills.map( skill => {
                            return (<MenuItem key = {skill.name} value={skill.name}>{skill.name}</MenuItem>);
                        })
                    }
                </Select>
            </FormControl>
            </div>
            <div style={{marginTop:'200px'}}>
            {   loading ? (
                    <CircularProgress color='#D3D936'/>
                ) :
                candidates.length > 0 ? (
                    <CandidatesList candidates={candidates} />
                ) : (
                    <h2>No candidates available.</h2>
                )
            }
            </div>
        </div>
        </div>
    );
}

export default Mathcher;