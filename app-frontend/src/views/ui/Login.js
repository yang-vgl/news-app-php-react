import React, { useState } from 'react';
import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add code to validate and submit the form data
    // For a simple example, we'll just log the data to the console
    console.log('Form Data:', formData);
  };

  return (
      <div>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
                id="email"
                name="email"
                placeholder="Please enter Email"
                type="string"
                onChange={handleChange}
                value={formData.email}
                required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
                id="password"
                name="password"
                placeholder="Please enter password"
                type="string"
                onChange={handleChange}
                value={formData.password}
                required
            />
          </FormGroup>
          <Button className="mt-2">Submit</Button>
        </Form>
      </div>
  );
};

export default Login;