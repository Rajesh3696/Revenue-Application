import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  Menu,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatList from "./Chatlist";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import axios from "axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ChatBubbleOutline } from "@mui/icons-material";
const Profile = () => {
  const data = useSelector((state) => state?.todos?.userData);
  const [usersList, setUsersList] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKKX7fVF9rkrsdVoYh_lDLDvQjSbbMcZc",
  });
  const center = useMemo(
    () => ({
      lat: Number(data?.address?.geo?.lat),
      lng: Number(data?.address?.geo?.lng),
    }),
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
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
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={5}
          sx={{
            borderRight: "1px solid #CCCCCC",
            paddingRight: "20px",
            marginTop: "20px",
          }}
        >
          <Stack display={"flex"} direction={"row"} justifyContent={"center"}>
            <Avatar
              // alt="Remy Sharp"
              src={data?.profilepicture}
              sx={{ width: 200, height: 200 }}
            />
          </Stack>
          <Typography
            sx={{
              color: "#545454",
              fontFamily: "sans-serif",
              fontWeight: 600,
              textAlign: "center",
              fontSize: "24px",
              padding: "12px",
            }}
          >
            {data?.name}
          </Typography>
          <Stack
            // className="user-profile"
            spacing={{ xs: 1, sm: 2 }}
            direction="column"
            useFlexGap
            flexWrap="wrap"
          >
            {" "}
            <Stack direction={"row"}>
              <div className="col-md-4">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  Username
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-4">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.username}
                </Typography>
              </div>
            </Stack>
            <Stack direction={"row"}>
              <div className="col-md-4">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  e-mail
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-4">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.email}
                </Typography>
              </div>
            </Stack>
            <Stack direction={"row"}>
              <div className="col-md-4">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  Phone
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.phone}
                </Typography>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              sx={{ borderBottom: "1px solid #CCCCCC", paddingBottom: "20px" }}
            >
              <div className="col-md-4">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  Website
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.website}
                </Typography>
              </div>
            </Stack>
          </Stack>
          <Stack display={"flex"} direction={"row"} justifyContent={"center"}>
            <Typography
              sx={{
                color: "#9A9A9A",
                fontSize: "20px",
                fontFamily: "sans-serif",
                textAlign: "center",
                fontWeight: 500,
                padding: "20px",
              }}
            >
              Company
            </Typography>
          </Stack>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="column"
            useFlexGap
            flexWrap="wrap"
          >
            <Stack direction={"row"}>
              <div className="col-md-4">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  Name
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.company?.name}
                </Typography>
              </div>
            </Stack>
            <Stack direction={"row"}>
              <div className="col-md-4">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  catchphrase
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.company?.catchPhrase}
                </Typography>
              </div>
            </Stack>
            <Stack direction={"row"}>
              <div className="col-md-4">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  bs
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.company?.bs}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ padding: "40px", marginBottom: "15px" }}>
          <Stack
            direction={"row"}
            justifyContent="flex-start"
            sx={{ marginBottom: "15px", color: "#9A9A9A", fontSize: "20px" }}
          >
            Address
            <div className="col-md-1">:</div>
          </Stack>
          <div className="address-info">
            <Stack
              direction={"row"}
              justifyContent="flex-start"
              sx={{ marginBottom: "15px" }}
            >
              <div className="col-md-2">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  Street{" "}
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.address?.street}
                </Typography>
              </div>
            </Stack>
            <Stack direction={"row"} sx={{ marginBottom: "15px" }}>
              <div className="col-md-2">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  Suite{" "}
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.address?.suite}
                </Typography>
              </div>
            </Stack>
            <Stack direction={"row"} sx={{ marginBottom: "15px" }}>
              <div className="col-md-2">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  City{" "}
                </Typography>{" "}
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                    marginLeft: 1,
                  }}
                >
                  {data?.address?.city}
                </Typography>
              </div>
            </Stack>
            <Stack direction={"row"} sx={{ marginBottom: "15px" }}>
              <div className="col-md-2">
                <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                  Zipcode{" "}
                </Typography>
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-6">
                <Typography
                  sx={{
                    color: "#545454",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {data?.address?.zipcode}
                </Typography>
              </div>
            </Stack>
          </div>
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={10}
            >
              <Marker
                position={{
                  lat: Number(data?.address?.geo?.lat),
                  lng: Number(data?.address?.geo?.lng),
                }}
              />
            </GoogleMap>
          )}
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ marginBottom: "20px" }}
          >
            <div>
              <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                lat <span style={{ padding: "5px" }}>:</span>
              </Typography>{" "}
            </div>
            <div>
              <Typography
                sx={{
                  color: "#545454",
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                }}
              >
                {data?.address?.geo?.lat}
              </Typography>
            </div>
            <div>
              <Typography sx={{ color: "#9A9A9A", fontSize: "20px" }}>
                lng <span style={{ padding: "5px" }}>:</span>
              </Typography>{" "}
            </div>
            <div>
              <Typography
                sx={{
                  color: "#545454",
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                }}
              >
                {data?.address?.geo?.lng}
              </Typography>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <div className="chat-list-container">
        <Stack
          display={"flex"}
          direction={"row"}
          sx={{ backgroundColor: "#2C65C8", color: "#FFFFFF" }}
          alignItems={"center"}
        >
          <ChatBubbleOutline />
          <Typography>Chats</Typography>
          <IconButton sx={{ color: "#FFF" }} onClick={toggleOpen}>
            {isOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
        </Stack>
        <Paper
          elevation={3}
          className={`chat-list ${isOpen ? "open" : "closed"}`}
        >
          <List>
            {usersList.map((chat, index) => (
              <ChatList key={index} chat={chat} />
            ))}
          </List>
        </Paper>
      </div>
    </>
  );
};

export default Profile;
