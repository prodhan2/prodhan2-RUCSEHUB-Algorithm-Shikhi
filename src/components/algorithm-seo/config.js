// seoConfig.js

export const defaultSeoConfig = {
  title: 'See Algorithms - অ্যালগরিদম ভিজ্যুয়ালাইজেশন',
  description:
    'ইন্টারেক্টিভ ভিজ্যুয়ালাইজেশন সহ অ্যালগরিদম শিখুন। ধাপে ধাপে sorting, searching, graph algorithms এবং data structures বোঝার জন্য। ছাত্র ও শিক্ষকদের জন্য আদর্শ।',
  canonical: '', // Netlify URL যেমন: 'https://rucsehub.netlify.app'
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: '', // Netlify URL
    siteName: 'See Algorithms',
    title: 'See Algorithms - Interactive Algorithm Visualizations',
    description:
      'ইন্টারেক্টিভ ভিজ্যুয়ালাইজেশন সহ অ্যালগরিদম শিখুন। ধাপে ধাপে sorting, searching, graph algorithms এবং data structures বোঝার জন্য।',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'See Algorithms Visualization',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'algorithms, অ্যালগরিদম, visualization, sorting, data structures, কম্পিউটার সায়েন্স, programming, education, interactive learning',
    },
    {
      name: 'author',
      content: 'See Algorithms',
    },
    {
      name: 'robots',
      content: 'index,follow',
    },
    {
      name: 'googlebot',
      content: 'index,follow',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

// === algorithm SEO map ===
export const algorithmSeoMap = {
  BubbleSort: {
    title: 'বাবল সর্ট (Bubble Sort) ভিজ্যুয়ালাইজেশন',
    description:
      'ইন্টারেক্টিভ ধাপে ধাপে বাবল সর্ট অ্যালগরিদম শিখুন। দেখুন কিভাবে সহজ comparison-based sorting কাজ করে।',
    keywords: 'বাবল সর্ট, bubble sort, sorting algorithm, visualization, অ্যালগরিদম শেখা, O(n²)',
  },
  QuickSort: {
    title: 'কুইক সর্ট (Quick Sort) ভিজ্যুয়ালাইজেশন',
    description:
      'ধাপে ধাপে কুইক সর্ট শিখুন। divide-and-conquer sorting অ্যালগরিদম বোঝার জন্য interactive visualization।',
    keywords: 'quick sort, কুইক সর্ট, sorting algorithm, visualization, O(n log n)',
  },
  MergeSort: {
    title: 'মার্জ সর্ট (Merge Sort) ভিজ্যুয়ালাইজেশন',
    description:
      'ইন্টারেক্টিভভাবে মার্জ সর্ট শিখুন। divide-and-conquer sorting অ্যালগরিদম step-by-step বুঝুন।',
    keywords: 'merge sort, মার্জ সর্ট, sorting algorithm, visualization, O(n log n)',
  },
  BFS: {
    title: 'ব্রেডথ-ফার্স্ট সার্চ (BFS) ভিজ্যুয়ালাইজেশন',
    description:
      'গ্রাফের স্তরভিত্তিক অনুসন্ধান শিখুন। ইন্টারেক্টিভ ভিজ্যুয়ালাইজেশন সহ BFS অ্যালগরিদম বোঝার জন্য।',
    keywords: 'BFS, breadth first search, graph algorithm, graph traversal, visualization, গ্রাফ',
  },
  DFS: {
    title: 'ডেপথ-ফার্স্ট সার্চ (DFS) ভিজ্যুয়ালাইজেশন',
    description:
      'স্ট্যাক ব্যবহার করে গ্রাফ traversal শিখুন। ইন্টারেক্টিভ ভিজ্যুয়ালাইজেশন সহ DFS বোঝার জন্য।',
    keywords: 'DFS, depth first search, graph algorithm, stack, visualization, গ্রাফ',
  },
  Dijkstra: {
    title: "ডাইজস্ট্রা (Dijkstra) অ্যালগরিদম ভিজ্যুয়ালাইজেশন",
    description:
      'ওজনযুক্ত গ্রাফে shortest path খুঁজুন। ইন্টারেক্টিভভাবে ডাইজস্ট্রা অ্যালগরিদম শিখুন।',
    keywords: 'dijkstra, ডাইজস্ট্রা, shortest path, graph algorithm, weighted graph, visualization',
  },
  TopSort: {
    title: 'টপোলজিকাল সর্টিং (Topological Sorting) ভিজ্যুয়ালাইজেশন',
    description:
      'DAG-এ vertices ordering শিখুন। ইন্টারেক্টিভভাবে topological sorting বোঝার জন্য।',
    keywords: 'topological sort, টপোলজিকাল সর্ট, DAG, graph algorithm, visualization',
  },
  PrimsMST: {
    title: "প্রিম (Prim) MST ভিজ্যুয়ালাইজেশন",
    description:
      'ইন্টারেক্টিভভাবে প্রিম অ্যালগরিদম শিখুন। minimum spanning tree step-by-step বোঝার জন্য।',
    keywords: 'Prim, MST, minimum spanning tree, graph algorithm, visualization, greedy algorithm',
  },
  KruskalsMST: {
    title: "ক্রাস্কাল (Kruskal) MST ভিজ্যুয়ালাইজেশন",
    description:
      'ইন্টারেক্টিভভাবে ক্রাস্কাল অ্যালগরিদম শিখুন। union-find based MST step-by-step বোঝার জন্য।',
    keywords: 'Kruskal, MST, minimum spanning tree, union find, graph algorithm, visualization',
  },
};

// === getAlgorithmSEO function ===
export const getAlgorithmSEO = (algorithm) => {
  const algorithmSEO = algorithmSeoMap[algorithm];
  if (!algorithmSEO) {
    const algoName = algorithm.replace(/([A-Z])/g, ' $1').trim();
    return {
      title: `${algoName} - See Algorithms`,
      description: `ইন্টারেক্টিভভাবে ${algoName} অ্যালগরিদম শিখুন। Step-by-step explanation সহ।`,
      keywords: `${algoName.toLowerCase()}, algorithm, visualization, অ্যালগরিদম, কম্পিউটার সায়েন্স`,
    };
  }
  return algorithmSEO;
};
