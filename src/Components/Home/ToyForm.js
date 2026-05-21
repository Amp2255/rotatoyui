import React, { useState } from "react";
import * as Yup from "yup";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext
} from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { analyzeImage } from "../../utils/analyzeImage";

const ImageUploadField = () => {
  const { setFieldValue, values } = useFormikContext();
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleChange = async (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;

    setFieldValue("image", file);
    setFieldValue("imageName", file.name);

    setAnalyzeError(null);
    setAnalyzing(true);

    try {
      const suggestions = await analyzeImage(file);
      if (suggestions.name) setFieldValue("name", suggestions.name);
      if (suggestions.category) setFieldValue("category", suggestions.category);
      if (suggestions.notes) setFieldValue("notes", suggestions.notes);
    } catch {
      setAnalyzeError("Image analysis failed. Fill in details manually.");
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
        ref={fileInputRef}
      />

      {values.imageName && (
        <small className="text-muted d-block mt-1">
          Selected file: <strong>{values.imageName}</strong>
        </small>
      )}

      {analyzing && <small className="text-muted d-block mt-1">Analyzing image...</small>}
      {analyzeError && <small className="text-warning d-block mt-1">{analyzeError}</small>}

      {(values.image || values.existingImage) && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={
              values.image instanceof File
                ? URL.createObjectURL(values.image)
                : values.existingImage
            }
            alt="preview"
            style={{ marginTop: 8, maxHeight: 120, display: "block" }}
          />

          <button
            type="button"
            className="cancel-image-btn"
            onClick={() => {
              setFieldValue("image", null);
              setFieldValue("existingImage", null);
              setFieldValue("imageName", "");
              setAnalyzeError(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            {/* SVG unchanged */}
            <svg width="22px" height="22px" viewBox="0 0 128 128">
              <path fill="#B0BEC5" d="M64,0C28.656,0,0,28.656,0,64s28.656,64,64,64s64-28.656,64-64S99.344,0,64,0z M64,120 
                  C33.125,120,8,94.875,8,64S33.125,8,64,8s56,25.125,56,56S94.875,120,64,120z"/>
              <title>Delete</title>
              <path fill="#F44336" d="M75.313,64l16.969-16.969c3.125-3.125,3.125-8.195,0-11.313c-3.117-3.125-8.188-3.125-11.313,0L64,52.688 
                  L47.031,35.719c-3.125-3.125-8.195-3.125-11.313,0c-3.125,3.117-3.125,8.188,0,11.313L52.688,64L35.719,80.969 
                  c-3.125,3.125-3.125,8.195,0,11.313c3.117,3.125,8.188,3.125,11.313,0L64,75.313l16.969,16.969c3.125,3.125,8.195,3.125,11.313,0 
                  c3.125-3.117,3.125-8.188,0-11.313L75.313,64z"/>
            </svg>
          </button>
        </div>
      )}
    </FormGroup>
  );
};

const ToyForm = ({ onCancel, ...props }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    notes: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    lastRotated: Yup.string().required("Required"),
    image: Yup.mixed().nullable()
    .test(
      "is-jpeg",
      "Only JPEG images are allowed",
      (val) => !val || typeof val === "string" || val.type === "image/jpeg"
    ),
    existingImage: Yup.string().nullable(),
  });

  return (
    <div className="form-wrapper">
      {/* <Formik
  initialValues={props.initialValues}
  onSubmit={props.onSubmit}
  enableReinitialize={props.enableReinitialize}
  validationSchema={validationSchema}> */}
    <Formik
  initialValues={props.initialValues}
  enableReinitialize={props.enableReinitialize}
  validationSchema={validationSchema}
  validate={(values) => {
    console.log("VALIDATING", values);
    return {};
  }}
  onSubmit={(values) => {
    console.log("FORM SUBMITTED");
    props.onSubmit(values);
  }}
><FormikForm>  
    <ImageUploadField />
    <FormGroup>
      <label htmlFor="name">Name</label>
      <Field id="name" name="name" type="text" className="form-control" />
      <ErrorMessage name="name" className="d-block invalid-feedback" component="span" />
    </FormGroup>
    <FormGroup>
      <label htmlFor="category">Category</label>
      <Field id="category" name="category" as="select" className="form-control">
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
      <ErrorMessage name="category" className="d-block invalid-feedback" component="span" />
    </FormGroup>
    <FormGroup>
      <label htmlFor="status">Status</label>
      <Field id="status" name="status" as="select" className="form-control">
        <option value="">Select status</option>
        <option value="stored">Stored</option>
        <option value="In Rotation">In Rotation</option>
      </Field>
      <ErrorMessage name="status" className="d-block invalid-feedback" component="span" />
    </FormGroup>
    <FormGroup>
      <label htmlFor="notes">Notes</label>
      <Field id="notes" name="notes" type="text" className="form-control" />
      <ErrorMessage name="notes" className="d-block invalid-feedback" component="span" />
    </FormGroup>
    <FormGroup>
      <label htmlFor="lastRotated">Last Rotated On</label>
      <Field id="lastRotated" name="lastRotated" type="date" className="form-control" />
      <ErrorMessage name="lastRotated" className="d-block invalid-feedback" component="span" />
    </FormGroup>
    <ErrorMessage name="name" component="div" />
<ErrorMessage name="category" component="div" />
<ErrorMessage name="status" component="div" />
<ErrorMessage name="notes" component="div" />
<ErrorMessage name="lastRotated" component="div" />
<ErrorMessage name="image" component="div" />
    <Button type="submit">{props.buttonLabel}</Button>
  </FormikForm></Formik>
    </div>
  );
};

export default ToyForm;
