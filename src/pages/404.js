import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head';

const PageNotFound = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - পাতা পাওয়া যায়নি | RUCSEHUB : অ্যালগরিদম শিখি</title>
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        <Container maxWidth="sm">

          {/* শুধু গিফ — কোনো বর্ডার/শ্যাডো নেই */}
          <Box
            component="img"
            src="https://i.postimg.cc/wvcCDpzF/404-page-What-a-Story.gif"
            alt="404 - Page Not Found"
            sx={{
              width: '100%',
              maxWidth: '420px',
              borderRadius: 0,
              boxShadow: 'none',
              border: 'none',
              mb: 4,
            }}
          />

        

          <Typography
            variant="h4"
            color="#1e3a8a"
            fontWeight={700}
            mb={2}
            sx={{ fontFamily: "'Bornomala', sans-serif" }}
          >
            ওহ না! পাতাটি পাওয়া যায়নি
          </Typography>

          <Typography
            variant="h6"
            color="#64748b"
            mb={5}
            sx={{ fontFamily: "'Bornomala', sans-serif", maxWidth: '560px', mx: 'auto' }}
          >
            যে পাতাটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, নাম বদলে গেছে বা এখনো তৈরি হয়নি।
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/')}
              sx={{
                bgcolor: '#1e40af',
                px: 5,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1.1rem',
                fontFamily: "'Bornomala', sans-serif",
                '&:hover': { bgcolor: '#1e3a8a' },
              }}
            >
              হোমে ফিরে যান
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => router.back()}
              sx={{
                borderColor: '#3b82f6',
                color: '#3b82f6',
                px: 5,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 700,
                fontFamily: "'Bornomala', sans-serif",
                '&:hover': { bgcolor: '#eff6ff', borderColor: '#1e40af', color: '#1e40af' },
              }}
            >
              পিছনে যান
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="#94a3b8"
            mt={10}
            sx={{ fontFamily: "'Bornomala', sans-serif" }}
          >
            © RUCSEHUB : অ্যালগরিদম শিখি
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default PageNotFound;