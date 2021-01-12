import React from 'react';
import Candidate from './Candidate';

const CandidatesList = (props) => {
    return (
        <>
            <h2>{props.candidates.length} Candidates</h2>
            {props.candidates.map(candidate => {
               return(<Candidate candidate={candidate} />);
            })}
        </>
    )
}

export default CandidatesList;