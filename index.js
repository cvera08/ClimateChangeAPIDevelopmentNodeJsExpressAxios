const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')

const app = express()

app.use(express.static(__dirname + '/')); //css support

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
        name: 'un',
        address: 'https://www.un.org/climatechange',
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

app.listen(PORT, () => console.log(`server running on PORT ${PORT} - http://localhost:8000/`))

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>

<head>
    <link rel="icon"
        href="https://raw.githubusercontent.com/cvera08/ClimateChangeAPIDevelopmentNodeJsExpressAxios/herokumaster/data/favicon.ico">
    <!-- image of the tab -->
    <title>Climate Crisis</title> <!-- page title in the browser tab -->
    <meta property="og:image" content="https://i.ibb.co/Tbmnhkp/og-image.jpg"> <!-- site image thumbnail -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'>
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>

<body>
    <video autoplay muted loop id="myVideo">
        <source src="https://i.imgur.com/Ed1D25E.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>

    <div class="content">
        <h1 class="title" style="color:#74fa5f;">
            Welcome to Climate-Change News API
        </h1>
        <h3 style="color:74fa5f;">Available resources:</h3>
        <ul>
            <li><a style="color:#fff!important"
                    href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/'>/</a>
            </li>
            <li><a style="color:#fff!important"
                    href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news'>/news</a></li>
            <li><a style="color:#fff!important"
                    href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/full-news'>/full-news</a></li>
            <li>
                <a style="color:#fff!important"
                    href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/guardian'>/news/:newspaperName</a>
                <ol style="list-style-type: lower-alpha; padding-bottom: 0;">
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/thetimes'> thetimes
                        </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/guardian'> guardian
                        </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/telegraph'>
                            telegraph </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/cityam'> cityam
                        </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/nyt'> nyt </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/latimes'> latimes
                        </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/smh'> smh </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/un'> un </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/bbc'> bbc </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/es'> es </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/sun'> sun </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/dm'> dm </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/nyp'> nyp </a></li>
                    <li style="color:#47ebb4"><a style="color:#fff!important"
                            href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/no-valid'> INVALID
                        </a></li>
                </ol>
            </li>
        </ul>

        <div id="footer">Node.js - Express - Axios - Cheerio - Nodemon - RapidAPI - Heroku <a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </a> <a
                href="https://www.linkedin.com/in/carlos-vera-06a6b053/" style="color: white;font-size: 80%;">Author:
                Carlos
                Vera</a> </div>
        <a href="https://www.linkedin.com/in/carlos-vera-06a6b053/" title="LinkedIn"
            class="linkedin btn btn-linkedin btn-lg"><i class="fa fa-linkedin fa-fw"></i> LinkedIn</a>

    </div>
    <script> </script>

</body>

</html>
     `);
})

app.get('/news', (req, resp) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
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
        <h3 style="color:#74fa5f;"><center>Welcome to Climate-Change News API</center></h1>
        <h1 style="color:yellow"> <center>INVALID URL </center> </h3>
        <h4 style="color:74fa5f;">Valid resources:</h4>
        <ul>
            <li><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/'>/</a></li>
            <li><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news'>/news</a></li>
            <li><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/full-news'>/full-news</a></li>
            <li>
                    <a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/guardian'>/news/:newspaperName</a>
                        <ol style="list-style-type: lower-alpha; padding-bottom: 0;">
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/thetimes'> thetimes </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/guardian'> guardian </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/telegraph'> telegraph </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/cityam'> cityam </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/nyt'> nyt </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/latimes'> latimes </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/smh'> smh </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/un'> un </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/bbc'> bbc </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/es'> es </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/sun'> sun </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/dm'> dm </a></li>
                            <li style="color:#47ebb4"><a style="color:#fff!important" href='https://climatechangeapidevelopmentnodejsexpress.onrender.com/news/nyp'> nyp </a></li>
                        </ol>
            </li>
        </ul>
        </body>
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
