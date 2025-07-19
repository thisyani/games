document.addEventListener('DOMContentLoaded', () => {

    // 1. 定义所有语言的翻译文本
    const translations = {
        'zh-CN': {
            pageTitle: '游戏合辑',
            headerTitle: '游戏合辑',
            darkModeLabel: '深色模式',
            game1: '1. 电子木鱼'
        },
        'zh-TW': {
            pageTitle: '遊戲合輯',
            headerTitle: '遊戲合輯',
            darkModeLabel: '深色模式',
            game1: '1. 電子木魚'
        },
        'en': {
            pageTitle: 'Game Collection',
            headerTitle: 'Game Collection',
            darkModeLabel: 'Dark Mode',
            game1: '1. Online Muyu (eFish)'
        },
        'ja': {
            pageTitle: 'ゲームコレクション',
            headerTitle: 'ゲームコレクション',
            darkModeLabel: 'ダークモード',
            game1: '1. 電子木魚 (eFish)'
        },
        'ru': {
            pageTitle: 'Коллекция игр',
            headerTitle: 'Коллекция игр',
            darkModeLabel: 'Тёмный режим',
            game1: '1. Онлайн Мую (eFish)'
        }
    };

    // 2. 获取需要的DOM元素
    const languageSelector = document.getElementById('language-selector');
    const themeToggle = document.getElementById('theme-toggle');
    const translatableElements = document.querySelectorAll('[data-lang-key]');

    // 3. 语言切换功能
    const changeLanguage = (lang) => {
        if (!translations[lang]) return; // 如果没有该语言的翻译，则不执行
        
        translatableElements.forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        // 更新HTML的lang属性，有助于SEO和辅助功能
        document.documentElement.lang = lang;
    };

    // 4. 深色模式切换功能
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };
    
    // 5. 事件监听
    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        changeLanguage(selectedLang);
        // 保存用户选择到localStorage
        localStorage.setItem('language', selectedLang);
    });

    themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        applyTheme(theme);
        // 保存用户选择到localStorage
        localStorage.setItem('theme', theme);
    });

    // 6. 页面加载时，应用保存的设置
    // 应用保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // 应用保存的语言或浏览器默认语言
    const savedLang = localStorage.getItem('language') || navigator.language.split('-')[0];
    const supportedLangs = Object.keys(translations);
    // 确保保存的或浏览器默认的语言是我们支持的语言
    const initialLang = supportedLangs.includes(savedLang) ? savedLang : 'en'; // 如果不支持，则默认为英语
    
    languageSelector.value = initialLang;
    changeLanguage(initialLang);

});