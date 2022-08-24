import React from "react";

import Logo from "../../assets/logo/jotform-logo.svg";

export const CfFooter = () => {
  return (
    <div className="cf-footer">
      Powered by
      <a href="https://www.jotform.com/" target="_blank" rel="noreferrer">
        <img src={Logo} alt="Jotform" />
      </a>
    </div>
  );
};
