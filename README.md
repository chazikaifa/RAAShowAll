# RAAShowAll

## version 0.1

## 注意：该文件用于Tampermonkey，请先了解http://tampermonkey.net/

 * 该脚本用于https://worldofwarships.com.cn/index.php 
 * 原本网页每次只能查一艘船，脚本在查询一次后自动遍历加载所有的船。
 * 由于原网页没有暴露所有数据的接口，所以原理其实是脚本不断访问原网页，抓取数据部分放到网页上，
 * 为了不让对面服务器拒绝我频繁的访问，采用在一次访问结束后隔半秒再继续访问，所以加载速度有点慢。
 * 如有建议或疑问欢迎在该工程下发起讨论！https://github.com/chazikaifa/RAAShowAll/issues
  
## version 0.2 

 * 修改排版，原昵称修改为稀有度显示
 * 为方便查看数据，每30条数据添加3空行以及一条表头
