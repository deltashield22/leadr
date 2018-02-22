class ServiceInfoBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            services: null
        }
        this.handleScrolling = this.handleScrolling.bind(this);
    }

    componentDidMount() {

        providerServiceService.readByProviderId(this.props.providerId)
            .then(result => {
                this.setState({ services: result.items })
                this.handleScrolling();
            })
            .catch(err => {
                tostada.toaster({
                    message: 'Failed to get services',
                    level: 'error'
                })
            })
    }

    handleScrolling() {

        setTimeout(() => {
            if (location.hash) {
                let id = location.hash.slice(1);

                const hashString = ("#\\" + hexString(id))
                function hexString(string) {
                    let newStr = string.charCodeAt(0).toString(16)
                    let spaceStr = newStr + " " + string.substr(1)

                    return spaceStr;
                }

                const hashQuery = document.querySelector(hashString)
                const hashPosition = hashQuery.getBoundingClientRect();

                const navbarQuery = document.querySelector('#topNav')
                const navbarPosition = navbarQuery.getBoundingClientRect();
                const top = hashPosition.top - navbarPosition.height

                window.scrollBy(0, top);
            }
        }, 0);
    }

    render() {
        let serviceText = <div></div>
        let requirementsText = <div></div>
        let expectationsText = <div></div>

        if (this.state.services) {
            serviceText = this.state.services.map((item, index) => {
                if (item.requirements && item.requirements.length > 0) {
                    requirementsText = item.requirements.map(item => {
                        return (
                            <li key={item}><i className="fa fa-check"></i>{item}</li>
                        )
                    })
                }

                if (item.expectations && item.expectations.length > 0) {
                    expectationsText = item.expectations.map(item => {
                        return (
                            <li key={item}><i className="fa fa-plus-square"></i>{item}</li>
                        )
                    })
                }

                return (
                    <div key={item._id}>
                        <div  className="heading-title heading-border-bottom heading-color">
                            <h2 id={item._id} className="size-20"><span>{index + 1}. </span>{item.name}</h2>
                        </div>

                        <div className="margin-bottom-80">
                            <p>{item.description}</p>

                            <h5>{item.requirements && item.requirements.length > 0 ? 'REQUIREMENTS' : ''}</h5>
                            <ul className="list-unstyled list-icons">
                                {requirementsText}
                            </ul>

                            <h5>{item.expectations && item.expectations.length > 0 ? 'WHAT WE EXPECT?' : ''}</h5>
                            <ul className="list-unstyled list-icons">
                                {expectationsText}
                            </ul>

                            <a href="#lead-form" className="btn btn-3d btn-sm btn-black scrollTo" data-offset="150"><i className="fa fa-check"></i> APPLY NOW</a>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div>
                {serviceText}
            </div>
        )
    }
}

export default ServiceInfoBox