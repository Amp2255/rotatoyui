
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ToyForm from "./ToyForm";
import {
    Button
} from "react-bootstrap";
const EditToy = () => {
  const { id } = useParams();             // ✅ Get toy ID from route
  const navigate = useNavigate();         // ✅ Navigation after update

  const [formValues, setFormValues] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fetchToy = () => {
    axios
      .get(`/item`, { params: { id: id } })
      .then((res) => {
        console.log('fetch response:', res.data);
        const item = res.data.data?.content?.[0] ?? res.data.data;
        const { name, category, status, notes, lastRotated, image } = item;
        setFormValues({
          name: name || '',
          category: category || '',
          status: status || '',
          notes: notes || '',
          lastRotated: lastRotated || '',
          image: image || '',
        });
      })
      .catch((err) => {
        console.error(err);
        setFetchError('Failed to load toy data. ' + (err.response?.data?.message || err.message));
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
    formData.append('item', new Blob([JSON.stringify(rest)], { type: 'application/json' }));
    if (image instanceof File) {
      formData.append('image', image);
    }

    axios
      .patch(`/item`,
        formData,
        { params: { id: id }, headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        if (res.status === 200) {
          alert("Toy details successfully updated");
          navigate("/toy-list");  // ✅ Redirect using navigate
        } else {
          return Promise.reject();
        }
      })
      .catch(() => alert("Something went wrong"));
  };
  const rotateItem=()=>{
  if (window.confirm("Are you sure you want to rotate this item?")) {
            axios
      .patch(`/item/rotate`,
        formValues,                 // data goes second
        { params: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          fetchToy();
        } else {
          return Promise.reject();
        }
      })
      .catch(() => alert("Something went wrong"));
        };
 }
  if (fetchError) return <div className="alert alert-danger">{fetchError}</div>;
  if (!formValues) return <div>Loading...</div>;

  return (
   <div>
       <ToyForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Toy
      
    </ToyForm>

      <div style={{ marginTop: '20px' }}>
        <Button variant="text" size="sm"
    className="rotateButton"
    onClick={rotateItem}

  >
    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotateToyIcon">
  <polyline points="1 4 1 10 7 10"/>
  <title>Rotate Toy</title>
  <path d="M3.51 15a9 9 0 1 0 2.13-9"/>
</svg>

  </Button>
      </div>
     </div>
  );
};

export default EditToy;
