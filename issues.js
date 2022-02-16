const request = require("request");
const cheerio = require("cheerio");
const path=require("path");
const fs=require("fs");
const pdfkit=require("pdfkit")

function getIssuesPageHtml(url,topic,repoName){
    request(url,cb);


    function cb (error,response,html){
        if(error){
            console.log(error)
        }
        else if(response.statusCode==404){
            console.log("page not found");
        }
        else{
            
            // console.log(html);
            getIssues(html);
        }

    }
    function getIssues(html){
        let $=cheerio.load(html);
        let issuesElemArr=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
       
        console.log(issuesElemArr.length);

        let arr=[];
        for(let i=0;i<issuesElemArr.length;i++){
            let link=$(issuesElemArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        // console.log(topic,"   ",arr)

        let folderpath=path.join(__dirname,topic);
        dirCreator(folderpath);
        let filePath=path.join(folderpath,repoName+ ".pdf")
        let text=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));//pdf doc ko hum ye provide kr rhe h ki yaha tum write kr sakte ho
        pdfDoc.text(text)
        pdfDoc.end();
        // fs.writeFileSync(filePath);
    }
}
module.exports= getIssuesPageHtml;

function dirCreator(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}