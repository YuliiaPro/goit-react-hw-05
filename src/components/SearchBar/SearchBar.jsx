import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  const notify = () => {
    toast.error("Please enter a search query!");
  };
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (!values.query) notify();
        else {
          onSearch(values.query);
          actions.resetForm();
        }
      }}
    >
      <Form>
        <Field
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search videos"
        ></Field>
        <button type="submit">Search</button>
        <Toaster />
      </Form>
    </Formik>
  );
}
