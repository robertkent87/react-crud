class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: 'read',
            productId: null
        };

        this.changeAppMode = this.changeAppMode.bind(this);
    }

    changeAppMode(newMode, productId) {
        this.setState({currentMode: newMode});
        if (productId !== undefined) {
            this.setState({productId: productId});
        }
    }

    render() {
        let modeComponent = <ReadProductsComponent changeAppMode={this.changeAppMode} />;

        switch (this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }

        return modeComponent;
    }
}

ReactDOM.render(
    <MainApp/>,
    document.getElementById('content')
);