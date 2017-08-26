import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Field, reduxForm } from 'redux-form'

const styles = {
  CommentForm: {
    marginTop: "39px",
    marginBottom: "24px",
    padding: 0,
  },
  smallBox: {
    backgroundColor: '#fff',
    border: 'solid 1px #e2e2e2',
    boxShadow: 'inset 1px 1px 5px 0 rgba(170, 170, 170, 0.5)',
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    height: '50px',
    lineHeight: '1.44',
    marginBottom: '14px',
    padding: '12px 12px 0',
    resize: 'none',
    width: '616px',
  },
  bigBox: {
    backgroundColor: '#fff',
    border: 'solid 1px #e2e2e2',
    boxShadow: 'inset 1px 1px 5px 0 rgba(170, 170, 170, 0.5)',
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    height: '222px',
    lineHeight: '1.44',
    marginBottom: '14px',
    padding: '12px 12px 0',
    resize: 'none',
    width: '616px',
  },
  submitDiv: {
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#3472b7',
    borderColor: "#3472b7",
    borderRadius: '5px',
    borderStyle: 'none',
    color: '#fff',
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    fontStyle: 'italic',
    height: '36px',
    textAlign: 'center',
    width: '76px',
  },
  errorMessage: {
    color: 'red',
  },
  editProfile: {
    background: 'none',
    border: 'none',
    color: '#3572b7',
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '16px',
    margin: 0,
    padding: 0,
  },
  userName: {
    color: '#000',
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  userInfo: {
    marginBottom: '14px',
  },
  notYou: {
    background: 'none',
    border: 'none',
    color: '#a6a6a6',
    float: 'right',
    fontFamily: 'Circular Std',
    fontSize: '16px',
    margin: 0,
    padding: 0,
  },
  logOut: {
    background: 'none',
    border: 'none',
    color: '#3572b7',
    float: 'right',
    fontFamily: 'Circular Std',
    fontSize: '16px',
    margin: '0 0 0 4px',
    padding: 0,
  },
};

const validate = values => {
  const errors = {};
  if (!values.commentInput) {
    errors.commentInput = 'No Comment Detected';
  } else if (values.commentInput.length > 1000) {
    errors.commentInput = 'Must be 1000 characters or less'
  }
  return errors;
};

const renderField = ({
                       input,
                       type,
                       meta: { touched, error, warning },
                       isExpanded
                     }) =>
  <div>
      <textarea {...input} placeholder="Write a comment..."
                type={type}
                style={isExpanded ? styles.bigBox :
                  styles.smallBox}/>
    {touched &&
    ((error &&
      <span style={styles.errorMessage}>
            {error}
          </span>) ||
      (warning &&
        <span>
              {warning}
            </span>))}

  </div>;

const CommentForm = ({
                       classes,
                       handleSubmit,
                       submitting,
                       activeUser,
                       isExpanded,
                     }) => {
  const editProfile = () => {
    console.log('editing profile');
  };
  const createUserInfo = () => {
    return (
      <div className={classes.userInfo}>
        <p className={classes.userName}>
          {activeUser.firstName} {activeUser.lastName}
        </p>
        <button className={classes.editProfile} onClick={editProfile}>
          Edit Profile
        </button>
        <button className={classes.logOut}>
          Log Out
        </button>
        <p className={classes.notYou}>
          Not You?
        </p>
      </div>
    )
  };
  const createButton = () => {
    return (
      <button type="submit"
              disabled={submitting}
              className={classes.submitButton}>
        Submit
      </button>
    );
  };
  return (
    <Col md={7} lg={7} className={classes.CommentForm}>
      {isExpanded && createUserInfo()}
      <form onSubmit={handleSubmit}>
        <Field name="commentInput"
               type="text"
               component={renderField}
               isExpanded={isExpanded}/>
        <div className={classes.submitDiv}>
          {isExpanded && createButton()}
        </div>
      </form>
    </Col>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isExpanded: state.comments.isExpanded,
});


const smartCommentForm = connect(
  mapStateToProps,
)(injectSheet(styles)(CommentForm));

export default reduxForm({
  form: 'commentForm',
  validate,
})(smartCommentForm);