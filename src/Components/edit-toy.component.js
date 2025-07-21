
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

  const [formValues, setFormValues] = useState({
    name: '',
    category: '',
    status: '',
    notes: '',
    lastRotated: '',
    image: '',
  });

  // Fetch existing toy data to prefill the form
  useEffect(() => {
    console.log('*****Axios response:');
    axios
      .get(`http://localhost:8081/item/id/`,
        {
            params:{
                id: id
            }
        }
      ) 
      .then((res) => {
        const {
          name,
          category,
          status,
          notes,
          lastRotated,
          image
        } = res.data.data;
        setFormValues({
           name: name || '',
        category: category || '',
        status: status || '',
        notes: notes || '',
        lastRotated: lastRotated || '',
        image: image || '',
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Form submission handler
  const onSubmit = (toyObject) => {
    axios
      .patch(`http://localhost:8081/item`,
        toyObject,                 // data goes second
        { params: { id: id } })
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
  const rotateItem=(toyObject)=>{
  if (window.confirm("Are you sure you want to rotate this item?")) {
            axios
      .patch(`http://localhost:8081/item/rotate`,
        formValues,                 // data goes second
        { params: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          
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
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotateToyIcon">
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
