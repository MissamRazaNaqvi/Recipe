import React, { useState } from "react";

//imported library
import axios from "axios";
import { Navigate, NavLink as Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


//internal server file
import Objlink from "./backend";

//internal css
import '../css/style.css'

function IngredientList(props) {
    const [inputfield, setInputfield] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    function edit_single_ingredient(id) {
        setInputfield(id)
    }
    async function delete_single_ingredient(index, id, name) {
        let arr = props.whole;
        arr.splice(index, 1)
        await axios.put(`${Objlink.baseUrl}/${id}`, { "id": id, "name": name, "ingredients": arr })
        navigate('/');
    }
    async function submitEditForm(data) {
        // console.log("this is id", props.id)
        // console.log("this is id", props.whole);
        // console.log("this is id", props.name);
        props.whole[inputfield] = data.editField;
        let ingredients = props.whole;
        let name = props.name;
        console.log("ing", ingredients);
        await axios.put(`${Objlink.baseUrl}/${props.id}`, { ingredients, name })
        navigate('/');
    }
    return (
        <tr>
            {
                inputfield == props.index ?
                    <td>
                        <form onSubmit={handleSubmit(submitEditForm)}>
                            <input type="text" {...register('editField')} defaultValue={props.value} />
                            <button type="submit" className="save">Submit</button>
                        </form>
                    </td> :
                    <td>
                        {props.value}
                        <button className="ingridient-edit-btn" onClick={() => edit_single_ingredient(props.index)}>edit</button>
                    </td>}
            <td><button className="ingridient-delete-btn" onClick={() => delete_single_ingredient(props.index, props.id, props.name)}>remove</button></td>
        </tr >
    )
}
export default IngredientList;