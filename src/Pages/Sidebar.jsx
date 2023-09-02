import React from "react";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import InboxIcon from "@mui/icons-material/Inbox";
// import MailIcon from "@mui/icons-material/Mail";
import Profile from "../Pages/Profile";
import Posts from "../Pages/Posts";
import Gallery from "../Pages/Gallery";
import ToDo from "../Pages/ToDo";
function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {location?.pathname != "/homePage" && (
        <Box
          sx={{
            width: 280, // Width of the sidebar
            backgroundColor: "#4054C8", // Blue background color
            color: "white", // Text color
            height: 800,
            borderRadius: 8,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List>
            <ListItemButton
              onClick={() => {
                navigate(`/profile`);
              }}
            >
              <ListItemText primary="Profile" className="user-name" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`/posts`);
              }}
            >
              <ListItemText primary="Posts" className="user-name" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`/gallery`);
              }}
            >
              <ListItemText primary="Gallery" className="user-name" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`/todo`);
              }}
            >
              <ListItemText primary="ToDo" className="user-name" />
            </ListItemButton>
          </List>
        </Box>
      )}
    </>
  );
}

export default Sidebar;
