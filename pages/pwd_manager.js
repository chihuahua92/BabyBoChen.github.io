/** @type {String} */
export const pwd_manager = `
<h1 style="text-align:center">Flutter密碼管理員</h1>
<div class="row">
    <div class="col-sm-12" style="margin:0px;background-color: lightgray;">
        <div id="carousel_pwd" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="hover">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carousel_pwd" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carousel_pwd" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carousel_pwd" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carousel_pwd" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carousel_pwd" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" style="text-align:center;">
                    <div class="carousel-pic">
                        <img src="https://i.imgur.com/1mGFUgd.png" alt="...">
                    </div>            
                </div>
                <div class="carousel-item" style="text-align:center;">
                    <div class="carousel-pic">
                        <img src="https://i.imgur.com/QGum4L2.png" alt="...">
                    </div>
                </div>
                <div class="carousel-item" style="text-align:center;">
                    <div class="carousel-pic">
                        <img src="https://i.imgur.com/Oecjj02.png" alt="...">
                    </div>
                </div>
                <div class="carousel-item" style="text-align:center;">
                    <div class="carousel-pic">
                        <img src="https://i.imgur.com/BUegc71.png" alt="...">
                    </div>
                </div>
                <div class="carousel-item" style="text-align:center;">
                    <div class="carousel-pic">
                        <img src="https://i.imgur.com/dgEwrrS.png" alt="...">
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel_pwd" data-bs-slide="prev">
                <i class="fas fa-arrow-alt-circle-left fa-2x" style="color:rgba(60,179,113,0.5);"></i>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel_pwd" data-bs-slide="next">
                <i class="fas fa-arrow-alt-circle-right fa-2x" style="color:rgba(60,179,113,0.5);"></i>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <h2>功能簡介：</h2>
        <p>密碼管理員（pwd_manager）是一套以flutter為開發框架、專為智慧型手機所打造的行動app。該軟體的功用在於讓用戶可以隨身記錄註冊過的各種帳號密碼，並且兼具資料匯入／匯出功能，即使更換手機也可以輕鬆地將資料轉移到新手機上。</p>
        <p>用戶所記錄的各組帳號密碼皆是儲存在手機local端的記憶空間（localDB），不會有任何的資料被上傳到網路上。另一方面，密碼管理員也具有PIN碼驗證機制，以防用戶的手機失竊後也帳密資料也一併遭竊。</p>
    </div>
    <div class="col-lg-6">
        <h2>安裝說明：</h2>
        <ul style="list-style-type: none;">
            <li>系統需求：Andoird ^4.3</li>
            <li>1. 下載<a href="https://drive.google.com/file/d/1FQTX5v8_u9tSXpJ1jH_XaZ_gWWBO2roi/view?usp=sharing" target="_blank">pwd_manager.apk檔</a></li>
            <li>2. 將apk檔放到手機的Download資料夾</li>
            <li>（3. 開啟允許安裝未知的應用程式）</li>
            <li>4. 於手機上點擊pwd_manager.apk即可安裝</li>
        </ul>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <h2>注意事項：</h2>
        <ul style="list-style-type: none;">
            <li>1. 為免意外曝露本軟體的程式漏洞，在<a href="https://github.com/BabyBoChen/pwd_manager" target="_blank">GitHub存放庫</a>中僅上傳與UI介面相關的.dart檔。</li>
            <li>2. 使用密碼管理員而導致個資外洩甚至造成財產損失，作者絕不負擔任何賠償責任！使用前請三思！</li>
        </ul>
    </div>    
</div>

`;