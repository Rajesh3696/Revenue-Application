import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
const ChatList = ({ chat }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={chat.profilepicture} alt={chat.name} />
      </ListItemAvatar>
      <ListItemText primary={chat.name} secondary={chat.message} />
      <Badge color="success" variant="dot"></Badge>
    </ListItem>
  );
};

export default ChatList;
