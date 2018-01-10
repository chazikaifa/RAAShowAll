// ==UserScript==
// @name        RAA
// @namespace    https://worldofwarships.com.cn/
// @version      0.1
// @description  战绩连续查询脚本
// @author       Allophones
// @match        https://worldofwarships.com.cn/index.php
// @grant        none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// @require    https://cdn.bootcss.com/react/15.4.2/react.min.js
// @require    https://cdn.bootcss.com/react/15.4.2/react-dom.min.js
// @require    https://cdn.bootcss.com/babel-standalone/6.22.1/babel.min.js
// ==/UserScript==

//该脚本用于https://worldofwarships.com.cn/index.php
//原本网页每次只能查一艘船，脚本在查询一次后自动遍历加载所有的船。
//
//由于原网页没有暴露所有数据的接口，所以原理其实是脚本不断访问原网页，抓取数据部分放到网页上，
//为了不让对面服务器拒绝我频繁的访问，采用在一次访问结束后隔半秒再继续访问，所以加载速度有点慢。

(function() {
    'use strict';

    function link(server,name,i,options){

        if(i>=options.length){
          console.log("finish!");
          alert("加载完毕！");
          return;
        }

        let index = options[i].value;

        let form = new FormData();
        form.append("server",server);
        form.append("name",name);
        form.append("index",index);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://worldofwarships.com.cn/index.php",
            "method": "POST",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "40624b39-0158-c356-39ea-e2c13ae83fb9"
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };

        $.ajax(settings).done(function (response) {
            let tbody = document.getElementsByTagName("tbody")[0];
            var data = $(response).find("tr")[1];
            if($(data).find("td")[3].innerText == "0"){
              console.log($(data).find("td")[2].innerText + "    abort!");
            }else{
              $(tbody).append(data);
            }
            // console.log(index);
            setTimeout(link(server,name,i+1,options),500);
        });
    }

    function getServer(){
        let server = document.getElementsByName("server");
        for(let i=0;i<server.length;i++){
            if(server[i].checked){
                return server[i].value;
            }
        }
        return false;
    }

    function getName(){
        let name = document.getElementsByName("name")[0];
        return name.value;
    }

    var flag = true;

    var server = getServer();
    if(server){
        console.log("get server success!");
    }else{
        flag = false;
    }
    var name = getName();
    if(name){
        console.log("get name success!");
    }else{
        flag = false;
    }

    if(flag){
        let child = document.getElementsByTagName("tr")[1];
        document.getElementsByTagName("tbody")[0].removeChild(child);

        var options = document.getElementsByTagName("option");

        link(server,name,0,options);
    }
})();