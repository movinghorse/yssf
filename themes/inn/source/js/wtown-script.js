/**
 * 云水山房 - 古北水镇风格主题脚本
 */

$(document).ready(function() {
    // 初始化变量
    const $window = $(window);
    const $body = $('body');
    const $backToTop = $('#back-to-top');
    const $menuToggle = $('#menu-toggle');
    const $menuList = $('#menu-list');
    const $searchBtn = $('#search-btn');
    const $searchMask = $('#search-mask');
    const $searchBox = $('#search-box');
    const $searchInput = $('#search-input');
    const $searchClose = $('#search-close');
    const $darkmodeToggle = $('#darkmode-toggle');
    
    // 返回顶部按钮
    $window.scroll(function() {
        if ($window.scrollTop() > 300) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });
    
    $backToTop.click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    
    // 移动端菜单切换
    $menuToggle.click(function() {
        $menuList.toggleClass('active');
    });
    
    // 点击页面其他区域关闭菜单
    $body.click(function(e) {
        if (!$(e.target).closest('.site-nav').length) {
            $menuList.removeClass('active');
        }
    });
    
    // 搜索功能
    $searchBtn.click(function() {
        $searchMask.fadeIn();
        $searchBox.fadeIn();
        $searchInput.focus();
    });
    
    $searchClose.click(function() {
        $searchMask.fadeOut();
        $searchBox.fadeOut();
    });
    
    $searchMask.click(function() {
        $searchMask.fadeOut();
        $searchBox.fadeOut();
    });
    
    // 搜索功能实现
    $searchInput.on('input', function() {
        const keyword = $searchInput.val().trim().toLowerCase();
        if (keyword.length < 2) {
            $('#search-result').html('');
            return;
        }
        
        // 这里需要实现搜索逻辑，可以使用AJAX请求或者预加载的数据
        // 示例：
        /*
        $.getJSON('/search.json', function(data) {
            const results = data.filter(item => {
                return item.title.toLowerCase().indexOf(keyword) > -1 || 
                       item.content.toLowerCase().indexOf(keyword) > -1;
            });
            
            renderSearchResults(results);
        });
        */
    });
    
    // 夜间模式切换
    $darkmodeToggle.click(function() {
        $body.toggleClass('dark-mode');
        
        // 保存用户偏好
        if ($body.hasClass('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            $darkmodeToggle.html('<i class="fas fa-sun"></i>');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            $darkmodeToggle.html('<i class="fas fa-moon"></i>');
        }
    });
    
    // 检查用户偏好
    if (localStorage.getItem('darkMode') === 'enabled') {
        $body.addClass('dark-mode');
        $darkmodeToggle.html('<i class="fas fa-sun"></i>');
    }
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyImages.length == 0) { 
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
    
    // 平滑滚动到锚点
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70 // 70px 是头部高度
            }, 500);
        }
    });
    
    // 打赏功能
    $('.reward-button').click(function() {
        $('.reward-main').slideToggle();
    });
    
    // 图片点击放大
    $('.post-content img').each(function() {
        if (!$(this).parent('a').length) {
            $(this).wrap(`<a href="${$(this).attr('src')}" data-fancybox="gallery"></a>`);
        }
    });
    
    // 初始化 Fancybox (如果引入了 Fancybox 库)
    if ($.fancybox) {
        $('[data-fancybox]').fancybox({
            buttons: [
                'zoom',
                'slideShow',
                'fullScreen',
                'download',
                'thumbs',
                'close'
            ]
        });
    }
});