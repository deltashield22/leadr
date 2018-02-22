class ServiceDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: ''
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        providerServiceService.readByProviderId(this.props.providerId)
            .then(services => {
                this.setState({ companyServices: services.items })
                this.setState({ selectValue: services.items[0]._id })
                this.props.callback(this.state.selectValue);
            })
            .catch((err) => {
                tostada.toaster({
                    message: 'Read service by id failure- check console for details',
                    level: 'error'
                })
                console.log(err)
            })
    }

    onChange(e) {
        this.setState({ selectValue: e.target.value });
        this.props.callback(e.target.value);
    }


    render() {
        const options = this.state.companyServices ? this.state.companyServices.map(item => {
            return <option key={item._id} value={item._id}>{item.name}</option>
        }) : <option key='1'>Loading...</option>

        return (
            <select className="margin-bottom-20" value={this.props.selectValue}
                onChange={this.onChange}>
                {options}
            </select>
        )
    }
}

export default ServiceDropdown