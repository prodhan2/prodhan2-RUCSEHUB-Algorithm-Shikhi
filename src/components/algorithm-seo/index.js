import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { getAlgorithmSEO } from './config';
import { algorithms } from '@/common/appData';

// Base URL সেট করা হলো। চাহিদা অনুযায়ী পরিবর্তন করতে পারো।
const BASE_URL = 'https://rucsehub.netlify.app';

const AlgorithmSEO = ({ children, algorithmId, customSEO = {} }) => {
  const router = useRouter();
  const algorithmSEO = getAlgorithmSEO(algorithmId);

  const title = algorithmSEO.title;
  const { name: algoName, category } =
    algorithms.findObj('id', algorithmId) || {};

  // SEO Configuration
  const seoConfig = {
    title: customSEO.title || title,
    description: customSEO.description || algorithmSEO.description,
    canonical: `${BASE_URL}${router.asPath}`,
    openGraph: {
      title: customSEO.title || title,
      description: customSEO.description || algorithmSEO.description,
      url: `${BASE_URL}${router.asPath}`,
      type: 'article',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: customSEO.keywords || algorithmSEO.keywords,
      },
      {
        name: 'article:section',
        content: category,
      },
      {
        name: 'article:tag',
        content: algoName,
      },
    ],
  };

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description: algorithmSEO.description,
    educationalLevel: 'Beginner to Advanced',
    learningResourceType: 'Interactive Visualization',
    educationalUse: ['learning', 'demonstration'],
    teaches: algoName,
    url: `${BASE_URL}${router.asPath}`,
    provider: {
      '@type': 'Organization',
      name: 'See Algorithms',
      sameAs: BASE_URL,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher'],
    },
    interactivityType: 'active',
    isPartOf: {
      '@type': 'WebSite',
      name: 'See Algorithms',
      url: BASE_URL,
    },
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
};

export default AlgorithmSEO;
