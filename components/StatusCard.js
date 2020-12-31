import React from "react";
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
      <div className={"card"}>
        <h3>
          {this.props.title}{" "}
          <span className={`dot ${this.props.inUse && "taken"}`} />
        </h3>

        {!this.props.inUse ? (
          <p>Is currently available</p>
        ) : (
          <p>
            Is currently being used by&nbsp;
            {
              <span className={"reserver"}>
                {this.props.inUseBy == this.props.userName
                  ? "you"
                  : this.props.inUseBy}
              </span>
            }
          </p>
        )}

        {this.makeButton()}

        <style jsx>{`
          .card {
            margin: 1rem;
            width: 400px;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .dot {
            height: 1rem;
            width: 1rem;
            background-color: #4cd137;
            border-radius: 50%;
            display: inline-block;
          }

          .taken {
            background-color: #e84118;
          }

          .reserver {
            color: #0097e6;
          }
        `}</style>
      </div>
    );
  }
}
