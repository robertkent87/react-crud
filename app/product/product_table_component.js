class ProductsTable extends React.Component {
    render() {
        let rows = this.props.products
            .map((product, i) => {
                return (
                    <ProductRow
                        key={i}
                        product={product}
                        changeAppMode={this.props.changeAppMode}
                    />
                )
            });

        return (
            !rows.length
                ? <div className='alert alert-danger'>No products found</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
}