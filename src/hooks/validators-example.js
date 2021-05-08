import _ from "lodash";
import { useState } from "react";

export const validators = {
  // returns true if any of the nested validators are true
  or: validators => value => {
    if (!_.isArray(validators)) {
      throw new Error(
        'the "or" validator expects an array of other validators'
      );
    }
    _.each(validators, v => {
      if (!_.isFunction(v)) {
        throw new Error(
          'expected each argument to the "or" validator to be another validator function'
        );
      }
    });
    return _.chain(validators)
      .map(v => v(value))
      .some()
      .value();
  },

  required: value => _.some(value),

  // eslint-disable-next-line no-control-regex
  email: value =>
    null !==
    String(value).match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    ),
  minLength: minlength => value => value.length >= minlength,
  maxLength: maxlength => value => value.length <= maxlength,
  dashP2PSH: value =>
    null !== String(value).match(/^X[1-9A-HJ-NP-Za-km-z]{33}$/),
  xpub: value => null !== value.match(/^xpub[A-Za-z0-9]{100,120}$/)
};

export function useFormValidation(opts) {
  if (!_.has(opts, "fields")) {
    throw new Error(
      "form validation options should have a fields property object"
    );
  }

  const initialState = opts.state || {};
  _.each(opts.fields, (f, k) => (initialState[k] = initialState[k] || ""));

  const [state, setState] = useState(initialState);
  const [apiErrors, setApiErrors] = useState({});
  const [blurFields, setBlurFields] = useState([]);

  const formErrors = fieldName => {
    const validationSkipper = _.get(
      opts,
      `fields.${fieldName}.validationSkipper`
    );
    if (_.isFunction(validationSkipper) && validationSkipper()) {
      return [];
    }
    let value = state[fieldName];

    // Don't mix backend errors and frontend errors. If there are any backend errors for any fields
    // use them as the error set, otherwise use the frontend validators to determine the error set.

    if (_.some(apiErrors)) {
      const fieldErrors = _.chain(apiErrors)
        .get(fieldName)
        .value();
      if (_.some(fieldErrors)) {
        return fieldErrors;
      }
    } else {
      return _.chain(opts.fields)
        .get(`${fieldName}.validators`)
        .map(([validator, errorMessage]) =>
          validator(value) ? undefined : errorMessage
        )
        .filter()
        .value();
    }
    return [];
  };

  const hasBlur = fieldName => _.includes(blurFields, fieldName);

  const isEmptyForm = () => {
    return !_.chain(opts.fields)
      .map((f, k) => state[k])
      .some()
      .value();
  };

  const formProps = fieldName => ({
    name: fieldName,
    value: state[fieldName],
    disabled: state.isLoading,
    error: (() => {
      if (isEmptyForm()) {
        return false;
      }
      if (hasBlur(fieldName) || _.some(apiErrors)) {
        let errors = formErrors(fieldName);
        return errors.length > 0;
      }
      return false;
    })(),
    helperText: (() => {
      if (isEmptyForm()) {
        return undefined;
      }
      return _.chain(formErrors(fieldName))
        .union([_.get(opts.fields, `${fieldName}.helperText`)])
        .filter()
        .first()
        .value();
    })(),
    onBlur: () => {
      blurFields.push(fieldName);
      setBlurFields(_.cloneDeep(blurFields));
    },
    onChange: x => {
      let value = x;
      if (_.has(x, "target.value")) {
        value = x.target.value;
      }
      if (_.has(apiErrors, fieldName)) {
        setApiErrors(_.omit(apiErrors, fieldName));
      }
      setState({ ...state, [fieldName]: value });
      _.invoke(opts, `fields.${fieldName}.onChange`, value);
    }
  });

  const canSubmit = () => {
    if (state.isLoading) return false;
    return (
      _.chain(opts.fields)
        .map((f, fieldName) => formErrors(fieldName))
        .flatten()
        .value().length === 0
    );
  };

  const data = () => {
    const formData = new FormData();
    _.each(state, (v, k) => formData.set(k, v));
    return formData;
  };

  const json = () => JSON.stringify(state);

  const clear = () => {
    setApiErrors({});
    setBlurFields([]);
    setState(initialState);
  };

  const setLoadingPromise = p => {
    setState({ ...state, isLoading: true });
    return p.then(ret => {
      setState({ ...state, isLoading: false });
      setApiErrors({});
      setBlurFields([]);
      return ret;
    });
  };

  return {
    state,
    clear,
    canSubmit,
    data,
    json,
    field: formProps,
    setLoadingPromise,
    setState,
    setApiErrors
  };
}
