import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import axios from 'axios';//module //lib
import { useState, useEffect } from 'react';

//import Dash from './Dash' //component

export default function Crd() {
  const [mcnt, setMcnt] = useState(0);//Hooks //var
  const [fcnt, setFcnt] = useState(0);
  const [qcnt, setQcnt] = useState(0);

  function cnt() {cmd
    axios.get("http://localhost:3000/cnt")
      .then(response => {
        setMcnt(response.data.menu_count);
        setFcnt(response.data.food_cat_count);
        setQcnt(response.data.qty_mast_count);
      })
      .catch(error => console.error("Error fetching counts:", error));
  }

  useEffect(() => {
    cnt();
  }, []);
 
  const cards = [
    { id: 1, title: 'Menu', description: mcnt },
    { id: 2, title: 'Food Category', description: fcnt },
    { id: 3, title: 'Size Mast', description: qcnt },
    
  ];

  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <>
    
    <Box 
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card id='c' key={card.id}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
   
    </>
  );
}
