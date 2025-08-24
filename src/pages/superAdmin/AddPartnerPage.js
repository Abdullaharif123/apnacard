import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';

// Pakistani phone regex
const pakistaniPhoneRegex = /^(\+92|0)?3[0-9]{9}$/;

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Partner Name is required'),
  logo: Yup.mixed().required('Logo is required'),
  contactNumber: Yup.string()
    .matches(pakistaniPhoneRegex, 'Invalid Pakistani number format')
    .required('Contact Number is required'),
  contactPerson: Yup.string().required('Contact Person Name is required'),
  address: Yup.string().required('Address is required'),
  description: Yup.string().required('Description is required'),
});

function AddPartnerPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      logo: null,
      contactNumber: '',
      contactPerson: '',
      address: '',
      description: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('logo', values.logo);
      formData.append('contactNumber', values.contactNumber);
      formData.append('contactPerson', values.contactPerson);
      formData.append('address', values.address);
      formData.append('description', values.description);

      console.log('Prepared FormData for backend:', values);

      // Example: Post to backend API (replace with actual URL later)
      /*
      fetch('YOUR_BACKEND_URL/api/partner', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Partner added:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      */
    }
  });

  return (
    <Box sx={{ maxWidth: '500px', margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add Partner</Typography>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

        <TextField
          fullWidth
          label="Partner Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 2 }}
        />

        <label>Logo (PNG/JPG/JPEG):</label><br />
        <input
          type="file"
          name="logo"
          accept=".png,.jpg,.jpeg"
          onChange={(event) => {
            formik.setFieldValue('logo', event.currentTarget.files[0]);
          }}
        />
        {formik.errors.logo && <div style={{ color: 'red' }}>{formik.errors.logo}</div>}

        {formik.values.logo && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Preview:</Typography>
            <img
              src={URL.createObjectURL(formik.values.logo)}
              alt="Logo Preview"
              width="100"
              height="100"
            />
          </Box>
        )}

        <TextField
          fullWidth
          label="Contact Number"
          name="contactNumber"
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
          helperText={formik.touched.contactNumber && formik.errors.contactNumber}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Contact Person Name"
          name="contactPerson"
          value={formik.values.contactPerson}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
          helperText={formik.touched.contactPerson && formik.errors.contactPerson}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default AddPartnerPage;
