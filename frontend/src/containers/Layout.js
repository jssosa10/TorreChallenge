import React, {useState} from 'react';
import Searcher from '../components/Searcher';
import Matcher from '../components/Matcher';
import '../App.css';

const Layout = (props) => {
  const [opportunity, setOpportunity] = useState(undefined);
  return (
    <>
      {opportunity ? (
        <Matcher className="App" setOpportunity={setOpportunity} opportunity={opportunity} />
      ) : (
        <Searcher setOpportunity={setOpportunity} />
      )}
    </>
  );
};

export default Layout;
