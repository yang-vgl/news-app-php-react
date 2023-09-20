import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Setting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    sources: [],
    categories: [],
    authors: [],
  });

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);

  useEffect(() => {
    // Fetch options from your API here
    fetchOptions('sources', setSourceOptions);
    fetchOptions('categories', setCategoryOptions);
    fetchOptions('authors', setAuthorOptions);
  }, []);

  const fetchOptions = async (optionType, setOptions) => {
    try {
      const response = await fetch(`http://localhost:8080/api/news/${optionType}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const options = data[optionType].map((optionType) => ({
        value: optionType,
        label: optionType.charAt(0).toUpperCase() + optionType.slice(1),
      }));
      console.log('options', options);
      setOptions(options);
      setLoadingOptions(false);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };
  const handleChange = (name, selectedOptions) => {
    setFormData({ ...formData, [name]: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
      <div>
        <h2>Set preferences</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="sources">Sources</Label>
            <Select
                id="sources"
                name="sources"
                placeholder="Please select sources"
                isMulti
                options={sourceOptions}
                onChange={(selectedOptions) =>
                    handleChange('sources', selectedOptions)
                }
                value={formData.sources}
            />
          </FormGroup>
          <FormGroup>
            <Label for="categories">Categories</Label>
            <Select
                id="categories"
                name="categories"
                placeholder="Please select categories"
                isMulti
                options={categoryOptions}
                onChange={(selectedOptions) =>
                    handleChange('categories', selectedOptions)
                }
                value={formData.categories}
            />
          </FormGroup>
          <FormGroup>
            <Label for="authors">Authors</Label>
            <Select
                id="authors"
                name="authors"
                placeholder="Please select authors"
                isMulti
                options={authorOptions}
                onChange={(selectedOptions) =>
                    handleChange('authors', selectedOptions)
                }
                value={formData.authors}
            />
          </FormGroup>
          <Button className="mt-2">Submit</Button>
        </Form>
      </div>
  );
};

export default Setting;
