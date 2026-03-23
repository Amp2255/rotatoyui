import React from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";

const RotateActions = () => {

  const handleAllRotation = () => {
    if (window.confirm("Are you sure you want to rotate all toys?")) {
      axios
        .patch(`/item/rotateAll`)
        .then((res) => {
          if (res.status === 200) {
            alert("Toys rotation updated");
          } else {
            return Promise.reject();
          }
        })
        .catch(() => alert("Something went wrong"));
    }
  };

  const handleStoreAll = () => {
    if (window.confirm("Are you sure you want to store all toys?")) {
      axios
        .patch(`/item/storeAll`)
        .then((res) => {
          if (res.status === 200) {
            alert("Toys status updated");
          } else {
            return Promise.reject();
          }
        })
        .catch(() => alert("Something went wrong"));
    }
  };

  return (
    <div className="table-wrapper">
      <Row>
        <Col className="d-flex gap-2">
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
    </div>
  );
};

export default RotateActions;
