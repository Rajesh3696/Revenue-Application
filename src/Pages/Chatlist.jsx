import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React, { useEffect } from "react";

const ChatList = ({ chat }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={chat.profilepicture} alt={chat.name} />
      </ListItemAvatar>
      <ListItemText primary={chat.name} secondary={chat.message} />
    </ListItem>
  );
};

export default ChatList;
