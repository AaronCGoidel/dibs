import React from "react";
import styles from "../styles/card.module.css";
import CardButton from "./CardButton";

export default class StatusCard extends React.Component {
  makeButton = () => {
    let text = "";
    let fn = () => {};
    if (this.props.inUse) {
      if (this.props.inUseBy == this.props.userName) {
        text = "Sign Off";
        fn = () => {
          this.props.onClick("");
        };
      } else {
        return null;
      }
    } else {
      text = "Call Dibs!";
      fn = () => {
        this.props.onClick(this.props.userName);
      };
    }
    return <CardButton text={text} onClick={fn} />;
  };

  render() {
    return (
      <div className={styles.card}>
        <h3>
          {this.props.title}{" "}
          <span
            className={`${styles.dot} ${this.props.inUse ? styles.taken : ""}`}
          />
        </h3>

        {!this.props.inUse ? (
          <p>Is currently available</p>
        ) : (
          <p>
            Is currently being used by&nbsp;
            {
              <span className={styles.reserver}>
                {this.props.inUseBy == this.props.userName
                  ? "you"
                  : this.props.inUseBy}
              </span>
            }
          </p>
        )}

        {this.makeButton()}
      </div>
    );
  }
}
