import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import Head from 'next/head';

export default function PrivacyPolicyBangla() {
  return (
    <>
      <Head>
        <title>গোপনীয়তা নীতি - RUCSEHUB : algorithm Shikhi</title>
        <meta
          name="description"
          content="RUCSEHUB : algorithm Shikhi – আমরা আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখি"
        />
      </Head>

      <Box
        maxWidth="md"
        sx={{
          mx: 'auto',
          px: { xs: 2, sm: 4, md: 6 },
          py: 5,
          textAlign: 'left', // পুরোপুরি লেফট অ্যালাইন
        }}
      >
        {/* শিরোনাম */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight={700}
          color="primary"
          sx={{ mb: 2 }}
        >
          গোপনীয়তা নীতি
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          সর্বশেষ হালনাগাদ: ২৮ নভেম্বর ২০২৫
        </Typography>

        {/* ওয়েবসাইট ও অথর ইনফো */}
        <Box sx={{ mb: 5, fontSize: '1rem' }}>
          <Typography variant="body1" paragraph sx={{ m: 0 }}>
            <strong>ওয়েবসাইট:</strong>{' '}
            <Link href="https://rucsehub.netlify.app" target="_blank" rel="noopener">
              rucsehub.netlify.app
            </Link>
          </Typography>
          <Typography variant="body1" paragraph sx={{ m: 0 }}>
            <strong>তৈরি করেছেন:</strong> Sujan Prodhan{' '}
            <Link href="https://sujanpro.netlify.app" target="_blank" rel="noopener">
              (sujanpro.netlify.app)
            </Link>
          </Typography>
          <Typography variant="body1" paragraph sx={{ m: 0 }}>
            <strong>GitHub:</strong>{' '}
            <Link href="https://github.com/prodhan2" target="_blank" rel="noopener">
              github.com/prodhan2
            </Link>
          </Typography>
        </Box>

        <Box sx={{ lineHeight: 1.9 }}>

          <Typography variant="h6" gutterBottom fontWeight={600}>১. ভূমিকা</Typography>
          <Typography variant="body1" paragraph>
            RUCSEHUB : algorithm Shikhi-তে আপনাকে স্বাগতম। এই গোপনীয়তা নীতিতে বর্ণনা করা হয়েছে যে, আপনি আমাদের ওয়েবসাইট rucsehub.netlify.app ভিজিট করলে আমরা আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখি। দয়া করে মনোযোগ দিয়ে পড়ুন।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>২. আমরা কী তথ্য সংগ্রহ করি</Typography>
          <Typography variant="body1" paragraph>
            <strong>ব্যক্তিগত তথ্য:</strong> আমরা নাম, ইমেইল বা ফোন নম্বরের মতো কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না (যদি না আপনি স্বেচ্ছায় দেন)।
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>ব্যবহারের তথ্য:</strong> আইপি ঠিকানা, ব্রাউজারের ধরন, অপারেটিং সিস্টেম, ভিজিট করা পেজ ইত্যাদি স্বয়ংক্রিয়ভাবে সংগ্রহ হতে পারে।
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>লোকাল স্টোরেজ:</strong> শুধুমাত্র আপনার কুকি সম্মতির পছন্দ মনে রাখার জন্য localStorage ব্যবহার করি। আপনার শেখা অ্যালগরিদম বা গ্রাফের ডেটা সংরক্ষণ করি না।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৩. তথ্যের ব্যবহার</Typography>
          <Typography variant="body1" paragraph>
            আমরা সক্রিয়ভাবে ব্যক্তিগত তথ্য সংরক্ষণ করি না। তবে Google AdSense বিজ্ঞাপনের জন্য কুকি ব্যবহার করতে পারে। আমরা তথ্য ব্যবহার করি শুধু:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>সাইট উন্নত ও ব্যক্তিগতকৃত করতে</Typography>
            <Typography component="li" paragraph>কুকি সম্মতি মনে রাখতে</Typography>
            <Typography component="li" paragraph>প্রাসঙ্গিক বিজ্ঞাপন দেখাতে</Typography>
          </Box>

          <Typography variant="h6" gutterBottom fontWeight={600}>৪. Google AdSense</Typography>
          <Typography variant="body1" paragraph>
            আমরা বিজ্ঞাপন দেখানোর জন্য Google AdSense ব্যবহার করি। আপনি ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করতে পারেন এখানে:{' '}
            <Link href="https://www.google.com/settings/ads" target="_blank" rel="noopener">
              Google Ad Settings
            </Link>
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৫. কুকি ও লোকাল স্টোরেজ</Typography>
          <Typography variant="body1" paragraph>
            আমরা আপনার অভিজ্ঞতা ভালো করতে কুকি ও লোকাল স্টোরেজ ব্যবহার করি। আপনি ব্রাউজার সেটিংস থেকে কুকি বন্ধ করতে পারেন (তবে কিছু ফিচার কাজ নাও করতে পারে)।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৬. তথ্যের নিরাপত্তা</Typography>
          <Typography variant="body1" paragraph>
            আমরা যথাসাধ্য নিরাপত্তা ব্যবস্থা নিই, কিন্তু ইন্টারনেটে ১০০% নিরাপত্তার গ্যারান্টি কেউ দিতে পারে না।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৭. তৃতীয় পক্ষের সাইট</Typography>
          <Typography variant="body1" paragraph>
            আমাদের সাইটে অন্য ওয়েবসাইটের লিঙ্ক থাকতে পারে। তাদের গোপনীয়তা নীতির জন্য আমরা দায়ী নই।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৮. শিশুদের গোপনীয়তা</Typography>
          <Typography variant="body1" paragraph>
            আমরা জেনে-বুঝে ১৩ বছরের নিচের শিশুদের তথ্য সংগ্রহ করি না।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৯. নীতিতে পরিবর্তন</Typography>
          <Typography variant="body1" paragraph>
            আমরা যেকোনো সময় এই নীতি আপডেট করতে পারি। পরিবর্তন এই পেজেই পোস্ট করা হবে।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>১০. যোগাযোগ করুন</Typography>
          <Typography variant="body1" paragraph>
            কোনো প্রশ্ন থাকলে যোগাযোগ করুন:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>ইমেইল:</strong>{' '}
            <Link href="mailto:ru.cse29@gmail.com">ru.cse29@gmail.com</Link>
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>ওয়েবসাইট:</strong>{' '}
            <Link href="https://rucsehub.netlify.app" target="_blank" rel="noopener">
              rucsehub.netlify.app
            </Link>
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>ডেভেলপার:</strong> Sujan Prodhan –{' '}
            <Link href="https://github.com/prodhan2" target="_blank" rel="noopener">
              github.com/prodhan2
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}