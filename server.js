/********************************************************************************
* WEB322 – Assignment 02
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: Ling Wang Student ID: 125753228 Date: Oct 16
*
********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require('express'); 
const app = express(); 
const HTTP_PORT = process.env.PORT || 8080; 


legoData.Initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Assignment 2: Your Name - Your Student Id');
    });

    app.get('/lego/sets', (req, res) => {
      legoData.getAllSets()
        .then((sets) => {
          res.json(sets);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    });

    app.get('/lego/sets/num-demo', (req, res) => {
      const setNum = '001-1'; 

      legoData.getSetByNum(setNum)
        .then((set) => {
          res.json(set);
        })
        .catch((error) => {
          res.status(404).send(error);
        });
    });

    app.get('/lego/sets/theme-demo', (req, res) => {
      const theme = 'tech'; 

      legoData.getSetsByTheme(theme)
        .then((sets) => {
          res.json(sets);
        })
        .catch((error) => {
          res.status(404).send(error);
        });
    });

    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize Lego data:', error);
  });