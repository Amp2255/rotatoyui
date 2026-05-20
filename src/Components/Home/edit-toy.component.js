
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
 
  if (fetchError) return <div className="alert alert-danger">{fetchError}</div>;
  if (!formValues) return <div>Loading...</div>;

  return (
   <div>
       <ToyForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
      onCancel={() => navigate("/toy-list")}
    >
      Update Toy
    </ToyForm>
      </div>
     
  );
};

export default EditToy;
