
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ToyForm from "./ToyForm";
const EditToy = () => {
  const { id } = useParams();             // ✅ Get toy ID from route
  const navigate = useNavigate();         // ✅ Navigation after update

  const [formValues, setFormValues] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fetchToy = () => {
  axios
    .get(`/item/${id}`)
    .then((res) => {
      const item = res.data.data;
      setFormValues({
        name: item.name || '',
        category: item.category || '',
        status: item.status || '',
        notes: item.notes || '',
        lastRotated: item.lastRotated || '',
        image: item.image || '',
      });
    })
    .catch((err) => {
      setFetchError("Failed to load toy data.");
    });
};


  useEffect(() => {
    fetchToy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Form submission handler
  const onSubmit = (toyObject) => {
  const { image, ...rest } = toyObject;

  const formData = new FormData();
  formData.append(
    "item",
    new Blob([JSON.stringify(rest)], { type: "application/json" })
  );

  if (image instanceof File) {
    formData.append("image", image);
  } else if (image === null) {
    formData.append("image", "");
  }

  axios
    .patch(`/item`, formData, {
      params: { id },
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      alert("Toy details successfully updated");
      navigate("/home/toy-list");
    })
    .catch(() => alert("Something went wrong"));
};

 
  if (fetchError) return <div className="alert alert-danger">{fetchError}</div>;
  if (!formValues) return <div>Loading...</div>;

  return (
   <div>
       <ToyForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
      onCancel={() => navigate("home/toy-list")}
    >
      Update Toy
    </ToyForm>
      </div>
     
  );
};

export default EditToy;
