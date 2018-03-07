import React from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import { required } from '../../../utils/validators';

import RenderInput from '../../_forms/RenderInput';

import s from './styles.css';

const VerifyResetPasswordForm = (props) => {
  const {
    handleSubmit,
    invalid,
    fetching,
    method
  } = props;

  const renderTip = () => {
    if (!method) return null;
    if (method === 'google') {
      return (
        <div className={s.tip}>
          To verify signing in - enter PIN code from Google Authenticator
        </div>
      );
    }

    return (
      <div className={s.tip}>
        To verify signing in - enter PIN code from email
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>

      {renderTip()}

      <FormSection name="verification">
        <Field
          component={RenderInput}
          placeholder="Verification code"
          name="code"
          type="text"
          className="pt-input pt-large pt-fill"
          validate={required}/>
      </FormSection>

      <div>
        <Button
          type="submit"
          className="pt-large pt-fill"
          intent={Intent.PRIMARY}
          text="Verify"
          disabled={invalid}
          loading={fetching}/>
      </div>
    </form>
  );
};

const FormComponent = reduxForm({
  form: 'verifyResetPassword',
  initialValues: {
    verification: {
      code: '',
      verificationId: ''
    }
  }
})(VerifyResetPasswordForm);

export default FormComponent;
