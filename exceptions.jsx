import React from 'react'
import exceptionService from '@app/services/exceptions.service'
import tostada from '@app/helpers/Tostada'
import Home from '@app/components/home/home.jsx'
import { Redirect, BrowserRouter } from 'react-router-dom'

class ExceptionPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            dateId: null
        }

    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });

        if (typeof (Storage) !== 'undefined') {
            this.setState({ counter: localStorage.length + 1 });
            let errorObj = { error: error.stack, type: 'rjx' }
            this.setState({ errorObj: JSON.stringify(errorObj) })
        }
        else {
            exceptionService.create({ error: error.stack, type: 'rjx' })
                .then(() => this.setState({ hasError: true }))
        }

    }

    componentDidUpdate() {
        if (this.state.hasError) {
            if (this.state.counter < 4) {
                const date = new Date();
                const dateId = "_" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + this.state.counter;

                localStorage.setItem(dateId, this.state.errorObj)
                alert('Something Went Wrong')
                window.location.href = '/'
            }
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Error</h1>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ExceptionPage;