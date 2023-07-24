import React from "react";

// library imported
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";

//server file url
import Objlink from "./backend";

function EditIngredient() {
    let { register, handleSubmit, setValue } = useForm();
    let { id, index } = useParams();
    console.log(id, index)
    let navigate = useNavigate();
    let data_store = null
    async function update_single_ingredient() {
        let { data } = await axios.get(`${Objlink.baseUrl}/${id}`)
        data_store = data;
        setValue('recipie', data.name);
        setValue('ingredient', data.ingredients[index]);
    }
    if (id) {
        update_single_ingredient();
    }
    async function Onsubmit({ ingredient }) {
        data_store.ingredients.splice(index, 1);
        let arr = [...data_store.ingredients, ingredient]
        await axios.put(`${Objlink.baseUrl}/${id}`, { "id": id, "name": data_store.name, "ingredients": arr })
        navigate('/')
    }
    return (
        <>
            <form action="#" onSubmit={handleSubmit(Onsubmit)}>
                <input type="text" placeholder="recipie name" {...register('recipie')} />
                <input type="text" placeholder="ingredient name"{...register('ingredient')} />
                <input type="submit" />
                <button className="cancel"><a href="http://localhost:3000/home">cancel</a></button>
            </form>
        </>
    )
}
export default EditIngredient;