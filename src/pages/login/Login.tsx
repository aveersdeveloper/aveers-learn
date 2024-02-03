import { useState } from "react";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import Button from "@mui/joy/Button";
import { FormControl, FormLabel } from "@mui/joy";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import "./Login.css";
import { Popover, message } from "antd";
import { useAuth } from "../../auth/AuthContext";
import GlassText from "./GlassText";

import StarComponent from "../../components/new/Starry";

const Login = () => {
  const { login, signup } = useAuth();
  const [passVisiblity, setPassVisiblity] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [isSignupMode, setIsSignupMode] = useState(false);

  const toggleMode = () => {
    setEmail("");
    setName("");
    setPassword("");
    setIsSignupMode(!isSignupMode);
  };

  const content = (
    <div style={{ fontFamily: "Regular", marginRight: "20px" }}>
      <ul>
        <li>Try clearing your browser's cache and cookies.</li>
        <li>Ensure you've entered your email and password correctly.</li>
        <li>Passwords are case-sensitive. Make sure your caps lock is off.</li>
        <li>
          If you've forgotten your password, you can reset it by contacting an
          admin.
        </li>
      </ul>
    </div>
  );

  const handleLogin = async () => {
    try {
      console.log("Trying login");
      await login(email, password);

      // TODO: Add redirection to dashboard or desired page
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error(
          "An unknown error occurred during login. Please try again."
        );
      }
    }
  };

  const handleSignup = async () => {
    /*  if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    } */

    try {
      await signup(email, name, password);
      setEmail("");
      setName("");
      setPassword("");
      setIsSignupMode(false);
      // You can add any post-signup logic here, like redirecting to a welcome page or showing a success message.
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error(
          "An unknown error occurred during signup. Please try again."
        );
      }
    }
  };

  return (
    <>
      <div className="login-class">
        {/* <Stars /> */}
        <StarComponent key="starComponent" />
        <Card
          elevation={0}
          className="login-card"
          /* style={{
            boxShadow: "0 5px 15px 2px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            zIndex: "9999",
          }} */
          style={{
            boxShadow: "0 5px 15px 2px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            zIndex: "999",
            backgroundColor: "rgba(22, 22, 29, 0.8)", // semi-transparent background
            border: "1px solid rgba(173, 216, 230, 0.5)", // subtle border glow
            color: "rgba(173, 216, 230, 1)", // space-themed text color
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div
                className="loginleft"
                style={
                  {
                    // width: "60vw",
                    //backgroundImage: Loginpic,
                  }
                }
              >
                <GlassText>
                  Aveers
                  <br />
                  Nexus
                </GlassText>
                {/* <img
                  src={Loginpic}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    //marginTop: "50px",
                    //marginBottom: "100px",
                    //padding: "10px",
                    borderRadius: "25px",
                  }}
                /> */}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="login-right" style={{}}>
                <span
                  style={{
                    fontFamily: "Bold",
                    fontSize: "25px",

                    //marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {isSignupMode ? "Intern Signup" : "Intern Login"}
                </span>
                <div></div>
                {isSignupMode ? null : (
                  <span
                    style={{
                      fontFamily: "Regular",
                      /* color: "black", */
                      //marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Enter your details to get signed in to your account
                  </span>
                )}
                <div>
                  {isSignupMode ? (
                    <form>
                      <FormControl required>
                        <FormLabel
                          sx={() => ({
                            fontFamily: "Regular",
                            marginTop: "10px",
                            color: "rgba(173, 216, 230, 1)",
                          })}
                        >
                          Email
                        </FormLabel>
                        <Input
                          variant="solid"
                          type="email"
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                          sx={{
                            fontFamily: "Regular",
                            backgroundColor: "rgba(60, 60, 60, 0.8)", // semi-transparent muted gray
                            color: "rgba(173, 216, 230, 1)",
                          }}
                        />
                      </FormControl>
                      <FormControl required>
                        <FormLabel
                          sx={() => ({
                            fontFamily: "Regular",
                            marginTop: "20px",
                            color: "rgba(173, 216, 230, 1)",
                          })}
                        >
                          Name
                        </FormLabel>
                        <Input
                          variant="solid"
                          type="text"
                          onChange={(e: any) => setName(e.target.value)}
                          sx={{
                            fontFamily: "Regular",
                            backgroundColor: "rgba(60, 60, 60, 0.8)", // semi-transparent muted gray
                            color: "rgba(173, 216, 230, 1)",
                          }}
                        />
                      </FormControl>
                      <FormControl required>
                        <FormLabel
                          sx={() => ({
                            fontFamily: "Regular",
                            marginTop: "5px",
                            color: "rgba(173, 216, 230, 1)",
                          })}
                        >
                          Password
                        </FormLabel>
                        <Input
                          variant="solid"
                          type={passVisiblity ? "text" : "password"}
                          onChange={(e: any) => setPassword(e.target.value)}
                          onKeyPress={(e: any) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSignup();
                            }
                          }}
                          sx={{
                            fontFamily: "Regular",
                            backgroundColor: "rgba(60, 60, 60, 0.8)", // semi-transparent muted gray
                            color: "rgba(173, 216, 230, 1)",
                            marginBottom: "5px",
                          }}
                          endDecorator={
                            <IconButton
                              variant="solid"
                              sx={{
                                backgroundColor: "transparent",
                                ":hover": {
                                  backgroundColor: "transparent",
                                },
                              }}
                              onClick={() => {
                                setPassVisiblity(!passVisiblity);
                              }}
                            >
                              {passVisiblity ? (
                                <Eye weight="duotone" size={20} />
                              ) : (
                                <EyeClosed weight="duotone" size={20} />
                              )}
                            </IconButton>
                          }
                        />
                      </FormControl>

                      <div />
                      <Button
                        sx={{
                          width: "100%",
                          marginTop: "15px",
                          marginBottom: "10px",
                          fontFamily: "Regular",
                          backgroundColor: "rgba(173, 216, 230, 1)",
                          color: "black",
                        }}
                        // onClick={handleLogin}
                        onClick={handleSignup}
                        variant="solid"
                      >
                        Sign Up
                      </Button>
                    </form>
                  ) : (
                    <form>
                      <FormControl required>
                        <FormLabel
                          sx={() => ({
                            fontFamily: "Regular",
                            marginTop: "15px",
                            color: "rgba(173, 216, 230, 1)",
                          })}
                        >
                          Email
                        </FormLabel>
                        <Input
                          variant="solid"
                          type="email"
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                          sx={{
                            fontFamily: "Regular",
                            backgroundColor: "rgba(60, 60, 60, 0.8)",
                            color: "rgba(173, 216, 230, 1)",
                          }}
                        />
                      </FormControl>
                      <FormControl required>
                        <FormLabel
                          sx={() => ({
                            fontFamily: "Regular",
                            marginTop: "5px",
                            color: "rgba(173, 216, 230, 1)",
                          })}
                        >
                          Password
                        </FormLabel>
                        <Input
                          variant="solid"
                          type={passVisiblity ? "text" : "password"}
                          value={password}
                          onChange={(e: any) => setPassword(e.target.value)}
                          onKeyPress={(e: any) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleLogin();
                            }
                          }}
                          sx={{
                            fontFamily: "Regular",
                            backgroundColor: "rgba(60, 60, 60, 0.8)",
                            color: "rgba(173, 216, 230, 1)",
                            marginBottom: "5px",
                          }}
                          endDecorator={
                            <IconButton
                              variant="solid"
                              sx={{
                                backgroundColor: "transparent",
                                ":hover": {
                                  backgroundColor: "transparent",
                                },
                              }}
                              onClick={() => {
                                setPassVisiblity(!passVisiblity);
                              }}
                            >
                              {passVisiblity ? (
                                <Eye weight="duotone" size={20} />
                              ) : (
                                <EyeClosed weight="duotone" size={20} />
                              )}
                            </IconButton>
                          }
                        />
                      </FormControl>
                      <Popover content={content} style={{ zIndex: "9999" }}>
                        <span
                          style={{
                            fontFamily: "Regular",
                            fontSize: "13px",
                            marginTop: "15px",
                            cursor: "pointer",
                          }}
                        >
                          Having trouble signing in?
                        </span>
                      </Popover>
                      <div />
                      <Button
                        sx={{
                          width: "100%",
                          marginTop: "15px",
                          marginBottom: "10px",
                          fontFamily: "Regular",
                          backgroundColor: "rgba(173, 216, 230, 1)",
                          color: "black",
                        }}
                        /* color="primary" */
                        // onClick={handleLogin}
                        onClick={handleLogin}
                        variant="solid"
                      >
                        Sign In
                      </Button>
                    </form>
                  )}
                  <div
                    style={{
                      marginTop: "5px",
                      textAlign: "center",
                      fontSize: "15px",
                    }}
                  >
                    {isSignupMode ? (
                      <>
                        <span style={{ fontFamily: "Regular" }}>
                          Already have an account?{" "}
                        </span>
                        <button
                          onClick={toggleMode}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "white",
                            fontFamily: "Bold",
                          }}
                        >
                          Login
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={{ fontFamily: "Regular" }}>
                          Don't have an account?{" "}
                        </span>
                        <button
                          onClick={toggleMode}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "white",
                            fontFamily: "Bold",
                          }}
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "Regular",

                      width: "100%",
                      display: "flex",
                      marginTop: "5px",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ margin: "auto", fontSize: "15px" }}>
                      Made with ❤️ from Aveers
                    </span>
                    {/* <text style={{ margin: "auto", fontSize: "12px" }}>
                      Designed by Aveers Team | <u>v1.0</u> by Sukirtharajan P M
                    </text> */}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default Login;
