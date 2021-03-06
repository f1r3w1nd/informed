import React from 'react';
import Code from '../../utils/Code';
import withDocs from '../../utils/withDocs';
import readme from './README.md';
import { Form, asField } from '../../../src';

const validate = value => {
  return !value || value.length < 5 ? 'Field must be at least five characters' : null;
};

const ErrorText = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props
  return (
    <React.Fragment>
      <input
        {...rest}
        ref={forwardedRef}
        value={!value && value !== 0 ? '' : value}
        onChange={e => {
          setValue(e.target.value)
          if (onChange) {
            onChange(e)
          }
        }}
        onBlur={e => {
          setTouched()
          if (onBlur) {
            onBlur(e)
          }
        }}
        style={ fieldState.error ? { border: 'solid 1px red' } : null }
      />
      { fieldState.error ? <small style={{color: 'red'}}>{fieldState.error}</small> : null }
    </React.Fragment>
  );
});

const FromScratch = () => (
  <div>
    <Form id="custom-form-2">
      {({ formApi, formState }) => (
        <React.Fragment>
          <label htmlFor="custom-2-name">First name:</label>
          <ErrorText field="name" id="custom-2-name" validate={validate} validateOnChange validateOnBlur />
          <button type="submit">
            Submit
          </button>
          <label>Values:</label>
          <Code language="language-js">
            {JSON.stringify(formState.values, null, 2)}
          </Code>
          <label>Errors:</label>
          <Code language="language-js">
            {JSON.stringify(formState.errors, null, 2)}
          </Code>
        </React.Fragment>
      )}
    </Form>
  </div>
);

export default withDocs( readme, FromScratch );
