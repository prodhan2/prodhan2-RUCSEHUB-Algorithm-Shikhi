import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  Link,
} from '@mui/material';
import Head from 'next/head';
import { Email, GitHub } from '@mui/icons-material';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'prodhan238@gmail.com',
        },
        publicKey
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Email Error:', err);
      setError('Failed to send email. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - See Algorithms</title>
        <meta
          name="description"
          content="Get in touch with See Algorithms - We'd love to hear your feedback, questions, or suggestions."
        />
      </Head>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 6 }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight={600} align="center">
          Contact Us
        </Typography>

        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
          We&apos;d love to hear from you! Send us a message and we&apos;ll respond as soon as possible.
        </Typography>

        <Box sx={{ mt: 6 }}>
          <Grid container spacing={4}>
            {/* Form Section */}
            <Grid item xs={12} md={8}>
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Send us a Message
                  </Typography>

                  {submitted && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Thank you for your message! We&apos;ll get back to you soon.
                    </Alert>
                  )}

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          size="small"
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          size="small"
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          size="small"
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          placeholder="Tell us about your question, feedback, or suggestion..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          size="large"
                        >
                          {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Info Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Email */}
                <Card elevation={2}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight={600}>Email Us</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      For inquiries, feedback, or support:
                    </Typography>
                    <Link href="mailto:prodhan238@gmail.com" sx={{ mt: 1, display: 'block' }}>
                      prodhan238@gmail.com
                    </Link>
                  </CardContent>
                </Card>

                {/* GitHub */}
                <Card elevation={2}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <GitHub color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight={600}>GitHub</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      View source code, report issues, or contribute:
                    </Typography>
                    <Link
                      href="https://github.com/prodhan2"
                      target="_blank"
                      rel="noopener"
                    >
                      github.com/prodhan2
                    </Link>
                    <Typography variant="body2" sx={{ mt: 2, fontWeight: 500 }}>
                      Maintainer: Sujan Prodhan
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}