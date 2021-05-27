import * as yup from "yup";
import { AppState } from "../../redux/appState";
import { loadCurrencies } from "../../redux/currency/currencyActions";
import { connect } from "react-redux";
import { CurrencyReadDto } from "../../api/currency/currencyDtos";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import "./CreatePersonPage.css";
import {
  emptyPersonReadDto,
  PersonCreateDto,
  PersonReadDto,
} from "../../api/person/personDtos";
import { createPerson, getPerson } from "../../redux/person/personActions";
import ApiCallError from "../../api/apiCallError";
import { Redirect } from "react-router";
import "./CreatePersonPage.css";

interface CreatePersonPageProps {
  currencies: CurrencyReadDto[];
  person: PersonReadDto;
  loadCurrencies: () => Promise<void>;
  getPerson: () => Promise<void>;
  createPerson: (personCreateDto: PersonCreateDto) => Promise<void>;
}

interface CreatePersonFormProps {
  name: string;
  currency: string;
}

const CreatePersonPage: React.FC<CreatePersonPageProps> = ({
  person,
  currencies,
  loadCurrencies,
  getPerson,
  createPerson,
}) => {
  useEffect(() => {
    getPerson().catch(() => {});
    loadCurrencies().catch((error: ApiCallError) =>
      setCurrencyApiErrorMsg(error.message)
    );
  }, [getPerson, loadCurrencies]);

  const [currencyApiErrorMsg, setCurrencyApiErrorMsg] = useState<string>("");

  if (person !== emptyPersonReadDto) return <Redirect to="/" />;

  const createPersonFormValidation = yup.object().shape({
    name: yup.string().required("Required!"),
    currency: yup
      .string()
      .required("Required!")
      .oneOf(
        currencies.map((currency) => currency.abbreviation),
        "Required!"
      ),
  });

  const initialFormValue: CreatePersonFormProps = {
    name: "",
    currency: "",
  };

  const onCreatePersonFormSubmit = (
    values: CreatePersonFormProps,
    formikHelpers: FormikHelpers<CreatePersonFormProps>
  ) => {
    setCurrencyApiErrorMsg("");
    formikHelpers.setSubmitting(true);

    const createPersonDto: PersonCreateDto = {
      name: values.name,
      currencyAbbreviation: values.currency,
    };

    createPerson(createPersonDto).catch((e: ApiCallError) => {
      setCurrencyApiErrorMsg(e.message);
    });

    formikHelpers.setSubmitting(false);
  };

  return (
    <div className="cpp-wrapper">
      <Card className="cpp-form border border-success">
        <Card.Title>
          <span className="cpp-form-title">Create Person</span>
        </Card.Title>
        <Card.Body>
          <Alert show={currencyApiErrorMsg.length !== 0} variant={"danger"}>
            {currencyApiErrorMsg}
          </Alert>
          <Formik
            onSubmit={onCreatePersonFormSubmit}
            initialValues={initialFormValue}
            validationSchema={createPersonFormValidation}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Form.Group>
                  <Form.Control
                    className="cpp-form-name"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    isInvalid={touched.name && !!errors.name}
                    isValid={touched.name && !errors.name}
                    disabled={currencyApiErrorMsg.length !== 0}
                  />
                  <Form.Control.Feedback type={"invalid"}>
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    as="select"
                    className="cpp-form-currency"
                    placeholder="Preferred currency"
                    name="currency"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.currency}
                    isInvalid={touched.currency && !!errors.currency}
                    isValid={touched.currency && !errors.currency}
                    disabled={currencyApiErrorMsg.length !== 0}
                  >
                    <option key={0}>Preferred currency</option>
                    {currencies.map((currency) => (
                      <option key={currency.id}>{currency.abbreviation}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type={"invalid"}>
                    {errors.currency}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="signup-page-signup-button"
                  variant="success"
                  type="submit"
                  disabled={isSubmitting || currencyApiErrorMsg.length !== 0}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    person: state.person,
    currencies: state.currencies,
  };
};

const mapDispatchToProps = {
  loadCurrencies,
  getPerson,
  createPerson,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePersonPage);
