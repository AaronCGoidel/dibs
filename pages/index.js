import React from "react";
import Head from "next/head";
import Cookies from "universal-cookie";
import firebase from "../components/Firebase";
import StatusCard from "../components/StatusCard";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

const db = firebase.firestore();
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: "",
      reserver: "",
      cookies: new Cookies(),
      ready: false,
      time: Date.now(),
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.doSetup();
    this.interval = setInterval(() => this.doSetup(), 120000);
  }

  handleModalSubmut = (name) => {
    this.state.cookies.set("name", name);
    this.setState({ showModal: false, name: name });
  };

  handleSetUser = (name) => {
    db.collection("status")
      .doc("current")
      .get()
      .then((res) => {
        let holder = res.data()["user"];
        if (holder === this.state.name || holder === "") {
          this.setState({ reserver: name });
          db.collection("status").doc("current").set({ user: name });
        } else {
          this.doSetup();
        }
      });
  };

  doSetup() {
    const name = this.state.cookies.get("name");
    if (name === undefined) {
      this.setState({ showModal: true, ready: true });
    } else {
      db.collection("status")
        .doc("current")
        .get()
        .then((res) => {
          this.setState({
            reserver: res.data()["user"],
            ready: true,
            name: name,
          });
        });
    }
  }

  render() {
    return (
      <div className={"container"}>
        <Head>
          <title>Dibs for Mlkmn!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {this.state.showModal && <Modal onSubmit={this.handleModalSubmut} />}

        <main className={"main"}>
          <h1 className={"title"}>
            Call <span className={"accent"}>dibs</span> on an account
          </h1>

          <p className={"description"}>
            Check the status of or call dibs on one of these accounts
          </p>

          {this.state.ready ? (
            <div className={"grid"}>
              <StatusCard
                title={"Webflow"}
                inUse={this.state.reserver !== ""}
                userName={this.state.name}
                inUseBy={this.state.reserver}
                onClick={this.handleSetUser}
              />
            </div>
          ) : (
            <Loader />
          )}
        </main>

        <footer className={"footer"}>
          Made with &#128156; by&nbsp;
          <a className={"accent"} href={"https://aarongoidel.com"}>
            Aaron Goidel
          </a>
        </footer>
        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .main {
            width: 100%;
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .footer img {
            margin-left: 0.5rem;
          }

          .footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .accent {
            color: #0097e6;
            text-decoration: none;
          }

          a.accent:hover {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          .grid {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 3rem;
          }
        `}</style>
      </div>
    );
  }
}
