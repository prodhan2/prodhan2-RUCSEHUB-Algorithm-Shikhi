// import React from 'react';
// import { useRouter } from 'next/router';
// import Sider from '@/components/Sider';
// import { algorithms } from '@/common/appData';
// import styles from './advanced.module.css'; // optional custom CSS

// export default function AdvancedPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   // Find the algorithm data
//   const algo = algorithms.find(a => a.id === id);

//   if (!algo) {
//     return <div style={{ padding: '2rem' }}>Algorithm not found</div>;
//   }

//   return (
//     <div className={styles.pageContainer} style={{ display: 'flex', gap: '2rem' }}>
//       {/* Sidebar */}
//       <Sider selected={id} />

//       {/* Main content */}
//       <div className={styles.content} style={{ flex: 1 }}>
//         <h1>{algo.name}</h1>
//         <p>{algo.meta}</p>
//         <p><strong>বাংলা বর্ণনা:</strong> {algo.meta_bn}</p>
//         <div style={{ marginTop: '1rem' }}>
//           <p>Here you can add your visualization, code, or interactive component for <strong>{algo.name}</strong>.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
