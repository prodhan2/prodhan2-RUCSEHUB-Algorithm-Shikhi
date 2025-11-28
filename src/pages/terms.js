import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import Head from 'next/head';

export default function TermsOfServiceBangla() {
  return (
    <>
      <Head>
        <title>সার্ভিসের শর্তাবলী - RUCSEHUB : algorithm Shikhi</title>
        <meta
          name="description"
          content="RUCSEHUB : algorithm Shikhi – অ্যালগরিদম শিখি প্ল্যাটফর্মের ব্যবহারের শর্তাবলী"
        />
      </Head>

      <Box maxWidth="md" sx={{ mx: 'auto', px: { xs: 2, sm: 3 }, py: 4 }}>
        {/* Header */}
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          fontWeight={700} 
          color="primary"
          textAlign="left"
        >
          সার্ভিসের শর্তাবলী
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom textAlign="left">
          সর্বশেষ হালনাগাদ: ২৮ নভেম্বর ২০২৫
        </Typography>

        {/* Author & Website Info - Left Aligned */}
        <Box sx={{ my: 3, textAlign: 'left' }}>
          <Typography variant="body1" paragraph>
            <strong>ওয়েবসাইট:</strong>{' '}
            <Link href="https://rucsehub.netlify.app" target="_blank" rel="noopener">
              rucsehub.netlify.app
            </Link>
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>তৈরি করেছেন:</strong> Sujan Prodhan{' '}
            <Link href="https://sujanpro.netlify.app" target="_blank" rel="noopener">
              (sujanpro.netlify.app)
            </Link>
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>GitHub:</strong>{' '}
            <Link href="https://github.com/prodhan2" target="_blank" rel="noopener">
              github.com/prodhan2
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 5, lineHeight: 1.9, textAlign: 'left' }}>

          <Typography variant="h6" gutterBottom fontWeight={600}>১. শর্তাবলী গ্রহণ</Typography>
          <Typography variant="body1" paragraph>
            RUCSEHUB : algorithm Shikhi ওয়েবসাইট (“সাইট”) ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলীতে সম্মতি প্রদান করছেন। যদি আপনি এই শর্তাবলী মেনে নিতে না চান, তাহলে দয়া করে এই সাইট ব্যবহার করবেন না।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>২. ব্যবহারের লাইসেন্স</Typography>
          <Typography variant="body1" paragraph>
            ব্যক্তিগত ও অ-বাণিজ্যিক উদ্দেশ্যে সাময়িকভাবে সাইট দেখার ও ব্যবহারের অনুমতি দেওয়া হচ্ছে। এটি শুধুমাত্র একটি লাইসেন্স, মালিকানা হস্তান্তর নয়। এই লাইসেন্সের আওতায় আপনি নিম্নলিখিত কাজ করতে পারবেন না:
          </Typography>
          <Box component="ul" sx={{ pl: 4, my: 2 }}>
            <Typography component="li" paragraph>কোনো উপাদান পরিবর্তন বা কপি করা</Typography>
            <Typography component="li" paragraph>বাণিজ্যিক উদ্দেশ্যে বা জনসমক্ষে প্রদর্শনের জন্য ব্যবহার করা</Typography>
            <Typography component="li" paragraph>সাইটে থাকা কোনো সফটওয়্যার রিভার্স ইঞ্জিনিয়ার করার চেষ্টা করা</Typography>
            <Typography component="li" paragraph>কপিরাইট বা অন্যান্য মালিকানা সংক্রান্ত নোটিশ মুছে ফেলা</Typography>
          </Box>

          <Typography variant="h6" gutterBottom fontWeight={600}>৩. শিক্ষামূলক উদ্দেশ্য</Typography>
          <Typography variant="body1" paragraph>
            এই সাইটটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে তৈরি করা হয়েছে যাতে শিক্ষার্থীরা ইন্টার‍্যাক্টিভ ভিজ্যুয়ালাইজেশনের মাধ্যমে অ্যালগরিদম ও ডেটা স্ট্রাকচার সহজে বুঝতে পারে। আমরা সঠিকতার জন্য সর্বোচ্চ চেষ্টা করি, তবে কোনো গ্যারান্টি দিই না।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৪. ব্যবহারকারীর দায়িত্ব</Typography>
          <Typography variant="body1" paragraph>সাইট ব্যবহার করার সময় আপনি সম্মত হন যে আপনি:</Typography>
          <Box component="ul" sx={{ pl: 4, my: 2 }}>
            <Typography component="li" paragraph>শুধুমাত্র বৈধ উদ্দেশ্যে এবং এই শর্তাবলী মেনে সাইট ব্যবহার করবেন</Typography>
            <Typography component="li" paragraph>সাইটের ক্ষতি, নিষ্ক্রিয় বা ব্যাহত করতে পারে এমন কোনো কাজ করবেন না</Typography>
            <Typography component="li" paragraph>সাইটের কোনো অংশে অননুমোদিত প্রবেশের চেষ্টা করবেন না</Typography>
            <Typography component="li" paragraph>শিক্ষামূলক কন্টেন্টের প্রকৃতি ও উদ্দেশ্যের প্রতি সম্মান দেখাবেন</Typography>
          </Box>

          <Typography variant="h6" gutterBottom fontWeight={600}>৫. বুদ্ধিবৃত্তিক সম্পত্তি অধিকার</Typography>
          <Typography variant="body1" paragraph>
            সাইটের সমস্ত মৌলিক কন্টেন্ট, ফিচার ও কার্যকারিতা RUCSEHUB : algorithm Shikhi এবং তার স্রষ্টা Sujan Prodhan-এর একচেটিয়া সম্পত্তি। কপিরাইট, ট্রেডমার্ক ও অন্যান্য আইন দ্বারা এটি সুরক্ষিত।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৬. দাবিত্যাগ</Typography>
          <Typography variant="body1" paragraph>সাইটের তথ্য “যেমন আছে” ভিত্তিতে প্রদান করা হয়েছে। আমরা কোনো ওয়ারেন্টি দিই না।</Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>৭–১২. অন্যান্য ধারা</Typography>
          <Typography variant="body1" paragraph>
            দায়ের সীমাবদ্ধতা, উপাদানের সঠিকতা, তৃতীয় পক্ষের লিঙ্ক, সমাপ্তি, প্রযোজ্য আইন এবং শর্তাবলীর পরিবর্তন – এই বিষয়গুলো পূর্বের মতোই প্রযোজ্য, শুধু নাম পরিবর্তন করা হয়েছে।
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600}>১৩. যোগাযোগের তথ্য</Typography>
          <Typography variant="body1" paragraph>
            কোনো প্রশ্ন থাকলে যোগাযোগ করুন:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>ইমেইল:</strong> ru.cse29@gmail.com
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