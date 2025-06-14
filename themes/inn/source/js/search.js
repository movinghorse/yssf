/**
 * 本地搜索功能
 */
class LocalSearch {
    constructor() {
        this.path = '/search.xml';
        this.searchInput = document.getElementById('search-input');
        this.searchResult = document.getElementById('search-result');
        this.searchMask = document.getElementById('search-mask');
        this.searchBox = document.getElementById('search-box');
        this.searchClose = document.getElementById('search-close');
        this.searchButton = document.querySelector('.search-button');
        this.isXml = true;
        this.resultsPerKeyword = 30;
        this.data = null;
        this.resultItems = [];
        this.isfetched = false;
        
        this.init();
    }
    
    /**
     * 初始化搜索功能
     */
    init() {
        if (!this.searchInput || !this.searchResult || !this.searchMask || !this.searchBox) return;
        
        // 绑定搜索按钮点击事件
        if (this.searchButton) {
            this.searchButton.addEventListener('click', () => {
                this.openSearch();
            });
        }
        
        // 绑定关闭按钮点击事件
        if (this.searchClose) {
            this.searchClose.addEventListener('click', () => {
                this.closeSearch();
            });
        }
        
        // 绑定遮罩层点击事件
        this.searchMask.addEventListener('click', () => {
            this.closeSearch();
        });
        
        // 绑定输入框事件
        this.searchInput.addEventListener('input', () => {
            this.handleSearch();
        });
        
        // 绑定键盘事件
        document.addEventListener('keydown', (e) => {
            // ESC键关闭搜索
            if (e.key === 'Escape') {
                this.closeSearch();
            }
            
            // Ctrl/Cmd + K 打开搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
        });
        
        // 加载搜索数据
        this.fetchData();
    }
    
    /**
     * 打开搜索框
     */
    openSearch() {
        this.searchMask.classList.add('show');
        this.searchBox.classList.add('show');
        this.searchInput.focus();
    }
    
    /**
     * 关闭搜索框
     */
    closeSearch() {
        this.searchMask.classList.remove('show');
        this.searchBox.classList.remove('show');
        this.searchInput.value = '';
        this.searchResult.innerHTML = '';
    }
    
    /**
     * 加载搜索数据
     */
    fetchData() {
        fetch(this.path)
            .then(response => response.text())
            .then(res => {
                // 解析XML数据
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(res, 'text/xml');
                const entries = xmlDoc.getElementsByTagName('entry');
                
                this.data = [];
                
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    const title = entry.getElementsByTagName('title')[0].textContent;
                    const content = entry.getElementsByTagName('content')[0].textContent;
                    const url = entry.getElementsByTagName('url')[0].textContent;
                    
                    this.data.push({
                        title,
                        content,
                        url
                    });
                }
                
                this.isfetched = true;
            })
            .catch(error => {
                console.error('搜索数据加载失败:', error);
            });
    }
    
    /**
     * 处理搜索
     */
    handleSearch() {
        const keyword = this.searchInput.value.trim().toLowerCase();
        
        // 清空搜索结果
        this.searchResult.innerHTML = '';
        
        if (keyword.length < 2 || !this.isfetched) {
            return;
        }
        
        // 搜索匹配项
        const results = this.getSearchResult(keyword);
        
        // 显示搜索结果
        this.showSearchResult(results, keyword);
    }
    
    /**
     * 获取搜索结果
     * @param {string} keyword - 搜索关键词
     * @returns {Array} - 搜索结果数组
     */
    getSearchResult(keyword) {
        const results = [];
        const keywordArr = keyword.split(' ').filter(k => k);
        
        if (!this.data || keywordArr.length === 0) return results;
        
        this.data.forEach(data => {
            let isMatch = true;
            let hitCount = 0;
            let titleHitCount = 0;
            let contentHitCount = 0;
            
            const title = data.title.toLowerCase();
            const content = data.content.toLowerCase();
            
            // 匹配关键词
            keywordArr.forEach(k => {
                const titleIndex = title.indexOf(k);
                const contentIndex = content.indexOf(k);
                
                if (titleIndex >= 0) {
                    titleHitCount++;
                }
                
                if (contentIndex >= 0) {
                    contentHitCount++;
                }
                
                if (titleIndex < 0 && contentIndex < 0) {
                    isMatch = false;
                }
            });
            
            // 如果匹配成功，添加到结果中
            if (isMatch) {
                hitCount = titleHitCount + contentHitCount;
                results.push({
                    ...data,
                    hitCount,
                    titleHitCount,
                    contentHitCount
                });
            }
        });
        
        // 按匹配度排序
        return results.sort((a, b) => {
            if (a.titleHitCount !== b.titleHitCount) {
                return b.titleHitCount - a.titleHitCount;
            }
            if (a.contentHitCount !== b.contentHitCount) {
                return b.contentHitCount - a.contentHitCount;
            }
            return b.hitCount - a.hitCount;
        }).slice(0, this.resultsPerKeyword);
    }
    
    /**
     * 显示搜索结果
     * @param {Array} results - 搜索结果数组
     * @param {string} keyword - 搜索关键词
     */
    showSearchResult(results, keyword) {
        if (results.length === 0) {
            const noResult = document.createElement('div');
            noResult.className = 'search-result-empty';
            noResult.textContent = '没有找到相关结果';
            this.searchResult.appendChild(noResult);
            return;
        }
        
        const keywordArr = keyword.split(' ').filter(k => k);
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // 创建标题
            const resultTitle = document.createElement('a');
            resultTitle.className = 'search-result-title';
            resultTitle.href = result.url;
            resultTitle.innerHTML = this.highlightKeyword(result.title, keywordArr);
            
            // 创建内容
            const resultContent = document.createElement('div');
            resultContent.className = 'search-result-content';
            
            // 截取内容的相关部分
            let contentStart = 0;
            keywordArr.forEach(k => {
                const index = result.content.toLowerCase().indexOf(k);
                if (index >= 0 && (index < contentStart || contentStart === 0)) {
                    contentStart = Math.max(0, index - 30);
                }
            });
            
            // 截取内容
            let contentText = result.content.substring(contentStart, contentStart + 200);
            if (contentStart > 0) {
                contentText = '...' + contentText;
            }
            if (contentText.length < result.content.length) {
                contentText += '...';
            }
            
            resultContent.innerHTML = this.highlightKeyword(contentText, keywordArr);
            
            // 添加到结果项
            resultItem.appendChild(resultTitle);
            resultItem.appendChild(resultContent);
            
            // 添加到结果容器
            this.searchResult.appendChild(resultItem);
        });
    }
    
    /**
     * 高亮关键词
     * @param {string} text - 原始文本
     * @param {Array} keywords - 关键词数组
     * @returns {string} - 高亮后的HTML
     */
    highlightKeyword(text, keywords) {
        let result = text;
        
        keywords.forEach(keyword => {
            const regExp = new RegExp(keyword, 'gi');
            result = result.replace(regExp, match => {
                return `<span class="search-keyword">${match}</span>`;
            });
        });
        
        return result;
    }
}

// 初始化搜索
document.addEventListener('DOMContentLoaded', () => {
    new LocalSearch();
});