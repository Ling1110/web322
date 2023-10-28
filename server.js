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
      res.sendFile(path.join(__dirname, '/views/home.html'));
    });

    app.get('/about', (req, res) => {
      res.sendFile(path.join(__dirname, '/views/about.html'));
  });

    app.get('/lego/sets', (req, res) => {
      const theme = req.query.theme; // Get the "theme" query parameter

    if (theme) {
        // If there is a "theme" query parameter, filter Lego data by theme
        const filteredLegoData = legoData.filter(item => item.theme === theme);
        if (filteredLegoData.length > 0) {
            res.json(filteredLegoData);
        } else {
            res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
        }
    } else {
        // If there is no "theme" query parameter, respond with all Lego data
        res.json(legoData);
    }
    });

    app.get('/lego/sets/num-demo', (req, res) => {
      const setNum = req.params.set_num; // Get the set_num from the route parameter

    // Find the Lego set that matches the set_num
    const legoSet = legoData.find(item => item.set_num === setNum);

    if (legoSet) {
        res.json(legoSet);
    } else {
        res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
    }
    });

    app.use((req, res) => {
      res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
  });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize Lego data:', error);
  });