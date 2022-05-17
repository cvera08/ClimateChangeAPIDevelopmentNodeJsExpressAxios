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

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

const available_resources = "Welcome to my Climate Change News API\n\nAvailable resourcess:"
let str = "Hello World!\nThis is my string";
console.log(str)

app.get('/', (req, res) => {
    //res.set('Content-Type', 'text/plain')
    //res.type('html')
    //008000 007b80
    res.send(`
    <body style="background-color:powderblue;">
    <h1 style="color:008000;"><center>Welcome to Climate-Change News API</center></h1>
    <h3 style="color:4c9141;">Available resources:</h3>
     <ul>
        <li><a href='http://localhost:8000/'>localhost:8000</a></li>
         <li><a href='http://localhost:8000/news'>localhost:8000/news</a></li>
         <li><a href='http://localhost:8000/full-news'>localhost:8000/full-news</a></li>
         <li>
                <a href='http://localhost:8000/news/guardian'>localhost:8000/news/:newspaperName</a>
                    <ol style="list-style-type: lower-alpha; padding-bottom: 0;">
                        <li><a href='http://localhost:8000/news/thetimes'> thetimes </a></li>
                        <li><a href='http://localhost:8000/news/guardian'> guardian </a></li>
                        <li><a href='http://localhost:8000/news/telegraph'> telegraph </a></li>
                        <li><a href='http://localhost:8000/news/cityam'> cityam </a></li>
                        <li><a href='http://localhost:8000/news/nyt'> nyt </a></li>
                        <li><a href='http://localhost:8000/news/latimes'> latimes </a></li>
                        <li><a href='http://localhost:8000/news/smh'> smh </a></li>
                        <li><a href='http://localhost:8000/news/un'> un </a></li>
                        <li><a href='http://localhost:8000/news/bbc'> bbc </a></li>
                        <li><a href='http://localhost:8000/news/es'> es </a></li>
                        <li><a href='http://localhost:8000/news/sun'> sun </a></li>
                        <li><a href='http://localhost:8000/news/dm'> dm </a></li>
                        <li><a href='http://localhost:8000/news/nyp'> nyp </a></li>
                    </ol>
        </li>
    </ul>
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
        <body style="background-color:powderblue;">
        <h3 style="color:008000;"><center>Welcome to Climate-Change News API</center></h1>
        <h3> <center>INVALID URL </center></h3>
        <h4 style="color:4c9141;">Valid resources:</h3>
         <ul>
            <li><a href='http://localhost:8000/'>localhost:8000</a></li>
             <li><a href='http://localhost:8000/news'>localhost:8000/news</a></li>
             <li><a href='http://localhost:8000/full-news'>localhost:8000/full-news</a></li>
             <li>
                <a href='http://localhost:8000/news/guardian'>localhost:8000/news/:newspaperName</a>
                    <ol style="list-style-type: lower-alpha; padding-bottom: 0;">
                        <li><a href='http://localhost:8000/news/thetimes'> thetimes </a></li>
                        <li><a href='http://localhost:8000/news/guardian'> guardian </a></li>
                        <li><a href='http://localhost:8000/news/telegraph'> telegraph </a></li>
                        <li><a href='http://localhost:8000/news/cityam'> cityam </a></li>
                        <li><a href='http://localhost:8000/news/nyt'> nyt </a></li>
                        <li><a href='http://localhost:8000/news/latimes'> latimes </a></li>
                        <li><a href='http://localhost:8000/news/smh'> smh </a></li>
                        <li><a href='http://localhost:8000/news/un'> un </a></li>
                        <li><a href='http://localhost:8000/news/bbc'> bbc </a></li>
                        <li><a href='http://localhost:8000/news/es'> es </a></li>
                        <li><a href='http://localhost:8000/news/sun'> sun </a></li>
                        <li><a href='http://localhost:8000/news/dm'> dm </a></li>
                        <li><a href='http://localhost:8000/news/nyp'> nyp </a></li>
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