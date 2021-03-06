import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import {getProductsFromBackend, deleteProduct} from "../actions/index";
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export class ProductList extends Component {

    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
        this.handlePerRowsChange = this.handlePerRowsChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.getProductsFromBackend(this.props.sortColumn, this.props.sortDirection, this.props.pageNumber, this.props.pageSize);
    }

    handleSort(column, direction){
        this.props.getProductsFromBackend(column.selector, direction, this.props.pageNumber, this.props.pageSize);
    }

    handleDelete(productId){
        this.props.deleteProduct(productId);
        this.props.getProductsFromBackend(this.props.sortColumn, this.props.sortDirection, this.props.pageNumber, this.props.pageSize);
    }

    handlePerRowsChange(pageSize){
        this.props.getProductsFromBackend(this.props.sortColumn, this.props.sortDirection, this.props.pageNumber, pageSize);
    }

    handlePageChange(pageNumber){
        this.props.getProductsFromBackend(this.props.sortColumn, this.props.sortDirection, pageNumber, this.props.pageSize);
    }

    render() {

        const columns = [
            {
                name: 'Id',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Description',
                selector: 'description',
                sortable: true,
            },
            {
                name: 'Last purchase date',
                selector: 'lastPurchasedDate',
                sortable: true,
                right: true,
            },
            {
                name: 'Category',
                selector: 'category.name',
                sortable: true,
                right: true,
            },
            {
                cell: (row) => <Button variant="danger" key={row} onClick={this.handleDelete.bind(this, row._links.self.href)}>Delete</Button>,
                ignoreRowClick: false,
                allowOverflow: true,
                button: true,
            }
        ];

        return (
                <DataTable
                    title="Products"
                    columns={columns}
                    data={this.props.products}
                    onSort={this.handleSort}
                    sortServer={true}
                    pagination
                    paginationServer
                    paginationPerPage={this.props.pageSize}
                    paginationRowsPerPageOptions={[5, 10, 20]}
                    paginationTotalRows={this.props.totalRows}
                    onChangeRowsPerPage={this.handlePerRowsChange}
                    onChangePage={this.handlePageChange}
                />
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productCollection._embedded.products,
        totalRows: state.productCollection.page.totalElements,
        pageSize: state.productCollection.page.size,
        pageNumber: state.productCollection.page.number,
        sortColumn: state.sortColumn,
        sortDirection: state.sortDirection
    }
}

export default connect(
    mapStateToProps,
    { getProductsFromBackend, deleteProduct }
)(ProductList);