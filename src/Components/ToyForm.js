
import React, { useState } from "react";
import * as Yup from "yup";
import {
    Formik, Form,
    Field, ErrorMessage, useFormikContext
} from "formik";
import {
    FormGroup,
    Button
} from "react-bootstrap";
import { analyzeImage } from "../utils/analyzeImage";

const ImageUploadField = () => {
    const { setFieldValue, values, errors, touched } = useFormikContext();
    const [analyzing, setAnalyzing] = useState(false);
    const [analyzeError, setAnalyzeError] = useState(null);

    const handleChange = async (e) => {
        const file = e.currentTarget.files[0];
        if (!file) return;
        setFieldValue('image', file);
        setAnalyzeError(null);
        setAnalyzing(true);
        try {
            const suggestions = await analyzeImage(file);
            if (suggestions.name) setFieldValue('name', suggestions.name);
            if (suggestions.category) setFieldValue('category', suggestions.category);
            if (suggestions.notes) setFieldValue('notes', suggestions.notes);
        } catch (err) {
            setAnalyzeError('Image analysis failed. Fill in details manually.');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <FormGroup>
            <label htmlFor="image">Image</label>
            <input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg"
                className="form-control"
                onChange={handleChange}
            />
            {analyzing && (
                <small className="text-muted d-block mt-1">Analyzing image...</small>
            )}
            {analyzeError && (
                <small className="text-warning d-block mt-1">{analyzeError}</small>
            )}
            {values.image && (
                <img
                    src={values.image instanceof File ? URL.createObjectURL(values.image) : values.image}
                    alt="preview"
                    style={{ marginTop: 8, maxHeight: 120 }}
                />
            )}
            {touched.image && errors.image && (
                <span className="d-block invalid-feedback">{errors.image}</span>
            )}
        </FormGroup>
    );
};

const ToyForm = ({ onCancel, ...props }) => {
    const validationSchema =
        Yup.object().shape({
            name: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            notes: Yup.string().required("Required"),
            status: Yup.string().required("Required"),
            lastRotated: Yup.string().required("Required"),
            image: Yup.mixed().test('is-jpeg', 'Only JPEG images are allowed', val => !val || typeof val === 'string' || val.type === 'image/jpeg'),
        });
    
    return (
        <div className="form-wrapper">
            <Formik {...props}
                validationSchema={validationSchema}>
                <Form>
                    <ImageUploadField />
                    <FormGroup>
                        <label htmlFor="name">Name</label>
                        <Field name="name" type="text" placeholder="Name"
                            className="form-control" />
                        <ErrorMessage
                            name="name"
                            className="d-block 
                                invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
  <label htmlFor="category">Category</label>
  <Field name="category" as="select" className="form-control">
    <option value="">Select category</option>
    <option value="cars">Cars</option>
    <option value="game">Electronic</option>
    <option value="puzzle">Puzzle</option>
    <option value="art">Art Item</option>
    <option value="book">Books</option>
    <option value="boardgames">Board Games/Cards</option>
    <option value="softtoys">Soft Toys</option>
    <option value="other">Others</option>
  </Field>
  <ErrorMessage
    name="category"
    className="d-block invalid-feedback"
    component="span"
  />
</FormGroup>

                    <FormGroup>
                        <label htmlFor="status">Status</label>
                         <Field name="status" placeholder="Status" as="select" className="form-control">
    <option value="">Select status</option>
    <option value="stored">Stored</option>
    <option value="In Rotation">In Rotation</option>
  </Field>
                        <ErrorMessage
                            name="status"
                            className="d-block 
                                invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="notes">Notes</label>
                        <Field name="notes" placeholder="Notes"
                            type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="notes"
                            className="d-block 
                                invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>

                       <label htmlFor="lastRotated">Last Rotated On</label>
  <Field
    name="lastRotated"
    type="date"
    className="form-control"
  />
                        <ErrorMessage
                            name="lastRotated"
                            className="d-block 
                                invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <div className="d-flex gap-2">
                        <Button variant="danger" size="sm" type="submit">
                            {props.children}
                        </Button>
                        {onCancel && (
                            <Button variant="secondary" size="sm" type="button" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                    </div>
                    
                </Form>
            </Formik>
           
        </div>
    );
};

export default ToyForm;