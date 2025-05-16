import React, { useEffect, useState } from "react";

const Splash = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish(); // callback to tell parent we're done
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="splash-screen">
      <div className="logo-container">
        <h1 className="pca-logo">PCA</h1>
        <p className="subtitle">Personal Chat Application</p>
      </div>
    </div>
  );
};

export default Splash;
