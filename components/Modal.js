import React, { useState } from "react";

const Modal = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(name);
  };

  return (
    <div className={"modalContainer"}>
      <div className={"modal"}>
        <h1>Welcome to Dibs!</h1>
        <p>
          In order to reserve services, you will need to identify yourself.
          Please enter your name below. (This information will be stored on your
          browser via cookies for future use)
        </p>
        <form onSubmit={handleSubmit}>
          <input
            required
            className={"nameField"}
            placeholder="Your Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input className={"submit"} type="submit" value="Let's Go!" />
        </form>
      </div>
      <style jsx>
        {`
          .modalContainer {
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            overflow: auto;
            background-color: #000000a5;
          }

          .modal {
            background-color: #fefefe;
            margin: 10% auto;
            padding: 1rem 3rem;
            border-radius: 12px;
            width: 50%;
          }

          .nameField {
            background: transparent;
            border: none;
            border-bottom: 1px solid #000;
            outline: none;
            padding: 2px 5px;
            font-size: 1.2em;
            margin: 10px;
          }

          .submit {
            border: none;
            padding: 8px 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
          }

          .submit:hover,
          .submit:focus,
          .submit:active {
            color: #fff;
            background-color: #0097e6;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
