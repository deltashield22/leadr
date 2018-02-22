import React from 'react'
import PropTypes from 'prop-types'
import ServiceDropdown from '@app/components/provider-service/provider-service-dropdown.component.jsx'
import Form from 'react-jsonschema-form'
import { BrowserRouter, Link } from 'react-router-dom'
import ServiceInfoBox from '@app/components/provider-service/services-info-box.component.jsx'
import InputMask from 'react-input-mask'


class ServiceFormDetail extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleSave = this.handleSave.bind(this);
        this.getSelectFromChild = this.getSelectFromChild.bind(this);
    }

    getSelectFromChild(select) {
        this.setState({ selectValue: select });
    }

    handleSave(e) {
        const formData = e.formData;

        let parsedPhone = formData.contact.phone.replace(/[\(\)\-\s]/g, '');
        formData.contact.phone = parsedPhone;
        formData.userId = this.state.currentUser._id;
        formData.serviceId = this.state.selectValue;
        formData.providerId = this.props.providerId;
        formData.status = "Submitted";
        if (this.state.item.fileAttachment) {
            formData.fileAttachment = this.state.item.fileAttachment
        }
        leadService.create(formData)
            .then(response => {
                tostada.toaster({
                    message: "Application received!",
                    level: "success"
                })
                this.setState({
                    item: {}
                })
            })
            .catch(err => {
                tostada.toaster({
                    message: "Failed to submit application!",
                    level: "error"
                })
                console.log(err);
            })
    }

    render() {
        function validate(formData, errors) {
            if (formData.phone) {
                let checkPhone1 = formData.phone;
                let checkPhone2 = checkPhone1.split("").join(" ").search("#")
                if (checkPhone2 > 0) {
                    errors.phone.addError("Invalid Phone Number")
                }
                return errors;
            }
            return errors;
        }

        const phoneNumberMask = (props) => {
            return (
                <InputMask
                    className="form-control"
                    type="string"
                    value={props.value || ""}
                    required={props.required}
                    onChange={(event) => props.onChange(event.target.value)}
                    mask="(999) 999-9999"
                    maskChar="#"
                    alwaysShowMask="true"
                />
            )
        }

        const widgets = {
            phoneNumberMask: phoneNumberMask
        }

        const formSchema = {
            type: 'object',

            properties: {
                type: {
                    type: 'string',
                    title: 'Type',
                    enum: ['Insurance', 'Accounting', 'Payroll', 'Staffing', 'IT Solutions', 'Employee Benefits'],
                    enumNames: ['Insurance', 'Accounting', 'Payroll', 'Staffing', 'IT Solutions', 'Employee Benefits']
                },
                description: {
                    type: 'string',
                    title: 'Description'
                },
                preferedLanguage: {
                    type: 'string',
                    title: 'Preferred Language'
                },

                contact: {
                    title: 'Point of Contact',
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            title: 'Email',
                            format: 'email'
                        },
                        name: {
                            type: 'string',
                            title: 'Name'
                        },
                        phone: {
                            type: 'string',
                            title: 'Phone Number'
                        },
                        ext: {
                            type: 'number',
                            title: 'Ext.'
                        },
                        relationship: {
                            type: 'string',
                            title: 'Relationship'
                        },
                        position: {
                            type: 'string',
                            title: 'Position'
                        }
                    },
                    required: ['name', 'email', 'phone', 'position']
                },

                company: {
                    title: 'Company',
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            title: 'Name'
                        },
                        city: {
                            type: 'string',
                            title: 'City'
                        },
                        state: {
                            type: 'string',
                            title: 'State'
                        }
                    },
                    required: ['name']
                }

            },
            required: ['type']
        }

        const uiSchema = {
            contact: {
                email: {
                    'ui:widget': 'email'
                },
                phone: {
                    'ui:widget': 'phoneNumberMask'
                }
            },
            description: {
                'ui:widget': 'textarea'
            },

        }

        let formSection = (
            <div className="heading-title heading-border-bottom heading-color margin-bottom-20">
                <a href="/admin/login">
                    <span className="pull-right" style={{ color: "3072e0" }}>LOGIN</span>
                </a>
                <h2 className="size-20">APPLY NOW</h2>
            </div>
        )
        if (this.props.currentUser) {
            formSection = (
                <div>
                    <div className="heading-title heading-border-bottom heading-color margin-bottom-20">
                        <h1 className="size-20">SERVICES</h1>
                    </div>

                    <ServiceDropdown providerId={this.props.providerId} callback={this.getSelectFromChild} />

                    <div className="heading-title heading-border-bottom margin-top-30">
                        <h2 id="lead-form" className="size-20">APPLY NOW</h2>
                    </div>

                    <Form
                        noHtml5Validate={true}
                        schema={formSchema}
                        uiSchema={uiSchema}
                        formData={this.props.serviceForm}
                        onSubmit={this.handleSave}
                        onChange={this.props.onChange}
                        widgets={widgets}
                        validate={validate}
                    >
                        <button type="submit" className="btn btn-3d btn-blue btn-xlg btn-block" style={{ marginBottom: 10 }}>
                            SEND APPLICATION
                                <span className="block font-lato">We'll get back to you within 48 hours</span>
                        </button>
                        <button type="button" className="btn btn-3d btn-blue btn-xlg btn-block" onClick={this.props.onClickDeleteRecord}>
                            CLEAR FORM
                        </button>
                    </Form>
                </div>
            )
        }

        return (
            <React.Fragment>
            { formSection }
            </React.Fragment>
        )
    }
}

ServiceFormDetail.contextTypes = {
    store: PropTypes.object
}

export default ServiceFormDetail;

