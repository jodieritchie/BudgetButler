import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import logo from "../assets/dancing.png";
import Overview from "./Overview.js";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);
  const history = useHistory();

  const fetchBlogs = async () => {
    // error occurs here - when not logged in ->Cannot read property 'uid' of null
    try {
      const currentUser = firebase.auth().currentUser;
      const response = db.collection("users").doc(currentUser.uid);
      const data = await response.get();
      setBlogs([...blogs, data.data()]);
    } catch (nullUidError) {
      // then blogs is empty,  ->redirect user to login
      history.push("/login");
    }
  };

  const handleClick = () => {
    history.push("/overview");
  };
  console.log(blogs);
  const styles = {
    padding: {
      paddingTop: "4vh",
      paddingBottom: "2vh",
    },
  };

  const styleCards = {
    height: "22vh",
    borderRadius: "15% 15% 15% 15% / 12% 12% 12% 12%",
  };
  function saveEdits() {
    console.log("saveEdits function successfuly called");

    var editHeight = document.getElementById("editableHeight");
    var userVersion = editHeight.innerHTML;
    var space = userVersion.indexOf(" ");
    var updated = userVersion.substr(space + 1, userVersion.length - 1);
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({ height: updated }, { merge: true });

    var userVersion = document.getElementById("editableWeight").innerHTML;
    space = userVersion.indexOf(" ");
    updated = userVersion.substr(space + 1, userVersion.length - 1);
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({ weight: updated }, { merge: true });
  }

  return (
    <section>
      <Container style={styles.padding}>
        {blogs &&
          blogs.map((blog) => {
            return (
              <div className="blog-container">
                <Container style={styles.padding}>
                  <Row>
                    <Col id="logoProfile" lg={6} md={6} sm={12}>
                      <img src={logo} alt="logo" id="logoProfile" />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <h3 className="text-center" id="myName">
                        {blog.name.toUpperCase()}
                      </h3>
                      <Button
                        id="profileBtn"
                        variant="dark"
                        onClick={handleClick}
                        className="text-center"
                      >
                        Go To Dashboard
                      </Button>
                    </Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <Row>
                    <Col lg={6} md={6} sm={12} style={{ height: "33vh" }}>
                      <h5 className="text-center" id="subInfo">
                        Health Information
                      </h5>
                      <Card
                        style={styleCards}
                        className="text-center p-4"
                        bg="light"
                      >
                        <Card.Text>
                          {/* have a label? */}

                          <h6 id="editableHeight" contenteditable="true">
                            Height(in): {blog.height}
                          </h6>

                          <h6 id="editableWeight" contenteditable="true">
                            Weight(lbs): {blog.weight}
                          </h6>
                          <h6>Activity Level: {blog.activityLevel}</h6>
                          <h6>
                            Sex: {blog.femSex === "1" ? "Female" : "Male"}
                          </h6>
                          <Button onClick={() => saveEdits()} variant="dark">
                            Change Height/ Weight
                          </Button>
                        </Card.Text>
                      </Card>
                    </Col>

                    <Col lg={6} md={6} sm={12} style={{ height: "33vh" }}>
                      <h5 className="text-center" id="subInfo">
                        General Information
                      </h5>
                      <Card
                        style={styleCards}
                        className="text-center p-4"
                        bg="light"
                      >
                        <Card.Text>
                          <h6>Budget: {blog.budget}</h6>
                          <h6>Birthday: {blog.birthday}</h6>
                          <h6>Username: {blog.username}</h6>
                          <h6>Email: {blog.email}</h6>
                          <Button
                            onClick={() => history.push("/register")}
                            variant="dark"
                          >
                            Change Profile
                          </Button>
                        </Card.Text>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            );
          })}
      </Container>
    </section>
  );
};

export default Profile;
