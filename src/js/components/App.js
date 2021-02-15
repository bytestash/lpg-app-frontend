import React from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

const App = () => (
    <div>
        <div>
            <ProductList />
        </div>
        <div>
            <h2>Create Product</h2>
            <ProductForm />
        </div>
    </div>
);

export default App;