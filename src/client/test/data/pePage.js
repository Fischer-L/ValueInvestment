const HTML = `
<!doctype html>
<html lang="zh-TW">
<head>
    <meta charset="utf-8">
    <title>台積電(2330)本益比分析 | 台股 | 玩股網</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"  />


    <meta property="og:title" content="台積電(2330)本益比分析 | 台股 | 玩股網" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.wantgoo.com/stock/report/value?types=1&amp;stockno=2330" />
    <meta property="og:image" content="https://www.wantgoo.com/images/wantgoo-og-default.jpg" />
    <meta property="og:site_name" content="玩股網" />
    <meta name="description" content="台積電(2330)本益比分析，提供本益比與每月收盤價比較，包含每月的本益比等最新動態，更多台積電(2330)財報資訊盡在玩股網" />
    <meta property="og:description" content="台積電(2330)本益比分析，提供本益比與每月收盤價比較，包含每月的本益比等最新動態，更多台積電(2330)財報資訊盡在玩股網" />
    <link rel="canonical" href="https://www.wantgoo.com/stock/report/value?stockno=2330&types=1">



<link rel='stylesheet' type='text/css' href='/dynamicfiles/common/css/shared_allwebsite.css?versionParams=2019-0329-003'>
<link rel='stylesheet' type='text/css' href='/css/twstock/twstock.css?versionParams=2019-0329-003'>



<script type='text/javascript' src='/dynamicfiles/common/js/shared_allwebsite.js?versionParams=2019-0329-003'></script>

<script type='text/javascript'>var facebookPixelCode = '216968031982114';</script>
<script type='text/javascript' src='/js/facebook/FacebookPixelCode.js'></script>
<noscript><img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=216968031982114&ev=PageView&noscript=1' /></noscript>




    <script src="/js/highCharts/stock/highstock.js"></script>
    <script src="/js/highCharts/stock/modules/exporting.js"></script>
    <script>
    var _DATA = ["[1199145600000,15.44],[1201824000000,15.88],[1204329600000,15.28],[1207008000000,15.66],[1209600000000,14.2],[1212278400000,14.07],[1214870400000,12.41],[1217548800000,12.64],[1220227200000,11.27],[1222819200000,10.21],[1225497600000,8.66],[1228089600000,9.43],[1230768000000,8.45],[1233446400000,9.44],[1235865600000,13.18],[1238544000000,14.15],[1241136000000,21.12],[1243814400000,19.13],[1246406400000,20.67],[1249084800000,22.17],[1251763200000,24.16],[1254355200000,22.47],[1257033600000,22.97],[1259625600000,24.02],[1262304000000,23.12],[1264982400000,22.11],[1267401600000,17.88],[1270080000000,17.97],[1272672000000,12.86],[1275350400000,12.95],[1277942400000,13.33],[1280620800000,11.11],[1283299200000,11.7],[1285891200000,11.87],[1288569600000,10.69],[1291161600000,11.97],[1293840000000,12.87],[1296518400000,11.89],[1298937600000,11.91],[1301616000000,11.73],[1304208000000,12.1],[1306886400000,11.39],[1309478400000,11.36],[1312156800000,11.25],[1314835200000,11.35],[1317427200000,13.31],[1320105600000,13.49],[1322697600000,13.71],[1325376000000,14.2],[1328054400000,14.67],[1330560000000,16.39],[1333238400000,16.76],[1335830400000,16.79],[1338508800000,16.04],[1341100800000,15.98],[1343779200000,15.72],[1346457600000,16.94],[1349049600000,14.73],[1351728000000,16.4],[1354320000000,16.11],[1356998400000,16.86],[1359676800000,16.3],[1362096000000,15.68],[1364774400000,17.08],[1367366400000,16.49],[1370044800000,16.72],[1372636800000,15.44],[1375315200000,14.3],[1377993600000,14.3],[1380585600000,15.58],[1383264000000,14.73],[1385856000000,14.8],[1388534400000,14.73],[1391212800000,14.88],[1393632000000,16.32],[1396310400000,16.32],[1398902400000,15.77],[1401580800000,16.69],[1404172800000,15.96],[1406851200000,15.74],[1409529600000,15.23],[1412121600000,16.56],[1414800000000,16.04],[1417392000000,15.99],[1420070400000,15.99],[1422748800000,14.78],[1425168000000,14.29],[1427846400000,14.44],[1430438400000,12.83],[1433116800000,12.35],[1435708800000,12.26],[1438387200000,10.63],[1441065600000,10.71],[1443657600000,11.24],[1446336000000,11.49],[1448928000000,11.82],[1451606400000,11.74],[1454284800000,12.61],[1456790400000,13.71],[1459468800000,12.69],[1462060800000,13.89],[1464739200000,14.42],[1467331200000,15.31],[1470009600000,15.99],[1472688000000,16.58],[1475280000000,17.12],[1477958400000,15.47],[1480550400000,15.34],[1483228800000,15.68],[1485907200000,14.66],[1488326400000,14.66],[1491004800000,15.09],[1493596800000,14.74],[1496275200000,15.14],[1498867200000,15.58],[1501545600000,16],[1504224000000,16],[1506816000000,17.96],[1509494400000,17.03],[1512086400000,17.29],[1514764800000,19.22],[1517443200000,18.59],[1519862400000,18.71],[1522540800000,17.16],[1525132800000,16.83],[1527811200000,16.27],[1530403200000,18.48],[1533081600000,18.89],[1535760000000,19.37],[1538352000000,17.27],[1541030400000,16.68],[1543622400000,16.68],[1546300800000,16.35],[1548979200000,17.65],[1551398400000,18.13],[1554076800000,18.21]"];
    var _ClosePrice = [[1136073600000,63.5],[1138752000000,60.9],[1141171200000,64.2],[1143849600000,68.1],[1146441600000,60.3],[1149120000000,58.4],[1151712000000,54.8],[1154390400000,58.1],[1157068800000,59.7],[1159660800000,61],[1162339200000,65.5],[1164931200000,67.5],[1167609600000,67.4],[1170288000000,69.3],[1172707200000,67.9],[1175385600000,68.7],[1177977600000,68.2],[1180656000000,70.9],[1183248000000,65],[1185926400000,62.7],[1188604800000,63.3],[1191196800000,63.8],[1193875200000,60.6],[1196467200000,62],[1199145600000,59.9],[1201824000000,61.6],[1204329600000,63.1],[1207008000000,66.7],[1209600000000,65.6],[1212278400000,65],[1214870400000,56.2],[1217548800000,58.9],[1220227200000,52.5],[1222819200000,48],[1225497600000,40.8],[1228089600000,44.4],[1230768000000,40.2],[1233446400000,44.95],[1235865600000,51.4],[1238544000000,55.2],[1241136000000,60.4],[1243814400000,54.7],[1246406400000,58.9],[1249084800000,59.2],[1251763200000,64.5],[1254355200000,60],[1257033600000,61.1],[1259625600000,64.5],[1262304000000,61.5],[1264982400000,58.8],[1267401600000,61.5],[1270080000000,61.8],[1272672000000,60.2],[1275350400000,60.6],[1277942400000,62.4],[1280620800000,58.9],[1283299200000,62],[1285891200000,62.8],[1288569600000,63.4],[1291161600000,71],[1293840000000,76.3],[1296518400000,70.5],[1298937600000,70.6],[1301616000000,73.2],[1304208000000,76.7],[1306886400000,72.2],[1309478400000,72],[1312156800000,69.4],[1314835200000,70],[1317427200000,73.6],[1320105600000,74.6],[1322697600000,75.8],[1325376000000,78.5],[1328054400000,81.1],[1330560000000,84.9],[1333238400000,86.8],[1335830400000,85.1],[1338508800000,81.3],[1341100800000,81],[1343779200000,83.3],[1346457600000,89.8],[1349049600000,88.7],[1351728000000,98.7],[1354320000000,97],[1356998400000,101.5],[1359676800000,104.5],[1362096000000,100.5],[1364774400000,109.5],[1367366400000,109.5],[1370044800000,111],[1372636800000,102.5],[1375315200000,100.5],[1377993600000,100.5],[1380585600000,109.5],[1383264000000,105],[1385856000000,105.5],[1388534400000,108],[1391212800000,108],[1393632000000,118.5],[1396310400000,118.5],[1398902400000,119.5],[1401580800000,126.5],[1404172800000,121],[1406851200000,124],[1409529600000,120],[1412121600000,130.5],[1414800000000,141.5],[1417392000000,141],[1420070400000,141],[1422748800000,150.5],[1425168000000,145.5],[1427846400000,147],[1430438400000,146],[1433116800000,140.5],[1435708800000,139.5],[1438387200000,129],[1441065600000,130],[1443657600000,136.5],[1446336000000,139],[1448928000000,143],[1451606400000,142],[1454284800000,149],[1456790400000,162],[1459468800000,150],[1462060800000,156.5],[1464739200000,162.5],[1467331200000,172.5],[1470009600000,176],[1472688000000,182.5],[1475280000000,188.5],[1477958400000,183],[1480550400000,181.5],[1483228800000,185.5],[1485907200000,189],[1488326400000,189],[1491004800000,194.5],[1493596800000,203],[1496275200000,208.5],[1498867200000,214.5],[1501545600000,216.5],[1504224000000,216.5],[1506816000000,243],[1509494400000,226],[1512086400000,229.5],[1514764800000,255],[1517443200000,246],[1519862400000,247.5],[1522540800000,227],[1525132800000,224],[1527811200000,216.5],[1530403200000,246],[1533081600000,256],[1535760000000,262.5],[1538352000000,234],[1541030400000,225.5],[1543622400000,225.5],[1546300800000,221],[1548979200000,239],[1551398400000,245.5],[1554076800000,253]];
    var _name = '本益比';
        $(function () {
            var types= 1;
            $('.ic-ask').fancybox({
                title: '',
                href: '#explain_' + types
            });
        });
    </script>

<!-- Hotjar Tracking Code for https://www.wantgoo.com/ -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:827061,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>

</head>
<body>
    <div id="wrap">




<header id="header">
    <div class="head">
        <div class="brand">
                    <a href="/">

                        <img src="/images/wantgoo-logo.png" alt="WantGoo玩股網" width="160" />
                    </a>
        </div><!-- brand:end -->

        <div class="head-tools">
            <a id="aLogin" href="javascript:;" class="hide tools-btn-bor">登入</a>
            <a id="aReg" href="/login/auth/register_normal?returnUrl=/stock/report/value?types=1&amp;stockno=2330" class="hide tools-btn-bor" style="border-color: #f44336;color: #f44336;">免費註冊</a>

            <a id="aSelfCollection" href="/my/stocklist" class="hide tools-btn" title="自選股"><i class="ic-astock"></i></a>
            <a id="aInsideMail" href="/member/insidemail/inbox" class="hide tools-btn"><i class="ic-email"></i><i class="msg-bubble">0</i></a>
            <div id="divMemberBlock" class="hide head-avatar">
                <a id="imgHeadImg" href="#" class="tools-btn"><i class="ic-avatar"><img src="/image/displaydefault1.png" alt="" width="32" height="32" /></i><cite>123</cite></a>
                <div class="head-menu">
                    <ul id="ulMemberMenu" class="head-menu-ul box-bor">
                        <li><a href="/blog/blogcms/postblog">我要發文</a></li>
                        <li><a href="/blog/blogcms/index">網誌管理</a></li>
                        <li><a href="/member/memberarea/mydata">會員專區</a></li>
                        <li><a href="/login/auth/weblogout">登出</a></li>
                    </ul>
                </div><!-- head-tools-menu:end -->
            </div><!-- head-avatar:end -->
        </div><!-- head-tools:end -->

        <div id="search-bar">
            <div class="hot-stock" id="ShowHotStock">
                <cite>熱門：</cite>
                <a href="/option/futures/quotes?StockNo=WTXP%26" target="_blank"> 台指期盤後</a>


<a href='/stock/4953' title='緯軟,4953,126.00,▲ 3 (2.44%),短線--,長線▲,up' target='_blank'> 緯軟,4953 </a>
<a href='/stock/3231' title='緯創,3231,25.10,▲ 0.5 (2.03%),短線▲,長線▲,up' target='_blank'> 緯創,3231 </a>
<a href='/stock/2330' title='台積電,2330,253.00,▲ 6.5 (2.64%),短線▲,長線▲,up' target='_blank'> 台積電,2330 </a>
<a href='/stock/2442' title='新美齊,2442,14.45,▲ 0.65 (4.71%),短線▲,長線▲,up' target='_blank'> 新美齊,2442 </a>
            </div><!-- hot-stock:end -->

            <script type="text/javascript">
                // for **** js/masterPage.js => function SearchStock(stockNo)
                var urlStockPage = "/stock/";
                var domain_API_Stock2 = "https://api.wantgoo.com";
                var domain_Web_Stock2 = "https://www.wantgoo.com";
            </script>
            <div class="search-bar-inner">
                <div class="select-box">
                    <select id="ddlSearchItems" name="" class="select">
                        <option value="stocks">股票</option>
                        <option value="pages">文章</option>
                    </select>
                </div>
                <input type="text" value="" name="txtSearchStock" id="txtSearchStock" class="input-search" autocomplete="off">
                <button class="butn-search" id="btnHeaderSearch"><i class="ic-search"></i></button>
            </div><!-- search-bar-inner:end -->
        </div><!-- search-bar:end -->

        <ul class="adWords">



<li id='HeaderTextAd_4'><a href='https://www.wantgoo.com/laojiao'>投資菜鳥專屬</a></li>
<li id='HeaderTextAd_1'><a href='https://www.wantgoo.com/laojiao/project/3'>這是個沒有主力干預的市場</a></li>
<li id='HeaderTextAd_8'><a href='http://bit.ly/2JwFQxx'>每天三分鐘做完股市功課</a></li>
<li id='HeaderTextAd_3'><a href='http://bit.ly/2Juazv7'>免費試用客製化選股工具</a></li>
        </ul>
    </div><!-- head:end -->

    <script type='text/javascript'>
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        (function () {
            var gads = document.createElement('script');
            gads.async = true;
            gads.type = 'text/javascript';
            var useSSL = 'https:' == document.location.protocol;
            gads.src = (useSSL ? 'https:' : 'http:') +
                '//www.googletagservices.com/tag/js/gpt.js';
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(gads, node);
        })();
    </script>


</header>

<nav id="navigation">
    <div class="nav-box bg-linear box-bor">
        <ul class="nav-channel">
            <li class="nav-channel-home"><a href="/" title="玩股網首頁" class="ic-home"></a></li>
            <li>
                <a href="/stock" onclick="sentEvent('點擊台股', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">台股</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/stock" onclick="sentEvent('點擊台股_重點資訊', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">重點資訊</span></a></li>
                    <li>
                        <a href="/stock/twstock/class" onclick="sentEvent('點擊台股_分類行情', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">分類行情</span></a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/twstock/class?id=2" onclick="sentEvent( '點擊台股_分類行情_上市分類', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上市分類</span></a></li>
                            <li><a href="/stock/twstock/class?id=3" onclick="sentEvent(  '點擊台股_分類行情_上櫃分類', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上櫃分類</span></a></li>
                            <li><a href="/stock/twstock/classlist?group=4" onclick="sentEvent( '點擊台股_分類行情_電子股', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">電子產業</span></a></li>
                            <li><a href="/stock/twstock/classlist?group=8" onclick="sentEvent( '點擊台股_分類行情_指數成份股','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">指數成份股</span></a></li>
                            <li><a href="/stock/twstock/classlist?group=5" onclick="sentEvent(  '點擊台股_分類行情_概念股','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">概念股</span></a></li>
                            <li><a href="/stock/twstock/classlist?group=6" onclick="sentEvent('點擊台股_分類行情_集團股',  '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">集團股</span></a></li>
                            <li><a href="/stock/twstock/classcont?id=^273" onclick="sentEvent( '點擊台股_分類行情_ETF', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">ETF</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/stock/twstock/threeall" onclick="sentEvent( '點擊台股_三大法人', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">三大法人</span></a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/institutional-investor/foreign/double-long" onclick="sentEvent('點擊台股_三大法人_外資多空動向', '導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">外資多空動向</span></a></li>
                            <li><a href="/stock/twstock/threeall" onclick="sentEvent('點擊台股_三大法人_法人買賣金額','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">法人買賣金額</span></a></li>
                            <li><a href="/stock/twstock/threebuysellrank?type=%E5%A4%96%E8%B3%87" onclick="sentEvent( '點擊台股_三大法人_外資', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">外資</span></a></li>
                            <li><a href="/stock/twstock/threebuysellrank?type=%E6%8A%95%E4%BF%A1" onclick="sentEvent('點擊台股_三大法人_投信',  '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">投信</span></a></li>
                            <li><a href="/stock/twstock/threebuysellrank?type=%E8%87%AA%E7%87%9F%E5%95%86" onclick="sentEvent( '點擊台股_三大法人_自營商','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">自營商</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/stock/twstock/financingbearish?type=%E5%A4%A7%E7%9B%A4%E7%B1%8C%E7%A2%BC%E8%AE%8A%E5%8C%96" onclick="sentEvent('點擊台股_融資融券','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">融資融券</span></a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/twstock/financingbearish?type=%E5%A4%A7%E7%9B%A4%E7%B1%8C%E7%A2%BC%E8%AE%8A%E5%8C%96" onclick="sentEvent( '點擊台股_融資融券_大盤籌碼變化', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">大盤籌碼變化</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E8%B3%87%E5%A2%9E" onclick="sentEvent('點擊台股_融資融券_融資增加', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">融資增加</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E8%B3%87%E6%B8%9B" onclick="sentEvent('點擊台股_融資融券_融資減少', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">融資減少</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E5%88%B8%E5%A2%9E" onclick="sentEvent('點擊台股_融資融券_融券增加', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">融券增加</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E5%88%B8%E6%B8%9B" onclick="sentEvent('點擊台股_融資融券_融券減少','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">融券減少</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E8%B3%87%E5%88%B8%E4%BA%92%E6%8A%B5" onclick="sentEvent('點擊台股_融資融券_資券互抵','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">資券互抵</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E8%9E%8D%E8%B3%87%E4%BD%BF%E7%94%A8%E7%8E%87" onclick="sentEvent( '點擊台股_融資融券_融資使用率','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">融資使用率</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E8%9E%8D%E5%88%B8%E4%BD%BF%E7%94%A8%E7%8E%87" onclick="sentEvent('點擊台股_融資融券_融券使用率','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">融券使用率</span></a></li>
                            <li><a href="/stock/twstock/financingbearish?type=%E5%88%B8%E8%B3%87%E6%AF%94%E6%8E%92%E8%A1%8C" onclick="sentEvent('點擊台股_融資融券_券資比排行', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">券資比排行</span></a></li>
                            <li><a href="/stock/outstandingvolume/index" onclick="sentEvent('點擊台股_融資融券_外資借券賣出餘額','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">外資借券賣出餘額</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/stock/eightbank?types=B" onclick="sentEvent('點擊台股_八大行庫', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">八大行庫</span></a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/eightbank?types=B" onclick="sentEvent('點擊台股_八大行庫_上市櫃合併買超前50名','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上市櫃合併買超前50名</span></a></li>
                            <li><a href="/stock/eightbank?types=S" onclick="sentEvent( '點擊台股_八大行庫_上市櫃合併賣超前50名','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上市櫃合併賣超前50名</span></a></li>
                            <li><a href="/stock/eightbank?types=B1" onclick="sentEvent( '點擊台股_八大行庫_上市買超前30名', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上市買超前30名</span></a></li>
                            <li><a href="/stock/eightbank?types=S1" onclick="sentEvent('點擊台股_八大行庫_上市賣超前30名', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上市賣超前30名</span></a></li>
                            <li><a href="/stock/eightbank?types=B2" onclick="sentEvent('點擊台股_八大行庫_上櫃買超前30名','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上櫃買超前30名</span></a></li>
                            <li><a href="/stock/eightbank?types=S2" onclick="sentEvent('點擊台股_八大行庫_上櫃賣超前30名', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">上櫃賣超前30名</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/stock/agentrank" onclick="sentEvent('點擊台股_主力進出', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">主力進出</span></a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/agentrank" onclick="sentEvent( '點擊台股_主力進出_主力進出買賣超排行','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">主力進出買賣超排行</span></a></li>
                            <li><a href="/stock/agentsata" onclick="sentEvent('點擊台股_主力進出_總公司進出統計','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">總公司進出統計</span></a></li>
                            <li><a href="/stock/agentsata?types=8" onclick="sentEvent('點擊台股_主力進出_分公司進出統計', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">分公司進出統計</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/stock/twstock/stat" onclick="sentEvent( '點擊台股_即時排行', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">即時排行</span></a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/twstock/stat?type=increase" onclick="sentEvent('點擊台股_即時排行_漲跌幅', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">漲跌幅</span></a></li>
                            <li><a href="/stock/twstock/stat?type=dailyvolume" onclick="sentEvent( '點擊台股_即時排行_成交量', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">成交量</span></a></li>
                            <li><a href="/stock/twstock/stat?type=deal" onclick="sentEvent( '點擊台股_即時排行_一般','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">一般</span></a></li>
                            <li><a href="/stock/twstock/stat?type=eps" onclick="sentEvent('點擊台股_即時排行_基本面', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">基本面</span></a></li>
                            <li><a href="/stock/cashyieldsrank/index" onclick="sentEvent('點擊台股_即時排行_現金殖利率排行','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">現金殖利率排行</span></a></li>
                        </ul>
                    </li>
                    <li><a href="/stock/adl" onclick="sentEvent('點擊台股_騰落線', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">騰落線</span></a></li>
                    <li><a href="/stock/marketbidsellchart/index" onclick="sentEvent('點擊台股_多空力道監控', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">多空力道監控</span></a></li>
                    <li><a href="/newsletter/daily/fast" onclick="sentEvent( '點擊台股_玩股速報', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">玩股速報</span></a></li>
                    <li><a href="/stock/techspec/calc" onclick="sentEvent('點擊台股_未來指標計算器', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">未來指標計算器</span></a></li>
                    <li><a href="/stock/bullrank" onclick="sentEvent( '點擊台股_多空頭排列', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">多空頭排列</span></a></li>
                    <li>
                        <a href="javascript:;" onclick="sentEvent('點擊台股_行事曆','導覽列',  'NoLogging', {'dimension3':'0'});">行事曆</a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/twstock/draw" onclick="sentEvent('點擊台股_行事曆_公開申購','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">公開申購</span></a></li>
                            <li><a href="/stock/twstock/shareholdersmeeting" onclick="sentEvent( '點擊台股_行事曆_股東會', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">股東會</span></a></li>
                            <li><a href="/stock/twstock/exright" onclick="sentEvent('點擊台股_行事曆_除權息', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">除權息</span></a></li>
                            <li><a href="/stock/twstock/investorconference" onclick="sentEvent( '點擊台股_行事曆_法說會', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">法說會</span></a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/option" onclick="sentEvent('點擊期權', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">期權</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/option" onclick="sentEvent('點擊期權_期權首頁', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">期權首頁</span></a></li>
                    <li>
                        <a href="/stock/futures/futuresTop10" onclick="sentEvent( '點擊期權_期權留倉', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">期權留倉</span></a>
                        <ul class="nav-channel-3">
                            <li><a href="/stock/futures/futurestop10" onclick="sentEvent('點擊期權_期權留倉_台指期法人及大額留倉','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">台指期法人及大額留倉</span></a></li>
                            <li><a href="/stock/futures/optionstop10" onclick="sentEvent('點擊期權_期權留倉_選擇權法人及大額留倉', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">選擇權法人及大額留倉</span></a></li>
                            <li><a href="/stock/futures/futures_if" onclick="sentEvent( '點擊期權_期權留倉_外資持倉','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">外資持倉</span></a></li>
                            <li><a href="/stock/futures/futures_it" onclick="sentEvent('點擊期權_期權留倉_投信持倉','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">投信持倉</span></a></li>
                            <li><a href="/stock/futures/futures_d" onclick="sentEvent('點擊期權_期權留倉_自營持倉','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">自營持倉</span></a></li>
                        </ul>
                    </li>
                    <li><a href="/stock/futures/optionstoday" onclick="sentEvent('點擊期權_選擇權支撐壓力表','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">選擇權支撐壓力表</span></a></li>
                    <li><a href="/stock/futures/optionscprate" onclick="sentEvent('點擊期權_選擇權買賣權比','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">選擇權買賣權比</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/news/list/index" onclick="sentEvent( '點擊新聞','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">新聞</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/news/list/index" onclick="sentEvent( '點擊新聞_總覽','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">總覽</span></a></li>
                    <li><a href="/news/list/category?Name=&Title=頭條" onclick="sentEvent( '點擊新聞_頭條', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">頭條</span></a></li>
                    <li><a href="/news/list/category?Name=%E5%8F%B0%E8%82%A1&Title=%E5%8F%B0%E8%82%A1" onclick="sentEvent('點擊新聞_台股','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">台股</span></a></li>
                    <li><a href="/news/list/category?Name=國際股&Title=國際" onclick="sentEvent( '點擊新聞_國際', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">國際</span></a></li>
                    <li><a href="/news/list/category?Name=商品期貨&Title=商品期貨" onclick="sentEvent('點擊新聞_商品期貨','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">商品期貨</span></a></li>
                    <li><a href="/news/list/category?Name=%E5%85%AC%E5%91%8A&Title=%E5%85%AC%E5%91%8A" onclick="sentEvent( '點擊新聞_公告', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">公告</span></a></li>
                </ul>
            </li>
            <li>
                <div class="mark-ribbon">
                    <span class="mark-words">NEW</span>
                </div>
                <a href="/laojiao" onclick="sentEvent('點擊老鳥說', '導覽列', 'NoLogging', { 'dimension3': '0' });" target="_blank" itemprop="url"><span itemprop="name">老鳥說</span></a>
            </li>
            <li>
                <a href="/global" onclick="sentEvent('點擊國際','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">國際</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/global" onclick="sentEvent('點擊國際_國際股市', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">國際股市</span></a></li>
                    <li><a href="/global/usstock" onclick="sentEvent('點擊國際_美股行情', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">美股行情</span></a></li>
                    <li><a href="/global/tw_dji" onclick="sentEvent( '點擊國際_台股VS美股', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">台股VS美股</span></a></li>
                    <li><a href="/global/tw_shi" onclick="sentEvent('點擊國際_台股VS陸股','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">台股VS陸股</span></a></li>
                    <li><a href="/global/rest" onclick="sentEvent('點擊國際_台股全球休市', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">全球休市</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/blog" onclick="sentEvent( '點擊網誌', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">網誌</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/blog" onclick="sentEvent('點擊網誌_最新文章', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">最新文章</span></a></li>
                    <li><a href="/blog/columnist" onclick="sentEvent('點擊網誌_專欄文章', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">專欄文章</span></a></li>
                    <li><a href="/blog/billboard" onclick="sentEvent('點擊網誌_作家排行', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">作家排行</span></a></li>
                    <li><a href="/blog/special" onclick="sentEvent('點擊網誌_精選文章', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">精選文章</span></a></li>
                    <li><a href="/blog/classc?classN=2" onclick="sentEvent('點擊網誌_財經類','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">財經類</span></a></li>
                    <li><a href="/blog/classc?classN=10" onclick="sentEvent('點擊網誌_生活類', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">生活類</span></a></li>
                    <li><a href="/blog/classc?classN=15" onclick="sentEvent('點擊網誌_公告', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">公告</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/hottip/search/easyselect" onclick="sentEvent('點擊飆股搜尋預設普通版', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">飆股搜尋</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/hottip/search/advancesearch" onclick="sentEvent('點擊飆股搜尋_任選版飆股搜尋', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">任選版飆股搜尋</span></a></li>
                    <li><a href="/hottip/search/easyselect" onclick="sentEvent('點擊飆股搜尋_普通版飆股搜尋','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">普通版飆股搜尋</span></a></li>
                    <li><a href="/hottip/notifysetting" onclick="sentEvent('點擊飆股搜尋_飆股通知設定','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">飆股通知設定</span></a></li>
                    <li><a href="/hottip/stoploss" onclick="sentEvent('點擊飆股搜尋_停損通知設定','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">停損通知設定</span></a></li>
                    <li><a href="/hottip/search/performanceanalysis" onclick="sentEvent( '點擊飆股搜尋_績效分析', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">績效分析</span></a></li>
                    <li><a href="/hottip/pages/intro" onclick="sentEvent('點擊飆股搜尋_飆股介紹', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">飆股介紹</span></a></li>
                    <li><a href="/hottip/pages/teaching" onclick="sentEvent('點擊飆股搜尋_教學文章', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">教學文章</span></a></li>
                    <li><a href="/hottip/pages/qa" onclick="sentEvent('點擊飆股搜尋_飆股Q&amp;A', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">飆股Q&amp;A</span></a></li>
                    <li><a href="/hottip/smartselect" onclick="sentEvent('點擊飆股搜尋_俏秘書智慧選股', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">俏秘書智慧選股</span></a></li>
                    <li><a href="/hottip/pages/hottipmap" onclick="sentEvent('點擊飆股搜尋_飆股條件地圖', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">飆股條件地圖</span></a></li>
                    <li><a href="/hottip/pages/appuse" onclick="sentEvent('點擊飆股搜尋_安裝閃電通App','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">安裝閃電通App</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/stocktreasure/index" onclick="sentEvent( '點擊百寶箱', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">百寶箱</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/stocktreasure/app/appevent" onclick="sentEvent('點擊百寶箱_精選百寶箱','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">精選百寶箱</span></a></li>
                    <li><a href="/stocktreasure/totaltool" onclick="sentEvent('點擊百寶箱_選股百寶箱', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">選股百寶箱</span></a></li>
                    <li><a href="/stocktreasure/mytreasure" onclick="sentEvent( '點擊百寶箱_我的百寶箱','導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">我的百寶箱</span></a></li>
                    <li><a href="/stocktreasure/manager" onclick="sentEvent('點擊百寶箱_管理百寶箱', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">管理百寶箱</span></a></li>
                    <li><a href="/stocktreasure/notify" onclick="sentEvent('點擊百寶箱_百寶箱通知','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">百寶箱通知</span></a></li>
                    <li><a href="/stocktreasure/faq" onclick="sentEvent('點擊百寶箱_百寶箱Q&amp;A', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">百寶箱Q&amp;A</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/clubs" onclick="sentEvent('點擊社團', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">社團</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/clubs" onclick="sentEvent('點擊社團_教學社團', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">教學社團</span></a></li>
                    <li><a href="/club/myclub" onclick="sentEvent( '點擊社團_我的社團', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">我的社團</span></a></li>



                        <li>
                            <a href="/clubs/9" onclick="sentEvent('點擊社團_軍團長', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">軍團長</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/10" onclick="sentEvent('點擊社團_股小妹', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">股小妹</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/21" onclick="sentEvent('點擊社團_劃線', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">劃線</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/25" onclick="sentEvent('點擊社團_軌道鞅', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">軌道鞅</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/26" onclick="sentEvent('點擊社團_黑馬', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span class="onsale" itemprop="name">黑馬</span>
                                    <div class="mark-glint"><span class="mark-words">限時優惠</span></div>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/28" onclick="sentEvent('點擊社團_英雄哥', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">英雄哥</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/31" onclick="sentEvent('點擊社團_虎爺', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">虎爺</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/34" onclick="sentEvent('點擊社團_霍立', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">霍立</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clubs/35" onclick="sentEvent('點擊社團_外匯E哥', '導覽列', 'NoLogging', { 'dimension3': '0' });" itemprop="url">
                                    <span itemprop="name">外匯E哥</span>
                            </a>
                        </li>
                </ul>
            </li>
            <li>
                <a href="/elearn/video" onclick="sentEvent('點擊課程', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">課程</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/elearn/live" onclick="sentEvent('點擊Live_最新直播', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">Live</span></a></li>
                    <li><a href="/elearn/video" onclick="sentEvent( '點擊課程_最新課程', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">最新課程</span></a></li>
                    <li><a href="/mi/course/schedule" onclick="sentEvent('點擊課程_課程行事曆','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">課程行事曆</span></a></li>
                    <li><a href="/elearn/video/getmembervediobuyrecordlist" onclick="sentEvent('點擊課程_我的課程紀錄','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">我的課程紀錄</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/mall/product/index" onclick="sentEvent( '點擊商城', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">商城</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/mall/product/index" onclick="sentEvent('點擊商城_購物中心','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">購物中心</span></a></li>
                    <li><a href="/mall/shoppingcart/index" onclick="sentEvent('點擊商城_我要結帳','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">我要結帳</span></a></li>
                    <li><a href="/member/memberarea/orderhistory" onclick="sentEvent('點擊商城_我的訂單', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">我的訂單</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/newsletter/daily/fast" onclick="sentEvent('點擊速報', '導覽列', 'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">速報</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/newsletter/daily/fast" onclick="sentEvent( '點擊速報_玩股速報', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">玩股速報</span></a></li>
                </ul>
            </li>
            <li>
                <a href="/my/stocklist" onclick="sentEvent('點擊自選股','導覽列',  'NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">自選股</span></a>
                <ul class="nav-channel-2">
                    <li><a href="/my/stocklist" onclick="sentEvent( '點擊自選股_自選股', '導覽列','NoLogging', {'dimension3':'0'});" itemprop="url"><span itemprop="name">自選股</span></a></li>
                </ul>
            </li>
        </ul>
    </div><!-- nav-box:end -->
</nav><!-- navigation:end -->
<script src="/scripts/jquery.signalr-2.2.2.min.js"></script>
<script src="/signalr/hubs"></script>
<script type="text/javascript">
    var url = location.href;
    var pattern = "(?<=.com).*";
    var pathRegx = new RegExp(pattern);
    var matchPath = pathRegx.exec(url);

    $("a[href='" + matchPath + "']").parents("li").addClass("curt");

    if (isMobile()) {
        $("#navigation > div > ul > li > a").each(function () { $(this).attr("href", "javascript:;") });
    };

    if (window.jQuery && /\bUserName\b=[^;]+;/.test(document.cookie)) {
        var webNotificationScript = document.createElement("script");

        webNotificationScript.src = "/js/web-notification.js?v=636534226872643993";

        document.body.appendChild(webNotificationScript);
    }

    $(function () {
        LoadUserPanel();
    });
</script>


<div id="container" class="clearfix">



        <div class="WantgooAdv adsbox ads1000x90" name="1000x90個股" id="356788b1-9afe-46f8-b563-da3f99a0a0a5">
            <p><script type='text/javascript'>   googletag.cmd.push(function() {     googletag.defineSlot('/15927178/wantgoo_share_1000x90', [1000, 90], 'div-gpt-ad-1455863208313-0').addService(googletag.pubads());     googletag.pubads().enableSingleRequest();     googletag.enableServices();   }); </script><!-- /15927178/wantgoo_share_1000x90 --> <div id='div-gpt-ad-1455863208313-0' style='height:90px; width:1000px;'> <script type='text/javascript'> googletag.cmd.push(function() { googletag.display('div-gpt-ad-1455863208313-0'); }); </script> </div></p>
        </div>





        <ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
                <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" class="">
                        <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="https://www.wantgoo.com/">
                            <span itemprop="name">玩股網</span>
                        </a>
                    <meta itemprop="position" content="1" />
                </li>
                <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" class="">
                        <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="https://www.wantgoo.com/stock">
                            <span itemprop="name">台股</span>
                        </a>
                    <meta itemprop="position" content="2" />
                </li>
                <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" class="">
                        <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="https://www.wantgoo.com/stock/2330">
                            <span itemprop="name">台積電(2330)</span>
                        </a>
                    <meta itemprop="position" content="3" />
                </li>
                <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" class="">
                        <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="https://www.wantgoo.com/stock/report/basic_mr?stockno=2330">
                            <span itemprop="name">財報股利</span>
                        </a>
                    <meta itemprop="position" content="4" />
                </li>
                <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" class="active">
                        <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="https://www.wantgoo.com/stock/report/value?types=1&amp;stockno=2330">
                            <span itemprop="name">本益比</span>
                        </a>
                    <meta itemprop="position" content="5" />
                </li>
        </ol>





<div class="idx-info clearfix">
    <h3 class="idx-name">
        台積電<span class="i idx-code">2330</span>
    </h3>
    <time class="i redate">2019/04/08 14:58</time>
    <div class="idx-more">
        <small class="idx-status">上市</small>
            <span class="idx-class">
                <a href="/stock/twstock/classcont?id=^024">半導體</a><b class="i chg up">▲2.20%</b>
            </span>
        <button class="btn-sm add-mystock" name="台積電" no="2330"><span class="i">+</span>自選股</button>
    </div><!-- idx-more:end -->
</div><!-- idx-info:end -->
<div class="idx-quotes clearfix">



    <div id="ChangeInfoDiv" class="i idx-change up">
        <span class="price up" name="Deal">253.00</span>
        <span class="chg" name="Change">▲6.50</span>
        <span class="chg" name="ChangeRate">2.64%</span>
    </div><!-- idx-change:end -->


    <div class="idx-data">
        <ul class="idx-data-pri">
            <li name="Open">開盤<b class="up">251</b></li>
            <li name="High">最高<b class="up">253</b></li>
            <li name="Low">最低<b class="up">250.5</b></li>
            <li name="Last">昨收<b class="i">246.5</b></li>
            <li name="Volume" class="idata-v">成交量(張)<b class="i">45,133</b></li>
            <li class="idata-mc">市值(億)<b class="i">65,604</b></li>
            <li>股淨比<b class="i">3.81</b></li>
            <li>本益比<b class="i">18.21</b></li>
            <li>偏多比<b class="i">10</b></li>
            <li>價量分數<b class="i">12</b></li>
            <li class="idata-wt">發行權證(檔)<b class="i">482</b></li>
            <li class="idata-fql" style="width: 192px; padding-right: 0;">離季線<b class="i">22.35(9.69%)</b></li>
        </ul>
    </div><!-- idx-data:end -->
</div><!-- idx-quotes:end -->

<div id="optional-box" class="optional-box">
    <h4 class="tit"></h4>
    <ul class="optional-inner" id="mySelectList">

    </ul><!-- optional-inner:end -->
</div><!-- optional-box:end -->

<div id="optional-ok" class="optional-box">
    <div class="optional-mesg">
        <h4 class="tit">您已成功加入自選股。</h4>
        <div class="mt-x2"><button class="btn" onclick="jQuery.fancybox.close();">關閉視窗</button><button class="btn" id="goMySelectBtn">前往自選股</button></div>
    </div><!-- optional-mesg:end -->
</div><!-- optional-ok:end -->

<script type='text/javascript' src='/js/stock/MySelectAdd.js'></script>







<div class="hd bg-linear mb-x1 mt-neg">
    <ul class="sub-menu dd-menu">
        <li class="curts"><a href="/stock/2330">即時行情</a></li>
        <li><a href="/stock/astock/techchart?stockno=2330">技術分析</a></li>
        <li><a href="/stock/reduction/techchart?stockno=2330">還原權息</a></li>
            <li><a href="/stock/astock/group?stockno=2330">台積電群</a></li>

        <li><a href="/stock/astock/three?stockno=2330">法人動態</a></li>
        <li><a href="/stock/astock/margin?stockno=2330">資券變化</a></li>
            <li><a href="/stock/astock/chips?stockno=2330">大戶籌碼</a></li>
            <li class="dd">
                <a href="javascript:;">主力進出</a>
                <ul class="dd-child">
                    <li><a href="/stock/astock/agentstat2?stockno=2330">主力動向</a></li>
                    <li><a href="/stock/astock/agentstat?stockno=2330&type=3.5">買超vs賣超</a></li>
                    <li><a href="/stock/astock/agentstatrank?stockno=2330&type=3">買超排行</a></li>
                    <li><a href="/stock/astock/agentstatrank?stockno=2330&type=4">賣超排行</a></li>
                    <li><a href="/stock/astock/agentstatrank?stockno=2330&type=5">爆量買進排行</a></li>
                    <li><a href="/stock/astock/agentstatrank?stockno=2330&type=6">爆量賣出排行</a></li>
                    <li><a href="/stock/astock/agentstatrank?stockno=2330&type=1">券商進出統計</a></li>
                    <li><a href="/stock/astock/agentstatrank?stockno=2330&type=2">分公司進出總表</a></li>
                </ul>
            </li>
            <li class="dd">
                <a href="javascript:;">財報股利</a>
                <ul class="dd-child">
                    <li class="dd-trd">
                        <a href="javascript:;">基本財報</a>
                        <ul class="dd-child-trd">
                            <li><a href="/stock/report/basic_mr?stockno=2330">每月營收</a></li>
                            <li><a href="/stock/report/basic_eps?stockno=2330">每股盈餘</a></li>
                            <li><a href="/stock/report/basic_bvps?stockno=2330">每股淨值</a></li>
                            <li><a href="/stock/report/basic_is?stockno=2330">損益表</a></li>
                            <li><a href="/stock/report/basic_bs?stockno=2330">資產表</a></li>
                            <li><a href="/stock/report/basic_dse?stockno=2330">股東權益</a></li>
                            <li><a href="/stock/report/basic_cfs?stockno=2330">現金流量表</a></li>
                        </ul>
                    </li>
                    <li><a href="/stock/report/basic_dp?stockno=2330">股利政策</a></li>
                    <li class="dd-trd">
                        <a href="javascript:;">獲利能力</a>
                        <ul class="dd-child-trd">
                            <li><a href="/stock/report/profit_pr?stockno=2330">利潤比率</a></li>
                            <li><a href="/stock/report/profit_roe?stockno=2330">報酬率</a></li>
                            <li><a href="/stock/report/profit_da?stockno=2330">杜邦分析</a></li>
                            <li><a href="/stock/report/profit_wct?stockno=2330">營運週轉能力</a></li>
                            <li><a href="/stock/report/profit_fat?stockno=2330">固定資產週轉</a></li>
                            <li><a href="/stock/report/profit_tat?stockno=2330">總資產週轉</a></li>
                            <li><a href="/stock/report/profit_wctd?stockno=2330">營運週轉天數</a></li>
                            <li><a href="/stock/report/profit_cfoin?stockno=2330">營業現金流對淨利比</a></li>
                            <li><a href="/stock/report/profit_dpr?stockno=2330">現金股利發放率</a></li>
                        </ul>
                    </li>
                    <li class="dd-trd">
                        <a href="javascript:;">財務安全</a>
                        <ul class="dd-child-trd">
                            <li><a href="/stock/report/safe?types=1&stockno=2330">負債佔資產比</a></li>
                            <li><a href="/stock/report/safe?types=2&stockno=2330">長期資金佔固定資產比</a></li>
                            <li><a href="/stock/report/safe2?types=3&stockno=2330">流速動比率</a></li>
                            <li><a href="/stock/report/safe?types=4&stockno=2330">利息保障倍數</a></li>
                            <li><a href="/stock/report/safe2?types=5&stockno=2330">現金流量分析</a></li>
                            <li><a href="/stock/report/safe?types=6&stockno=2330">盈餘再投資比率</a></li>
                        </ul>
                    </li>
                    <li class="dd-trd">
                        <a href="javascript:;">公司成長</a>
                        <ul class="dd-child-trd">
                            <li><a href="/stock/report/growth_gp?stockno=2330">毛利成長率</a></li>
                            <li><a href="/stock/report/growth_oigr?stockno=2330">營業利益成長率</a></li>
                            <li><a href="/stock/report/growth_nigr?stockno=2330">稅後淨利成長率</a></li>
                        </ul>
                    </li>
                    <li class="dd-trd">
                        <a href="javascript:;">企業價值</a>
                        <ul class="dd-child-trd">
                            <li><a href="/stock/report/value?types=1&stockno=2330">本益比</a></li>
                            <li><a href="/stock/report/value?types=2&stockno=2330">股價淨值比</a></li>
                            <li><a href="/stock/report/value?types=3&stockno=2330">現金殖利率</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><a href="/stock/astock/basic?stockno=2330">基本資料</a></li>
            <li><a href="/stock/astock/news?stockno=2330">相關新聞</a></li>

    </ul>
</div><!-- hd:end -->



    <div id="mainCol">
        <h1 class="heading">台積電(2330)本益比</h1>
            <div id="chart" class="wChart mb-x1"></div><!-- chartValueCdy:end -->
            <script>
    var _ChartIDName = 'chart';
    var _ChartHeight = 320;
    var _Title = '台積電(2330)';
    var _Subtitle = '本益比' + '與月收盤價比較';
                var _LineWidth = 2;
                var _Function = function () {
                    var p = '';
                    var unit = '倍';
                    var decimal = 2;
                    if (this.point) {
                        p += '<span>' + Highcharts.dateFormat('%Y/%m', this.point.x) + '</span><br/>';
                        p += this.point.config.text;
                    }
                    else {
                        p += '<span>' + Highcharts.dateFormat('%Y/%m', this.x) + '</span><br/>';
                        $.each(this.points, function (i, series) {

                            if (this.series.name == '月收盤價') {
                                unit = '元';
                                decimal = 1;
                            }

                            p += '<span style="color:' + this.series.color + '">' + this.series.name +
                            '</span> : <span>' + Highcharts.numberFormat(this.y, decimal, '.', ',') + ' ' + unit + '</span><br/>';
                        });
                    }
                    return p;
                };
            </script>
            <script>
                var chart;
                $(function () {
                    chart = new Highcharts.StockChart({
                        chart: {
                            renderTo: _ChartIDName,
                            alignTicks: false,
                            animation: false,
                            height: _ChartHeight,
                            spacing: [62, 20, 20, 20],
                            borderWidth: 1,
                            borderColor: '#e3e3e3',
                            plotBackgroundColor: '#ffffff',
                            backgroundColor: {
                                linearGradient: [0, 0, 0, 500],
                                stops: [
                                    [0, 'rgb(255, 255, 255)'],
                                    [1, 'rgb(245, 245, 245)']
                                ]
                            },
                            style: { fontSize: '14px', fontFamily: 'Arial, sans-serif' }
                        },
                        credits: {
                            text: '© WantGoo玩股網',
                            href: '/',
                            position: { verticalAlign: 'top', y: 30, x: -20 },
                            style: { fontSize: '15px' }
                        },
                        legend: {
                            enabled: true,
                            padding: 0,
                            itemStyle: { fontSize: '14px', fontWeight: 'normal', color: '#444444' }
                        },
                        scrollbar: {
                            enabled: false
                        },
                        rangeSelector: {
                            enabled: false,
                            inputEnabled: false
                        },
                        navigator: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        title: {
                            text: _Title,
                            verticalAlign: 'top',
                            y: -35
                        },
                        subtitle: {
                            text: _Subtitle,
                            verticalAlign: 'top',
                            y: -14
                        },
                        plotOptions: {
                            column: {
                                animation: false
                            },
                            line: {
                                lineWidth: _LineWidth,
                                marker: {
                                    enabled: false,
                                    states: { hover: { enabled: true, radius: 4 } }
                                }
                            },
                            series: {
                                events: {
                                    legendItemClick: function () {
                                        return false;
                                    }
                                }
                            }
                        },
                        xAxis: {
                            tickPixelInterval: 200,
                            type: 'datetime',
                            labels: {
                                formatter: function () { return Highcharts.dateFormat('%Y/%m', this.value); },
                                style: { fontSize: '13px', color: '#888888' }
                            }
                        },
                        yAxis: [{
                            title: { text: '' },
                            gridLineWidth: 1,
                            opposite: false,
                            offset: -8,
                            gridLineColor: '#eeeeee',
                            labels: {
                                formatter: function () { return Highcharts.numberFormat(this.value, 0, '.', ',') + '%' },
                                style: { fontSize: '13px', color: '#888888' }
                            }
                        }, {
                            title: { text: '' },
                            gridLineWidth: 0,

                            offset: -8,
                            gridLineColor: '#eeeeee',
                            labels: {
                                style: { fontSize: '13px', color: '#888888' }
                            }
                        }],
                        tooltip: {
                            backgroundColor: 'rgba(20, 20, 20, 0.8)',
                            borderColor: '#222222',
                            borderRadius: 10,
                            borderWidth: 1,
                            shared: true,
                            style: { fontSize: '13px', color: '#ffffff' },
                            formatter: _Function
                        },
                        series: [{
                            name: _name,
                            data: JSON.parse("[" + _DATA + "]"),
                            color: '#e84b42'
                        }, {
                            name: '月收盤價',
                            data: _ClosePrice,
                            color: '#6fc4c1',
                            yAxis: 1
                        }]
                    });
                });
            </script>
            <div id="explain_1" class="explain">
                <h2>本益比</h2>
                <p>
                    <span class="bak">公式：本益比 = 月均價 / 近4季EPS總和</span><br>
                    本益比衡量：股價相對於EPS獲利的高低。 本益比越高，代表股價越貴，潛在報酬率越低； 本益比越低，代表股價越便宜，潛在報酬率越高，但是並不是絕對，因為當產業或個股獲利成長性越高，市場願意給予的本益比也越高，但還可能會越來越高，因此本益比應配合產業、獲利成長性做觀察。
                </p>
            </div>
            <div id="explain_2" class="explain">
                <h2>股價淨值比</h2>
                <p>
                    <span class="bak">公式：股價淨值比 = 月均價 / 每股淨值</span><br>
                    股價淨值比衡量：股價相對於每股淨值的高低。 因此當股價淨值比越高，代表股價越貴，潛在報酬率越低； 股價淨值比越低，代表股價越便宜，潛在報酬率越高。 當產業或個股獲利處於成長，市場願意給的股價較高，因此股價淨值比會偏高； 當產業或個股獲利處於成熟期，沒有想像空間，市場願意給的股價較低，因此股價淨值比會偏低。 因此股價淨值比較適合：和公司本身歷史股價淨值比的比較，或是和同一產業其他公司的比較。 另外景氣循環產業獲利波動大，例如塑化業，DRam，使用股價淨值比評價較本益比適合。
                </p>
            </div>
            <div id="explain_3" class="explain">
                <h2>現金股利殖利率</h2>
                <p>
                    <span class="bak">公式：現金股利殖利率 = 現金股利 / 月均價 * 100%</span><br />
                    現金股利殖利率是以現金股利和股價做相比，衡量潛在報酬率的高低。 現金股利殖利率越高，潛在報酬率越高。 觀察現金股利殖利率有幾個重點：<br />
                    1. 股息不要只看一年，要看一個景氣循環，或至少五年。<br />
                    2. 會賺錢的公司才會配息，所以重點還是在公司的產業、獲利、體質的長期觀察。<br />
                    3. 時常虧錢、或是自由現金流量不足的公司竟然能配息...這就要提防是公司為了取悅市場，挖東牆補西牆的結果，最好不要碰這種不肖公司。
                </p>
            </div><!-- explain:end -->
            <div class="br-trl">
                <table cellpadding="0" cellspacing="0" class="tb rw4n tbhl">
                    <caption class="hd-sm">
                        本益比<span class="ic-ask" title="名詞解釋"></span>
                    </caption>
                    <thead class="thd">
                        <tr>
                            <th class="cr">年度/月份</th>
                            <th width="35%">本益比(倍)</th>
                            <th>月收盤價</th>
                        </tr>
                    </thead>
                    <tbody>
                                <tr>
                                    <td class="cr">2019/4</td>
                                    <td>18.21</td>
                                    <td>253</td>
                                </tr>
                                <tr>
                                    <td class="cr">2019/3</td>
                                    <td>18.13</td>
                                    <td>245.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2019/2</td>
                                    <td>17.65</td>
                                    <td>239</td>
                                </tr>
                                <tr>
                                    <td class="cr">2019/1</td>
                                    <td>16.35</td>
                                    <td>221</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/12</td>
                                    <td>16.68</td>
                                    <td>225.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/11</td>
                                    <td>16.68</td>
                                    <td>225.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/10</td>
                                    <td>17.27</td>
                                    <td>234</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/9</td>
                                    <td>19.37</td>
                                    <td>262.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/8</td>
                                    <td>18.89</td>
                                    <td>256</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/7</td>
                                    <td>18.48</td>
                                    <td>246</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/6</td>
                                    <td>16.27</td>
                                    <td>216.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/5</td>
                                    <td>16.83</td>
                                    <td>224</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/4</td>
                                    <td>17.16</td>
                                    <td>227</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/3</td>
                                    <td>18.71</td>
                                    <td>247.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/2</td>
                                    <td>18.59</td>
                                    <td>246</td>
                                </tr>
                                <tr>
                                    <td class="cr">2018/1</td>
                                    <td>19.22</td>
                                    <td>255</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/12</td>
                                    <td>17.29</td>
                                    <td>229.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/11</td>
                                    <td>17.03</td>
                                    <td>226</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/10</td>
                                    <td>17.96</td>
                                    <td>243</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/9</td>
                                    <td>16</td>
                                    <td>216.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/8</td>
                                    <td>16</td>
                                    <td>216.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/7</td>
                                    <td>15.58</td>
                                    <td>214.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/6</td>
                                    <td>15.14</td>
                                    <td>208.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/5</td>
                                    <td>14.74</td>
                                    <td>203</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/4</td>
                                    <td>15.09</td>
                                    <td>194.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/3</td>
                                    <td>14.66</td>
                                    <td>189</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/2</td>
                                    <td>14.66</td>
                                    <td>189</td>
                                </tr>
                                <tr>
                                    <td class="cr">2017/1</td>
                                    <td>15.68</td>
                                    <td>185.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/12</td>
                                    <td>15.34</td>
                                    <td>181.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/11</td>
                                    <td>15.47</td>
                                    <td>183</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/10</td>
                                    <td>17.12</td>
                                    <td>188.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/9</td>
                                    <td>16.58</td>
                                    <td>182.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/8</td>
                                    <td>15.99</td>
                                    <td>176</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/7</td>
                                    <td>15.31</td>
                                    <td>172.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/6</td>
                                    <td>14.42</td>
                                    <td>162.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/5</td>
                                    <td>13.89</td>
                                    <td>156.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/4</td>
                                    <td>12.69</td>
                                    <td>150</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/3</td>
                                    <td>13.71</td>
                                    <td>162</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/2</td>
                                    <td>12.61</td>
                                    <td>149</td>
                                </tr>
                                <tr>
                                    <td class="cr">2016/1</td>
                                    <td>11.74</td>
                                    <td>142</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/12</td>
                                    <td>11.82</td>
                                    <td>143</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/11</td>
                                    <td>11.49</td>
                                    <td>139</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/10</td>
                                    <td>11.24</td>
                                    <td>136.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/9</td>
                                    <td>10.71</td>
                                    <td>130</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/8</td>
                                    <td>10.63</td>
                                    <td>129</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/7</td>
                                    <td>12.26</td>
                                    <td>139.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/6</td>
                                    <td>12.35</td>
                                    <td>140.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/5</td>
                                    <td>12.83</td>
                                    <td>146</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/4</td>
                                    <td>14.44</td>
                                    <td>147</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/3</td>
                                    <td>14.29</td>
                                    <td>145.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/2</td>
                                    <td>14.78</td>
                                    <td>150.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2015/1</td>
                                    <td>15.99</td>
                                    <td>141</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/12</td>
                                    <td>15.99</td>
                                    <td>141</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/11</td>
                                    <td>16.04</td>
                                    <td>141.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/10</td>
                                    <td>16.56</td>
                                    <td>130.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/9</td>
                                    <td>15.23</td>
                                    <td>120</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/8</td>
                                    <td>15.74</td>
                                    <td>124</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/7</td>
                                    <td>15.96</td>
                                    <td>121</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/6</td>
                                    <td>16.69</td>
                                    <td>126.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/5</td>
                                    <td>15.77</td>
                                    <td>119.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/4</td>
                                    <td>16.32</td>
                                    <td>118.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/3</td>
                                    <td>16.32</td>
                                    <td>118.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/2</td>
                                    <td>14.88</td>
                                    <td>108</td>
                                </tr>
                                <tr>
                                    <td class="cr">2014/1</td>
                                    <td>14.73</td>
                                    <td>108</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/12</td>
                                    <td>14.8</td>
                                    <td>105.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/11</td>
                                    <td>14.73</td>
                                    <td>105</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/10</td>
                                    <td>15.58</td>
                                    <td>109.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/9</td>
                                    <td>14.3</td>
                                    <td>100.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/8</td>
                                    <td>14.3</td>
                                    <td>100.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/7</td>
                                    <td>15.44</td>
                                    <td>102.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/6</td>
                                    <td>16.72</td>
                                    <td>111</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/5</td>
                                    <td>16.49</td>
                                    <td>109.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/4</td>
                                    <td>17.08</td>
                                    <td>109.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/3</td>
                                    <td>15.68</td>
                                    <td>100.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/2</td>
                                    <td>16.3</td>
                                    <td>104.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2013/1</td>
                                    <td>16.86</td>
                                    <td>101.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/12</td>
                                    <td>16.11</td>
                                    <td>97</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/11</td>
                                    <td>16.4</td>
                                    <td>98.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/10</td>
                                    <td>14.73</td>
                                    <td>88.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/9</td>
                                    <td>16.94</td>
                                    <td>89.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/8</td>
                                    <td>15.72</td>
                                    <td>83.3</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/7</td>
                                    <td>15.98</td>
                                    <td>81</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/6</td>
                                    <td>16.04</td>
                                    <td>81.3</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/5</td>
                                    <td>16.79</td>
                                    <td>85.1</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/4</td>
                                    <td>16.76</td>
                                    <td>86.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/3</td>
                                    <td>16.39</td>
                                    <td>84.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/2</td>
                                    <td>14.67</td>
                                    <td>81.1</td>
                                </tr>
                                <tr>
                                    <td class="cr">2012/1</td>
                                    <td>14.2</td>
                                    <td>78.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/12</td>
                                    <td>13.71</td>
                                    <td>75.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/11</td>
                                    <td>13.49</td>
                                    <td>74.6</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/10</td>
                                    <td>13.31</td>
                                    <td>73.6</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/9</td>
                                    <td>11.35</td>
                                    <td>70</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/8</td>
                                    <td>11.25</td>
                                    <td>69.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/7</td>
                                    <td>11.36</td>
                                    <td>72</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/6</td>
                                    <td>11.39</td>
                                    <td>72.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/5</td>
                                    <td>12.1</td>
                                    <td>76.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/4</td>
                                    <td>11.73</td>
                                    <td>73.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/3</td>
                                    <td>11.91</td>
                                    <td>70.6</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/2</td>
                                    <td>11.89</td>
                                    <td>70.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2011/1</td>
                                    <td>12.87</td>
                                    <td>76.3</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/12</td>
                                    <td>11.97</td>
                                    <td>71</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/11</td>
                                    <td>10.69</td>
                                    <td>63.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/10</td>
                                    <td>11.87</td>
                                    <td>62.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/9</td>
                                    <td>11.7</td>
                                    <td>62</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/8</td>
                                    <td>11.11</td>
                                    <td>58.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/7</td>
                                    <td>13.33</td>
                                    <td>62.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/6</td>
                                    <td>12.95</td>
                                    <td>60.6</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/5</td>
                                    <td>12.86</td>
                                    <td>60.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/4</td>
                                    <td>17.97</td>
                                    <td>61.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/3</td>
                                    <td>17.88</td>
                                    <td>61.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/2</td>
                                    <td>22.11</td>
                                    <td>58.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2010/1</td>
                                    <td>23.12</td>
                                    <td>61.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/12</td>
                                    <td>24.02</td>
                                    <td>64.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/11</td>
                                    <td>22.97</td>
                                    <td>61.1</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/10</td>
                                    <td>22.47</td>
                                    <td>60</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/9</td>
                                    <td>24.16</td>
                                    <td>64.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/8</td>
                                    <td>22.17</td>
                                    <td>59.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/7</td>
                                    <td>20.67</td>
                                    <td>58.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/6</td>
                                    <td>19.13</td>
                                    <td>54.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/5</td>
                                    <td>21.12</td>
                                    <td>60.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/4</td>
                                    <td>14.15</td>
                                    <td>55.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/3</td>
                                    <td>13.18</td>
                                    <td>51.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/2</td>
                                    <td>9.44</td>
                                    <td>44.95</td>
                                </tr>
                                <tr>
                                    <td class="cr">2009/1</td>
                                    <td>8.45</td>
                                    <td>40.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/12</td>
                                    <td>9.43</td>
                                    <td>44.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/11</td>
                                    <td>8.66</td>
                                    <td>40.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/10</td>
                                    <td>10.21</td>
                                    <td>48</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/9</td>
                                    <td>11.27</td>
                                    <td>52.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/8</td>
                                    <td>12.64</td>
                                    <td>58.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/7</td>
                                    <td>12.41</td>
                                    <td>56.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/6</td>
                                    <td>14.07</td>
                                    <td>65</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/5</td>
                                    <td>14.2</td>
                                    <td>65.6</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/4</td>
                                    <td>15.66</td>
                                    <td>66.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/3</td>
                                    <td>15.28</td>
                                    <td>63.1</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/2</td>
                                    <td>15.88</td>
                                    <td>61.6</td>
                                </tr>
                                <tr>
                                    <td class="cr">2008/1</td>
                                    <td>15.44</td>
                                    <td>59.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/12</td>
                                    <td>-</td>
                                    <td>62</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/11</td>
                                    <td>-</td>
                                    <td>60.6</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/10</td>
                                    <td>-</td>
                                    <td>63.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/9</td>
                                    <td>-</td>
                                    <td>63.3</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/8</td>
                                    <td>-</td>
                                    <td>62.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/7</td>
                                    <td>-</td>
                                    <td>65</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/6</td>
                                    <td>-</td>
                                    <td>70.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/5</td>
                                    <td>-</td>
                                    <td>68.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/4</td>
                                    <td>-</td>
                                    <td>68.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/3</td>
                                    <td>-</td>
                                    <td>67.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/2</td>
                                    <td>-</td>
                                    <td>69.3</td>
                                </tr>
                                <tr>
                                    <td class="cr">2007/1</td>
                                    <td>-</td>
                                    <td>67.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/12</td>
                                    <td>-</td>
                                    <td>67.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/11</td>
                                    <td>-</td>
                                    <td>65.5</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/10</td>
                                    <td>-</td>
                                    <td>61</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/9</td>
                                    <td>-</td>
                                    <td>59.7</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/8</td>
                                    <td>-</td>
                                    <td>58.1</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/7</td>
                                    <td>-</td>
                                    <td>54.8</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/6</td>
                                    <td>-</td>
                                    <td>58.4</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/5</td>
                                    <td>-</td>
                                    <td>60.3</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/4</td>
                                    <td>-</td>
                                    <td>68.1</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/3</td>
                                    <td>-</td>
                                    <td>64.2</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/2</td>
                                    <td>-</td>
                                    <td>60.9</td>
                                </tr>
                                <tr>
                                    <td class="cr">2006/1</td>
                                    <td>-</td>
                                    <td>63.5</td>
                                </tr>
                    </tbody>
                </table>
            </div><!-- 現金殖利率:end -->
    </div><!-- mainCol:end -->

    ﻿


﻿<div id="sideCol">

    <div class="sd-mainforce br-t">




    <table cellpadding="0" cellspacing="0" class="tb cl2n tbhl">
        <caption class="hd-sm">主力進出<span class="more"><a href="/stock/astock/agentstatrank?stockno=2330&type=3">更多</a></span></caption>
        <thead class="thd">
            <tr>
                <th width="30%" class="r">買超</th>
                <th width="20%">張數</th>
                <th width="30%" class="g">賣超</th>
                <th width="20%">張數</th>
            </tr>
        </thead>
        <tbody>
                    <tr>
                        <td class="cn"><span class="el">台灣摩根士丹利</span></td>
                        <td class="up">+6937</td>
                        <td class="cn"><span class="el">港商麥格理</span></td>
                        <td class="dn">-5770</td>
                    </tr>
                    <tr>
                        <td class="cn"><span class="el">香港上海匯豐</span></td>
                        <td class="up">+4180</td>
                        <td class="cn"><span class="el">大和國泰</span></td>
                        <td class="dn">-2353</td>
                    </tr>
                    <tr>
                        <td class="cn"><span class="el">東方匯理</span></td>
                        <td class="up">+2901</td>
                        <td class="cn"><span class="el">元大</span></td>
                        <td class="dn">-1392</td>
                    </tr>
                    <tr>
                        <td class="cn"><span class="el">美林</span></td>
                        <td class="up">+2527</td>
                        <td class="cn"><span class="el">兆豐</span></td>
                        <td class="dn">-1128</td>
                    </tr>
                    <tr>
                        <td class="cn"><span class="el">新加坡商瑞銀</span></td>
                        <td class="up">+2459</td>
                        <td class="cn"><span class="el">國泰</span></td>
                        <td class="dn">-1052</td>
                    </tr>
        </tbody>
    </table>


    </div><!-- 主力進出:end -->


        <div class="WantgooAdv adsbox ads300x250" name="300x250台股右上" id="a19f72f2-7243-4ce3-ad5d-bf7db5d70b6b">
            <p><script type='text/javascript'>   googletag.cmd.push(function() {     googletag.defineSlot('/15927178/wantgoo_stock_300x250_RT', [300, 250], 'div-gpt-ad-1455863165086-0').addService(googletag.pubads());     googletag.pubads().enableSingleRequest();     googletag.enableServices();   }); </script><!-- /15927178/wantgoo_stock_300x250_RT --> <div id='div-gpt-ad-1455863165086-0' style='height:250px; width:300px;'> <script type='text/javascript'> googletag.cmd.push(function() { googletag.display('div-gpt-ad-1455863165086-0'); }); </script> </div></p>
        </div>




    <div class="sd-classstk  br-t">



    <table cellpadding="0" cellspacing="0" class="tb cl2n tbhl">
        <caption class="hd-sm">個股分類行情<span class="more"><a href="/stock/twstock/class">更多</a></span></caption>
        <thead class="thd">
            <tr>
                <th width="30%">名稱</th>
                <th width="20%">漲幅%</th>
                <th width="30%">名稱</th>
                <th width="20%">漲幅%</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td class="cn"><a href="/stock/twstock/classcont?id=453" target="_blank">人臉辨識</a></td>
                    <td class="up">▲2.32</td>
                        <td class="cn"><a href="/stock/twstock/classcont?id=71" target="_blank">IC生產</a></td>
                        <td class="up">▲2.16</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/twstock/classcont?id=169" target="_blank">台積電</a></td>
                    <td class="up">▲2.15</td>
                        <td class="cn"><a href="/stock/twstock/classcont?id=462" target="_blank">比特幣</a></td>
                        <td class="up">▲1.89</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/twstock/classcont?id=479" target="_blank">美國ADR</a></td>
                    <td class="up">▲1.86</td>
                        <td class="cn"><a href="/stock/twstock/classcont?id=331" target="_blank">赴美掛牌</a></td>
                        <td class="up">▲1.86</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/twstock/classcont?id=439" target="_blank">3D感測</a></td>
                    <td class="up">▲1.86</td>
                        <td class="cn"><a href="/stock/twstock/classcont?id=104" target="_blank">晶圓代工</a></td>
                        <td class="up">▲1.85</td>
                </tr>
        </tbody>
    </table>


    </div><!-- 個股分類行情:end -->

    <div class="sd-warrant">



    <table cellpadding="0" cellspacing="0" class="tb cl2n tbhl">
        <caption class="hd-sm">權證</caption>
        <thead class="thd">
            <tr>
                <th>名稱</th>
                <th>到期日</th>
                <th>名稱</th>
                <th>到期日</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td class="cn">台積電台新97購01</td>
                    <td class="cr">2020-07-27</td>
                        <td class="cn">台積電台新97購01</td>
                        <td class="cr">2019-12-26</td>
                </tr>
                <tr>
                    <td class="cn">台積電統一8C售01</td>
                    <td class="cr">2019-12-26</td>
                        <td class="cn">台積電統一8C售01</td>
                        <td class="cr">2019-12-25</td>
                </tr>
                <tr>
                    <td class="cn">台積電群益8C購02</td>
                    <td class="cr">2019-12-13</td>
                        <td class="cn">台積電群益8C購02</td>
                        <td class="cr">2019-12-10</td>
                </tr>
                <tr>
                    <td class="cn">台積電台新8C購01</td>
                    <td class="cr">2019-12-02</td>
                        <td class="cn">台積電台新8C購01</td>
                        <td class="cr">2019-11-28</td>
                </tr>
                <tr>
                    <td class="cn">台積電統一8B售01</td>
                    <td class="cr">2019-11-20</td>
                        <td class="cn">台積電統一8B售01</td>
                        <td class="cr">2019-11-18</td>
                </tr>
                <tr>
                    <td class="cn">台積電中信8B購03</td>
                    <td class="cr">2019-11-18</td>
                        <td class="cn">台積電中信8B購03</td>
                        <td class="cr">2019-11-14</td>
                </tr>
                <tr>
                    <td class="cn">台積電中信8B售01</td>
                    <td class="cr">2019-11-07</td>
                        <td class="cn">台積電中信8B售01</td>
                        <td class="cr">2019-11-05</td>
                </tr>
        </tbody>
    </table>
    <form action="/Warrant/Search" method="post" id="warrantSearch">
        <input id="sw_4_3" name="sw_4_3" type="text" value="2330" placeholder="標的名稱或代碼" class="input-text" style="display:none;" autocomplete="off" />
        <input type="hidden" id="a2" name="aa" class="radio" value="a2"><input type="hidden" id="showAll" name="showAll" value="1">
    </form>


    </div><!-- 權證:end -->


        <div class="WantgooAdv adsbox ads300x250" name="300x250個股右下" id="a7f3528c-b5ec-4096-8271-efabac2e6b04">
            <p><script type='text/javascript'>   googletag.cmd.push(function() {     googletag.defineSlot('/15927178/wantgoo_share_300x250_RB', [300, 250], 'div-gpt-ad-1455863274338-0').addService(googletag.pubads());     googletag.pubads().enableSingleRequest();     googletag.enableServices();   }); </script><!-- /15927178/wantgoo_share_300x250_RB --> <div id='div-gpt-ad-1455863274338-0' style='height:250px; width:300px;'> <script type='text/javascript'> googletag.cmd.push(function() { googletag.display('div-gpt-ad-1455863274338-0'); }); </script> </div></p>
        </div>




    <div class="sd-kindstk">


    <table cellpadding="0" cellspacing="0" class="tb rw5n tbhl">
        <caption class="hd-sm">同類個股<span class="more"><a href="/stock/twstock/classcont?id=453">更多</a></span></caption>
        <thead class="thd">
            <tr>
                <th width="24%">股票</th>
                <th>股價</th>
                <th>漲跌</th>
                <th>漲幅%</th>
                <th>成交量</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td class="cn"><a href="/stock/3105" target="_blank">穩懋</a></td>
                    <td>219.5</td>
                    <td class="up">▲14.5</td>
                    <td class="up">7.07%</td>
                    <td>13,118,000</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/3406" target="_blank">玉晶光</a></td>
                    <td>435</td>
                    <td class="up">▲26.5</td>
                    <td class="up">6.49%</td>
                    <td>13,707,000</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/2405" target="_blank">浩鑫</a></td>
                    <td>13.55</td>
                    <td class="up">▲0.2</td>
                    <td class="up">1.50%</td>
                    <td>2,637,000</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/6271" target="_blank">同欣電</a></td>
                    <td>103.5</td>
                    <td class="up">▲1.5</td>
                    <td class="up">1.47%</td>
                    <td>666,000</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/3227" target="_blank">原相</a></td>
                    <td>92.1</td>
                    <td class="up">▲1.3</td>
                    <td class="up">1.43%</td>
                    <td>2,878,000</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/4919" target="_blank">新唐</a></td>
                    <td>53.4</td>
                    <td class="up">▲0.7</td>
                    <td class="up">1.33%</td>
                    <td>2,906,000</td>
                </tr>
        </tbody>
    </table>


    </div><!-- 同類個股:end -->

    <div class="sd-relstk">


    <table cellpadding="0" cellspacing="0" class="tb rw5n tbhl">
        <caption class="hd-sm">相關個股</caption>
        <thead class="thd">
            <tr>
                <th width="24%">股票</th>
                <th>股價</th>
                <th>漲跌</th>
                <th>漲幅%</th>
                <th>成交量</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td class="cn"><a href="/stock/2303" target="_blank">聯電</a></td>
                    <td>11.9</td>
                    <td class="up">▲0.35</td>
                    <td class="up">3.03%</td>
                    <td>105,478</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/STM" target="_blank">意法半導體</a></td>
                    <td>17.4</td>
                    <td class="up">▲0.45</td>
                    <td class="up">2.65%</td>
                    <td>3,716</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/2325" target="_blank">矽品</a></td>
                    <td>51</td>
                    <td class="">0</td>
                    <td class="">0.00%</td>
                    <td>28,056</td>
                </tr>
                <tr>
                    <td class="cn"><a href="/stock/2311" target="_blank">日月光</a></td>
                    <td>44.5</td>
                    <td class="dn">▼-1</td>
                    <td class="dn">-2.20%</td>
                    <td>86,026</td>
                </tr>
        </tbody>
    </table>


    </div><!-- 相關個股:end -->

    <div class="sd-news br-t">



    <div class="hd-sm">即時新聞<a class="more" href="/stock/astock/news?StockNo=2330">更多新聞焦點</a></div>
    <ul class="ell lists">
            <li><a href="/news/content/index?ID=957275">【亞洲投顧】盤後分析</a><time class="update">25分鐘前</time></li>
            <li><a href="/news/content/index?ID=957215">【永豐期貨】台指選擇權盤後－連假後補漲 台股強攻站上10800關卡</a><time class="update">1小時前</time></li>
            <li><a href="/news/content/index?ID=957170">【日盛投顧】5日線不破 短線仍偏多</a><time class="update">1小時前</time></li>
            <li><a href="/news/content/index?ID=957168">【群益期貨】台股期權盤後－避險買盤回歸  台股量價齊揚</a><time class="update">1小時前</time></li>
            <li><a href="/news/content/index?ID=957120">台股盤後—價量俱揚甩清明變盤陰霾 指數挺進10800關卡</a><time class="update">2小時前</time></li>
            <li><a href="/news/content/index?ID=957012">台積電股價登半年高 單日市值增逾1500億元 重回6.5兆元</a><time class="update">6小時前</time></li>
            <li><a href="/news/content/index?ID=956942">【永豐期貨】台指選擇權盤前－震盪走升 台股站上10700點</a><time class="update">8小時前</time></li>
            <li><a href="/news/content/index?ID=956930">【日盛投顧】盤前分析</a><time class="update">9小時前</time></li>
            <li><a href="/news/content/index?ID=956917">◆外資連續5日買超個股</a><time class="update">10小時前</time></li>
            <li><a href="/news/content/index?ID=956775">〈Q2產業景氣展望〉華為手機出貨旺 散熱、砷化鎵族群Q2營運添動能</a><time class="update">1天前</time></li>
    </ul>


    </div><!-- 即時新聞:end -->

    <div class="sd-ii br-t">


    <table cellpadding="0" cellspacing="0" class="tb rw5n tbhl">
        <caption class="hd-sm">三大法人動態<span class="more"><small class="unit">單位：張</small><a href="/stock/astock/three?StockNo=2330">圖表統計</a></span></caption>
        <thead class="thd">
            <tr>
                <th width="20%">日期</th>
                <th width="20%">外資</th>
                <th width="20%">投信</th>
                <th width="20%">自營</th>
                <th width="20%">總和</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td class="cr">04/08</td>
                    <td>21,346</td>
                    <td>259</td>
                    <td>-107</td>
                    <td class="up">21,498</td>
                </tr>
                <tr>
                    <td class="cr">04/03</td>
                    <td>4,838</td>
                    <td>-35</td>
                    <td>-171</td>
                    <td class="up">4,632</td>
                </tr>
                <tr>
                    <td class="cr">04/02</td>
                    <td>6,415</td>
                    <td>30</td>
                    <td>614</td>
                    <td class="up">7,059</td>
                </tr>
                <tr>
                    <td class="cr">04/01</td>
                    <td>12,270</td>
                    <td>329</td>
                    <td>763</td>
                    <td class="up">13,362</td>
                </tr>
                <tr>
                    <td class="cr">03/29</td>
                    <td>3,571</td>
                    <td>-276</td>
                    <td>-532</td>
                    <td class="up">2,763</td>
                </tr>
                <tr>
                    <td class="cr">03/28</td>
                    <td>-88</td>
                    <td>0</td>
                    <td>-155</td>
                    <td class="dn">-243</td>
                </tr>
                <tr>
                    <td class="cr">03/27</td>
                    <td>-4,335</td>
                    <td>351</td>
                    <td>895</td>
                    <td class="dn">-3,089</td>
                </tr>
                <tr>
                    <td class="cr">03/26</td>
                    <td>2,316</td>
                    <td>-105</td>
                    <td>-85</td>
                    <td class="up">2,126</td>
                </tr>
        </tbody>
    </table>


    </div><!-- 三大法人動態:end -->

    <div class="sd-margin">



    <table cellpadding="0" cellspacing="0" class="tb">
        <caption class="hd-sm">融資融券變化<span class="more"><time class="update">2019/04/03</time><a href="/stock/astock/margin?StockNo=2330">圖表統計</a></span></caption>
        <thead class="thd">
            <tr>
                <th width="33%">融資變化</th>
                <th width="33%">融資餘額</th>
                <th>資券互抵</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="cr">-63</td>
                <td class="cr">8,454</td>
                <td class="cr">42</td>
            </tr>
        </tbody>
        <thead class="thd">
            <tr>
                <th>融券變化</th>
                <th>融券餘額</th>
                <th>當沖率%</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="cr">235</td>
                <td class="cr">474</td>
                <td class="cr">0.0017</td>
            </tr>
        </tbody>
    </table>


    </div><!-- 融資融券變化:end -->

    <div class="sd-stat">



    <table cellpadding="0" cellspacing="0" class="tb tbhl">
        <caption class="hd-sm">重要數據統計</caption>
        <thead class="thd">
            <tr>
                <th width="40%">期間</th>
                <th class="ig">2019</th>
                <th class="ig">2018</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="cn">每股盈餘</td>
                <td></td>
                <td>13.54</td>
            </tr>
            <tr>
                <td class="cn">營業毛利率</td>
                <td></td>
                <td>48.70%</td>
            </tr>
            <tr>
                <td class="cn">營業利益率</td>
                <td></td>
                <td>37.49%</td>
            </tr>
            <tr>
                <td class="cn">稅前純益率</td>
                <td></td>
                <td>38.82%</td>
            </tr>
            <tr>
                <td class="cn">累計營收</td>
                <td>13898</td>
                <td>103147</td>
            </tr>
            <tr>
                <td class="cn">無償配股率</td>
                <td>0.00%</td>
                <td>0.00%</td>
            </tr>
            <tr>
                <td class="cn">現金股利</td>
                <td>8.00</td>
                <td>8.00</td>
            </tr>
        </tbody>
    </table>


    </div><!-- 重要數據統計:end -->
</div><!-- sdCol:end -->
﻿


</div><!-- container:end -->


<footer class="site-footer">
    <div class="site-footer-inner">
        <div class="site-statement">
            資訊來源：臺灣證券交易所TWSE、財團法人中華民國證券櫃檯買賣中心GTSM、台灣期貨交易所及本資訊內容係經玩股網有限公司處理提供。<br>
            使用者須遵守台灣證券交易所「<a href="http://www.twse.com.tw/ch/products/download/regulation_use.pdf" target="_blank" rel="nofollow noopener noreferrer">交易資訊使用管理辦法</a>」等交易資訊管理相關規定，所有資訊以台灣證券交易所公告資料為主。
        </div><!-- /site-statement -->

        <div class="site-about cf">
            <a href="/siteinfo/about">關於玩股網</a>
            <a href="/Member/MemberArea/Doc_Terms">服務條款 &amp; 免責聲明</a>
            <a href="/siteinfo/faq" rel="nofollow">FAQ</a>
            <a href="/siteinfo/feedback" rel="nofollow">連絡我們</a>
            <a href="https://m.wantgoo.com/">手機版</a>
        </div><!-- /site-about -->

        <div class="site-local" itemscope="" itemtype="http://schema.org/LocalBusiness">
            <span itemprop="name" class="is-obs">玩股網</span>
            <address class="site-address" itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress">
                <span itemprop="addressRegion" class="site-addr">台北市</span>
                <span itemprop="addressLocality" class="site-addr">信義區</span>
                <span itemprop="streetAddress" class="site-addr">基隆路一段163號7樓之3</span>
                <span class="site-tel">諮詢專線 <b itemprop="telephone">02-2767-1556</b></span>
                <span>客服信箱 <a href="mailto:service@wantgoo.com"><b itemprop="email" class="site-email">service@wantgoo.com</b></a></span>
            </address>
        </div><!-- /site-local -->
        <small class="site-copyr">© 2010-2019 WantGoo.com All rights reserved.<span style="color:#efefef;">@10.140.0.13</span></small>

        <div class="site-social">
            <a href="https://www.facebook.com/wantgoo.fans" title="就是愛玩股粉絲團" target="_blank" rel="noopener noreferrer" class="ic-fb"></a>
        </div><!-- /site-social -->
    </div><!-- /site-footer-inner-->
</footer>

<form id="login-box" class="login-box" data-fancybox-panel="login">
    <div class="h4">登入玩股會員</div>
    <div class="mb-3">
        <input id="idUserName" type="email" value="" class="form-control" placeholder="輸入您的電子郵件" onkeypress="Enter2Tab('#idPassword');">
    </div>
    <div>
        <input id="idPassword" type="password" value="" class="form-control" placeholder="密碼" onkeypress="Enter2Click('#btnLogIn');">
    </div>

    <div id="loginErrorMessage" class="invalid-feedback">您輸入的帳號或密碼錯誤，請重新輸入。</div>

    <div class="mt-3">
        <button class="w-btn w-btn-primary w-btn-block" id="btnLogIn" onclick="returnUrl = getReturnUrl(); ApiLogin_Normal(); return false;">登入</button>
    </div>

    <div class="d-flex justify-content-center align-item-center my-3">
        <span class="w-divider-h-1"></span><span class="mx-3 small">或</span><span class="w-divider-h-1"></span>
    </div>

    <div class="d-flex">
        <button class="w-btn w-btn-block w-btn-facebook mr-2 w-50" id="btnFBLogIn" onclick="returnUrl = getReturnUrl(); fbLogin(); return false;">Facebook</button>
        <button class="w-btn w-btn-block w-btn-google w-50" onclick="returnUrl = getReturnUrl(); googleSignIn(); return false;">Google</button>
    </div>

    <div class="d-flex justify-content-between small mt-3 text-muted">
        <span><a href="/mi/micommon/forgotpassword">忘記密碼</a></span>

        <span>沒有帳號？<a href="/login/auth/register_normal?returnUrl=https://www.wantgoo.com/stock/report/basic_dp?stockno=2330">免費註冊</a></span>
    </div>
</form>


<script type="text/javascript">
    afterFacebookLoginFullSucceed_Url = "https://api.wantgoo.com/auth/login/apilogin_facebookid_nocookie_fornewweb";
    $(function () {
        // request to set scrollTop
        reqSetScrollTop();
        // 全站共用 Head 登入按鈕，套用燈箱UI
        loadLogInUI("#aLogin");
    });
</script>



<!-- 線上客服 begin olark code -->
<script data-cfasync="false" src="/js/OnlineCS.js" type='text/javascript'></script>
<!-- 線上客服 end olark code -->

<link href="/css/widget/fixmodal.css?v=20171221" rel="stylesheet">
<script type="text/javascript" src="/dynamicfiles/dodatasourcetxt/usedatajs2.js"></script>

<div id="FixModal" class="" style="display: none;">
    <div class="FixModalBox">
        <span class="FixModalClose"></span>
        <div class="FixModalCont">
        </div>
    </div>
</div><!-- /FixModal -->
<script>
    $(function () {
        if (typeof msgtxt != "undefined" && msgtxt.length > 0) {
            $("#FixModal").addClass("slideInRightFix").show();

            $('.FixModalClose').click(function () {
                $('.FixModalBox').addClass('slideOutRightFx');
                setTimeout(function () { $('.FixModalBox').remove(); }, 1000);
            });

            setTimeout(function () {
                $('.FixModalBox').addClass('slideOutRight');
                setTimeout(function () { $('.FixModalBox').remove(); }, 1000);
            }, 60000);

            $(".FixModalCont").html(msgtxt);
        } else {
            $("#FixModal").remove();
        };
    });
</script>



    </div><!-- wrap:end -->

    <script src="/js/gtag?v=Ojmm_Uw6l45aQt5KiPRE9OAcXu49R74xJUoe19pVv541"></script>

</body>
</html>




    <script>
        SetSubMenuFlag("財報股利", "企業價值", "本益比");
    </script>

`;

export default HTML;
