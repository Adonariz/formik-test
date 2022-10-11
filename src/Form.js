import { useFormik } from "formik";
import * as yup from "yup";

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      amount: 0,
      currency: "",
      text: "",
      terms: false,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Минимум 2 символа")
        .required("Обязательное поле!"),
      email: yup
        .string()
        .email("Некорректный e-mail!")
        .required("Обязательное поле!"),
      amount: yup.number().min(5, "Не менее 5").required("Обязательное поле!"),
      currency: yup.string().required("Выберите валюту"),
      text: yup.string().min(10, "Не менее 10 символов"),
      terms: yup
        .boolean()
        .required("Необходимо согласие")
        .oneOf([true], "Необходимо согласие"),
    }),
    onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
  });

  const errorMsgStyle = { marginTop: "0.5em", color: "tomato" };

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Отправить пожертвование</h2>

      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.errors.name && formik.touched.name ? (
        <div style={errorMsgStyle}>{formik.errors.name}</div>
      ) : null}

      <label htmlFor="email">Ваша почта</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.errors.email && formik.touched.email ? (
        <div style={errorMsgStyle}>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="amount">Количество</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.errors.amount && formik.touched.amount ? (
        <div style={errorMsgStyle}>{formik.errors.amount}</div>
      ) : null}

      <label htmlFor="currency">Валюта</label>
      <select
        id="currency"
        name="currency"
        value={formik.values.currency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="">Выберите валюту</option>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="RUB">RUB</option>
      </select>

      {formik.errors.currency && formik.touched.currency ? (
        <div style={errorMsgStyle}>{formik.errors.currency}</div>
      ) : null}

      <label htmlFor="text">Ваше сообщение</label>
      <textarea
        id="text"
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.errors.text && formik.touched.text ? (
        <div style={errorMsgStyle}>{formik.errors.text}</div>
      ) : null}

      <label className="checkbox">
        <input
          name="terms"
          type="checkbox"
          value={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        Соглашаетесь с политикой конфиденциальности?
      </label>

      {formik.errors.terms && formik.touched.terms ? (
        <div style={errorMsgStyle}>{formik.errors.terms}</div>
      ) : null}

      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;
