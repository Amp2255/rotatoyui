// src/Components/create-toy.component.js

// CreateToy Component for add new student
// Import Modules
import React,
{
    useState,
    useEffect
} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ToyForm
    from "./ToyForm";

// CreateToy Component
const CreateToy = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] =
        useState(
            {
                name: '',
                category: '',
                status: '',
                notes:'',
                lastRotated:'',
                image:'',
            })
    // onSubmit handler
    const onSubmit =
        toyObject => {
            axios.post(`http://localhost:8081/item`,
        toyObject)
          //  ('http://localhost:8081/item/',toyObject,null)
                .then(res => {
                    if (res.status === 200){
                        alert('New toy successfully added')
                        navigate("/toy-list");
                    }
                    else
                        Promise.reject()
                })
                .catch(err => alert('Something went wrong'))
        }

    // Return student form
    return (
        <ToyForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Add new toy
        </ToyForm>
    )
}

export default CreateToy