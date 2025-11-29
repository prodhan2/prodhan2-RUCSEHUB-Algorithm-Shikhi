import React, { useEffect, useState } from 'react';
import { List, ListItemButton, Typography, Button, TextField, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import styles from './sider.module.css';
import { algorithms as initialAlgorithms, categories as initialCategories } from '@/common/appData';

function Sider({ selected }) {
  // State for drawer categories and algorithms
  const [drawerCategories, setDrawerCategories] = useState(initialCategories);
  const [drawerAlgorithms, setDrawerAlgorithms] = useState(initialAlgorithms);
  const [expanded, setExpanded] = useState('');

  // Form state for adding new algorithm
  const [newAlgoName, setNewAlgoName] = useState('');
  const [newAlgoCategory, setNewAlgoCategory] = useState('');

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

  // Function to add new algorithm dynamically
  const addAlgorithm = () => {
    if (!newAlgoName || !newAlgoCategory) return;

    const algoId = newAlgoName.replace(/\s+/g, '');
    // Update algorithms array
    const newAlgorithms = [
      ...drawerAlgorithms,
      { id: algoId, name: newAlgoName, category: newAlgoCategory },
    ];
    setDrawerAlgorithms(newAlgorithms);

    // Update categories object
    const newCategories = { ...drawerCategories };
    if (!newCategories[newAlgoCategory]) newCategories[newAlgoCategory] = [];
    newCategories[newAlgoCategory].push({ id: algoId, name: newAlgoName });
    setDrawerCategories(newCategories);

    // Clear input fields
    setNewAlgoName('');
    setNewAlgoCategory('');
    setExpanded(newAlgoCategory);
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

      {/* Add new algorithm section */}
      <Box mt={2} p={1} border="1px solid #ccc" borderRadius="8px">
        <Typography variant="subtitle2" mb={1}>
          Add New Algorithm
        </Typography>
        <TextField
          label="Algorithm Name"
          size="small"
          fullWidth
          value={newAlgoName}
          onChange={(e) => setNewAlgoName(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          label="Category"
          size="small"
          fullWidth
          value={newAlgoCategory}
          onChange={(e) => setNewAlgoCategory(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={addAlgorithm}
          disabled={!newAlgoName || !newAlgoCategory}
        >
          Add Algorithm
        </Button>
      </Box>
    </div>
  );
}

export default Sider;
