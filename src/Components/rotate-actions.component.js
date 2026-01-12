import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button,Form, Row, Col } from "react-bootstrap";
import ToysTableRow from "./ToysTableRow";
 
const RotateActions = () =>{
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
      .get("/item", {
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
  

  const handleSearch=(e)=>{
    setCurrentPage(0);
    fetchToys(0, sortBy, sortOrder, searchField);
  }

  const handleAllRotation=()=>{
    
  if (window.confirm("Are you sure you want to rotate all toys?")) {
            axios
      .patch(`/item/rotateAll`)
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
      .patch(`/item/storeAll`)
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
          
          <Col md={4} >
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col></Row>
          <Row md="auto" className="ms-auto d-flex gap-2">
  <Button
    style={{ backgroundColor: "#d17f71" }}
    title="Update all items as Stored?"
    variant="primary"
    onClick={handleStoreAll}
  >
    StoreAll
  </Button></Row>
  <Row md="auto" className="ms-auto d-flex gap-2">
<Button
    style={{ backgroundColor: "#d17f71" }}
    title="Do you want to rotate items that are stored, and vice versa?"
    variant="primary"
    onClick={handleAllRotation}
  >
    RotateAll
  </Button>
  </Row>
  

        
      </Form>

    </div>
  );
};


export default RotateActions;