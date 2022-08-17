import React from "react";

export const CfTitle = (props) => {
  const { title } = props;
  return (
    <div
      style={{
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#0a1551",
        color: "white",
        width: "100%",
        position: "fixed",
        zIndex: "1",
      }}
    >
      <div
        style={{
          width: "398px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
    </div>
  );
};
