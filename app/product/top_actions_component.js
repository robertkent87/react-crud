class TopActionsComponent extends React.Component {
    render() {
        return (
            <div>
                <a
                    href="#"
                    onClick={() => this.props.changeAppMode('create')}
                    className="btn btn-primary margin-bottom-1em"
                >
                    Create Product
                </a>
            </div>
        );
    }
}