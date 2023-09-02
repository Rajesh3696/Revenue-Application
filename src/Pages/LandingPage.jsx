import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  CardContent,
  Grid,
  CardHeader,
  CardMedia,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData } from "../redux/reducers/todos";
function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    // setSelectedUser(user);
    dispatch(getData(user));
    // localStorage.setItem("details", JSON.stringify(user));
    navigate("/profile");
  };
  return (
    <div className="center-container">
      <Card sx={{ width: 600, height: 500, borderRadius: 8 }}>
        <Box className="card-header">
          <Typography variant="h6" className="header-title">
            Select an account
          </Typography>
        </Box>
        <CardContent>
          <div className="user-list-container">
            {usersList?.length > 0 &&
              usersList.map((user) => {
                return (
                  <div key={user?.id}>
                    <Typography
                      variant="h6"
                      className="user-name"
                      onClick={() => handleUserClick(user)}
                    >
                      {user?.name}
                    </Typography>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default UsersList;
