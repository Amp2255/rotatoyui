import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ToyForm from "./ToyForm";

const EditToy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    axios
      .get(`/item/${id}`)
      .then((res) => {
        const item = res.data.data;

        setFormValues({
          name: item.name || "",
          category: item.category || "",
          status: item.status || "",
          notes: item.notes || "",
            lastRotated: item.lastRotated
    ? item.lastRotated.split("T")[0]
    : "",
          image: null,                     // new upload
          existingImage: item.image || "", // base64 from backend
          imageName: item.imageName || "", // stored filename
        });
      })
      .catch(() => setFetchError("Failed to load toy data."));
  }, [id]);

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  const onSubmit = (toyObject) => {
    console.log("SUBMIT DATA", toyObject);

    const { image, imageName, existingImage, ...rest } = toyObject;

    const formData = new FormData();
    formData.append(
      "item",
      new Blob([JSON.stringify(rest)], { type: "application/json" })
    );

    if (image instanceof File) {
      // user uploaded a new image
      formData.append("image", image);
      formData.append("imageName", image.name);
    } else {
      // user kept or deleted existing image
      formData.append("imageName", imageName);
      formData.append("existingImage", existingImage);
    }

    axios
      .patch(`/item`, formData, {
        params: { id },
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Toy details successfully updated");
        navigate("/home/toy-list");
      })
      .catch(() => alert("Something went wrong"));
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  if (fetchError)
    return <div className="alert alert-danger">{fetchError}</div>;

  if (!formValues)
    return <div>Loading...</div>; // Formik will NOT render until ready

  return (
    <ToyForm
  initialValues={formValues}
  onSubmit={onSubmit}
  enableReinitialize
  onCancel={() => navigate("/home/toy-list")}
  buttonLabel="Update Toy"
/>

  );
};

export default EditToy;
