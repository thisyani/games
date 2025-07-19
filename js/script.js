// 使用 DOMContentLoaded 事件确保在操作DOM之前，HTML已完全加载并解析
document.addEventListener('DOMContentLoaded', () => {

    // 定义所有语言的翻译文本对象
    // Key 对应 HTML 中的 data-lang-key
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

    // 封装语言切换的函数
    const changeLanguage = (lang) => {
        // 检查是否存在该语言的翻译
        if (!translations[lang]) return; 
        
        // 遍历所有带 data-lang-key 属性的元素
        translatableElements.forEach(element => {
            const key = element.dataset.langKey;
            // 如果在该语言的翻译对象中找到了对应的key
            if (translations[lang][key]) {
                // 更新元素的文本内容
                element.textContent = translations[lang][key];
            }
        });
        // 更新根元素<html>的lang属性，对SEO和屏幕阅读器友好
        document.documentElement.lang = lang;
    };

    // 封装应用主题的函数
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };
    
    // ----- 事件监听器 -----

    // 监听语言选择器的变化
    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        changeLanguage(selectedLang);
        // 将用户的语言偏好保存到浏览器的 localStorage 中
        localStorage.setItem('language', selectedLang);
    });

    // 监听主题切换开关的变化
    themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        applyTheme(theme);
        // 将用户的主题偏好保存到 localStorage
        localStorage.setItem('theme', theme);
    });

    // ----- 页面初始化 -----

    // 1. 应用保存的主题，如果没有保存则默认为'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // 2. 应用保存的语言
    // 首先尝试从localStorage获取，如果没有，则尝试获取浏览器的语言
    let savedLang = localStorage.getItem('language');
    if (!savedLang) {
        // navigator.language 通常返回 "en-US", "zh-CN" 等，我们取前半部分
        savedLang = navigator.language.split('-')[0];
    }
    
    const supportedLangs = Object.keys(translations);
    // 检查获取到的语言是否在我们支持的列表中，如果不支持，则默认使用英语
    const initialLang = supportedLangs.includes(savedLang) ? savedLang : 'en';
    
    // 将下拉选择器的值设置为初始语言，并调用函数应用翻译
    languageSelector.value = initialLang;
    changeLanguage(initialLang);

});