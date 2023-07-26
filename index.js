const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')

const app = express()

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/'
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change'
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis'
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change'
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate'
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment'
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change'
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment'
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk/topic/climate-change'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/'
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html'
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/'
    }
]
const articles = []
const full_articles = []

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

const available_resources = "Welcome to my Climate Change News API\n\nAvailable resourcess:"
let str = "Hello World!\nThis is my string";
console.log(str)

app.get('/', (req, res) => {
    //res.set('Content-Type', 'text/plain')
    //res.type('html')
    //008000 007b80
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    body {
      margin: 0;
      font-family: Arial;
      font-size: 17px;
    }
    
    #myVideo {
      position: fixed;
      right: 0;
      bottom: 0;
      min-width: 100%; 
      min-height: 100%;
    }
    
    .content {
      position: fixed;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #f1f1f1;
      width: 100%;
      padding: 20px;
    }
    </style>
    </head>

    <body>
    <video autoplay muted loop id="myVideo">
      <source src="https://i.imgur.com/Ed1D25E.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    
    <div class="content">
    <h1 style="color:#74fa5f;"><center>Welcome to Climate-Change News API</center></h1>
    <h3 style="color:74fa5f;">Available resources:</h3>
     <ul>
        <li ><a style="color:#fff!important" href='http://localhost:8000/'>localhost:8000</a></li>
         <li><a style="color:#fff!important" href='http://localhost:8000/news'>localhost:8000/news</a></li>
         <li><a style="color:#fff!important" href='http://localhost:8000/full-news'>localhost:8000/full-news</a></li>
         <li>
                <a style="color:#fff!important" href='http://localhost:8000/news/nyt'>localhost:8000/news/:newspaperName</a>
                    <ol style="list-style-type: lower-alpha; padding-bottom: 0;">
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/thetimes'> thetimes </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/guardian'> guardian </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/telegraph'> telegraph </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/cityam'> cityam </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/nyt'> nyt </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/latimes'> latimes </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/smh'> smh </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/bbc'> bbc </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/es'> es </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/sun'> sun </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/dm'> dm </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/nyp'> nyp </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/no-valid'> <i>-INVALID-</i> </a></li>
                    </ol>
        </li>
    </ul>
    </div>
    
    <script> </script>
    </body>
    </html>
     `);
})

app.get('/news', (req, resp) => {
    axios.get('https://www.bbc.co.uk/news/science_and_environment')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })

            resp.json(articles)

        }).catch((err) => console.log(err))
})

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                let title = $(this).text()
                if (title.startsWith('\n\n')) { //delete: \n\n
                    title = title.replace('\n\n', '')
                }
                const url = getBaseUrl(newspaper.name) + $(this).attr('href')

                full_articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })
        })
})

app.get('/full-news', (req, res) => {
    res.json(full_articles)
})

app.get('/news/:newspaperName', (req, res) => {
    const newspaperName = req.params.newspaperName
    let newspaperAddress
    try {
        newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperName)[0].address
    } catch (error) {
        console.log(error)
        res.send(`
        <body style="background-color:151b24;">
        <h1 style="color:#74fa5f;"><center>Welcome to Climate-Change News API</center></h1>
        <h3 style="color:yellow"> <center>INVALID URL </center> </h3>
        <h4 style="color:74fa5f;">Valid resources:</h3>
        <ul>
        <li ><a style="color:#fff!important" href='http://localhost:8000/'>localhost:8000</a></li>
         <li><a style="color:#fff!important" href='http://localhost:8000/news'>localhost:8000/news</a></li>
         <li><a style="color:#fff!important" href='http://localhost:8000/full-news'>localhost:8000/full-news</a></li>
         <li>
                <a style="color:#fff!important" href='http://localhost:8000/news/nyt'>localhost:8000/news/:newspaperName</a>
                    <ol style="list-style-type: lower-alpha; padding-bottom: 0;">
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/thetimes'> thetimes </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/guardian'> guardian </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/telegraph'> telegraph </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/cityam'> cityam </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/nyt'> nyt </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/latimes'> latimes </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/smh'> smh </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/bbc'> bbc </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/es'> es </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/sun'> sun </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/dm'> dm </a></li>
                        <li style="color:#47ebb4"><a style="color:#fff!important" href='http://localhost:8000/news/nyp'> nyp </a></li>
                    </ol>
        </li>
    </ul>
         `);
    }

    //console.log(newspaperAddress)
    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text
                const url = getBaseUrl(newspaperName) + $(this).attr('href')

                specificArticles.push({
                    title,
                    url,
                    source: newspaperName
                })
            })

            res.json(specificArticles)
        }).catch(err => console.log(err))
})

function getBaseUrl(name) {
    baseUrl = "";
    switch (name) {
        case "telegraph":
            baseUrl = "https://www.telegraph.co.uk"
            break;
        case "smh":
            baseUrl = "https://www.smh.com.au"
            break
        case "bbc":
            baseUrl = "https://www.bbc.co.uk"
            break
        case "es":
            baseUrl = "https://www.standard.co.uk"
            break
        case "nyt":
            baseUrl = "https://www.nytimes.com/"
            break
    }
    return baseUrl;
}
