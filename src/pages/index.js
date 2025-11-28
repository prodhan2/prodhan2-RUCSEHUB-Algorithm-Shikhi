import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Features from '../components/features';

// তোমার logo.png এর আসল সাইজ (Properties → Details থেকে দেখে বসাও)
const LOGO_WIDTH = 500;   // উদাহরণ 500
const LOGO_HEIGHT = 500;  // উদাহরণ 500

export default function HomePageBangla() {
  return (
    <Box sx={{ textAlign: 'center', px: { xs: 2, sm: 3 }, py: { xs: 3, md: 4 } }}>

      {/* লোগো – অরিজিনাল সাইজে কিন্তু স্ক্রিনে ফিট */}
      <Box sx={{ my: { xs: 2, md: 3 } }}>
        <Image
          src="/logo.png"
          alt="RUCSEHUB : algorithm Shikhi"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority
          style={{
            maxWidth: '90%',
            height: 'auto',
            objectFit: 'contain',
          }}
          sizes="(max-width: 768px) 75vw, 450px"
        />
      </Box>

      {/* শিরোনাম – বড় কিন্তু এক পেজে ফিট */}
      <Typography
        variant="h4"
        component="h1"
        fontWeight={800}
        sx={{
          fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.8rem' },
          background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1.5,
        }}
      >
        অ্যালগরিদমকে চোখের সামনে জীবন্ত করি!
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: 'text.secondary',
          mb: 3,
          fontSize: { xs: '1.1rem', md: '1.3rem' },
          fontWeight: 500,
        }}
      >
        ছোট ব্যাখ্যা • হাতে-কলমে ধাপ • শেয়ার করুন বন্ধুদের সাথে
      </Typography>

      {/* মূল টেক্সট – এখন একদম কমপ্যাক্ট, কিন্তু পড়তে মজা লাগে */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: '820px',
          mx: 'auto',
          fontSize: { xs: '1rem', md: '1.1rem' },
          lineHeight: { xs: 1.7, md: 1.8 },
          color: '#333',
          mb: 5,
        }}
      >
        সর্টিং, সার্চিং, গ্রাফ, ট্রি থেকে শুরু করে ডাইনামিক প্রোগ্রামিং পর্যন্ত — 
        সবই <strong>RUCSEHUB : algorithm Shikhi</strong>-তে চোখের সামনে নড়াচড়া করে বোঝায়।<br /><br />
        
        ছাত্র হলে পরীক্ষার আগে কনফিডেন্স বাড়বে।<br />
        শিক্ষক হলে ক্লাসে দেখিয়ে ছাত্রদের “আহা! এভাবে হয়!” বলাতে পারবেন।<br />
        আর শখের কোডার হলে? তাহলে তো এটা আপনার জন্যই বানানো!<br /><br />
        
        কোনো বিরক্তিকর লেকচার নয় — শুধু দেখুন, বুঝুন, আর মুগ্ধ হোন।
      </Typography>

      {/* Features কম্পোনেন্ট */}
      <Features />
    </Box>
  );
}