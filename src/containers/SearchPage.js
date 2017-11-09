import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchForm from '../components/form';
import WeatherInfo from '../components/weatherInfo';

class SearchPage extends React.Component {

    componentDidMount() {
        this.defaultLocation();
    }

    defaultLocation = () => {
        this.props.getDefaultLocation();
    }

    validate = value => (value ? undefined : 'Required');

    submit = ({ location }, dispatch) =>
         new Promise((resolve, reject) => {
             dispatch({
                 type: 'FETCH_WEATHER',
                 location,
                 resolve,
                 reject
             });
         }).catch((error) => {
             throw new Error(error);
         })

    render() {
        return (
            <div>
                <SearchForm
                    onDefaultLocation={this.defaultLocation}
                    validate={this.validate}
                    onSubmit={this.submit}
                />
                <WeatherInfo
                    images={this.props.images}
                    weather={this.props.weather}
                />
            </div>

        );
    }
}

// propTypes

SearchPage.propTypes = {
    getDefaultLocation: PropTypes.func.isRequired,
    images: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        weather: state.weather,
        images: state.images
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDefaultLocation: () => dispatch({ type: 'GET_DEFAULT_LOCATION' })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
