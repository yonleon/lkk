(function () {
                                        var article = document.querySelector('.lkk-article-body');
                                        var toc = document.querySelector('.lkk-article-toc');
                                        var list = toc && toc.querySelector('ol');
                                        if (!article || !toc || !list) return;

                                        var headings = article.querySelectorAll('h2, h3, h4, h5, h6');
                                        for (var index = 0; index < headings.length; index += 1) {
                                            var heading = headings[index];
                                            var text = heading.textContent.replace(/\s+/g, ' ').trim();
                                            if (!text) continue;

                                            var id = heading.id;
                                            if (!id || document.getElementById(id) !== heading) {
                                                var base = text.toLowerCase()
                                                    .replace(/[^a-z0-9]+/g, '-')
                                                    .replace(/^-|-$/g, '') || 'bagian-' + (index + 1);
                                                id = base;
                                                var suffix = 2;
                                                while (document.getElementById(id)) {
                                                    id = base + '-' + suffix;
                                                    suffix += 1;
                                                }
                                                heading.id = id;
                                            }

                                            var item = document.createElement('li');
                                            var link = document.createElement('a');
                                            item.className = 'lkk-toc-level-' + heading.tagName.slice(1);
                                            link.href = '#' + id;
                                            link.textContent = text;
                                            item.appendChild(link);
                                            list.appendChild(item);
                                        }

                                        if (list.children.length) toc.hidden = false;

                                        function formatArticleDate(dateElement) {
                                            if (!dateElement || !dateElement.dateTime
                                                || !window.Intl) return;
                                            var date = new Date(dateElement.dateTime);
                                            if (isNaN(date.getTime())) return;
                                            dateElement.textContent = new Intl.DateTimeFormat(
                                                'id-ID',
                                                {
                                                    dateStyle: 'long',
                                                    timeStyle: 'short',
                                                    timeZone: 'Asia/Jakarta'
                                                }
                                            ).format(date);
                                        }
                                        formatArticleDate(
                                            document.querySelector('.lkk-post-published')
                                        );
                                        formatArticleDate(
                                            document.querySelector('.lkk-post-modified')
                                        );

                                        var articleTitle = document.querySelector(
                                            '.lkk-article-title'
                                        );
                                        var articleTitleText = articleTitle
                                            ? articleTitle.textContent.replace(/\s+/g, ' ').trim()
                                            : '';
                                        var featuredImage = document.querySelector(
                                            '.lkk-article-featured-image'
                                        );
                                        var contentImages = article.querySelectorAll('img');
                                        for (var imageIndex = 0;
                                            imageIndex < contentImages.length;
                                            imageIndex += 1) {
                                            var contentImage = contentImages[imageIndex];
                                            var isFeaturedDuplicate = imageIndex === 0
                                                && featuredImage;
                                            var currentAlt = contentImage.getAttribute('alt');
                                            var currentTitle = contentImage.getAttribute('title');
                                            var captionContainer = contentImage.closest
                                                ? contentImage.closest(
                                                    'figure, .separator, .tr-caption-container'
                                                )
                                                : null;
                                            var caption = captionContainer
                                                ? captionContainer.querySelector(
                                                    'figcaption, .tr-caption, .caption'
                                                )
                                                : null;
                                            var captionText = caption
                                                ? caption.textContent.replace(/\s+/g, ' ').trim()
                                                : '';
                                            var imageContext = captionText
                                                || (currentTitle
                                                    ? currentTitle.replace(/\s+/g, ' ').trim()
                                                    : '');
                                            var automaticAlt = articleTitleText;
                                            if (imageContext && articleTitleText
                                                && imageContext.toLowerCase()
                                                    !== articleTitleText.toLowerCase()) {
                                                automaticAlt = articleTitleText + ': '
                                                    + imageContext;
                                            }
                                            if ((!currentAlt || !currentAlt.trim())
                                                && automaticAlt) {
                                                contentImage.setAttribute('alt', automaticAlt);
                                            }
                                            if ((!currentTitle || !currentTitle.trim())
                                                && articleTitleText) {
                                                contentImage.setAttribute(
                                                    'title',
                                                    articleTitleText + ' | Liputan Kabar Kota'
                                                );
                                            }
                                            if (isFeaturedDuplicate) {
                                                var featuredAlt = currentAlt && currentAlt.trim()
                                                    ? currentAlt
                                                    : automaticAlt;
                                                if (featuredAlt) {
                                                    featuredImage.setAttribute('alt', featuredAlt);
                                                }
                                                if (currentTitle && currentTitle.trim()) {
                                                    featuredImage.setAttribute(
                                                        'title',
                                                        currentTitle
                                                    );
                                                }
                                                if (caption && captionText) {
                                                    featuredImage.parentNode.appendChild(caption);
                                                }

                                                var imageLink = contentImage.closest
                                                    ? contentImage.closest('a')
                                                    : null;
                                                if (imageLink
                                                    && imageLink.querySelectorAll('img').length
                                                        === 1) {
                                                    imageLink.parentNode.removeChild(imageLink);
                                                } else if (contentImage.parentNode) {
                                                    contentImage.parentNode.removeChild(
                                                        contentImage
                                                    );
                                                }

                                                if (captionContainer
                                                    && !captionContainer.querySelector('img')
                                                    && !captionContainer.querySelector(
                                                        'figcaption, .tr-caption, .caption'
                                                    )
                                                    && !captionContainer.textContent.trim()
                                                    && !captionContainer.children.length
                                                    && captionContainer.parentNode) {
                                                    captionContainer.parentNode.removeChild(
                                                        captionContainer
                                                    );
                                                }
                                            }
                                            if (!contentImage.getAttribute('loading')) {
                                                contentImage.setAttribute(
                                                    'loading',
                                                    imageIndex === 0 && !isFeaturedDuplicate
                                                        ? 'eager'
                                                        : 'lazy'
                                                );
                                            }
                                            if (imageIndex === 0
                                                && !isFeaturedDuplicate
                                                && !contentImage.getAttribute('fetchpriority')) {
                                                contentImage.setAttribute('fetchpriority', 'high');
                                            }
                                            contentImage.decoding = 'async';
                                        }
                                    }());

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