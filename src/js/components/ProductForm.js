import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct, getCategoriesFromBackend } from "../actions/index";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function mapDispatchToProps(dispatch) {
    return {
        createProduct: product => dispatch(createProduct(product)),
        getCategoriesFromBackend: ()  => dispatch(getCategoriesFromBackend()),
    };
}
class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCategoriesFromBackend();
    }

    handleSubmit(event) {
        event.preventDefault();


        const category = event.target.elements.category.value;
        const name = event.target.elements.productName.value;
        const lastPurchasedDate = event.target.elements.lastPurchasedDate.value;

        const payload = {
            name,
            category,
            description: name,
            lastPurchasedDate,
            creationDate: lastPurchasedDate,
            updateDate: lastPurchasedDate,
        }
        this.props.createProduct(payload);
    }
    render() {
        return (
            <>
            { this.props.productCreatedSuccessFully &&
                <span>Product was successfully created</span>
            }
            <Form onSubmit={this.handleSubmit} >
                <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="input" />
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select">
                        {this.props.categories.map(category => (
                            <option value={category._links.self.href}>{category.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="lastPurchasedDate">
                    <Form.Label>Last Purchase Date</Form.Label>
                    <Form.Row>
                        <input id={`lastPurchasedDate`} type="datetime-local"/>
                    </Form.Row>
                </Form.Group>
                <Button type="submit" variant="primary" >CREATE</Button>
            </Form>
                </>
     );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categoryCollection._embedded.categories,
        productCreatedSuccessFully: state.productCreatedSuccessFully,
    }
}

const ProductForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedForm);

export default ProductForm;