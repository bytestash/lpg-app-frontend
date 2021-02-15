import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductsFromBackend } from "../actions/index";

export class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProductsFromBackend();
    }

    render() {

        return (
            <ul>
                {this.props.products.map(product => (
                    <li key={product.name}>{product.name}</li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productCollection._embedded.products
    };
}

export default connect(
    mapStateToProps,
    { getProductsFromBackend }
)(ProductList);