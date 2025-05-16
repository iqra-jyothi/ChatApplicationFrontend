import React from "react"

import { Outlet } from 'react-router-dom';
import Splash from "./component/Splash";
import { useState ,useEffect} from "react";
import PCALogo from "./component/PCALogo";
const App=()=>{
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div>
        {loading ? <Splash /> :<> <PCALogo/><Outlet /></>}
      </div>
    );
  };
export default App