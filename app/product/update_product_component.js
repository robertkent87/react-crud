class UpdateProductComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            description: '',
            price: 0,
            successUpdate: null
        };

        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        // read categories
        let url = 'http://rest-api.oo/category/read.php';

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                categories: data.records
            }))
            .catch(error => console.error(error));

        // read one product data
        const productId = this.props.productId;
        url = 'http://rest-api.oo/product/read_one.php?id=' + productId;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                selectedCategoryId: data.category_id,
                id: data.id,
                name: data.name,
                description: data.description,
                price: data.price,
            }))
            .catch(error => console.error(error));

        $('.page-header h1').text('Update product');
    }

    onCategoryChange(e) {
        this.setState({selectedCategoryId: e.target.value});
    }

    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    onPriceChange(e) {
        this.setState({price: e.target.value});
    }

    onSave(e) {
        e.preventDefault();

        const form_data = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
        };

        fetch('http://rest-api.oo/product/update.php',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form_data)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({successUpdate: data['message']});
            })
            .catch(error => console.error(error));
    }


    render() {
        let categoriesOptions = this.state.categories.map(category => {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate == 'Product was updated.' ?
                        <div className='alert alert-success'>
                            Product was updated
                        </div>
                        : null
                }

                {
                    this.state.successUpdate == 'Unable to update product.' ?
                        <div className='alert alert-danger'>
                            Unable to update product, please try again
                        </div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'> Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>

                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    required
                                    onChange={this.onNameChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>
                        <textarea
                            type='text'
                            className='form-control'
                            required
                            value={this.state.description}
                            onChange={this.onDescriptionChange}>
                        </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type='number'
                                    step="0.01"
                                    className='form-control'
                                    value={this.state.price}
                                    required
                                    onChange={this.onPriceChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    onChange={this.onCategoryChange}
                                    className='form-control'
                                    value={this.state.selectedCategoryId}>
                                    <option value="-1">Select category...</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>Save
                                </button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

}