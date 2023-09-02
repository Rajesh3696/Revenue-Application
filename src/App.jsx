import { BrowserRouter, Navigate } from "react-router-dom";
import Routes from "./Routes";
import Sidebar from "./Pages/Sidebar";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "./redux/reducers/todos";
import UsersList from "./Pages/LandingPage";
import Header from "./Pages/Header";
function App() {
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
      {location.pathname !== "/homePage" && <Header />}
      {location.pathname === "/homePage" && <UsersList />}
      {/* <Menu
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
            height: "400px",
            marginTop: 4,
            display: "flex",
            justifyContent: "center",
            borderRadius: 8,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Avatar
            alt="User Avatar"
            src={data?.profilepicture}
            sx={{ width: 100, height: 100 }}
          />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {" "}
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            {data?.name}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {" "}
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            {data?.email}
          </Typography>
        </MenuItem>
        <Divider orientation="horizontal" color="black" />
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
                  <MenuItem onClick={() => handleUserClick(user)}>
                    {" "}
                    {user?.name}
                  </MenuItem>
                </Stack>
              </div>
            );
          })}
        <Button
          color="error"
          variant="contained"
          sx={{ borderRadius: 8 }}
          onClick={() => navigate("/homePage")}
        >
          SignOut
        </Button>
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
          xs={3}
          sx={{
            justifyContent: "center",
            padding: "50px",
            direction: "column",
          }}
        >
          <Sidebar />
        </Grid>

        <Grid
          item
          xs={8}
          sx={{
            // display: "flex",
            // justifyContent: "center",
            // direction: "row",
            padding: "50px",
          }}
        >
          <div
            className="user-profile"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {location.pathname == "/profile" ? (
              <Typography>Profile</Typography>
            ) : location.pathname == "/posts" ? (
              <Typography>Posts</Typography>
            ) : location.pathname == "/gallery" ? (
              <Typography>Gallery</Typography>
            ) : location.pathname == "/todo" ? (
              <Typography>ToDo</Typography>
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
              <Typography sx={{ paddingTop: 1, marginLeft: 2 }}>
                {data?.name}
              </Typography>
            </Stack>
          </div>
          <Routes />
        </Grid>
      </Grid> */}
    </>
  );
}

export default App;

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [sortBy, setSortBy] = useState("name");
//   const [filterText, setFilterText] = useState("");
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response1 = await fetch("/branch1.json", {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });
//         const data1 = await response1.json();
//         const response2 = await fetch("/branch2.json", {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });
//         const data2 = await response2.json();
//         const response3 = await fetch("/branch3.json", {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });
//         const data3 = await response3.json();

//         // Combine the data from data1 and data2
//         const combined = [
//           ...data1.products,
//           ...data2.products,
//           ...data3.products,
//         ];
//         const mergedProducts = [];
//         combined.forEach((product) => {
//           const existingProduct = mergedProducts.find(
//             (p) => p.name === product.name
//           );

//           if (existingProduct) {
//             existingProduct.sold += product.sold;
//             // existingProduct.totalRevenue += product.sold;
//           } else {
//             mergedProducts.push({
//               name: product.name,
//               sold: product.sold,
//               unitPrice: product.unitPrice,
//             });
//           }
//         });
//         setProducts(mergedProducts);
//         // setFilteredProducts(mergedProducts);
//       } catch (error) {
//         console.error("Error fetching JSON:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(filterText.trim().toLowerCase())
//   );
//   const sortedProducts = filteredProducts.slice().sort((a, b) => {
//     if (sortOrder === "asc") {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name;
//     }
//   });
//   console.log(products);
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = sortedProducts.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   useEffect(() => {
//     // Calculate total revenue for the filtered products
//     const revenue = currentProducts.reduce(
//       (total, product) => total + product.sold * product.unitPrice,
//       0
//     );
//     setTotalRevenue(revenue);
//   }, [currentProducts]);
//   const totalRevenueForAll = products.reduce(
//     (total, product) => total + product.sold * product.unitPrice,
//     0
//   );
//   const handleHeaderClick = (column) => {
//     if (sortBy === column) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(column);
//       setSortOrder("asc");
//     }
//   };

//   const handleFilterChange = (newFilterTerm) => {
//     if (newFilterTerm === "") {
//       // Reset filter to show all products
//       setFilterText("");
//     } else {
//       setFilterText(newFilterTerm);
//       setCurrentPage(1);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="app">
//         <h1 className="app-title">Revenue Aggregator Application</h1>
//       </div>
//       <div className="filter-input fixed">
//         <input
//           type="text"
//           placeholder="Filter by product name"
//           value={filterText}
//           onChange={(e) => handleFilterChange(e.target.value)}
//         />
//       </div>

//       <div className="product-table">
//         <table>
//           <thead>
//             <tr>
//               <th onClick={() => handleHeaderClick("name")}>Product Name</th>
//               <th>Total Revenue</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.length >= 0
//               ? currentProducts.map((product) => {
//                   return (
//                     <tr key={product.id}>
//                       <td className="product-name-cell">{product.name}</td>
//                       <td>
//                         {(product.sold * product.unitPrice).toLocaleString(
//                           "en-IN",
//                           {
//                             style: "currency",
//                             currency: "INR",
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           }
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })
//               : "No Match Found"}
//           </tbody>
//         </table>
//         <div className="pagination">
//           {Array.from(
//             { length: Math.ceil(sortedProducts.length / itemsPerPage) },
//             (_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentPage(index + 1)}
//                 className={currentPage === index + 1 ? "active" : ""}
//               >
//                 {index + 1}
//               </button>
//             )
//           )}
//         </div>
//       </div>
//       <div className="total-revenue">
//         <span className="total-revenue-label">
//           Total Revenue for Current Page:
//         </span>
//         <span className="total-revenue-amount">
//           {/* we can change the currency format also */}
//           {totalRevenue.toLocaleString("en-IN", {
//             style: "currency",
//             currency: "INR",
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           })}
//         </span>
//       </div>
//       <div className="total-revenue">
//         <span className="total-revenue-label">Total Revenue For All:</span>
//         <span className="total-revenue-amount">
//           {/* we can change the currency format also */}
//           {totalRevenueForAll.toLocaleString("en-IN", {
//             style: "currency",
//             currency: "INR",
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           })}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default ProductList;
