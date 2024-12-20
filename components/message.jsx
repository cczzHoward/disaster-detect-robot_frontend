import React from "react";

const Message = ({ message }) => {
  return (
    <div className="alert alert-dark" role="alert">
      {message}
    </div>
  );
};

export default Message;
