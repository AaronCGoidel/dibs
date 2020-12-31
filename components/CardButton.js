import React from "react";

const CardButton = (props) => {
  return (
    <div className={"button"} onClick={props.onClick}>
      {props.text}
      <style jsx>
        {`
          .button {
            width: 100%;
            padding: 1rem;
            margin-top: 1rem;
            text-align: center;
            border: 1px solid #000;
            border-radius: 50px;
            cursor: pointer;
          }

          .button:hover,
          .button:focus,
          .button:active {
            color: #0097e6;
            border-color: #0097e6;
          }
        `}
      </style>
    </div>
  );
};

export default CardButton;
