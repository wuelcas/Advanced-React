import React from "react";
import Reset from "../components/Reset";

function reset(props) {
  return (
    <div>
      <p>Reset Your Password</p>
      <Reset token={props.query.resetToken} />
    </div>
  );
}

export default reset;
