import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button,Form, Row, Col } from "react-bootstrap";
import ToysTableRow from "./ToysTableRow";

const ToysList = () => {
  const [toys, setToys] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const pageSize = 5;
  // const [searchName, setSearchName] = useState("");
  // const [searchStatus, setSearchStatus] = useState("");
  const [searchField, setSearchField] = useState("");
  useEffect(() => {
    fetchToys(currentPage, sortBy, sortOrder,searchField);
  }, [currentPage, sortBy, sortOrder,searchField]);

  const fetchToys = (page, sortBy, sortOrder,searchField) => {
    axios
      .get("http://localhost:8081/item", {
        params: {
          page: page,
          size: pageSize,
          sortBy: sortBy,
          sortOrder: sortOrder,
          searchField:searchField
        },
      })
      .then((response) => {
        setToys(response.data.data.content);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const DataTable = () => {
    return toys.map((res, i) => <ToysTableRow obj={res} key={i} />);
  };

  const handleSearch=(e)=>{
    setCurrentPage(0);
    fetchToys(0, sortBy, sortOrder, searchField);
  }

  const handleAllRotation=()=>{
    
  if (window.confirm("Are you sure you want to rotate all toys?")) {
            axios
      .patch(`http://localhost:8081/item/rotateAll`)
      .then((res) => {
        if (res.status === 200) {
          alert("Toys rotation updated");
          window.location.reload();
          //navigate("/toy-list");  // ✅ Redirect using navigate
        } else {
          return Promise.reject();
        }
      })
      .catch(() => alert("Something went wrong"));
        };
 
  }
  const handleStoreAll=()=>{
    
  if (window.confirm("Are you sure you want to store all toys?")) {
            axios
      .patch(`http://localhost:8081/item/storeAll`)
      .then((res) => {
        if (res.status === 200) {
          alert("Toys status updated");
          window.location.reload();
          //navigate("/toy-list");  // ✅ Redirect using navigate
        } else {
          return Promise.reject();
        }
      })
      .catch(() => alert("Something went wrong"));
        };
 
  }

  return (
    
    <div className="table-wrapper">
       <Form style={{ marginBottom: "20px" }}>
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by name or status"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
          </Col>
          {/* <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Col> */}
          {/* <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by status"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            />
          </Col> */}
          <Col md={4} >
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col md="auto" className="ms-auto d-flex gap-2">
  <Button
    style={{ backgroundColor: "#d17f71" }}
    title="Update all items as Stored?"
    variant="primary"
    onClick={handleStoreAll}
  >
    StoreAll
  </Button>
  <Button
    style={{ backgroundColor: "#d17f71" }}
    title="Do you want to rotate items that are stored, and vice versa?"
    variant="primary"
    onClick={handleAllRotation}
  >
    RotateAll
  </Button>
</Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("notes")}>Notes</th>
            <th onClick={() => handleSort("status")}>Status</th>
            <th onClick={() => handleSort("lastRotated")}>LastRotated</th>
            <th onClick={() => handleSort("image")}>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button variant="secondary" onClick={handlePrev} disabled={currentPage === 0}>
          Previous
        </Button>
        <span style={{ padding: "0 10px", alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ToysList;
