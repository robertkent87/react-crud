class DeleteProductComponent  extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }


    componentDidMount() {
        $('.page-header h1').text('Delete Product');
    }

    onDelete(e){
        const productId = this.props.productId;
        const url = 'http://rest-api.oo/product/delete.php';

        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: productId})
            })
            .then(response => response.json())
            .then(data => {
                this.props.changeAppMode('read');
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-3'>&nbsp;</div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                        className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                        className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>&nbsp;</div>
            </div>
        );
    }
}
