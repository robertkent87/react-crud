class ReadProductsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        const url = 'http://rest-api.oo/product/read.php';

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                products: data.records
            }))
            .catch(error => console.error(error));
    }

    componentWillUnmount() {

    }

    render() {
        const filteredProducts = this.state.products;
        $('.page-header h1').text('Read Products');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode}
                />
            </div>
        );
    }
}