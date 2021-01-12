import React, {useState} from 'react';
import Searcher from '../components/Searcher';
import Matcher from '../components/Matcher';

const Layout = (props) => {
  const [opportunity, setOpportunity] = useState(undefined);
  return (
    <>
      {opportunity ? (
        <Matcher setOpportunity={setOpportunity} opportunity={opportunity} />
      ) : (
        <Searcher setOpportunity={setOpportunity} />
      )}
    </>
  );
};

export default Layout;
