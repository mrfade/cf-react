import React from "react";

import Logo from "../../assets/logo/jotform-logo.svg";

export const CfFooter = () => {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "5px",
        color: "#0a1551",
        fontSize: "12px",
        textAlign: "center",
      }}
      className="cf-footer"
    >
      Powered by{" "}
      <a href="https://www.jotform.com/" target={"_blank"}>
        <img width={"20%"} src={Logo} alt="Jotform" />
      </a>
    </div>
  );
};
