(function () {
            var ticker = document.getElementById('lkk-breaking');
            var headerInner = document.querySelector('.lkk-header-inner');
            var search = headerInner && headerInner.querySelector('.lkk-header-search');
            if (ticker && search) headerInner.insertBefore(ticker, search);

            var sidebar = document.querySelector('.lkk-archive-sidebar');
            var popularSource = document.querySelector('.lkk-popular-source');
            var popularPanel = popularSource
                && popularSource.querySelector('.lkk-sidebar-latest-links');
            var popularLinks = popularPanel && popularPanel.querySelector('ul');
            if (sidebar && popularSource && popularPanel
                && popularLinks && popularLinks.children.length) {
                sidebar.appendChild(popularPanel);
            }
            if (popularSource && popularSource.parentNode) {
                popularSource.parentNode.removeChild(popularSource);
            }
        }());
