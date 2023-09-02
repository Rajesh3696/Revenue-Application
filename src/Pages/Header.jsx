import { BrowserRouter, Navigate } from "react-router-dom";
import Routes from "../Routes";
import Sidebar from "../Pages/Sidebar";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../redux/reducers/todos";
import UsersList from "../Pages/LandingPage";
function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const data = useSelector((state) => state?.todos?.userData);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    axios
      .get("https://panorbit.in/api/users.json")
      .then((response) => {
        // Handle the successful response here
        setUsersList(response.data.users);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, []);
  const handleUserClick = (user) => {
    dispatch(getData(user));
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            width: "300px",
            height: "500px",
            marginTop: 4,
            // display: "flex",
            // justifyContent: "center",
            borderRadius: 8,
          },
        }}
      >
        <Stack display={"flex"} justifyContent={"center"} direction={"row"}>
          <Avatar
            alt="User Avatar"
            src={data?.profilepicture}
            // size="large"
            sx={{ width: 100, height: 100 }}
          />{" "}
        </Stack>
        <Stack display={"flex"} justifyContent={"center"} direction={"row"}>
          <Typography
            variant="body1"
            sx={{ marginLeft: 1, color: "#4A4A4A", fontSize: "18px" }}
          >
            {data?.name}
          </Typography>{" "}
        </Stack>
        <Stack display={"flex"} justifyContent={"center"} direction={"row"}>
          <Typography variant="body1" sx={{ marginLeft: 1, color: "#9A9A9A" }}>
            {data?.email}
          </Typography>
        </Stack>
        <Divider orientation="horizontal" color="black" />
        <Stack
          sx={{
            maxHeight: "250px",
            overflowY: "auto",
            paddingRight: "40px",
            direction: "column",
            // justifyContent: "center",
            display: "flex",
            marginLeft: "6px",
          }}
        >
          {usersList?.length > 0 &&
            usersList.map((user) => {
              return (
                <div key={user?.id}>
                  <Stack direction={"row"}>
                    <Avatar
                      alt="User Avatar"
                      src={user.profilepicture}
                      size="small"
                    />
                    <Typography
                      sx={{
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "8px",
                        marginBottom: "8px",
                        padding: "8px",
                      }}
                      onClick={() => handleUserClick(user)}
                    >
                      {" "}
                      {user?.name}
                    </Typography>
                  </Stack>
                </div>
              );
            })}
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} paddingTop={2}>
          <Button
            variant="contained"
            sx={{ borderRadius: 8, backgroundColor: "#D55151" }}
            onClick={() => navigate("/homePage")}
          >
            Sign Out
          </Button>
        </Stack>
      </Menu>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid
          item
          className="col-md-3"
          // xs={3}
          sx={{
            justifyContent: "center",
            padding: "50px 0px",
            marginLeft: "40px",
            direction: "column",
          }}
        >
          <Sidebar />
        </Grid>

        <Grid
          item
          xs={8}
          sx={{
            padding: "50px",
          }}
        >
          <div
            className="user-profile"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {location.pathname == "/profile" ? (
              <Typography
                sx={{ fontSize: "20px", fontWeight: 600, color: "#545454" }}
              >
                Profile
              </Typography>
            ) : location.pathname == "/posts" ? (
              <Typography
                sx={{ fontSize: "20px", fontWeight: 600, color: "#545454" }}
              >
                Posts
              </Typography>
            ) : location.pathname == "/gallery" ? (
              <Typography
                sx={{ fontSize: "20px", fontWeight: 600, color: "#545454" }}
              >
                Gallery
              </Typography>
            ) : location.pathname == "/todo" ? (
              <Typography
                sx={{ fontSize: "20px", fontWeight: 600, color: "#545454" }}
              >
                ToDo
              </Typography>
            ) : (
              ""
            )}
            <Stack
              direction={"row"}
              onClick={handleMenuOpen}
              sx={{ cursor: "pointer" }}
            >
              <Avatar
                // alt="Remy Sharp"
                src={data?.profilepicture}
                size="small"
              />
              <Typography
                sx={{
                  paddingTop: 1,
                  marginLeft: 2,
                  color: "#4A4A4A",
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                }}
              >
                {data?.name}
              </Typography>
            </Stack>
          </div>
          <Routes />
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
