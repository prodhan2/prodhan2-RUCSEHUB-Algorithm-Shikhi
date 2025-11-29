import React, { useEffect, useState } from 'react';
import { List, ListItemButton, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import styles from './sider.module.css';
import { algorithms as initialAlgorithms, categories as initialCategories } from '@/common/appData';

function Sider({ selected }) {
  // Read-only state for categories and algorithms
  const [drawerCategories] = useState(initialCategories);
  const [drawerAlgorithms] = useState(initialAlgorithms);
  const [expanded, setExpanded] = useState('');

  // Find the current selected algorithm
  const algo = drawerAlgorithms.find(a => a.id === selected) || {};
  const { category = 'Sorting' } = algo;

  useEffect(() => {
    if (category) setExpanded(category);
  }, [category]);

  // Generate path for Link
  const getPathname = (cat, algoId) => {
    const _cat = cat.split(' ').join('-').toLowerCase();
    return `/${_cat}/${algoId}`;
  };

  return (
    <div className={styles.sider}>
      {/* Drawer */}
      {Object.keys(drawerCategories).map((cat) => {
        const isExpanded = cat === expanded;
        return (
          <div key={cat} className={styles.accordion}>
            <Accordion
              expanded={isExpanded}
              onChange={() => (isExpanded ? setExpanded('') : setExpanded(cat))}
              disableGutters
              elevation={0}
              sx={{
                boxShadow: 'none',
                background: 'transparent',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    className={`${styles.expandIcon} ${isExpanded ? styles.expandIconExpanded : ''}`}
                  />
                }
                className={styles.category}
              >
                <Typography variant="button" className={styles.categoryText}>
                  {cat}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.accordionDetails}>
                <List className={styles.algorithmList}>
                  {drawerCategories[cat].map(({ id, name }) => {
                    const isSelected = id === selected;
                    return (
                      <ListItemButton
                        key={id}
                        component={Link}
                        href={getPathname(cat, id)}
                        className={`${styles.listItem} ${isSelected ? styles.listItemSelected : ''}`}
                        disableRipple
                      >
                        <Typography variant="subtitle1" className={styles.algorithmText}>
                          {name}
                        </Typography>
                      </ListItemButton>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default Sider;
