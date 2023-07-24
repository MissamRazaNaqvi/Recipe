import React from "react";
//library import
import Swal from "sweetalert2";
import axios from "axios";

//internal files
import IngredientList from "./IngredientList";
import { useNavigate } from "react-router-dom";

//css file 
import '../css/style.css'


function RecipiesList(props) {
    let navigate = useNavigate();

    async function removealert(id) {
        let result = await Swal.fire({
            title: "are you sure",
            text: "product will be deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtomColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "yes.delete it",
        });
        if (result.isConfirmed) {
            DeleteRecipe(id);
            Swal.fire({
                title: "deleted",
                text: "Product deleted",
                icon: "success",
            });
        }
    }
    async function DeleteRecipe(id) {
        axios.delete(`${process.env.REACT_APP_BASEURL}/${id}`)
        navigate('/');
    }
    async function UpdateRecipe(id) {
        // axios.put(`${Objlink.baseUrl}/${}`)
        console.log("click");
        console.log(id)
    }

    return (
        <li className="cart-element">
            <div className="">
                {props.name} </div>
            <table>
                <tbody>
                    {
                        props.ingredients.map((item, index) => (
                            <IngredientList key={index} index={index} id={props.id} name={props.name} whole={props.ingredients} value={item} />
                        ))
                    }
                </tbody>
            </table>
            <div className="ingri-btn">
                <button className="edit-btn" onClick={() => UpdateRecipe(props.id)}>Edit</button>
                <button className="delete-btn" onClick={() => removealert(props.id)}>Delete Recipe</button>
            </div>
        </li>
    )
}

export default RecipiesList