import React from 'react'
import {connect} from 'react-redux'
import {changeServiceForm, deleteRecord} from '@app/actions/service-form'
import ServiceForm from '@app/components/provider-service/provider-service-form.component.jsx'

const mapStateToProps = state => ({
    serviceForm: state.serviceForm
})

const mapDispatchToProps = {
    onChange: changeServiceForm,
    onClickDeleteRecord: deleteRecord  
}

const ServiceFormContainer = connect(mapStateToProps, mapDispatchToProps)(ServiceForm)

export default ServiceFormContainer;