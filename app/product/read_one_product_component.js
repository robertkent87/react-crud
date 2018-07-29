class ReadOneProductComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            description: '',
            price: 0,
            category_name: '',
        };
    }

    componentDidMount() {
        const productId = this.props.productId;
        const url = 'http://rest-api.oo/product/read_one.php?id='+productId;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                category_name: data.category_name,
                id: data.id,
                name: data.name,
                description: data.description,
                price: data.price,
            }))
            .catch(error => console.error(error));

        $('.page-header h1').text('Read Product');
    }

    render() {
        return (
            <div>
                <a
                    href="#"
                    onClick={() => this.props.changeAppMode('read')}
                    className="btn btn-primary margin-bottom-1em">
                    Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>{this.state.description}</td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>${parseFloat(this.state.price).toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>{this.state.category_name}</td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}