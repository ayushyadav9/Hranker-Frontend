import React from "react";

const Loader = ({ isSmall }) => {
  return (
    <>
      {isSmall ? (
        <div class="smallLoader-container">
          <div class="smallLoader"></div>
        </div>
      ) : (
        <div class="loader-container">
          <div class="loader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
