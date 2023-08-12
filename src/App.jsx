import React, { useState, useEffect } from "react";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [filterText, setFilterText] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("/branch1.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data1 = await response1.json();
        const response2 = await fetch("/branch2.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data2 = await response2.json();
        const response3 = await fetch("/branch3.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data3 = await response3.json();

        // Combine the data from data1 and data2
        const combined = [
          ...data1.products,
          ...data2.products,
          ...data3.products,
        ];
        const mergedProducts = [];
        combined.forEach((product) => {
          const existingProduct = mergedProducts.find(
            (p) => p.name === product.name
          );

          if (existingProduct) {
            existingProduct.sold += product.sold;
            // existingProduct.totalRevenue += product.sold;
          } else {
            mergedProducts.push({
              name: product.name,
              sold: product.sold,
              unitPrice: product.unitPrice,
            });
          }
        });
        setProducts(mergedProducts);
        // setFilteredProducts(mergedProducts);
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };

    fetchData();
  }, []);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterText.trim().toLowerCase())
  );
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name;
    }
  });
  console.log(products);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    // Calculate total revenue for the filtered products
    const revenue = currentProducts.reduce(
      (total, product) => total + product.sold * product.unitPrice,
      0
    );
    setTotalRevenue(revenue);
  }, [currentProducts]);
  const totalRevenueForAll = products.reduce(
    (total, product) => total + product.sold * product.unitPrice,
    0
  );
  const handleHeaderClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (newFilterTerm) => {
    if (newFilterTerm === "") {
      // Reset filter to show all products
      setFilterText("");
    } else {
      setFilterText(newFilterTerm);
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <div className="app">
        <h1 className="app-title">Revenue Aggregator Application</h1>
      </div>
      <div className="filter-input fixed">
        <input
          type="text"
          placeholder="Filter by product name"
          value={filterText}
          onChange={(e) => handleFilterChange(e.target.value)}
        />
      </div>

      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleHeaderClick("name")}>Product Name</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length >= 0
              ? currentProducts.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td className="product-name-cell">{product.name}</td>
                      <td>
                        {(product.sold * product.unitPrice).toLocaleString(
                          "en-IN",
                          {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>
                    </tr>
                  );
                })
              : "No Match Found"}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(sortedProducts.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      <div className="total-revenue">
        <span className="total-revenue-label">
          Total Revenue for Current Page:
        </span>
        <span className="total-revenue-amount">
          {/* we can change the currency format also */}
          {totalRevenue.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="total-revenue">
        <span className="total-revenue-label">Total Revenue For All:</span>
        <span className="total-revenue-amount">
          {/* we can change the currency format also */}
          {totalRevenueForAll.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}

export default ProductList;
