// src/Components/create-toy.component.js
import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ToyForm from "./ToyForm";

const CreateToy = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        category: '',
        status: '',
        notes: '',
        lastRotated: '',
        image: '',
    };

    const onSubmit = toyObject => {
        const { image, ...rest } = toyObject;
        const formData = new FormData();
        formData.append('item', new Blob([JSON.stringify(rest)], { type: 'application/json' }));
        if (image instanceof File) {
            formData.append('image', image);
        }

        axios.post(`/item`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                if (res.status === 200) {
                    alert('New toy successfully added');
                    navigate("/toy-list");
                } else {
                    Promise.reject();
                }
            })
            .catch(() => alert('Something went wrong'));
    };

    return (
        <ToyForm initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            Add new toy
        </ToyForm>
    );
};

export default CreateToy;
