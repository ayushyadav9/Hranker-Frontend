import React from "react";

const Loader = ({ isSmall }) => {
  return (
    <>
      {isSmall ? (
        <div className="smallLoader-container">
          <div className="smallLoader"></div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
