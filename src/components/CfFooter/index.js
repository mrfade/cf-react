import React from "react";

import Logo from "../../assets/logo/jotform-logo.svg";

export const CfFooter = () => {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "5px",
        color: "rgb(10 21 81 / 55%)",
        background: "#f4f4faeb",
        fontSize: "12px",
        textAlign: "center",
        minWidth: "510px",
        margin: "0px -15px",
        padding: "3px",
        width: "calc(100% + 2.15%)",
      }}
      className="cf-footer"
    >
      Powered by{" "}
      <a href="https://www.jotform.com/" target={"_blank"}>
        <img width={"10%"} src={Logo} alt="Jotform" />
      </a>
    </div>
  );
};
