import { Card, CardContent, Checkbox, FormControlLabel } from "@material-ui/core";
import { Formik } from "formik";

import React from "react";
import { EquipmentContext } from "../../providers/equipmentContext";
import cssClasses from "../cssClasses";

const AddEquipment = () => {

    const equipmentService = React.useContext(EquipmentContext);
    const [avatar, setAvatar] = React.useState("");
    const [imgpath, setImgPath] = React.useState("");
    const baseStyles = cssClasses();

    const equipmentForm = {
        name: '',
        description: '',
        features: '',
        price: '',
        rentprice: '',
        rentable: false,
        category: '',
        avatar: '',
        created: new Date()
    };


    const onFormSubmit = (value, { setSubmitting }) => {
        value['avatar'] = avatar;
        console.log(value);
        setSubmitting = true;

        equipmentService.addEquipment(value)

            .then(res => console.log(res));
    }

    const showAvatar = () => {
        if (imgpath) {
            return (
                <img src={imgpath} className="img-fluid" />
            )
        }
    }

    const uploadImage = (event) => {
        const data = new FormData();
        data.append('image', event.target.files[0]);
        setAvatar(event.target.files[0].name);
        equipmentService.uploadImage(data)
            .then(res => console.log(res));

        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // erroMsg = 'Only images are supported.';
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            setImgPath(reader.result);
        };
    }



    return (
        <div className="col-md-10 mx-auto">
            <Card className={baseStyles.card}>
                <CardContent>
                   
                    <Formik
                        initialValues={equipmentForm}
                        onSubmit={onFormSubmit}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>

                                <h3 className="text-center">Add Equipment Here</h3>

                                <div className="row">
                                    <div className="col-md mt-5">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="name" onChange={handleChange} value={values.name} placeholder=" " />
                                            <label htmlFor="name">Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md mt-5">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="price" onChange={handleChange} value={values.price} placeholder=" " />
                                            <label htmlFor="name">Price</label>
                                        </div>
                                    </div>
                                </div>


                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="rentprice" onChange={handleChange} value={values.rentprice} placeholder=" " />
                                    <label htmlFor="name">Rent Price</label>
                                </div>

                                <FormControlLabel
                                    control={<Checkbox checked={values.rentable} value={values.rentable} id="rentable" onChange={handleChange} />}
                                    label="Rentable"
                                />

                      

                                <div className="form-floating mb-3">
                                    <input type="text" list="categories" className="form-control" id="category" onChange={handleChange} value={values.category} placeholder=" " />
                                    <label htmlFor="name">Category</label>
                                </div>
                                <datalist id="categories">
                                    <option value="A" />
                                    <option value="B" />
                                    <option value="C" />
                                </datalist>

                               <div >
                               {showAvatar()}
                                 <input className="form-control" type="file" onChange={uploadImage} />
                               </div>

                                <div className="row">
                                    <div className="col-md">
                                        <div className="form-floating mb-3">
                                            <textarea style={{ height: "100px" }} type="text" className="form-control" id="description" onChange={handleChange} value={values.description} placeholder=" " ></textarea>
                                            <label htmlFor="description">Description</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating mb-3">
                                            <textarea style={{ height: "100px" }} type="text" className="form-control" id="features" onChange={handleChange} value={values.features} placeholder=" " ></textarea>
                                            <label htmlFor="name">Features</label>
                                        </div>
                                    </div>
                                </div>


                                <div className="text-center">
                                    <button className="btn btn-warning mt-5 w-100">Submit</button>
                                </div>



                            </form>
                        )}
                    </Formik>

                </CardContent>
            </Card>
        </div>
    )

}

export default AddEquipment;