import React, { useState } from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

const Login = () => {
  const navigate  = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.token)
      navigate('/news');
      window.location.reload()
      setErrorMessage(null);
    } else {
      setErrorMessage('Login failed');
    }
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
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          <Button className="mt-2">Submit</Button>
        </Form>
      </div>
  );
};

export default Login;
