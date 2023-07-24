//imported library
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

//internal file
import Objlink from "./backend";
import RecipiesList from "./RecipiesList";

//css file
import '../css/style.css'

function RecipieMain() {
    let [data_arr, setdata] = useState([]);
    let { register, handleSubmit } = useForm();
    async function get_data() {
        let { data } = await axios.get(Objlink.baseUrl);
        setdata(data);
    }
    async function Onsubmit({ id, name, ingredients }) {
        let arr = ingredients.split(',');
        await axios.post(`${Objlink.baseUrl}`, { 'id': id, 'name': name, 'ingredients': arr })
        get_data();
    }
    useEffect(() => {
        get_data();
    }, [])
    return (
        <div className="form">
            <form action="#" className="addRecipe" onSubmit={handleSubmit(Onsubmit)}>
                <h1>Add Recipe</h1>
                <input type="text" placeholder="ID" {...register('id')} />
                <br />
                <input type="text" placeholder="enter recipe name"{...register('name')} />
                <br />
                <input type="text" placeholder="enter ingredients"{...register('ingredients')} />
                <br />
                <input type="submit" className="submit-btn" />
                <br />
                <br />
            </form>
            {
                data_arr.length > 0 ?
                    <ul className="card">
                        {
                            data_arr.map((item) => (
                                <RecipiesList key={item.id} name={item.name} id={item.id} ingredients={item.ingredients} />
                            ))
                        }
                    </ul>
                    : <div>
                        <h1>No Data Found</h1>
                    </div>
            }
        </div>
    )
}
export default RecipieMain;