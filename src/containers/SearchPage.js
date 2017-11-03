import React from 'react'
import { connect } from 'react-redux'
import SearchForm from '../components/form';
import WeatherInfo from '../components/weatherInfo';
import { Field, reduxForm, SubmissionError } from 'redux-form';

class SearchPage extends React.Component {

    componentDidMount () {
        this.defaultLocation();
    }

    defaultLocation = () => {
        this.props.getDefaultLocation();
    }

    validate = value => {
        return value ? undefined : 'Required'
    }

    submit = ({location}, dispatch) => {
        // print the form values to the console
        // console.log(location)
        return new Promise((resolve,reject) => {
            dispatch ({
                type: 'FETCH_WEATHER',
                location,
                resolve,
                reject
            })
        }).catch((error) => {
            throw new error(error);
        })
    }

    render() {
        return (
        <div>
            <SearchForm
                onDefaultLocation = {this.defaultLocation}
                validate = {this.validate}
                onSubmit={this.submit} />
            <WeatherInfo
                images = {this.props.images}
                weather = { this.props.weather } />
        </div>

        )
    }
}

function mapStateToProps (state) {
    return {
        weather: state.weather,
        images: state.images
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDefaultLocation: () => dispatch({ type: 'GET_DEFAULT_LOCATION' }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)