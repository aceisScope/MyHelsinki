const express = require('express');
const path = require('path');
const cors = require("cors");
const helmet = require('helmet');
const axios = require('axios').default;

const app = express();
app.use(cors());
app.use(helmet());

const port = process.env.PORT || 8080;

app.get("/places", async (req, res, next) => {
    let limit = parseInt(req.query.limit || 10);
    let page = parseInt(req.query.pagina || 0);
    let start = page * limit

    axios
      .get( "http://open-api.myhelsinki.fi/v1/places/", {
            params: {
                limit: limit,
                start: start
            }
        })
      .then(response => res.send(response.data))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.use(express.static(path.join(__dirname, 'city-app/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/city-app/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`City app listening at http://localhost:${port}`)
});