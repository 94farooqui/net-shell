import React from "react";

const SSHTerminal = ({ session }) => {
  return (
    <div id={`terminal-${session.id}`} className="w-full h-64 bg-black"></div>
  );
};
export default SSHTerminal;
