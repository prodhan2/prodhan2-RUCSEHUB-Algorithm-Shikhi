import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Button,
  Avatar,
} from '@mui/material';
import Head from 'next/head';
import TranslateIcon from '@mui/icons-material/Translate';

export default function AboutUs() {
  const [lang, setLang] = useState('bn'); // ডিফল্ট বাংলা

  const toggleLanguage = () => setLang(lang === 'bn' ? 'en' : 'bn');

  const t = {
    title: { 
      en: 'RUCSEHUB : Algorithm Shikhi', 
      bn: 'RUCSEHUB : অ্যালগরিদম শিখি' 
    },
    subtitle: { 
      en: 'Making Algorithm Learning Easy with Interactive Visualizations', 
      bn: 'ইন্টারঅ্যাকটিভ ভিজ্যুয়ালাইজেশনের মাধ্যমে অ্যালগরিদম শেখা সহজ করে তোলা' 
    },
    missionTitle: { en: 'Our Mission', bn: 'আমাদের লক্ষ্য' },
    mission: { 
      en: 'To make algorithm learning simple, fun and effective for everyone — especially students of Rajshahi University CSE and all Bangladeshi learners.', 
      bn: 'রাজশাহী বিশ্ববিদ্যালয়ের সিএসই শিক্ষার্থীসহ সব বাংলাদেশি শিক্ষার্থীর জন্য অ্যালগরিদম শেখা সহজ, মজাদার ও কার্যকর করা।' 
    },
    whyTitle: { en: 'Why We Built This', bn: 'কেন তৈরি করা হয়েছে' },
    why: { 
      en: 'Many students struggle with algorithm books and lectures. We turn complex concepts into beautiful interactive animations that anyone can understand.', 
      bn: 'বই-লেকচারে অনেকেই অ্যালগরিদম বুঝতে পারে না। আমরা জটিল ধারণাগুলোকে সুন্দর ও নিয়ন্ত্রণযোগ্য অ্যানিমেশনে রূপান্তর করি।' 
    },
    featuresTitle: { en: 'What Makes Us Different', bn: 'আমাদের বিশেষত্ব' },
    features: [
      { en: 'Interactive visualizations you can control', bn: 'নিজে নিয়ন্ত্রণ করতে পারেন এমন ভিজ্যুয়ালাইজেশন' },
      { en: 'Step-by-step explanation in English & Bengali', bn: 'ইংরেজি ও বাংলায় ধাপে ধাপে ব্যাখ্যা' },
      { en: 'Works perfectly on mobile & desktop', bn: 'মোবাইল ও কম্পিউটারে পারফেক্ট কাজ করে' },
      { en: '100% Free Forever — No login needed', bn: 'সারাজীবন বিনামূল্যে — কোনো লগইন লাগে না' },
      { en: 'Built with love for Bangladeshi students', bn: 'বাংলাদেশের শিক্ষার্থীদের জন্য ভালোবেসে তৈরি' },
    ],
    creator: { en: 'Creator & Maintainer', bn: 'তৈরিকারক ও রক্ষণাবেক্ষণকারী' },
    name: 'Sujan Prodhan',
    role: { en: 'Full-Stack Developer • Algorithm Enthusiast', bn: 'ফুল-স্ট্যাক ডেভেলপার • অ্যালগরিদম প্রেমী' },
    cta: { en: 'Start Learning Now — Completely Free!', bn: 'এখনই শেখা শুরু করুন — সম্পূর্ণ বিনামূল্যে!' },
  };

  return (
    <>
      <Head>
        <title>RUCSEHUB : অ্যালগরিদম শিখি</title>
        <meta name="description" content="RUCSEHUB দ্বারা তৈরি — সুজন প্রধানের ইন্টারঅ্যাকটিভ অ্যালগরিদম শেখার প্ল্যাটফর্ম" />
      </Head>

      {/* সাদা ব্যাকগ্রাউন্ড */}
      <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', py: { xs: 6, md: 10 } }}>
        <Box sx={{ maxWidth: 1350, mx: 'auto', px: { xs: 3, md: 5 } }}>

          {/* Language Toggle */}
          <Box textAlign="center" mb={8}>
            <Button
              variant="contained"
              startIcon={<TranslateIcon />}
              onClick={toggleLanguage}
              size="large"
              color="primary"
              sx={{
                borderRadius: '50px',
                px: 5,
                py: 1.5,
                fontWeight: 700,
                boxShadow: '0 10px 30px rgba(0,85,255,0.3)',
              }}
            >
              {lang === 'bn' ? 'View in English' : 'বাংলায় দেখুন'}
            </Button>
          </Box>

          {/* নতুন টাইটেল */}
          <Typography variant="h3" component="h1" fontWeight={900} align="center" color="#1e40af" mb={3}>
            {t.title[lang]}
          </Typography>

          <Typography variant="h5" align="center" color="#3b82f6" fontWeight={600} mb={10} sx={{ fontStyle: 'italic' }}>
            {t.subtitle[lang]}
          </Typography>

          <Grid container spacing={6}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              <Card elevation={10} sx={{ borderRadius: 5, boxShadow: '0 15px 45px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                  <Typography variant="h4" gutterBottom fontWeight={800} color="#1e3a8a">
                    {t.missionTitle[lang]}
                  </Typography>
                  <Typography variant="body1" paragraph color="#2d3748" lineHeight={2} fontSize="1.15rem">
                    {t.mission[lang]}
                  </Typography>

                  <Typography variant="h4" gutterBottom fontWeight={800} color="#1e3a8a" mt={6}>
                    {t.whyTitle[lang]}
                  </Typography>
                  <Typography variant="body1" paragraph color="#2d3748" lineHeight={2} fontSize="1.15rem">
                    {t.why[lang]}
                  </Typography>

                  <Typography variant="h4" gutterBottom fontWeight={800} color="#1e3a8a" mt={6}>
                    {t.featuresTitle[lang]}
                  </Typography>
                  {t.features.map((f, i) => (
                    <Typography key={i} variant="body1" color="#1f2937" sx={{ pl: 3, py: 1.5, fontSize: '1.15rem', fontWeight: 500 }}>
                      • {f[lang]}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Creator Card */}
            <Grid item xs={12} md={4}>
              <Card elevation={12} sx={{ 
                borderRadius: 6, 
                boxShadow: '0 25px 60px rgba(59,130,246,0.18)',
                transition: '0.4s',
                '&:hover': { transform: 'translateY(-12px)' }
              }}>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <Avatar
                    src="https://i.postimg.cc/vZH4pYDy/image.png"
                    alt="Sujan Prodhan"
                    sx={{ 
                      width: 200, 
                      height: 200, 
                      mx: 'auto', 
                      mb: 4, 
                      border: '8px solid #3b82f6',
                      boxShadow: '0 20px 40px rgba(59,130,246,0.3)'
                    }}
                  />
                  <Typography variant="subtitle1" color="#64748b" fontWeight={600} mb={1}>
                    {t.creator[lang]}
                  </Typography>
                  <Typography variant="h6" color="#1e40af" fontWeight={300}>
                    {t.name}
                  </Typography>
                  <Typography variant="h6" color="#3b82f6" mt={1} mb={5}>
                    {t.role[lang]}
                  </Typography>

                  <Box mt={4}>
                    <Typography variant="body1" color="#374151" mb={2}>
                      <strong>Email:</strong>{' '}
                      <Link href="mailto:prodhan238@gmail.com" color="#2563eb" sx={{ fontWeight: 600 }}>
                        prodhan238@gmail.com
                      </Link>
                    </Typography>
                    <Typography variant="body1" color="#374151">
                      <strong>GitHub:</strong>{' '}
                      <Link href="https://github.com/prodhan2" target="_blank" color="#2563eb" sx={{ fontWeight: 600 }}>
                        github.com/prodhan2
                      </Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Final CTA */}
          <Box mt={16} textAlign="center">
            <Typography variant="h2" fontWeight={900} color="#1e40af" gutterBottom>
              {t.cta[lang]}
            </Typography>
            <Typography variant="h5" color="#3b82f6" mt={3}>
              RU CSE + বাংলাদেশের সব শিক্ষার্থীর জন্য — একদম ফ্রি!
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}