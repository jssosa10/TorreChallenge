import React from 'react';
import Candidate from './Candidate';
import '../App.css';

const CandidatesList = (props) => {
    return (
        <div className='App'>
            <h2>{props.candidates.length} Candidates</h2>
            <div className='Candidates'>
            {props.candidates.map(candidate => {
               return(<Candidate candidate={candidate} />);
            })}
            </div>
        </div>
    )
}

export default CandidatesList;