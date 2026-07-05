// ============================================================
//  📌 請貼上您的 Google Apps Script API 網址
// ============================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbwXnZRPTnoXnsSasI3xnYZlUOQvaCd62XhPbFxY9JqPNYKnbpW2BXB2V2MYl76pIfnBkQ/exec';

// ============================================================
//  1. 資料定義
// ============================================================
const WEEKS = [
    { id: 'W1', label: 'W1', date: '7/3 ~ 7/12' },
    { id: 'W2', label: 'W2', date: '7/13 ~ 7/19' },
    { id: 'W3', label: 'W3', date: '7/20 ~ 7/26' },
    { id: 'W4', label: 'W4', date: '7/27 ~ 8/2' },
    { id: 'W5', label: 'W5', date: '8/3 ~ 8/9' },
    { id: 'W6', label: 'W6', date: '8/10 ~ 8/16' },
    { id: 'W7', label: 'W7', date: '8/17 ~ 8/23' },
    { id: 'W8', label: 'W8', date: '8/24 ~ 8/30' },
    { id: 'W9', label: 'W9', date: '8/31 ~ 9/1' }
];

const SUBJECT_ICONS = { '國文': '📘', '英語': '📗', '數學': '📙', '自然': '📒', '社會': '🌍' };

// ============================================================
//  2. 甘特圖資料
// ============================================================
const GANTT_DATA = [
    { book: '📘 日日讀形音義', short: '形音義', weeks: { 'W1': 'D1~D10', 'W2': '—', 'W3': 'D18~D24', 'W4': '—', 'W5': 'D32~D38', 'W6': '—', 'W7': 'D46~D52', 'W8': '—', 'W9': 'D60🎉' }, type: '國文' },
    { book: '📘 日日讀成語', short: '成語', weeks: { 'W1': '—', 'W2': 'D11~D17', 'W3': '—', 'W4': 'D25~D31', 'W5': '—', 'W6': 'D39~D45', 'W7': '—', 'W8': 'D53~D59', 'W9': '—' }, type: '國文' },
    { book: '📘 文言文即時通', short: '文言文', weeks: { 'W1': '2篇', 'W2': '—', 'W3': '2篇', 'W4': '—', 'W5': '2篇', 'W6': '—', 'W7': '2篇', 'W8': '—', 'W9': '2篇' }, type: '國文' },
    { book: '📘 每週輕悅讀', short: '輕悅讀', weeks: { 'W1': '—', 'W2': '2篇', 'W3': '—', 'W4': '2篇', 'W5': '—', 'W6': '2篇', 'W7': '—', 'W8': '2篇', 'W9': '—' }, type: '國文' },
    { book: '📗 雪莉老師文法', short: '雪莉文法', weeks: { 'W1': 'L1~L13', 'W2': 'L14~L23', 'W3': 'L24~L35', 'W4': 'L36~L40', 'W5': 'L41~L48', 'W6': 'L49~L55', 'W7': 'L56~L57', 'W8': 'L58~L60', 'W9': 'L61~L71' }, type: '英語' },
    { book: '📗 橘子複習講義(英)', short: '橘英', weeks: { 'W1': 'B1 U1~U2', 'W2': 'B2 U3', 'W3': 'B2 U4', 'W4': 'B2 U5', 'W5': 'B1~B2總複習', 'W6': 'B3 U1~U2', 'W7': 'B3 U3', 'W8': 'B4 U4~U5', 'W9': 'B4總複習' }, pages: { 'W1': 'p.5~30', 'W2': 'p.45~56', 'W3': 'p.57~68', 'W4': 'p.69~79', 'W5': 'p.80~102', 'W6': 'p.113~133', 'W7': 'p.134~141', 'W8': 'p.175~207', 'W9': 'p.204~267' }, type: '英語' },
    { book: '📗 單字2000', short: '單字2000', weeks: { 'W1': '1~100字', 'W2': '101~200字', 'W3': '201~300字', 'W4': '301~400字', 'W5': '401~500字', 'W6': '501~600字', 'W7': '601~700字', 'W8': '錯字重背', 'W9': '聽寫100字' }, type: '英語' },
    { book: '📙 橘數(複習) B1~B2', short: '橘數(複習)', weeks: { 'W1': 'U1 數線', 'W2': 'U2 因數分數', 'W3': 'U3 一元一次', 'W4': 'U4 二元一次', 'W5': 'U5 直角坐標', 'W6': 'U6 比例', 'W7': 'U7~8 不等式統計', 'W8': 'U9 線對稱', 'W9': '總複習' }, pages: { 'W1': 'p.5~17', 'W2': 'p.18~33', 'W3': 'p.34~44', 'W4': 'p.45~56', 'W5': 'p.57~68', 'W6': 'p.69~79', 'W7': 'p.80~102', 'W8': 'p.103~112', 'W9': '—' }, type: '數學' },
    { book: '📙 橘數(先修) B3~B4', short: '橘數(先修)', weeks: { 'W1': 'U10 乘法公式', 'W2': 'U10 多項式', 'W3': 'U11 根式', 'W4': 'U11 畢氏定理', 'W5': 'U12 因式分解', 'W6': 'U13 一元二次', 'W7': 'B3總複習', 'W8': 'U14 數列', 'W9': 'U15~17預覽' }, pages: { 'W1': 'p.113~117', 'W2': 'p.118~122', 'W3': 'p.123~133', 'W4': 'p.123~133', 'W5': 'p.134~141', 'W6': 'p.142~152', 'W7': '—', 'W8': 'p.153~165', 'W9': 'p.166~208' }, type: '數學' },
    { book: '📒 生物橘子複習', short: '生物', weeks: { 'W1': 'Ch1 共同性', 'W2': 'Ch2 營養', 'W3': 'Ch3 運輸', 'W4': 'Ch4~5 協調恆定', 'W5': '—', 'W6': '—', 'W7': '—', 'W8': '—', 'W9': '—' }, type: '自然' },
    { book: '📒 理化橘子 第三冊', short: '理化', weeks: { 'W1': '—', 'W2': '—', 'W3': 'Ch1 基本測量', 'W4': 'Ch2 物質與能', 'W5': 'Ch3 波動聲音', 'W6': 'Ch4 光', 'W7': 'Ch5 溫度熱', 'W8': 'Ch6 原子分子', 'W9': '總複習' }, type: '自然' },
    { book: '🌍 地理大滿貫', short: '地理', weeks: { 'W1': 'U1 世界中的臺灣', 'W2': 'U2 地形海岸', 'W3': 'U3 氣候水文', 'W4': 'U4 人口文化', 'W5': 'U5 產業', 'W6': 'U6 聚落交通', 'W7': '模擬試題', 'W8': '—', 'W9': '—' }, type: '社會' },
    { book: '🌍 歷史大滿貫', short: '歷史', weeks: { 'W1': 'U1 史前~大航海', 'W2': 'U2 清帝國', 'W3': 'U3 日治時期', 'W4': 'U4 戰後臺灣', 'W5': '模擬試題', 'W6': '—', 'W7': '—', 'W8': '—', 'W9': '—' }, type: '社會' },
    { book: '🌍 公民大滿貫', short: '公民', weeks: { 'W1': 'U1 公民身分', 'W2': 'U2 家庭學校', 'W3': 'U3 文化規範', 'W4': 'U4 公共意見', 'W5': 'U5', 'W6': 'U6', 'W7': 'U7', 'W8': 'U8', 'W9': '—' }, type: '社會' }
];

// ============================================================
//  3. 每日打卡資料（W1~W9）
//    ⚠️ 已依照您的最終計畫表逐日修正
// ============================================================
const SCHEDULE = {
    // ==========================================================
    //  W1：7/3（五）~ 7/10（五），7/11（六）總複習，7/12（日）休息
    // ==========================================================
    'W1': {
        days: {
            '7/3': {
                '國文': { task: '形音義D1~D5', tag: '複習' },
                '英語': { task: '雪莉L1~L4 + 單字1~20', tag: '複習' },
                '英語題': { task: '橘英B1 U1', tag: '複習' },
                '數學': { task: '橘數B1 U1 數線 p.5~10', tag: '複習' },
                '數學先': { task: '橘數B3 U10 乘法公式 p.113~117', tag: '先修' },
                '自然': { task: '生物Ch1 生命的共同性', tag: '複習' },
                '社會': { task: '地理U1 世界中的臺灣', tag: '複習' }
            },
            '7/4': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '7/5': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            },
            '7/6': {
                '國文': { task: '形音義D6~D10', tag: '複習' },
                '英語': { task: '雪莉L5~L8 + 單字21~40', tag: '複習' },
                '英語題': { task: '橘英B1 U1', tag: '複習' },
                '數學': { task: '橘數B1 U1 數線 p.11~17', tag: '複習' },
                '數學先': { task: '橘數B3 U10 乘法公式 p.118~122', tag: '先修' },
                '自然': { task: '生物Ch1 複習＋習題', tag: '複習' },
                '社會': { task: '歷史U1 史前~大航海', tag: '複習' }
            },
            '7/7': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L1~L8複習 + 單字41~60', tag: '複習' },
                '英語題': { task: '橘英B1 U2', tag: '複習' },
                '數學': { task: '橘數B1 U2 因數倍數 p.18~25', tag: '複習' },
                '數學先': { task: '橘數B3 U10 多項式 p.118~122', tag: '先修' },  // ✅ 修正
                '自然': { task: '生物Ch1 總複習', tag: '複習' },
                '社會': { task: '公民U1 公民身分', tag: '複習' }
            },
            '7/8': {
                '國文': { task: '形音義D1~D10錯字重寫', tag: '複習' },
                '英語': { task: '雪莉L9~L10 + 單字61~80', tag: '複習' },
                '英語題': { task: '橘英B1 U2', tag: '複習' },
                '數學': { task: '橘數B1 U2 分數運算 p.26~33', tag: '複習' },
                '數學先': { task: '橘數B3 U10 多項式 p.118~122', tag: '先修' },
                '自然': { task: '生物Ch2 營養', tag: '複習' },
                '社會': { task: '地理U1 複習', tag: '複習' }
            },
            '7/9': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L11~L13 + 單字81~100', tag: '複習' },
                '英語題': { task: '橘英B1 U1~U2總複習', tag: '複習' },
                '數學': { task: '橘數B1 U2 總複習 p.26~33', tag: '複習' },
                '數學先': { task: '橘數B3 U10 多項式總複習', tag: '先修' },
                '自然': { task: '生物Ch2 複習', tag: '複習' },
                '社會': { task: '歷史U1 複習', tag: '複習' }
            },
            '7/10': {
                '國文': { task: '形音義D1~D10總複習', tag: '複習' },
                '英語': { task: '雪莉L9~L13複習 + 單字總複習', tag: '複習' },
                '英語題': { task: '橘英B1 U1~U2 模擬題', tag: '複習' },
                '數學': { task: '橘數B1 U1~U2 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U10 總複習', tag: '先修' },
                '自然': { task: '生物Ch2 總複習', tag: '複習' },
                '社會': { task: '公民U1 複習', tag: '複習' }
            },
            '7/11': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '7/12': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W2：7/13（一）~ 7/17（五），7/18（六）總複習，7/19（日）休息
    // ==========================================================
    'W2': {
        days: {
            '7/13': {
                '國文': { task: '成語D11~D17', tag: '複習' },
                '英語': { task: '雪莉L14~L16 + 單字101~120', tag: '複習' },
                '英語題': { task: '橘英B2 U3', tag: '複習' },
                '數學': { task: '橘數B1 U2 因數倍數 p.18~25', tag: '複習' },
                '數學先': { task: '橘數B3 U10 多項式 p.118~122', tag: '先修' },
                '自然': { task: '生物Ch2 營養', tag: '複習' },
                '社會': { task: '地理U2 地形海岸', tag: '複習' }
            },
            '7/14': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L17~L19 + 單字121~140', tag: '複習' },
                '英語題': { task: '橘英B2 U3', tag: '複習' },
                '數學': { task: '橘數B1 U2 分數運算 p.26~33', tag: '複習' },
                '數學先': { task: '橘數B3 U10 多項式 p.118~122', tag: '先修' },
                '自然': { task: '生物Ch2 複習＋習題', tag: '複習' },
                '社會': { task: '歷史U2 清帝國', tag: '複習' }
            },
            '7/15': {
                '國文': { task: '成語D11~D17複習', tag: '複習' },
                '英語': { task: '雪莉L20~L23 + 單字141~160', tag: '複習' },
                '英語題': { task: '橘英B2 U3 複習', tag: '複習' },
                '數學': { task: '橘數B1 U2 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U10 多項式總複習', tag: '先修' },
                '自然': { task: '生物Ch2 總複習', tag: '複習' },
                '社會': { task: '公民U2 家庭學校', tag: '複習' }
            },
            '7/16': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L14~L23複習 + 單字161~180', tag: '複習' },
                '英語題': { task: '橘英B2 U3 模擬', tag: '複習' },
                '數學': { task: '橘數B1 U2 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U10 總複習', tag: '先修' },
                '自然': { task: '生物Ch2 總複習＋習題', tag: '複習' },
                '社會': { task: '地理U2 複習', tag: '複習' }
            },
            '7/17': {
                '國文': { task: '成語D11~D17總複習', tag: '複習' },
                '英語': { task: '雪莉L14~L23習題 + 單字181~200', tag: '複習' },
                '英語題': { task: '橘英B2 U3 總複習', tag: '複習' },
                '數學': { task: '橘數B1 U2 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U10 總複習', tag: '先修' },
                '自然': { task: '生物Ch2 總複習', tag: '複習' },
                '社會': { task: '歷史U2 複習', tag: '複習' }
            },
            '7/18': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '7/19': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W3：7/20（一）~ 7/24（五），7/25（六）總複習，7/26（日）休息
    // ==========================================================
    'W3': {
        days: {
            '7/20': {
                '國文': { task: '形音義D18~D24', tag: '複習' },
                '英語': { task: '雪莉L24~L25+L28~L29 + 單字201~220', tag: '複習' },
                '英語題': { task: '橘英B2 U4', tag: '複習' },
                '數學': { task: '橘數B1 U3 一元一次 p.34~38', tag: '複習' },
                '數學先': { task: '橘數B3 U11 根式 p.123~128', tag: '先修' },
                '自然': { task: '生物Ch3 運輸', tag: '複習' },
                '社會': { task: '地理U3 氣候水文', tag: '複習' }
            },
            '7/21': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L30~L32 + 單字221~240', tag: '複習' },
                '英語題': { task: '橘英B2 U4', tag: '複習' },
                '數學': { task: '橘數B1 U3 一元一次 p.39~44', tag: '複習' },
                '數學先': { task: '橘數B3 U11 根式 p.129~133', tag: '先修' },
                '自然': { task: '理化Ch1 基本測量', tag: '先修' },
                '社會': { task: '歷史U3 日治時期', tag: '複習' }
            },
            '7/22': {
                '國文': { task: '形音義D18~D24複習', tag: '複習' },
                '英語': { task: '雪莉L33~L35 + 單字241~260', tag: '複習' },
                '英語題': { task: '橘英B2 U4 複習', tag: '複習' },
                '數學': { task: '橘數B1 U3 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U11 根式 p.129~133', tag: '先修' },
                '自然': { task: '理化Ch1 (續)', tag: '先修' },
                '社會': { task: '公民U3 文化規範', tag: '複習' }
            },
            '7/23': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L24~L35總複習 + 單字261~280', tag: '複習' },
                '英語題': { task: '橘英B2 U4 模擬', tag: '複習' },
                '數學': { task: '橘數B1 U3 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U11 根式總複習', tag: '先修' },
                '自然': { task: '理化Ch1 總複習', tag: '先修' },
                '社會': { task: '地理U3 複習', tag: '複習' }
            },
            '7/24': {
                '國文': { task: '形音義D18~D24總複習', tag: '複習' },
                '英語': { task: '雪莉L24~L35習題 + 單字281~300', tag: '複習' },
                '英語題': { task: '橘英B2 U4 總複習', tag: '複習' },
                '數學': { task: '橘數B1 U3 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U11 總複習', tag: '先修' },
                '自然': { task: '理化Ch1 習題', tag: '先修' },
                '社會': { task: '歷史U3 複習', tag: '複習' }
            },
            '7/25': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '7/26': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W4：7/27（一）~ 7/31（五），8/1（六）總複習，8/2（日）休息
    // ==========================================================
    'W4': {
        days: {
            '7/27': {
                '國文': { task: '成語D25~D31', tag: '複習' },
                '英語': { task: '雪莉L36~L38 + 單字301~320', tag: '複習' },
                '英語題': { task: '橘英B2 U5', tag: '複習' },
                '數學': { task: '橘數B2 U4 二元一次 p.45~50', tag: '複習' },
                '數學先': { task: '橘數B3 U11 畢氏定理 p.123~128', tag: '先修' },
                '自然': { task: '生物Ch4 協調', tag: '複習' },
                '社會': { task: '地理U4 人口文化', tag: '複習' }
            },
            '7/28': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L39~L40 + 單字321~340', tag: '複習' },
                '英語題': { task: '橘英B2 U5', tag: '複習' },
                '數學': { task: '橘數B2 U4 二元一次 p.51~56', tag: '複習' },
                '數學先': { task: '橘數B3 U11 畢氏定理 p.129~133', tag: '先修' },
                '自然': { task: '理化Ch2 物質與能', tag: '先修' },
                '社會': { task: '歷史U4 戰後臺灣', tag: '複習' }
            },
            '7/29': {
                '國文': { task: '成語D25~D31複習', tag: '複習' },
                '英語': { task: '雪莉L36~L40複習 + 單字341~360', tag: '複習' },
                '英語題': { task: '橘英B2 U5 複習', tag: '複習' },
                '數學': { task: '橘數B2 U4 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U11 畢氏定理 p.129~133', tag: '先修' },
                '自然': { task: '生物Ch5 恆定性', tag: '複習' },
                '社會': { task: '公民U4 公共意見', tag: '複習' }
            },
            '7/30': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L36~L40習題 + 單字361~380', tag: '複習' },
                '英語題': { task: '橘英B2 U5 模擬', tag: '複習' },
                '數學': { task: '橘數B2 U4 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U11 畢氏定理總複習', tag: '先修' },
                '自然': { task: '理化Ch2 (續)', tag: '先修' },
                '社會': { task: '歷史U4 複習', tag: '複習' }
            },
            '7/31': {
                '國文': { task: '成語D25~D31總複習', tag: '複習' },
                '英語': { task: '雪莉L36~L40總複習 + 單字381~400', tag: '複習' },
                '英語題': { task: '橘英B2 U5 總複習', tag: '複習' },
                '數學': { task: '橘數B2 U4 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U11 總複習', tag: '先修' },
                '自然': { task: '理化Ch2 總複習', tag: '先修' },
                '社會': { task: '公民U4 複習', tag: '複習' }
            },
            '8/1': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '8/2': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W5：8/3（一）~ 8/7（五），8/8（六）總複習，8/9（日）休息
    // ==========================================================
    'W5': {
        days: {
            '8/3': {
                '國文': { task: '形音義D32~D38', tag: '複習' },
                '英語': { task: '雪莉L41~L44 + 單字401~420', tag: '複習' },
                '英語題': { task: '橘英B1~B2 總複習', tag: '複習' },
                '數學': { task: '橘數B2 U5 直角坐標 p.57~62', tag: '複習' },
                '數學先': { task: '橘數B3 U12 因式分解 p.134~137', tag: '先修' },
                '自然': { task: '理化Ch3 波動與聲音', tag: '先修' },
                '社會': { task: '地理U5 產業', tag: '複習' }
            },
            '8/4': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L45~L48 + 單字421~440', tag: '複習' },
                '英語題': { task: '橘英B1~B2 模擬題', tag: '複習' },
                '數學': { task: '橘數B2 U5 直角坐標 p.63~68', tag: '複習' },
                '數學先': { task: '橘數B3 U12 因式分解 p.138~141', tag: '先修' },
                '自然': { task: '理化Ch3 (續)', tag: '先修' },
                '社會': { task: '歷史模擬試題', tag: '複習' }
            },
            '8/5': {
                '國文': { task: '形音義D32~D38複習', tag: '複習' },
                '英語': { task: '雪莉L41~L48複習 + 單字441~460', tag: '複習' },
                '英語題': { task: '橘英B1~B2 錯題重算', tag: '複習' },
                '數學': { task: '橘數B2 U5 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U12 因式分解 p.138~141', tag: '先修' },
                '自然': { task: '理化Ch3 總複習', tag: '先修' },
                '社會': { task: '公民U5', tag: '複習' }
            },
            '8/6': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L41~L48習題 + 單字461~480', tag: '複習' },
                '英語題': { task: '橘英閱讀攻略', tag: '複習' },
                '數學': { task: '橘數B2 U5 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U12 因式分解總複習', tag: '先修' },
                '自然': { task: '理化Ch3 習題', tag: '先修' },
                '社會': { task: '地理U5 複習', tag: '複習' }
            },
            '8/7': {
                '國文': { task: '形音義D32~D38總複習', tag: '複習' },
                '英語': { task: '雪莉L41~L48總複習 + 單字481~500', tag: '複習' },
                '英語題': { task: '橘英B1~B2 總複習', tag: '複習' },
                '數學': { task: '橘數B2 U5 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U12 總複習', tag: '先修' },
                '自然': { task: '理化Ch3 總複習', tag: '先修' },
                '社會': { task: '公民U5 複習', tag: '複習' }
            },
            '8/8': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '8/9': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W6：8/10（一）~ 8/14（五），8/15（六）總複習，8/16（日）休息
    // ==========================================================
    'W6': {
        days: {
            '8/10': {
                '國文': { task: '成語D39~D45', tag: '複習' },
                '英語': { task: '雪莉L49~L50 + 單字501~520', tag: '複習' },
                '英語題': { task: '橘英B3 U1', tag: '先修' },
                '數學': { task: '橘數B2 U6 比例 p.69~74', tag: '複習' },
                '數學先': { task: '橘數B3 U13 一元二次 p.142~147', tag: '先修' },
                '自然': { task: '理化Ch4 光', tag: '先修' },
                '社會': { task: '地理U6 聚落交通', tag: '複習' }
            },
            '8/11': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L51~L53 + 單字521~540', tag: '複習' },
                '英語題': { task: '橘英B3 U1', tag: '先修' },
                '數學': { task: '橘數B2 U6 比例 p.75~79', tag: '複習' },
                '數學先': { task: '橘數B3 U13 一元二次 p.148~152', tag: '先修' },
                '自然': { task: '理化Ch4 (續)', tag: '先修' },
                '社會': { task: '公民U6', tag: '複習' }
            },
            '8/12': {
                '國文': { task: '成語D39~D45複習', tag: '複習' },
                '英語': { task: '雪莉L54~L55 + 單字541~560', tag: '複習' },
                '英語題': { task: '橘英B3 U2', tag: '先修' },
                '數學': { task: '橘數B2 U6 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U13 一元二次 p.148~152', tag: '先修' },
                '自然': { task: '理化Ch4 總複習', tag: '先修' },
                '社會': { task: '歷史U4 複習', tag: '複習' }
            },
            '8/13': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L49~L55複習 + 單字561~580', tag: '複習' },
                '英語題': { task: '橘英B3 U2', tag: '先修' },
                '數學': { task: '橘數B2 U6 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U13 總複習', tag: '先修' },
                '自然': { task: '理化Ch4 習題', tag: '先修' },
                '社會': { task: '地理U6 複習', tag: '複習' }
            },
            '8/14': {
                '國文': { task: '成語D39~D45總複習', tag: '複習' },
                '英語': { task: '雪莉L49~L55習題 + 單字581~600', tag: '複習' },
                '英語題': { task: '橘英B3 U1~U2 總複習', tag: '先修' },
                '數學': { task: '橘數B2 U6 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 U13 總複習', tag: '先修' },
                '自然': { task: '理化Ch4 總複習', tag: '先修' },
                '社會': { task: '公民U6 複習', tag: '複習' }
            },
            '8/15': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '8/16': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W7：8/17（一）~ 8/21（五），8/22（六）總複習，8/23（日）休息
    // ==========================================================
    'W7': {
        days: {
            '8/17': {
                '國文': { task: '形音義D46~D52', tag: '複習' },
                '英語': { task: '雪莉L56~L57 + 單字601~620', tag: '複習' },
                '英語題': { task: '橘英B3 U3', tag: '先修' },
                '數學': { task: '橘數B2 U7 不等式 p.80~84', tag: '複習' },
                '數學先': { task: '橘數B3 總複習', tag: '先修' },
                '自然': { task: '理化Ch5 溫度與熱', tag: '先修' },
                '社會': { task: '地理模擬試題', tag: '複習' }
            },
            '8/18': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L56~L57複習 + 單字621~640', tag: '複習' },
                '英語題': { task: '橘英B3 U3', tag: '先修' },
                '數學': { task: '橘數B2 U8 統計 p.90~96', tag: '複習' },
                '數學先': { task: '橘數B3 總複習', tag: '先修' },
                '自然': { task: '理化Ch5 (續)', tag: '先修' },
                '社會': { task: '公民U7', tag: '複習' }
            },
            '8/19': {
                '國文': { task: '形音義D46~D52複習', tag: '複習' },
                '英語': { task: '雪莉L56~L57總複習 + 單字641~660', tag: '複習' },
                '英語題': { task: '橘英B3 U3 複習', tag: '先修' },
                '數學': { task: '橘數B2 U7~8 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 錯題重算', tag: '先修' },
                '自然': { task: '理化Ch5 總複習', tag: '先修' },
                '社會': { task: '歷史U4 複習', tag: '複習' }
            },
            '8/20': {
                '國文': { task: '文言文即時通2篇', tag: '先修' },
                '英語': { task: '雪莉L56~L57習題 + 單字661~680', tag: '複習' },
                '英語題': { task: '橘英B3 U3 模擬', tag: '先修' },
                '數學': { task: '橘數B2 U7~8 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 總複習', tag: '先修' },
                '自然': { task: '理化Ch5 習題', tag: '先修' },
                '社會': { task: '公民U7 複習', tag: '複習' }
            },
            '8/21': {
                '國文': { task: '形音義D46~D52總複習', tag: '複習' },
                '英語': { task: '雪莉L56~L57總複習 + 單字681~700', tag: '複習' },
                '英語題': { task: '橘英B3 U3 總複習', tag: '先修' },
                '數學': { task: '橘數B2 U7~8 總複習', tag: '複習' },
                '數學先': { task: '橘數B3 總複習', tag: '先修' },
                '自然': { task: '理化Ch5 總複習', tag: '先修' },
                '社會': { task: '地理模擬複習', tag: '複習' }
            },
            '8/22': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '8/23': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W8：8/24（一）~ 8/28（五），8/29（六）總複習，8/30（日）休息
    // ==========================================================
    'W8': {
        days: {
            '8/24': {
                '國文': { task: '成語D53~D59', tag: '複習' },
                '英語': { task: '雪莉L58~L60 + 錯字重背', tag: '複習' },
                '英語題': { task: '橘英B4 U4', tag: '先修' },
                '數學': { task: '橘數B2 U9 線對稱 p.103~107', tag: '複習' },
                '數學先': { task: '橘數B4 U14 數列 p.153~160', tag: '先修' },
                '自然': { task: '理化Ch6 原子與分子', tag: '先修' },
                '社會': { task: '公民U8', tag: '複習' }
            },
            '8/25': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L58~L60複習 + 錯字重背', tag: '複習' },
                '英語題': { task: '橘英B4 U4', tag: '先修' },
                '數學': { task: '橘數B2 U9 線對稱 p.108~112', tag: '複習' },
                '數學先': { task: '橘數B4 U14 數列 p.161~165', tag: '先修' },
                '自然': { task: '理化Ch6 (續)', tag: '先修' },
                '社會': { task: '社會總複習', tag: '複習' }
            },
            '8/26': {
                '國文': { task: '成語D53~D59複習', tag: '複習' },
                '英語': { task: '雪莉L58~L60總複習 + 錯字重背', tag: '複習' },
                '英語題': { task: '橘英B4 U5', tag: '先修' },
                '數學': { task: '橘數B2 U9 總複習', tag: '複習' },
                '數學先': { task: '橘數B4 U14 總複習', tag: '先修' },
                '自然': { task: '理化Ch6 總複習', tag: '先修' },
                '社會': { task: '公民U8 複習', tag: '複習' }
            },
            '8/27': {
                '國文': { task: '輕悅讀2篇', tag: '先修' },
                '英語': { task: '雪莉L58~L60習題 + 錯字重背', tag: '複習' },
                '英語題': { task: '橘英B4 U5', tag: '先修' },
                '數學': { task: '橘數B2 總複習', tag: '複習' },
                '數學先': { task: '橘數B4 U14 總複習', tag: '先修' },
                '自然': { task: '理化Ch6 習題', tag: '先修' },
                '社會': { task: '社會總複習 (續)', tag: '複習' }
            },
            '8/28': {
                '國文': { task: '成語D53~D59總複習', tag: '複習' },
                '英語': { task: '雪莉L58~L60總複習 + 錯字重背', tag: '複習' },
                '英語題': { task: '橘英B4 U4~U5 總複習', tag: '先修' },
                '數學': { task: '橘數B2 總複習', tag: '複習' },
                '數學先': { task: '橘數B4 U14 總複習', tag: '先修' },
                '自然': { task: '理化Ch6 總複習', tag: '先修' },
                '社會': { task: '公民U8 複習', tag: '複習' }
            },
            '8/29': {
                '國文': { task: '🔄 總複習日', tag: '總複習' },
                '英語': { task: '🔄 總複習日', tag: '總複習' },
                '英語題': { task: '🔄 總複習日', tag: '總複習' },
                '數學': { task: '🔄 總複習日', tag: '總複習' },
                '數學先': { task: '🔄 總複習日', tag: '總複習' },
                '自然': { task: '🔄 總複習日', tag: '總複習' },
                '社會': { task: '🔄 總複習日', tag: '總複習' }
            },
            '8/30': {
                '國文': { task: '🛌 休息日', tag: '休息' },
                '英語': { task: '🛌 休息日', tag: '休息' },
                '英語題': { task: '🛌 休息日', tag: '休息' },
                '數學': { task: '🛌 休息日', tag: '休息' },
                '數學先': { task: '🛌 休息日', tag: '休息' },
                '自然': { task: '🛌 休息日', tag: '休息' },
                '社會': { task: '🛌 休息日', tag: '休息' }
            }
        }
    },
    // ==========================================================
    //  W9：8/31（一）~ 9/1（二）
    // ==========================================================
    'W9': {
        days: {
            '8/31': {
                '國文': { task: '形音義D60 完成！🎉', tag: '複習' },
                '英語': { task: '雪莉L61~L63 + 聽寫最後100字', tag: '複習' },
                '英語題': { task: '橘英B4 總複習', tag: '先修' },
                '數學': { task: '橘數B2 總複習', tag: '複習' },
                '數學先': { task: '橘數B4 U15~17 預覽', tag: '先修' },
                '自然': { task: '理化總複習', tag: '複習' },
                '社會': { task: '收心：整理書包', tag: '複習' }
            },
            '9/1': {
                '國文': { task: '文言文即時通最後2篇', tag: '先修' },
                '英語': { task: '雪莉L64~L71 + 聽寫最後100字', tag: '複習' },
                '英語題': { task: '橘英B4 模擬試題', tag: '先修' },
                '數學': { task: '橘數B2 總複習', tag: '複習' },
                '數學先': { task: '橘數B4 U15~17 預覽', tag: '先修' },
                '自然': { task: '畫「聲音vs光」比較表', tag: '複習' },
                '社會': { task: '寫下暑假學到的5個最重要觀念', tag: '複習' }
            }
        }
    }
};

// ============================================================
//  4. Google Sheets API
// ============================================================
let progressData = {};

function getKey(weekId, date, subject) {
    return weekId + '_' + date + '_' + subject;
}

async function loadFromCloud() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        const result = {};
        if (Array.isArray(data)) {
            data.forEach(function(item) {
                if (item.key !== undefined && item.value !== undefined) {
                    result[item.key] = item.value === true || item.value === 'true';
                }
            });
        }
        return result;
    } catch (e) {
        console.error('讀取失敗:', e);
        return {};
    }
}

async function saveToCloud(progress) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(progress)
        });
        return true;
    } catch (e) {
        console.error('儲存失敗:', e);
        return false;
    }
}

// ============================================================
//  5. 核心邏輯
// ============================================================
var currentFilter = 'all';
var currentMode = 'day';

function showToast(msg, type) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast ' + type + ' show';
    clearTimeout(el._timer);
    el._timer = setTimeout(function() { el.classList.remove('show'); }, 2500);
}

async function toggleCheck(weekId, date, subject) {
    var key = getKey(weekId, date, subject);
    progressData[key] = !progressData[key];
    var ok = await saveToCloud(progressData);
    if (ok) {
        showToast('💾 已儲存', 'success');
    } else {
        showToast('⚠️ 儲存失敗', 'error');
    }
    renderAll();
}

async function toggleDayAll(weekId, date) {
    var dayData = SCHEDULE[weekId] ? SCHEDULE[weekId].days[date] : null;
    if (!dayData) return;
    var subjects = Object.keys(dayData);
    var allChecked = subjects.every(function(s) { return progressData[getKey(weekId, date, s)]; });
    subjects.forEach(function(s) { progressData[getKey(weekId, date, s)] = !allChecked; });
    await saveToCloud(progressData);
    renderAll();
}

function getCurrentWeekId(today) {
    for (var i = 0; i < WEEKS.length; i++) {
        var w = WEEKS[i];
        var parts = w.date.split(' ~ ');
        var startParts = parts[0].split('/').map(Number);
        var endParts = parts[1].split('/').map(Number);
        var startDate = new Date(today.getFullYear(), startParts[0] - 1, startParts[1]);
        var endDate = new Date(today.getFullYear(), endParts[0] - 1, endParts[1]);
        if (today >= startDate && today <= endDate) return w.id;
    }
    return 'W1';
}

function getAllTasks() {
    var tasks = [];
    for (var wk in SCHEDULE) {
        for (var date in SCHEDULE[wk].days) {
            for (var sub in SCHEDULE[wk].days[date]) {
                tasks.push({ weekId: wk, date: date, subject: sub });
            }
        }
    }
    return tasks;
}

function getStats() {
    var tasks = getAllTasks();
    var total = tasks.length;
    var done = 0;
    tasks.forEach(function(t) {
        if (progressData[getKey(t.weekId, t.date, t.subject)]) done++;
    });
    return { total: total, done: done, percent: total ? Math.round(done / total * 100) : 0 };
}

function getWeekStats(weekId) {
    var week = SCHEDULE[weekId];
    if (!week) return { total: 0, done: 0, percent: 0 };
    var tasks = [];
    for (var date in week.days) {
        for (var sub in week.days[date]) {
            tasks.push({ date: date, subject: sub });
        }
    }
    var total = tasks.length;
    var done = 0;
    tasks.forEach(function(t) {
        if (progressData[getKey(weekId, t.date, t.subject)]) done++;
    });
    return { total: total, done: done, percent: total ? Math.round(done / total * 100) : 0 };
}

function getSubjectStats() {
    var tasks = getAllTasks();
    var map = {};
    tasks.forEach(function(t) {
        var s = t.subject;
        if (s === '英語題') return;
        if (s === '數學先') return;
        if (!map[s]) map[s] = { total: 0, done: 0 };
        map[s].total++;
        if (progressData[getKey(t.weekId, t.date, t.subject)]) map[s].done++;
    });
    var completed = 0;
    for (var s in map) {
        if (map[s].done === map[s].total) completed++;
    }
    return { completed: completed, total: Object.keys(map).length };
}

// ============================================================
//  6. 渲染
// ============================================================
function renderAll() {
    renderStats();
    renderGantt();
    renderDayView();
    renderToday();
}

function renderStats() {
    var s = getStats();
    document.getElementById('statTotal').textContent = s.done + '/' + s.total;
    document.getElementById('statTotalBar').style.width = s.percent + '%';

    var today = new Date();
    var wid = getCurrentWeekId(today);
    var ws = getWeekStats(wid);
    document.getElementById('statWeek').textContent = ws.percent + '%';
    document.getElementById('statWeekBar').style.width = ws.percent + '%';

    var sub = getSubjectStats();
    var p = sub.total ? Math.round(sub.completed / sub.total * 100) : 0;
    document.getElementById('statSubject').textContent = sub.completed + '/' + sub.total;
    document.getElementById('statSubjectBar').style.width = p + '%';
}

function renderToday() {
    var now = new Date();
    var y = now.getFullYear();
    var m = String(now.getMonth() + 1).padStart(2, '0');
    var d = String(now.getDate()).padStart(2, '0');
    var wd = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
    document.getElementById('todayDisplay').textContent = y + '/' + m + '/' + d + ' (' + wd + ')';

    var wid = getCurrentWeekId(now);
    var w = null;
    for (var i = 0; i < WEEKS.length; i++) {
        if (WEEKS[i].id === wid) { w = WEEKS[i]; break; }
    }
    var ws = getWeekStats(wid);
    var statusEl = document.getElementById('syncStatus');
    statusEl.textContent = w ? w.label + ' · ' + ws.done + '/' + ws.total : '—';
}

function renderGantt() {
    var container = document.getElementById('ganttContainer');
    var html = '<div class="gantt-legend">' +
        '<span><span class="dot green"></span>已完成</span>' +
        '<span><span class="dot yellow"></span>部分完成</span>' +
        '<span><span class="dot gray"></span>未開始</span>' +
        '</div>';

    for (var b = 0; b < GANTT_DATA.length; b++) {
        var book = GANTT_DATA[b];
        if (currentFilter !== 'all' && book.type !== currentFilter) continue;

        var weekStatus = {};
        var doneCount = 0,
            totalCount = 0;
        for (var wi = 0; wi < WEEKS.length; wi++) {
            var wid = WEEKS[wi].id;
            var val = book.weeks[wid] || '—';
            var isDone = val !== '—';
            totalCount++;
            if (isDone) {
                var relatedTasks = getAllTasks().filter(function(t) {
                    var task = SCHEDULE[t.weekId] ? SCHEDULE[t.weekId].days[t.date] ? SCHEDULE[t.weekId].days[t.date][t
                        .subject] : null : null;
                    if (!task) return false;
                    var taskText = task.task;
                    if (book.short === '形音義' && taskText.indexOf('形音義') !== -1) return true;
                    if (book.short === '成語' && taskText.indexOf('成語') !== -1) return true;
                    if (book.short === '文言文' && taskText.indexOf('文言文') !== -1) return true;
                    if (book.short === '輕悅讀' && taskText.indexOf('輕悅讀') !== -1) return true;
                    if (book.short === '雪莉文法' && taskText.indexOf('雪莉') !== -1) return true;
                    if (book.short === '橘英' && t.subject === '英語題') return true;
                    if (book.short === '單字2000' && taskText.indexOf('單字') !== -1) return true;
                    if (book.short === '橘數(複習)' && t.subject === '數學' && taskText.indexOf('橘數') !== -1) return true;
                    if (book.short === '橘數(先修)' && t.subject === '數學先') return true;
                    if (book.short === '生物' && t.subject === '自然' && taskText.indexOf('生物') !== -1) return true;
                    if (book.short === '理化' && t.subject === '自然' && taskText.indexOf('理化') !== -1) return true;
                    if (book.short === '地理' && t.subject === '社會' && taskText.indexOf('地理') !== -1) return true;
                    if (book.short === '歷史' && t.subject === '社會' && taskText.indexOf('歷史') !== -1) return true;
                    if (book.short === '公民' && t.subject === '社會' && taskText.indexOf('公民') !== -1) return true;
                    return false;
                });
                var allDone = true;
                for (var rt = 0; rt < relatedTasks.length; rt++) {
                    if (!progressData[getKey(relatedTasks[rt].weekId, relatedTasks[rt].date, relatedTasks[rt].subject)]) {
                        allDone = false;
                        break;
                    }
                }
                if (allDone) { doneCount++;
                    weekStatus[wid] = 'done'; } else { weekStatus[wid] = 'partial'; }
            } else {
                weekStatus[wid] = 'empty';
            }
        }
        var pct = totalCount ? Math.round(doneCount / totalCount * 100) : 0;

        html += '<div class="gantt-book">';
        html += '<div class="book-header" onclick="toggleGanttBook(this)">';
        html += '<span class="book-name">' + book.book + '</span>';
        html += '<span class="book-stats">完成 ' + doneCount + '/' + totalCount + ' (' + pct + '%)</span>';
        html += '</div>';
        html += '<div class="book-body open">';

        html += '<div class="gantt-row" style="font-weight:700;font-size:12px;color:#1a3a5c;">';
        html += '<div class="gantt-label">週次</div>';
        for (var wi2 = 0; wi2 < WEEKS.length; wi2++) {
            html += '<div class="gantt-cell" style="background:#f0f5ff;border-color:#d5dbe3;">' + WEEKS[wi2].label +
            '</div>';
        }
        html += '</div>';

        html += '<div class="gantt-row">';
        html += '<div class="gantt-label">進度</div>';
        for (var wi3 = 0; wi3 < WEEKS.length; wi3++) {
            var wid2 = WEEKS[wi3].id;
            var val2 = book.weeks[wid2] || '—';
            var status2 = weekStatus[wid2] || 'empty';
            var cls2 = status2 === 'done' ? 'done' : (status2 === 'partial' ? 'partial' : 'empty');
            var label2 = val2 === '—' ? '—' : val2;
            var pageInfo = book.pages && book.pages[wid2] ? ' <span class="sub-task">' + book.pages[wid2] + '</span>' : '';
            var doneMark = status2 === 'done' ? ' ✅' : '';
            html += '<div class="gantt-cell ' + cls2 + '">' + label2 + pageInfo + doneMark + '</div>';
        }
        html += '</div>';

        html += '</div></div>';
    }

    container.innerHTML = html;
}

function toggleGanttBook(header) {
    var body = header.nextElementSibling;
    if (body) body.classList.toggle('open');
}

function renderDayView() {
    var container = document.getElementById('dayContainer');
    var html = '';

    for (var wi = 0; wi < WEEKS.length; wi++) {
        var week = WEEKS[wi];
        var wid = week.id;
        var wd = SCHEDULE[wid];
        if (!wd) continue;
        var ws = getWeekStats(wid);
        var isComplete = ws.done === ws.total && ws.total > 0;
        var isPartial = ws.done > 0 && ws.done < ws.total;
        var cls = isComplete ? 'completed' : (isPartial ? 'incomplete' : 'empty');
        var barColor = isComplete ? 'green' : (isPartial ? 'yellow' : 'red');

        html += '<div class="week-block ' + cls + '" data-week="' + wid + '">';
        html += '<div class="week-header" onclick="toggleWeek(\'' + wid + '\')">';
        html += '<div class="week-left">';
        html += '<span class="week-title">' + week.label + '</span>';
        html += '<span class="week-date">' + week.date + '</span>';
        html += '<div class="week-bar-wrap"><div class="week-bar-fill ' + barColor + '" style="width:' + ws.percent +
            '%"></div></div>';
        html += '</div>';
        html += '<span class="week-progress-text">' + ws.done + '/' + ws.total + ' (' + ws.percent + '%)</span>';
        html += '</div>';

        html += '<div class="week-body" id="weekBody_' + wid + '">';
        var dates = Object.keys(wd.days);
        html += '<div class="day-grid">';

        for (var di = 0; di < dates.length; di++) {
            var date = dates[di];
            var day = wd.days[date];

            var dateParts = date.split('/').map(Number);
            var dt = new Date(2026, dateParts[0] - 1, dateParts[1]); // 使用固定年份 2026
            var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
            var wdStr = weekdays[dt.getDay()];
            
            var todayStr = new Date().toISOString().slice(5, 10).replace('-', '/');
            var isToday = date === todayStr;

            var firstTask = day[Object.keys(day)[0]];
            var isRestDay = firstTask && firstTask.tag === '休息';
            var isReviewDay = firstTask && firstTask.tag === '總複習';

            var cardClass = '';
            if (isToday) cardClass += 'today ';
            if (isRestDay) cardClass += 'rest-day ';
            if (isReviewDay) cardClass += 'review-day ';

            var subs = Object.keys(day);
            var done = 0;
            subs.forEach(function(s) { if (progressData[getKey(wid, date, s)]) done++; });
            var allChecked = done === subs.length && subs.length > 0;

            html += '<div class="day-card ' + cardClass + '">';
            html += '<div class="day-title">';
            
            var dateLabel = isRestDay ? '🛌 ' + date : (isReviewDay ? '🔄 ' + date : date);
            html += '<span>' + dateLabel + ' <strong style="color:#2a5f7a;background:#e3f0fa;padding:0 6px;border-radius:4px;">' + wdStr + '</strong>' + (isToday ? ' ⭐今天' : '') + '</span>';
            
            
            if (!isRestDay && !isReviewDay) {
                html += '<span class="check-all" onclick="toggleDayAll(\'' + wid + '\',\'' + date + '\')">' + (allChecked ?
                    '☑ 全部取消' : '☐ 全部勾選') + '</span>';
            }
            html += '</div>';

            html += '<div class="day-dots">';
            for (var si = 0; si < subs.length; si++) {
                var ck = progressData[getKey(wid, date, subs[si])] || false;
                html += '<span class="dot ' + (ck ? 'done' : '') + '"></span>';
            }
            html += '</div>';

            var order = ['國文', '英語', '英語題', '數學', '數學先', '自然', '社會'];
            for (var oi = 0; oi < order.length; oi++) {
                var sub = order[oi];
                if (!day[sub]) continue;
                var info = day[sub];
                var checked = progressData[getKey(wid, date, sub)] || false;
                var tagCls = info.tag === '複習' ? 'review' : (info.tag === '先修' ? 'advance' : (info.tag === '總複習' ?
                    'review-tag' : 'rest-tag'));
                var disp = sub === '英語題' ? '英語' : (sub === '數學先' ? '數學' : sub);
                var taskDisplay = checked ? '<span class="done">' + info.task + '</span>' : info.task;

                var show = true;
                if (currentFilter !== 'all') {
                    if (sub === '英語題' && currentFilter !== '英語') show = false;
                    else if (sub === '數學先' && currentFilter !== '數學') show = false;
                    else if (sub !== '英語題' && sub !== '數學先' && sub !== currentFilter) show = false;
                }

                html += '<div class="subject-row ' + (show ? 'show' : '') + '" data-subject="' + sub +
                    '" onclick="event.stopPropagation();">';
                if (!isRestDay && !isReviewDay) {
                    html += '<input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="toggleCheck(\'' + wid +
                        '\',\'' + date + '\',\'' + sub + '\')" onclick="event.stopPropagation();">';
                } else {
                    html += '<span style="width:17px;display:inline-block;"></span>';
                }
                html += '<span class="subject-label">' + (SUBJECT_ICONS[disp] || '') + ' ' + disp + '</span>';
                html += '<span class="task"><span class="tag ' + tagCls + '">' + info.tag + '</span> ' + taskDisplay +
                    '</span>';
                html += '</div>';
            }

            var recall = progressData[getKey(wid, date, '睡前回想')] || false;
            html +=
                '<div class="subject-row" style="border-top:2px dashed #d5dbe3;margin-top:4px;padding-top:6px;" onclick="event.stopPropagation();">';
            if (!isRestDay && !isReviewDay) {
                html += '<input type="checkbox" ' + (recall ? 'checked' : '') + ' onchange="toggleCheck(\'' + wid +
                    '\',\'' + date + '\',\'睡前回想\')" onclick="event.stopPropagation();">';
            } else {
                html += '<span style="width:17px;display:inline-block;"></span>';
            }
            html += '<span class="subject-label">🌙</span>';
            html += '<span class="task">睡前回想 ' + (recall ? '✅' : '') + '</span>';
            html += '</div>';

            html += '</div>';
        }

        html += '</div></div></div>';
    }

    container.innerHTML = html;

    var today = new Date();
    var cur = getCurrentWeekId(today);
    var body = document.getElementById('weekBody_' + cur);
    if (body) body.classList.add('open');
}

function toggleWeek(wid) {
    var el = document.getElementById('weekBody_' + wid);
    if (el) el.classList.toggle('open');
}

// ============================================================
//  7. 模式切換
// ============================================================
function switchMode(mode) {
    currentMode = mode;
    var dayBtn = document.getElementById('modeDay');
    var ganttBtn = document.getElementById('modeGantt');
    if (mode === 'day') {
        dayBtn.classList.add('active-mode');
        ganttBtn.classList.remove('active-mode');
        document.getElementById('dayContainer').style.display = 'block';
        document.getElementById('ganttContainer').classList.remove('show');
        document.getElementById('filterGroup').style.display = 'inline-flex';
    } else {
        ganttBtn.classList.add('active-mode');
        dayBtn.classList.remove('active-mode');
        document.getElementById('dayContainer').style.display = 'none';
        document.getElementById('ganttContainer').classList.add('show');
        document.getElementById('filterGroup').style.display = 'none';
        renderGantt();
    }
}

// ============================================================
//  8. 同步＆重置
// ============================================================
async function syncWithCloud() {
    var st = document.getElementById('syncStatus');
    st.textContent = '⏳ 同步中...';
    st.className = 'sync-status syncing';
    try {
        progressData = await loadFromCloud();
        renderAll();
        st.textContent = '✅ 已同步';
        st.className = 'sync-status synced';
        showToast('✅ 同步成功', 'success');
    } catch (e) {
        st.textContent = '⚠️ 同步失敗';
        st.className = 'sync-status error';
        showToast('⚠️ 同步失敗，請檢查網路', 'error');
    }
}

function showResetModal() {
    document.getElementById('resetModal').classList.add('active');
}

function closeResetModal() {
    document.getElementById('resetModal').classList.remove('active');
}

async function confirmReset() {
    closeResetModal();
    var tasks = getAllTasks();
    tasks.forEach(function(t) { delete progressData[getKey(t.weekId, t.date, t.subject)]; });
    await saveToCloud(progressData);
    renderAll();
    showToast('🗑 已重置所有進度', 'success');
}

// ============================================================
//  9. 初始化
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    var filterBtns = document.querySelectorAll('.filter-group button');
    for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', function() {
            var btns = document.querySelectorAll('.filter-group button');
            for (var j = 0; j < btns.length; j++) {
                btns[j].classList.remove('active');
            }
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderAll();
        });
    }

    document.getElementById('resetModal').addEventListener('click', function(e) {
        if (e.target === this) closeResetModal();
    });

    switchMode('day');

    var loading = document.getElementById('loadingOverlay');
    loading.classList.add('active');

    loadFromCloud().then(function(data) {
        progressData = data;
        renderAll();
        document.getElementById('syncStatus').textContent = '✅ 已同步';
        document.getElementById('syncStatus').className = 'sync-status synced';
        loading.classList.remove('active');
    }).catch(function() {
        loading.classList.remove('active');
        document.getElementById('syncStatus').textContent = '⚠️ 載入失敗';
        document.getElementById('syncStatus').className = 'sync-status error';
        renderAll();
    });
});

console.log('✅ 暑期進度追蹤已載入 (修正版)');