require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urlList = [];

function isValidHttpUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res)=> {
  // const 
  const {url} = req.body;

  if(!isValidHttpUrl(url))
    return res.json({ error: 'invalid url' })

  // Bước 2: lấy hostname và kiểm tra domain
  const hostname = new URL(url).hostname;

  dns.lookup(hostname, (err, address) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    // Domain tồn tại → xử lý lưu vào DB / trả về kết quả
    const id = urlList.length;
    urlList.push(url);

    res.json({
      original_url: url,
      short_url: id
    });
  });

})

app.get('/api/shorturl/:url', (req, res)=> {
  const {url} = req.params;
  
  const index = Number(url);
  
  if(isNaN(index) || index < 0 || index >= urlList.length)
    return res.json({ error: 'invalid url' })

  res.redirect(urlList[index]);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
