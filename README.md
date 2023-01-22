# ClimateChangeAPIDevelopmentNodeJsExpressAxios
This repository is intended to retrieve live climate-change URLs by using Web scraping and APIs.  

___

## Table of contents[![](https://i.ibb.co/2kHmnLX/image.png)](#table-of-contents)
1. [Requisites](#requisites)
2. [To run this project](#to-run-this-project)
3. [Start the project](#start-the-project)
4. [Online resources](#online-resources)
5. [Composition](#composition-toolslibraries)
   - [Tools/Libraries](#composition-toolslibraries)
6. [MIT licence](#mit-licence)

___

## Requisites:[![](https://i.ibb.co/2kHmnLX/image.png)](#requisites)


##### 1- Install Git locally
You can follow one of these links:  

- Windows, Linux, Mac:  
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git  
<br/>

- Or using Homebrew:  
https://www.atlassian.com/git/tutorials/install-git

```bash
brew install git
```

<br/>

##### 2- Install Node.js locally
You can follow one of these links:  

- Windows, Linux, Mac:  
https://nodejs.org/en/download/current/  
<br/>

- Or using Homebrew:   

```bash
brew install node
```

___



## To run this project:[![](https://i.ibb.co/2kHmnLX/image.png)](#run-project)

You can run this project on your local machine.  
Just pull it down (git clone) and install dependencies:

```bash
git clone https://github.com/cvera08/ClimateChangeAPIDevelopmentNodeJsExpressAxios.git
cd ClimateChangeAPIDevelopmentNodeJsExpressAxios
npm i
```


___

## Start the project:[![](https://i.ibb.co/2kHmnLX/image.png)](#start)

Now run the server:

```bash
npm run start
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the results of the scrape in your terminal. You can also use certain parameters to get news from individual sources.

You may see something like this:  

[comment]: <> (v1: https://i.ibb.co/mTSSXCn/localhost-8000.png)
[comment]: <> (v2: https://i.imgur.com/C1fp2h8.png)
![alt text](https://i.imgur.com/IVGRe25.png)

Now you can copy the results and use an online json formatter like this: 
- [jsonformatter](https://jsonformatter.curiousconcept.com/#)
- [jsonviewer](http://jsonviewer.stack.hu/)

or install some add-on/extension like this: 
- [Chrome](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=es)
- [Firefox](https://addons.mozilla.org/es/firefox/addon/jsonview/)

___

## Online resources:[![](https://i.ibb.co/2kHmnLX/image.png)](#online)

RapidAPI:
- https://rapidapi.com/cvera08/api/climate-crisis

Live Site (ex Heroku app):
- https://climate-change-api-demo.vercel.app/



___

## Composition: (Tools/Libraries)[![](https://i.ibb.co/2kHmnLX/image.png)](#composition)


- Cheerio (Pickup HTML elements on a web page).  
- Express (Backend framework for Node.js).  
- Axios (Send HTTP requests to rest endpoints).  
- Nodemon (Monitor script - Restart the node application when the file changes).  
<br>   

* More:
  * Rapidapi (Developers can search and test the APIs, subscribe, and connect to the APIs).  
  * Heroku (Build, deliver, monitor and scale apps. Run, and operate applications entirely in the cloud).  
___

## MIT licence:[![](https://i.ibb.co/2kHmnLX/image.png)](#MIT)

Copyright (c) 2022 Carlos Vera

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


