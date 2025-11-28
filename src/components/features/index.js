import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { styles } from './styles';
import Image from 'next/image';

const features = [
  {
    icon: '/icons/steps.png',
    title: 'ধাপে ধাপে',
    description:
      'একটা একটা করে দেখো, কীভাবে অ্যালগরিদম কাজ করে — বইয়ের মতো ঝামেলা নাই!',
    color: '#4f46e5',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    path: '/sorting/MergeSort',
  },
  {
    icon: '/icons/draw.png',
    title: 'গ্রাফ আঁকো',
    description:
      'নিজের মনের মতো গ্রাফ বানাও, নোড-এজ যোগ করো — মাউস দিয়ে খেলার মতো!',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    path: '/graph/BFS',
  },
  {
    icon: '/icons/save.png',
    title: 'সেভ করো, শেয়ার করো',
    description:
      'যে গ্রাফ বানালে, সেটা সেভ হয়ে যাবে। বন্ধুকে লিঙ্ক দিলেই সেও দেখতে পাবে!',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    path: '/graph/Dijkstra',
  },
  {
    icon: '/icons/learn.png',
    title: 'ঝামেলা ছাড়া শেখা',
    description:
      'বড় বড় লেকচার নাই, শুধু যা লাগে তাই — ধীরে ধীরে কঠিন থেকে কঠিনতর!',
    color: '#7c3aed',
    bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    path: '/sorting/HeapSort',
  },
];

export default function FeaturesBangla() {
  const router = useRouter();

  return (
    <Grid container spacing={3} pb={4} justifyContent="center">
      {features.map((feat, index) => (
        <Grid item xs={11} sm={6} md={3} key={index}>
          <Card
            elevation={0}
            sx={{
              ...styles.card(feat),
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              },
            }}
            onClick={() => router.push(feat.path)}
          >
            <Box className="feature-bg" sx={styles.cardBackground(feat)} />

            <Box display="flex" justifyContent="center" pt={3}>
              <Box sx={styles.iconBox(feat)}>
                <Image
                  src={feat.icon}
                  alt={feat.title}
                  width={64}
                  height={64}
                  style={{
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(12deg) scale(1.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1)')}
                />
              </Box>
            </Box>

            <CardContent sx={{ px: 2.5, pb: 3, textAlign: 'center' }}>
              <Typography
                variant="h6"
                fontWeight={800}
                gutterBottom
                mb={1.5}
                color="#1a1a1a"
                fontSize="1.05rem"
              >
                {feat.title}
              </Typography>
              <Typography
                variant="body2"
                color="grey.700"
                lineHeight={1.6}
                fontSize="0.92rem"
                fontWeight={500}
              >
                {feat.description}
              </Typography>
            </CardContent>

            <Box sx={styles.accentLine(feat)} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}