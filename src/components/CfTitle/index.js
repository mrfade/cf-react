import React from "react";

export const CfTitle = (props) => {
  const { title } = props;
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
        width: "100%",
        position: "fixed",
        zIndex: "1",
    }}>
      <h1>{title}</h1>
    </div>
  );
};
