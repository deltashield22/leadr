import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Link } from 'react-router-dom'
import ServiceInfoBox from '@app/components/provider-service/services-info-box.component.jsx'
import ServiceForm from '@app/containers/service-form.container.jsx'


class ServiceForm extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            companyProfile: {},
            item: {},
            currentUser: null,
            serviceForm: {}
        }
    }

    componentDidMount() {

        providerService.readById(this.props.providerId)
            .then(provider => {
                this.setState({ companyProfile: provider.item })
            })
            .catch((err) => {
                tostada.toaster({
                    message: 'Read provider by id failure - check console for details',
                    level: 'error'
                })
                console.log(err)
            })

        userService.getLoggedInUser()
            .then(user => {
                if (user) {
                    this.setState({ currentUser: user })
                }
            })
            .catch((err) => {
                tostada.toaster({
                    message: 'Get logged in user failed - check console for details',
                    level: 'error'
                })
                console.log(err)
            })
    }



    render() {

        return (
            <section>
                {
                    /*PAGE HEADER 
            	
                    CLASSES:
                    .page-header-xs	= 20px margins
                    .page-header-md	= 50px margins
                    .page-header-lg	= 80px margins
                    .page-header-xlg= 130px margins
                    .dark		= dark page header
                    .light		= light page header	
                    */
                }
                <section className="page-header page-header-2xlg page-header-md noborder dark page-header-parallax parallax-xs-fixed custom-leadr-class bg-img-provider-profile-pic">
                    {/*dark overlay [1 to 9 opacity]*/}
                    <span className="overlay dark-5"></span>
                    <div className="container text-center">

                        <h1 className="size-40 weight-400">{this.state.companyProfile.providerName}</h1>
                        <span className="size-15">BE A PART OF THIS REMARKABLE JOURNEY</span>

                        {/*page tabs*/}
                        <ul className="page-header-tabs list-inline">
                            <li className="custom-leadr-class margin-top-right-5px"><Link to={"/about-us/" + this.props.providerId}>The Company</Link></li>
                            <li className="active custom-leadr-class margin-top-right-5px"><Link to={"/provider-service/" + this.props.providerId}>Our Services</Link></li>
                        </ul>

                    </div>
                </section>
                {/* /PAGE HEADER */}

                {/* 3 Cols */}
                <section>
                    <div className="container">
                        <div className="row">

                            <div className="col-md-4">

                                <div className="heading-title heading-border-bottom heading-color">
                                    <h3>Culture</h3>
                                </div>

                                <p>Fabulas definitiones ei pri per recteque hendrerit scriptorem in errem scribentur mel fastidii propriae philosophia cu mea. Utinam ipsum everti necessitatibus at fuisset splendide.</p>

                            </div>

                            <div className="col-md-4">
                                <div className="heading-title heading-border-bottom heading-color">
                                    <h3>Benefits</h3>
                                </div>
                                <p>Fabulas definitiones ei pri per recteque hendrerit scriptorem in errem scribentur mel fastidii propriae philosophia cu mea. Utinam ipsum everti necessitatibus at fuisset splendide.</p>

                            </div>

                            <div className="col-md-4">
                                <div className="heading-title heading-border-bottom heading-color">
                                    <h3>Opportunity</h3>
                                </div>
                                <p>Fabulas definitiones ei pri per recteque hendrerit scriptorem in errem scribentur mel fastidii propriae philosophia cu mea. Utinam ipsum everti necessitatibus at fuisset splendide.</p>

                            </div>
                        </div>
                    </div>
                </section>
                {/* /3 Cols */}

                {/* 2 Cols: Services Details - Service Form */}
                <section>
                    <div className="container">
                        <div className="row">

                            {/* LEFT */}
                            <div className="col-md-7 col-sm-6">
                                <ServiceInfoBox providerId={this.props.providerId} />
                            </div>

                            {/* RIGHT - FORM */}
                            <div className="col-md-5 col-sm-6">

                                <ServiceForm currentUser={this.state.currentUser} providerId={this.props.providerId}/>

                                <hr className="margin-top-60" />

                                <div className="text-center margin-top-60">
                                    <i className="fa fa-phone fa-3x"></i>
                                    <h1 className="font-raleway nomargin">(800) 123-4567</h1>
                                    <span className="size-15 text-muted">FEEL FREE TO CALL US</span>
                                </div>

                            </div>
                            {/* /RIGHT - FORM */}

                        </div>
                    </div>
                </section>
                {/* 2 Cols: Services Details - Service Form */}

            </section>
        )
    }
}

export default ServiceForm;

