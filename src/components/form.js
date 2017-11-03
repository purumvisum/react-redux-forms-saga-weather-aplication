import React from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        hintText={label}
        floatingLabelText={'Pick the location'}
        floatingLabelFixed={ true }
        errorText={touched && error}
        {...input}
        {...custom}
    />
)

const styles = {
    root: {
        maxWidth: '320px',
        margin: '0 auto',
    },
    mediumIcon: {
        width: 40,
        height: 40,
        color: '#00bcd4'
    },
};

let SearchForm = props => {

    return (
        <form
            style={styles.root}
            onSubmit = {props.handleSubmit}>
            <Field
                name="location"
                component= {renderTextField}
                validate={[props.validate]}
                type="text" />

            <IconButton
                type="submit"
                iconStyle={styles.mediumIcon}
                tooltip="Submit">
                <SearchIcon />
            </IconButton>

        </form>
    )}

export default reduxForm({
    form: 'search',
})(SearchForm)
