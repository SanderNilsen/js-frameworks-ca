import { useMemo, useState } from "react";
import styled from "styled-components";
import { Button } from "../components/ui/Button";
import Card from "../components/ui/Card";

const Wrapper = styled.div`
  max-width: 700px;
  display: grid;
  gap: 1rem;
  margin: 2rem auto;
  `; 

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Field = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  font: inherit;
`;

const Textarea = styled.textarea`
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  font: inherit;
  min-height: 140px;
  resize: vertical;
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const Success = styled.div`
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Contact() {
  const [values, setValues] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    subject: false,
    email: false,
    body: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (values.fullName.trim().length < 3) e.fullName = "Full name must be at least 3 characters.";
    if (values.subject.trim().length < 3) e.subject = "Subject must be at least 3 characters.";
    if (!isValidEmail(values.email)) e.email = "Please enter a valid email address.";
    if (values.body.trim().length < 3) e.body = "Message must be at least 3 characters.";
    return e;
  }, [values]);

  const isFormValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setTouched({ fullName: true, subject: true, email: true, body: true });

    if (!isFormValid) return;

    console.log("Contact form submitted:", values);

    setSubmitted(true);
    setValues({ fullName: "", subject: "", email: "", body: "" });
    setTouched({ fullName: false, subject: false, email: false, body: false });
  }

  return (
    <Wrapper>
      <Card>
      <h1>Contact</h1>
      <p>Send us a message using the form below.</p>

      {submitted && (
        <Success>
          <strong>Message sent!</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>Thanks — we’ll get back to you soon.</p>
        </Success>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Field>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
          />
          {touched.fullName && errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Subject"
          />
          {touched.subject && errors.subject && <ErrorText>{errors.subject}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="name@example.com"
          />
          {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="body">Message</Label>
          <Textarea
            id="body"
            name="body"
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Write your message..."
          />
          {touched.body && errors.body && <ErrorText>{errors.body}</ErrorText>}
        </Field>

        <Button type="submit" disabled={!isFormValid}>
          Send message
        </Button>
      </Form>
      </Card>
    </Wrapper>
  );
}