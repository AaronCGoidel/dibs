import React, { useState } from "react";
import styles from "../styles/modal.module.css";

const Modal = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(name);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h1>Welcome to Dibs!</h1>
        <p>
          In order to reserve services, you will need to identify yourself.
          Please enter your name below. (This information will be stored on your
          browser via cookies for future use)
        </p>
        <form onSubmit={handleSubmit}>
          <input
            required
            className={styles.nameField}
            placeholder="Your Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input className={styles.submit} type="submit" value="Let's Go!" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
