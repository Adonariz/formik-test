import { Formik, Form, useField } from "formik";
import * as yup from "yup";

const MyTextInput = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>

      {type === "textarea" ? (
        <textarea {...props} {...field} />
      ) : (
        <input {...props} {...field} />
      )}

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...props} {...field} />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "select" });

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <select {...props} {...field}>
        {children}
      </select>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        text: "",
        terms: false,
      }}
      validationSchema={yup.object({
        name: yup
          .string()
          .min(2, "Минимум 2 символа")
          .required("Обязательное поле!"),
        email: yup
          .string()
          .email("Некорректный e-mail!")
          .required("Обязательное поле!"),
        amount: yup
          .number()
          .min(5, "Не менее 5")
          .required("Обязательное поле!"),
        currency: yup.string().required("Выберите валюту"),
        text: yup.string().min(10, "Не менее 10 символов"),
        terms: yup
          .boolean()
          .required("Необходимо согласие")
          .oneOf([true], "Необходимо согласие"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Отправить пожертвование</h2>

        <MyTextInput label="Ваше имя" id="name" name="name" type="text" />
        <MyTextInput label="Ваша почта" id="email" name="email" type="text" />
        <MyTextInput
          label="Количество"
          id="amount"
          name="amount"
          type="number"
        />

        <MySelect label="Валюта" id="currency" name="currency">
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </MySelect>

        <MyTextInput
          label="Ваше сообщение"
          id="text"
          name="text"
          type="textarea"
        />

        <MyCheckbox id="terms" name="terms">
          Соглашаетесь с политикой конфиденциальности?
        </MyCheckbox>

        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
