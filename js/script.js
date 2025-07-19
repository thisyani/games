// 使用 DOMContentLoaded 事件确保在操作DOM之前，HTML已完全加载并解析
document.addEventListener('DOMContentLoaded', () => {

    // 定义所有语言的翻译文本对象
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

    // 获取需要操作的DOM元素
    const languageSelector = document.getElementById('language-selector');
    const themeToggle = document.getElementById('theme-toggle');
    const translatableElements = document.querySelectorAll('[data-lang-key]');

    // 封装语言切换的函数 (无变动)
    const changeLanguage = (lang) => {
        if (!translations[lang]) return; 
        
        translatableElements.forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
    };

    // 封装应用主题的函数 (无变动)
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };
    
    // ----- 事件监听器 (无变动) -----

    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        changeLanguage(selectedLang);
        localStorage.setItem('language', selectedLang);
    });

    themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        applyTheme(theme);
        // 注意：这里保存用户选择的行为是关键，它使得用户的显式选择拥有最高优先级
        localStorage.setItem('theme', theme);
    });

    // ----- 页面初始化 (逻辑更新) -----

    // 1. 确定初始主题
    const savedTheme = localStorage.getItem('theme'); // 检查用户是否已在本站保存偏好

    if (savedTheme) {
        // 优先级1: 如果用户已在本站明确选择过主题，则使用该主题
        applyTheme(savedTheme);
    } else {
        // 优先级2: 如果用户没有选择过，则检查其操作系统的设置
        // window.matchMedia 用于检测CSS媒体查询的状态
        // '(prefers-color-scheme: dark)' 会在系统为深色模式时返回true
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light'); // 否则，默认使用亮色模式
        }
    }

    // 2. 应用保存的语言或浏览器默认语言 (无变动)
    let savedLang = localStorage.getItem('language');
    if (!savedLang) {
        savedLang = navigator.language.split('-')[0];
    }
    
    const supportedLangs = Object.keys(translations);
    const initialLang = supportedLangs.includes(savedLang) ? savedLang : 'en';
    
    languageSelector.value = initialLang;
    changeLanguage(initialLang);

});