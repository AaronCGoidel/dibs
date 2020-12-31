import React from "react";
import Head from "next/head";
import Cookies from "universal-cookie";
import firebase from "../components/Firebase";
import StatusCard from "../components/StatusCard";
import Modal from "../components/Modal";
import styles from "../styles/home.module.css";
import loader from "../styles/loader.module.css";

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
      <div className={styles.container}>
        <Head>
          <title>Dibs for Mlkmn!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {this.state.showModal && <Modal onSubmit={this.handleModalSubmut} />}

        <main className={styles.main}>
          <h1 className={styles.title}>
            Call <span className={styles.accent}>dibs</span> on an account
          </h1>

          <p className={styles.description}>
            Check the status of or call dibs on one of these accounts
          </p>

          {this.state.ready ? (
            <div className={styles.grid}>
              <StatusCard
                title={"Webflow"}
                inUse={this.state.reserver !== ""}
                userName={this.state.name}
                inUseBy={this.state.reserver}
                onClick={this.handleSetUser}
              />
            </div>
          ) : (
            <div className={loader.loader} />
          )}
        </main>

        <footer className={styles.footer}>
          Made with &#128156; by&nbsp;
          <a className={styles.accent} href={"https://aarongoidel.com"}>
            Aaron Goidel
          </a>
        </footer>
      </div>
    );
  }
}
