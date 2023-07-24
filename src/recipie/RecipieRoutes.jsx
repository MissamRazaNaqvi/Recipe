import React from "react";

//imported library
import { Routes, Route, Navigate } from "react-router-dom";
import RecipieMain from "./RecipieMain";
//internal files
import EditIngredient from "./EditIngredient";
function RecipieRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<RecipieMain />}></Route>
            <Route path="/" element={<Navigate replace to={'/home'} />}></Route>
            <Route path="/home/:id/:index" element={<EditIngredient />}></Route>
            <Route path="/home/:id" element={<EditIngredient />}></Route>
        </Routes>
    )
}
export default RecipieRoutes;

