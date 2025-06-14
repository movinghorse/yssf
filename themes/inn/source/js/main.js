document.addEventListener('DOMContentLoaded', function() {
    // 初始化功能
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initNightMode();
    initCodeHighlight();
    initToc();
    initReward();
    initPageLoading();
    
    // 响应式处理
    handleResponsive();
});

/**
 * 移动端菜单切换
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            body.classList.toggle('menu-open');
        });
        
        // 点击菜单外区域关闭菜单
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open') && 
                !e.target.closest('.inn-nav') && 
                !e.target.closest('.menu-toggle')) {
                body.classList.remove('menu-open');
            }
        });
    }
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 返回顶部按钮
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        // 监听滚动事件
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        // 点击返回顶部
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 夜间模式切换
 */
function initNightMode() {
    const modeToggle = document.querySelector('.mode-toggle');
    const html = document.documentElement;
    const darkModeStorageKey = 'inn_dark_mode';
    
    // 初始化夜间模式
    function initDarkMode() {
        const darkModeStored = localStorage.getItem(darkModeStorageKey);
        
        if (darkModeStored) {
            // 使用存储的设置
            html.setAttribute('data-theme', darkModeStored === 'true' ? 'dark' : 'light');
        } else {
            // 检查系统偏好
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            html.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
        }
    }
    
    // 切换夜间模式
    function toggleDarkMode() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem(darkModeStorageKey, newTheme === 'dark');
    }
    
    // 监听系统主题变化
    function listenSystemThemeChange() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            if (localStorage.getItem(darkModeStorageKey) === null) {
                html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // 初始化
    initDarkMode();
    listenSystemThemeChange();
    
    // 绑定点击事件
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleDarkMode);
    }
}

/**
 * 代码高亮功能
 */
function initCodeHighlight() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    if (codeBlocks.length > 0) {
        // 添加复制按钮
        codeBlocks.forEach(block => {
            const pre = block.parentNode;
            const copyButton = document.createElement('div');
            copyButton.className = 'copy-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            pre.appendChild(copyButton);
            
            // 复制代码功能
            copyButton.addEventListener('click', () => {
                const code = block.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                }).catch(err => {
                    console.error('复制失败:', err);
                });
            });
        });
    }
}

/**
 * 文章目录功能
 */
function initToc() {
    const tocContent = document.querySelector('.toc-content');
    const tocExpand = document.querySelector('.toc-expand');
    const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6');
    
    if (tocContent && headings.length > 0) {
        // 展开/收起目录
        if (tocExpand) {
            tocExpand.addEventListener('click', function() {
                tocContent.classList.toggle('expanded');
                this.textContent = tocContent.classList.contains('expanded') ? '收起目录' : '展开目录';
            });
        }
        
        // 滚动时高亮当前目录项
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // 找到当前可见的标题
            let currentHeading = null;
            headings.forEach(heading => {
                if (heading.offsetTop - 100 <= scrollPosition) {
                    currentHeading = heading;
                }
            });
            
            if (currentHeading) {
                // 移除所有活动类
                document.querySelectorAll('.toc-content a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // 添加活动类到当前项
                const id = currentHeading.getAttribute('id');
                const activeLink = document.querySelector(`.toc-content a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

/**
 * 打赏功能
 */
function initReward() {
    const rewardButton = document.querySelector('.reward-button');
    const rewardQrcodes = document.querySelector('.reward-qrcodes');
    
    if (rewardButton && rewardQrcodes) {
        rewardButton.addEventListener('click', function() {
            rewardQrcodes.classList.toggle('show');
        });
    }
}

/**
 * 页面加载动画
 */
function initPageLoading() {
    const loadingBox = document.getElementById('loading-box');
    
    if (loadingBox) {
        // 页面加载完成后隐藏加载动画
        window.addEventListener('load', function() {
            loadingBox.classList.add('hide');
            setTimeout(() => {
                loadingBox.style.display = 'none';
            }, 500);
        });
    }
}

/**
 * 响应式处理
 */
function handleResponsive() {
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        // 在这里添加响应式处理逻辑
    });
}
