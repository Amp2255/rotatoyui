
import React from "react";
import * as Yup from "yup";
import {
    Formik, Form,
    Field, ErrorMessage
} from "formik";
import {
    FormGroup,
    Button
} from "react-bootstrap";

const ToyForm = (props) => {
    const validationSchema =
        Yup.object().shape({
            name: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            notes: Yup.string().required("Required"),
            status: Yup.string().required("Required"),
            lastRotated: Yup.string().required("Required"),
            image: Yup.string().required("Required"),
        });
    console.log("**********",props);
    return (
        <div className="form-wrapper">
            <Formik {...props}
                validationSchema={validationSchema}>
                <Form>
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
    <option value="toy">Toy</option>
    <option value="other">Other</option>
    <option value="game">Game</option>
    <option value="puzzle">Puzzle</option>
    <option value="art">Art Item</option>
    <option value="book">Books</option>
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
                        <label htmlFor="image">Image</label>
                        <Field name="image" placeholder="Image"
                            type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="image"
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
                    <Button variant="danger" size="lg"
                        block="block" type="submit">
                        {props.children}
                    </Button>
                    
                </Form>
            </Formik>
           
        </div>
    );
};

export default ToyForm;