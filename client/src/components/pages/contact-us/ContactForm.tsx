import React from "react";
import { Box, TextField, Button } from "@mui/material";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [values, setValues] = React.useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Subject"
        name="subject"
        value={values.subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Message"
        name="message"
        value={values.message}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        minRows={5}
        required
        slotProps={{
          htmlInput: { maxLength: 500 },
          formHelperText: { sx: { textAlign: "right", m: 0 } },
        }}
        helperText={`${values.message.length}/500`}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Send message
        </Button>
      </Box>
    </Box>
  );
}