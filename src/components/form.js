import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
    <TextField
        floatingLabelText={'Pick the location'}
        floatingLabelFixed
        errorText={touched && error}
        {...input}
        {...custom}
    />);


const styles = {
    root: {
        maxWidth: '320px',
        margin: '0 auto'
    },
    mediumIcon: {
        width: 40,
        height: 40,
        color: '#00bcd4'
    }
};

const SearchForm = props => (
    <form
        style={styles.root}
        onSubmit={props.handleSubmit}
    >

        <Field
            name="location"
            component={renderTextField}
            validate={[props.validate]}
            type="text"
        />
        <IconButton
            type="submit"
            iconStyle={styles.mediumIcon}
            tooltip="Submit"
        >
            <SearchIcon />
        </IconButton>
    </form>
    );


// propTypes

renderTextField.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired
};


export default reduxForm({
    form: 'search'
})(SearchForm);
