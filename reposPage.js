const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml=require("./issues")

function getReposPageHtml(url,topic){
    request(url,cb);


    function cb (error,response,html){
        if(error){
            console.log(error)
        }else if(response.statusCode==404){
            console.log("page not found");
        }
        else{
            getReposLink(html)
            // console.log(html);
        }
    }

    function getReposLink(html){
            let $ =cheerio.load(html);
            //new page khulne k baad kafi sare username aur reponame ayi h, h3 tag me username repo name likha hua h, hume username nhi repo name chahiye to isme do anchor tags h hume pehla nhi chahiye hume dusra chahiye
            let headingsArr =  $('.f3.color-fg-muted.text-normal.lh-condensed')

            console.log(topic)

            for(let j=0;j<8;j++){// pehle 8 repos ko hi lelete h
                let twoAnchors =$(headingsArr[j]).find('a'); //dono anchor tag ko array me le aye
                let link=$(twoAnchors[1]).attr('href');
                // console.log(link);
                let fullLink=`https://github.com/${link}/issues`;
                // console.log(fullLink)
                let repoName=link.split('/').pop();
                getIssuesPageHtml(fullLink,topic,repoName);
            }
            console.log("--------------------------------------------------")
    } 
}


module.exports=getReposPageHtml