const connectToMongo = require('./db');
const express=require('express');
const cors=require('cors')
connectToMongo();

const app = express()
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/login', (req, res) => {
//     res.send('Hello login!')
//   })
//   app.get('/signup', (req, res) => {
//     res.send('Hello signup')
//   })
app.use(cors());
app.use(express.json());
app.use('/',require('./routes/auth'));
app.use('/api/no',require('./routes/notes'));
app.listen(port, () => {
  console.log(`http:/localhost:${port}`)
})
