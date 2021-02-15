import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        createProduct: product => dispatch(createProduct(product))
    };
}

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        this.props.createProduct({ title });
        this.setState({ title: "" });
    }
    render() {
        const { title } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit">CREATE</button>
            </form>
        );
    }
}

const ProductForm = connect(
    null,
    mapDispatchToProps
)(ConnectedForm);

export default ProductForm;