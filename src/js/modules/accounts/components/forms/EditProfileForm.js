import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";

const styles = {
  errorMessage: {
    color: 'red',
  },
};

const validate = values => {
  const errors = {};
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Password and password confirmation do not match.';
  }
  return errors;
};

const renderField = ({
                       input,
                       label,
                       type,
                       meta: { touched, error, warning }
                     }) => {
  return (
    <div>
      <label>
        { label }
      </label>
      <div>
        <input { ...input } placeholder={ label } type={ type }/>
        { touched &&
        ((error &&
          <span>
            { error }
          </span>) ||
          (warning &&
            <span>
              { warning }
            </span>)) }
      </div>
    </div>
  );
};

const EditProfileForm = ({ classes, handleSubmit, submitting, errors }) => {
  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={ handleSubmit }>
        <Field name="firstName" type="text" component={ renderField } label="First Name"/>
        <Field name="lastName" type="text" component={ renderField } label="Last Name"/>
        <Field name="email" type="email" component={ renderField } label="Email"/>
        <Field name="password" type="text" component={ renderField } label="Password"/>
        <Field name="passwordConfirmation" type="text" component={ renderField } label="Password Confirmation"/>
        <div>
          <button type="submit" disabled={ submitting }>
            Update
          </button>
        </div>
      </form>
      {
        errors.map((error, index) => {
          return (
            <p key={ index } className={ classes.errorMessage }>
              { error }
            </p>
          );
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({
  errors: state.accounts.errors,
  session: state.accounts.session,
});

const SmartEditProfileForm = connect(
  mapStateToProps,
  null,
)(injectSheet(styles)(EditProfileForm));

export default reduxForm({
  form: 'updateUser',
  validate,
})(SmartEditProfileForm);