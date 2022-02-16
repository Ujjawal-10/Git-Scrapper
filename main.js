let url='https://github.com/topics';
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml=require("./reposPage");

request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    } else if(response.statusCode==404){
        console.log("page not found");
    }
    else
    {
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let $= cheerio.load(html);
    let linkElemArr =$('.no-underline.d-flex.flex-column.flex-justify-center'); //ye vo elent h jispe click krke hume link milega or ese 3 elements h
    for( let i=0;i<linkElemArr.length;i++){
        let href= $(linkElemArr[i]).attr("href"); //isse aadha adhura link ayega
        // console.log(href)
        let fullLink='https://github.com'+href; // isse puri link aa gyi
        // console.log(fullLink)

        let topic=href.split('/').pop(); //topic hum href se laye h , is pop se meri last value topic variable me store ho gyi h
        
        //hume puri link mil chuki h , us link pe pohonchne k baad ka kaam getReposPageHtml krega
        getReposPageHtml(fullLink,topic);
    }

}