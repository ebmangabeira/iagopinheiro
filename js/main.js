"use strict";
!(function (e, a, t) {
    if (t) {
        var o = t(e),
            i = t(a),
            s = t("body"),
            n = t("#ashade-header"),
            r = t("#ashade-footer"),
            d = t(".ashade-content-scroll").first(),
            l =
                e.matchMedia &&
                e.matchMedia("(prefers-reduced-motion: reduce)").matches,
            c =
                !l &&
                (!e.matchMedia || e.matchMedia("(pointer: fine)").matches),
            h = l ? 0 : 0.55,
            u = 0,
            m = 0,
            p = t(),
            g = null,
            f = e.ashade || {},
            v = {
                oldScrollTop: e.pageYOffset || 0,
                activeHomeSection: "",
                isNavigating: !1,
                mobileMenu: null,
                mobileMenuButton: null,
                mobileMenuClose: null,
            },
            b = {
                $el: t(".ashade-cursor"),
                targetX: o.width() / 2,
                targetY: o.height() / 2,
                currentX: o.width() / 2,
                currentY: o.height() / 2,
                easing: 0.2,
                enabled: c,
                removeClasses: function (e) {
                    this.$el.removeClass(e);
                },
                bindInteraction: function (e, a, o) {
                    var s = this;
                    i.on("mouseenter.mainCursor", e, function () {
                        s.enabled && a(t(this));
                    }).on("mouseleave.mainCursor", e, function () {
                        s.enabled && "function" == typeof o && o(t(this));
                    });
                },
                animate: function () {
                    ((b.currentX += (b.targetX - b.currentX) * b.easing),
                        (b.currentY += (b.targetY - b.currentY) * b.easing),
                        b.$el.css(
                            "transform",
                            "translate3d(" +
                                b.currentX +
                                "px, " +
                                b.currentY +
                                "px, 0)",
                        ),
                        e.requestAnimationFrame(b.animate));
                },
                init: function () {
                    var a = this;
                    a.$el.length && a.enabled
                        ? (o
                              .on("mousemove.mainCursor", function (e) {
                                  ((a.targetX =
                                      e.clientX - a.$el.outerWidth() / 2),
                                      (a.targetY =
                                          e.clientY - a.$el.outerHeight() / 2));
                              })
                              .on("mouseleave.mainCursor", function () {
                                  a.$el.addClass("is-inactive");
                              })
                              .on("mouseenter.mainCursor", function () {
                                  a.$el.removeClass("is-inactive");
                              }),
                          a.bindInteraction(
                              "a",
                              function (e) {
                                  (a.removeClasses(
                                      "int-link int-lightbox int-video-lightbox int-grab-h int-grab-v int-close",
                                  ),
                                      e.hasClass("ashade-lightbox-link")
                                          ? (a.$el.addClass("int-lightbox"),
                                            e.is(
                                                "[data-video-src], [data-video-embed]",
                                            ) &&
                                                a.$el.addClass(
                                                    "int-video-lightbox",
                                                ))
                                          : a.$el.addClass("int-link"));
                              },
                              function () {
                                  a.removeClasses(
                                      "int-link int-lightbox int-video-lightbox int-grab-h int-grab-v int-close",
                                  );
                              },
                          ),
                          a.bindInteraction(
                              'button, input[type="submit"], .ashade-back, .is-link',
                              function () {
                                  a.$el.addClass("int-link");
                              },
                              function () {
                                  a.removeClasses("int-link");
                              },
                          ),
                          a.bindInteraction(
                              ".ashade-aside-overlay",
                              function () {
                                  a.$el.addClass("int-close");
                              },
                              function () {
                                  a.removeClasses("int-close");
                              },
                          ),
                          a.bindInteraction(
                              ".ashade-before-after, .pswp__scroll-wrap",
                              function () {
                                  a.$el.addClass("int-grab-h");
                              },
                              function () {
                                  a.removeClasses("int-grab-h");
                              },
                          ),
                          a.bindInteraction(
                              ".ashade-albums-carousel",
                              function (e) {
                                  a.$el.addClass(
                                      e.hasClass("is-vertical")
                                          ? "int-grab-v"
                                          : "int-grab-h",
                                  );
                              },
                              function () {
                                  a.removeClasses("int-grab-h int-grab-v");
                              },
                          ),
                          a.bindInteraction(
                              ".ashade-legal-modal__inner, .ashade-comment-modal__inner",
                              function () {
                                  a.$el.addClass("int-grab-v");
                              },
                              function () {
                                  a.removeClasses("int-grab-v");
                              },
                          ),
                          e.requestAnimationFrame(a.animate))
                        : a.$el.addClass("is-inactive");
                },
            };
        ((j.prototype.init = function () {
            var a = this;
            (a.$wrap.append(a.$before, a.$after, a.$divider),
                a.$before.css(
                    "background-image",
                    "url(" + a.$wrap.data("img-before") + ")",
                ),
                a.$after.css(
                    "background-image",
                    "url(" + a.$wrap.data("img-after") + ")",
                ),
                a.$wrap
                    .on("mousedown.mainBeforeAfter", function (e) {
                        (e.preventDefault(), (a.isDown = !0));
                    })
                    .on("mousemove.mainBeforeAfter", function (e) {
                        a.isDown &&
                            (e.preventDefault(),
                            a.updateTarget(e.pageX - a.offset));
                    })
                    .on("mouseleave.mainBeforeAfter", function () {
                        a.isDown = !1;
                    }),
                i.on("mouseup.mainBeforeAfter", function () {
                    a.isDown = !1;
                }),
                a.$wrap[0].addEventListener(
                    "touchstart",
                    function () {
                        a.isDown = !0;
                    },
                    {
                        passive: !0,
                    },
                ),
                a.$wrap[0].addEventListener(
                    "touchmove",
                    function (e) {
                        a.isDown &&
                            (e.preventDefault(),
                            a.updateTarget(e.touches[0].clientX - a.offset));
                    },
                    {
                        passive: !1,
                    },
                ),
                a.$wrap[0].addEventListener(
                    "touchend",
                    function () {
                        a.isDown = !1;
                    },
                    {
                        passive: !0,
                    },
                ),
                o.on("resize.mainBeforeAfter", function () {
                    (a.layout(), (a.current = 50), (a.target = 50));
                }),
                a.layout(),
                e.requestAnimationFrame(function () {
                    a.animate();
                }));
        }),
            (j.prototype.updateTarget = function (e) {
                var a = S(e / (this.size || 1), 0, 1);
                this.target = 100 * a;
            }),
            (j.prototype.layout = function () {
                ((this.offset = this.$wrap.offset().left),
                    (this.size = this.$wrap.outerWidth()));
            }),
            (j.prototype.animate = function () {
                ((this.current += 0.1 * (this.target - this.current)),
                    this.$after.css("width", this.current.toFixed(1) + "%"),
                    this.$divider.css("left", this.current.toFixed(1) + "%"),
                    e.requestAnimationFrame(this.animate.bind(this)));
            }));
        var w = {
                observer: null,
                init: function () {
                    var t = Array.prototype.slice.call(
                        a.querySelectorAll("img.lazy"),
                    );
                    t.length &&
                        ("IntersectionObserver" in e &&
                            (this.observer = new e.IntersectionObserver(
                                function (e) {
                                    e.forEach(function (e) {
                                        e.isIntersecting &&
                                            (w.load(e.target),
                                            w.observer.unobserve(e.target));
                                    });
                                },
                                {
                                    rootMargin: "200px 0px",
                                },
                            )),
                        t.forEach(function (e) {
                            (e.setAttribute("loading", "lazy"),
                                e.setAttribute("decoding", "async"),
                                e.dataset.src || e.dataset.srcset
                                    ? w.observer
                                        ? w.observer.observe(e)
                                        : w.load(e)
                                    : e.complete ||
                                      e.addEventListener(
                                          "load",
                                          function () {
                                              E(40);
                                          },
                                          {
                                              once: !0,
                                          },
                                      ));
                        }));
                },
                load: function (e) {
                    if (e) {
                        var a = function () {
                            (e.classList.remove("lazy"), E(40));
                        };
                        (e.addEventListener("load", a, {
                            once: !0,
                        }),
                            e.dataset.srcset &&
                                (e.setAttribute("srcset", e.dataset.srcset),
                                e.removeAttribute("data-srcset")),
                            e.dataset.src &&
                                (e.setAttribute("src", e.dataset.src),
                                e.removeAttribute("data-src")),
                            e.complete && a());
                    }
                },
            },
            y = {
                enabled: !1,
                init: function () {
                    t(".ashade-lightbox-link").length &&
                        e.PhotoSwipe &&
                        e.PhotoSwipeUI_Default &&
                        ((this.enabled = !0),
                        this.ensureTemplate(),
                        i.on(
                            "click.mainLightbox",
                            ".ashade-lightbox-link",
                            function (e) {
                                (e.preventDefault(), y.open(t(this)));
                            },
                        ),
                        i.on(
                            "click.mainLightbox",
                            ".pswp-video-wrapper, .pswp-video-wrapper video",
                            function (e) {
                                (e.preventDefault(), e.stopPropagation());
                                var a = t(this)
                                    .closest(".pswp-video-wrapper")
                                    .find("video")
                                    .get(0);
                                a && (a.paused ? y.playVideo(a) : a.pause());
                            },
                        ));
                },
                ensureTemplate: function () {
                    a.querySelector(".pswp") ||
                        s.append(
                            [
                                '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">',
                                '  <div class="pswp__bg"></div>',
                                '  <div class="pswp__scroll-wrap">',
                                '    <div class="pswp__container">',
                                '      <div class="pswp__item"></div>',
                                '      <div class="pswp__item"></div>',
                                '      <div class="pswp__item"></div>',
                                "    </div>",
                                '    <div class="pswp__ui pswp__ui--hidden">',
                                '      <div class="pswp__top-bar">',
                                '        <div class="pswp__counter"></div>',
                                '        <button class="pswp__button pswp__button--close" title="Fechar (Esc)"></button>',
                                '        <div class="pswp__preloader">',
                                '          <div class="pswp__preloader__icn">',
                                '            <div class="pswp__preloader__cut">',
                                '              <div class="pswp__preloader__donut"></div>',
                                "            </div>",
                                "          </div>",
                                "        </div>",
                                "      </div>",
                                '      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">',
                                '        <div class="pswp__share-tooltip"></div>',
                                "      </div>",
                                '      <button class="pswp__button pswp__button--arrow--left" title="Anterior (seta esquerda)"></button>',
                                '      <button class="pswp__button pswp__button--arrow--right" title="Proxima (seta direita)"></button>',
                                '      <div class="pswp__caption">',
                                '        <div class="pswp__caption__center"></div>',
                                "      </div>",
                                "    </div>",
                                "  </div>",
                                "</div>",
                            ].join(""),
                        );
                },
                getGroupName: function (e) {
                    return e.attr("data-gallery") || "default";
                },
                getGroupLinks: function (e) {
                    var t =
                        "default" === e
                            ? ".ashade-lightbox-link:not([data-gallery])"
                            : '.ashade-lightbox-link[data-gallery="' + e + '"]';
                    return Array.prototype.slice.call(a.querySelectorAll(t));
                },
                getThumbSource: function (e) {
                    return e.attr("data-src") || e.attr("src") || "";
                },
                getThumbRatio: function (e) {
                    var a = e && e.get ? e.get(0) : e,
                        t = null,
                        o = 0,
                        i = 0;
                    return a
                        ? ((t =
                              "function" == typeof a.getBoundingClientRect
                                  ? a.getBoundingClientRect()
                                  : null),
                          (o =
                              (t && t.width) ||
                              a.naturalWidth ||
                              a.width ||
                              parseInt(a.getAttribute("width"), 10) ||
                              0),
                          (i =
                              (t && t.height) ||
                              a.naturalHeight ||
                              a.height ||
                              parseInt(a.getAttribute("height"), 10) ||
                              0),
                          o && i ? o / i : 0)
                        : 0;
                },
                shouldUseSoftOpen: function (e, a, t) {
                    var o = t && t.w && t.h ? t.w / t.h : 0,
                        i = this.getThumbRatio(e);
                    return /\/capa\//i.test(a || "")
                        ? !0
                        : !!o && !!i && Math.abs(i - o) > 0.12;
                },
                getThumbBounds: function (t) {
                    var o = t && t.get ? t.get(0) : t,
                        i = null,
                        s = e.pageYOffset || a.documentElement.scrollTop;
                    return o && "function" == typeof o.getBoundingClientRect
                        ? ((i = o.getBoundingClientRect()),
                          i.width && i.height
                              ? {
                                    x: i.left,
                                    y: i.top + s,
                                    w: i.width,
                                }
                              : void 0)
                        : void 0;
                },
                syncLightboxMode: function (e) {
                    var a = t(e && e.template),
                        o = !!(e && e.currItem && e.currItem.useSoftOpen);
                    a.length &&
                        a.toggleClass(
                            "pswp--ashade-lightbox--soft-open",
                            o,
                        );
                },
                createVideoItem: function (e, a) {
                    var t = e.find("img:first"),
                        o = (e.attr("data-video-size") || "").split("x"),
                        i =
                            parseInt(o[0], 10) ||
                            parseInt(a.w, 10) ||
                            parseInt(t.attr("width"), 10) ||
                            1280,
                        s =
                            parseInt(o[1], 10) ||
                            parseInt(a.h, 10) ||
                            parseInt(t.attr("height"), 10) ||
                            720,
                        n =
                            e.attr("data-video-poster") ||
                            this.getThumbSource(t),
                        r = e.attr("data-video-embed"),
                        d =
                            e.attr("data-caption") ||
                            t.attr("alt") ||
                            "Video da galeria",
                        l = (i / s).toFixed(6);
                    return {
                        html: [
                            '<div class="pswp-video-wrapper"><div class="pswp-video-frame" style="width:min(' +
                                i +
                                "px, calc(100vw - 24px), calc((100vh - 24px) * " +
                                l +
                                "));aspect-ratio:" +
                                i +
                                " / " +
                                s +
                                ';">',
                            r
                                ? '  <iframe src="' +
                                  T(r) +
                                  '" width="' +
                                  i +
                                  '" height="' +
                                  s +
                                  '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" title="' +
                                  T(d) +
                                  '"></iframe>'
                                : '  <video controls playsinline preload="metadata" aria-label="' +
                                  T(d) +
                                  '"' +
                                  (n ? ' poster="' + T(n) + '"' : "") +
                                  ">" +
                                  '    <source src="' +
                                  T(e.attr("data-video-src")) +
                                  '">' +
                                  "  </video>",
                            "</div></div>",
                        ].join(""),
                        msrc: r ? "" : n,
                        w: i,
                        h: s,
                        title: e.attr("data-caption") || "",
                    };
                },
                buildItem: function (e) {
                    var a = t(e),
                        o = a.find("img:first"),
                        i = {},
                        s = (a.attr("data-size") || "").split("x"),
                        n = this.getThumbSource(o);
                    return (
                        2 === s.length &&
                            ((i.w = parseInt(s[0], 10) || 0),
                            (i.h = parseInt(s[1], 10) || 0)),
                        a.attr("data-video-src") || a.attr("data-video-embed")
                            ? this.createVideoItem(a, i)
                            : ((i.src = a.attr("href")),
                              (i.thumbEl = o.get(0) || a.get(0)),
                              (i.useSoftOpen = this.shouldUseSoftOpen(
                                  o,
                                  n,
                                  i,
                              )),
                              (i.msrc = i.useSoftOpen ? "" : n || i.src),
                              (i.title = a.attr("data-caption") || ""),
                              i)
                    );
                },
                pauseVideos: function () {
                    t(".pswp video").each(function () {
                        try {
                            (this.pause(), (this.currentTime = 0));
                        } catch (e) {
                            return;
                        }
                    });
                },
                playVideo: function (e) {
                    var a;
                    e &&
                        (a = e.play()) &&
                        "function" == typeof a.catch &&
                        a.catch(function () {});
                },
                playCurrentVideo: function (e) {
                    var a;
                    e &&
                        e.currItem &&
                        e.currItem.container &&
                        (a = t(e.currItem.container).find("video").get(0)) &&
                        y.playVideo(a);
                },
                open: function (t) {
                    var o = this.getGroupName(t),
                        i = this.getGroupLinks(o),
                        s = i.map(this.buildItem.bind(this)),
                        n = i.indexOf(t.get(0)),
                        r = Math.max(0, n),
                        l = s[r] || {},
                        c = l.thumbEl || t.find("img").get(0) || t.get(0),
                        d = new e.PhotoSwipe(
                            a.querySelector(".pswp"),
                            e.PhotoSwipeUI_Default,
                            s,
                            {
                                index: r,
                                bgOpacity: 0.85,
                                showHideOpacity: !0,
                                mainClass:
                                    "pswp--ashade-lightbox" +
                                    (l.useSoftOpen
                                        ? " pswp--ashade-lightbox--soft-open"
                                        : ""),
                                showAnimationDuration: l.useSoftOpen
                                    ? 420
                                    : 333,
                                hideAnimationDuration: l.useSoftOpen
                                    ? 420
                                    : 333,
                                getThumbBoundsFn: function (e) {
                                    var a = s[e] || {},
                                        t = a.thumbEl || c;
                                    return a.useSoftOpen
                                        ? void 0
                                        : y.getThumbBounds(t);
                                },
                            },
                        );
                    (d.listen("afterChange", function () {
                        (y.syncLightboxMode(d), y.playCurrentVideo(d));
                    }),
                        d.listen("beforeChange", y.pauseVideos),
                        d.listen("close", y.pauseVideos),
                        d.listen("destroy", y.pauseVideos),
                        d.init());
                },
            },
            C = {
                content: {
                    terms: {
                        eyebrow: "Resumo essencial",
                        title: "Termos de Uso",
                        intro: [
                            "Este portf&oacute;lio apresenta ensaios, servi&ccedil;os e canais de contato de forma informativa e comercial.",
                            "Ao navegar pelo site, o visitante utiliza esse conte&uacute;do para conhecer o trabalho, solicitar atendimento e acompanhar atualiza&ccedil;&otilde;es do est&uacute;dio.",
                        ],
                        widgets: [
                            {
                                eyebrow: "Uso permitido",
                                title: "Navegação",
                                content:
                                    "<p>O acesso ao portf&oacute;lio deve ocorrer para consulta de galerias, leitura de informa&ccedil;&otilde;es e envio de mensagens com dados pr&oacute;prios, corretos e leg&iacute;timos.</p>",
                            },
                            {
                                eyebrow: "Conteúdo autoral",
                                title: "Fotos e identidade",
                                content:
                                    "<p>Imagens, v&iacute;deos, textos, marcas e demais elementos visuais permanecem protegidos. C&oacute;pia, republica&ccedil;&atilde;o, distribui&ccedil;&atilde;o ou uso comercial dependem de autoriza&ccedil;&atilde;o pr&eacute;via.</p>",
                            },
                            {
                                eyebrow: "Atendimento",
                                title: "Solicitações",
                                content:
                                    "<p>O envio do formul&aacute;rio ou de contatos pelo site n&atilde;o confirma agenda, contrato ou reserva autom&aacute;tica. Links externos e perfis sociais seguem pol&iacute;ticas pr&oacute;prias.</p>",
                            },
                        ],
                        note: "Versão resumida para apoio ao uso do site. O texto pode ser atualizado quando novas funcionalidades forem ativadas.",
                    },
                    privacy: {
                        eyebrow: "Resumo LGPD",
                        title: "Política de Privacidade",
                        intro: [
                            "Este aviso resumido explica como o portf&oacute;lio pode tratar dados de contato e dados de navega&ccedil;&atilde;o.",
                            "Ele j&aacute; considera o formul&aacute;rio atual do site e o uso futuro de Google Analytics e Meta Pixel.",
                        ],
                        widgets: [
                            {
                                eyebrow: "Dados coletados",
                                title: "Contato e navegação",
                                content:
                                    "<p>Podem ser tratados nome, e-mail, telefone e mensagem enviados voluntariamente pelo formul&aacute;rio.</p><p>Quando ferramentas de medi&ccedil;&atilde;o forem ativadas, o site tamb&eacute;m pode tratar IP, navegador, dispositivo, p&aacute;ginas visitadas e intera&ccedil;&otilde;es de navega&ccedil;&atilde;o.</p>",
                            },
                            {
                                eyebrow: "Finalidades",
                                title: "Atendimento e análise",
                                content:
                                    "<p>Os dados s&atilde;o usados para responder pedidos de contato, organizar atendimento comercial, medir acessos ao site e entender o desempenho de p&aacute;ginas e campanhas.</p>",
                            },
                            {
                                eyebrow: "Ferramentas terceiras",
                                title: "Google e Meta",
                                content:
                                    "<p>Com Google Analytics e Meta Pixel ativos, parte dos dados t&eacute;cnicos de navega&ccedil;&atilde;o pode ser tratada por Google e Meta para an&aacute;lise, mensura&ccedil;&atilde;o e publicidade, conforme a configura&ccedil;&atilde;o adotada no projeto.</p>",
                            },
                            {
                                eyebrow: "Cookies e direitos",
                                title: "Consentimento",
                                content:
                                    "<p>Cookies n&atilde;o essenciais devem depender de consentimento quando o banner de prefer&ecirc;ncias for implementado. O visitante pode solicitar informa&ccedil;&otilde;es, corre&ccedil;&atilde;o, exclus&atilde;o ou revoga&ccedil;&atilde;o de consentimento pelos canais de contato exibidos no portf&oacute;lio.</p>",
                            },
                        ],
                        note: "Quando Google Analytics e Meta Pixel forem publicados, revise este resumo para refletir a operação real do site e o banner de cookies.",
                    },
                },
                $modal: t(),
                lastFocusedElement: null,
                init: function () {
                    (this.ensureModal(),
                        i.on(
                            "click.mainLegal",
                            "[data-legal-open]",
                            function (e) {
                                (e.preventDefault(),
                                    C.open(t(this).data("legalOpen")));
                            },
                        ),
                        i.on(
                            "click.mainLegal",
                            "[data-legal-close]",
                            function (e) {
                                (e.preventDefault(), C.close());
                            },
                        ));
                },
                ensureModal: function () {
                    t("#ashade-legal-modal").length
                        ? (this.$modal = t("#ashade-legal-modal"))
                        : ((this.$modal = t(
                              [
                                  '<div id="ashade-legal-modal" class="ashade-legal-modal" aria-hidden="true">',
                                  '  <div class="ashade-legal-modal__overlay" data-legal-close></div>',
                                  '  <div class="ashade-legal-modal__panel">',
                                  '    <a href="#" class="ashade-aside-close ashade-legal-modal__close" data-legal-close>Fechar aviso</a>',
                                  '    <div class="ashade-legal-modal__inner">',
                                  '      <div class="ashade-aside-content">',
                                  '        <div class="ashade-widget ashade-legal-modal__intro">',
                                  '          <h5 class="ashade-widget-title" id="ashade-legal-modal-title"></h5>',
                                  '          <div class="ashade-legal-modal__intro-copy"></div>',
                                  "        </div>",
                                  '        <div class="ashade-legal-modal__content"></div>',
                                  '        <div class="ashade-widget ashade-legal-modal__actions">',
                                  '          <p class="ashade-legal-modal__note"></p>',
                                  '          <p class="align-right"><a href="#" class="ashade-learn-more" data-legal-close>Fechar aviso</a></p>',
                                  "        </div>",
                                  "      </div>",
                                  "    </div>",
                                  "  </div>",
                                  "</div>",
                              ].join(""),
                          )),
                          s.append(this.$modal));
                },
                buildIntro: function (e) {
                    return e
                        .map(function (e) {
                            return "<p>" + e + "</p>";
                        })
                        .join("");
                },
                buildWidget: function (e) {
                    return [
                        '<div class="ashade-widget ashade-legal-modal__widget">',
                        "  <h6><span>" +
                            e.eyebrow +
                            "</span>" +
                            e.title +
                            "</h6>",
                        e.content,
                        "</div>",
                    ].join("");
                },
                open: function (e) {
                    var t = this.content[e];
                    t &&
                        ((this.lastFocusedElement = a.activeElement),
                        this.$modal
                            .find("#ashade-legal-modal-title")
                            .html("<span>" + t.eyebrow + "</span>" + t.title),
                        this.$modal
                            .find(".ashade-legal-modal__intro-copy")
                            .html(this.buildIntro(t.intro)),
                        this.$modal
                            .find(".ashade-legal-modal__content")
                            .html(t.widgets.map(this.buildWidget).join("")),
                        this.$modal
                            .find(".ashade-legal-modal__note")
                            .text(t.note),
                        this.$modal
                            .addClass("is-active")
                            .attr("aria-hidden", "false"),
                        s.addClass("ashade-legal-open"),
                        this.$modal
                            .find(".ashade-legal-modal__close")
                            .trigger("focus"));
                },
                close: function () {
                    this.$modal.length &&
                        this.$modal.hasClass("is-active") &&
                        (this.$modal
                            .removeClass("is-active")
                            .attr("aria-hidden", "true"),
                        s.removeClass("ashade-legal-open"),
                        this.lastFocusedElement &&
                            "function" ==
                                typeof this.lastFocusedElement.focus &&
                            this.lastFocusedElement.focus());
                },
            },
            _ = {
                content: {
                    planejamento: {
                        eyebrow: "Comentários do blog",
                        title: "Planejamento",
                        intro: [
                            "Abra este espaço para comentar sobre organização, referências e tudo o que ajuda a chegar ao ensaio com mais clareza.",
                        ],
                        description:
                            "Tema ideal para quem ainda está alinhando objetivo, disponibilidade e direção visual antes de marcar a sessão.",
                        focus: [
                            "Objetivo do ensaio",
                            "Referências visuais",
                            "Organização da agenda",
                        ],
                        placeholder:
                            "Escreva aqui o que você quer comentar sobre planejamento, referências ou preparação do ensaio.",
                        preview: [
                            {
                                author: "Mariana",
                                meta: "Dúvida - hoje",
                                message:
                                    "Estou montando minhas referências antes do primeiro contato e esse tipo de espaço ajuda muito a visualizar como a conversa pode fluir.",
                            },
                            {
                                author: "Felipe",
                                meta: "Experiência - ontem",
                                message:
                                    "Quando cheguei com objetivo e clima mais claros, o atendimento ficou muito mais objetivo. Gostei de ver isso refletido no layout.",
                            },
                        ],
                    },
                    look: {
                        eyebrow: "Comentários do blog",
                        title: "Look e estilo",
                        intro: [
                            "Aqui o visitante pode comentar sobre roupas, combinações e detalhes de produção que influenciam diretamente a leitura visual do ensaio.",
                        ],
                        description:
                            "Tema pensado para dúvidas sobre cores, trocas extras, caimento e escolhas que deixam o resultado mais elegante e coerente.",
                        focus: [
                            "Roupas e caimento",
                            "Cores e combinações",
                            "Troca extra",
                        ],
                        placeholder:
                            "Escreva aqui sua dúvida ou opinião sobre roupas, estilo, cores e combinações para o ensaio.",
                        preview: [
                            {
                                author: "Camila",
                                meta: "Dúvida - hoje",
                                message:
                                    "Queria saber se vale levar uma terceira troca quando o ensaio é mais curto. O modal deixa essa conversa mais natural.",
                            },
                            {
                                author: "Rafaela",
                                meta: "Sugestão - ontem",
                                message:
                                    "Seria interessante ter exemplos de paleta aqui. Mesmo assim, o layout já mostra bem como essa interação pode acontecer.",
                            },
                        ],
                    },
                    direcao: {
                        eyebrow: "Comentários do blog",
                        title: "Direção leve",
                        intro: [
                            "Este espaço foi pensado para quem quer falar sobre naturalidade, ritmo da sessão e segurança na frente da câmera.",
                        ],
                        description:
                            "Tema voltado para perguntas sobre poses, condução acolhedora, movimentação durante o ensaio e receios comuns de quem ainda não tem costume com câmera.",
                        focus: [
                            "Poses naturais",
                            "Ritmo da sessão",
                            "Segurança na câmera",
                        ],
                        placeholder:
                            "Escreva aqui sua dúvida ou comentário sobre direção leve, poses e naturalidade durante o ensaio.",
                        preview: [
                            {
                                author: "Laura",
                                meta: "Dúvida - hoje",
                                message:
                                    "Tenho receio de travar na frente da câmera. Gostei porque o modal ficou contextualizado com o tema e com o visual do site.",
                            },
                            {
                                author: "Bruno",
                                meta: "Experiência - ontem",
                                message:
                                    "Quando a direção é leve, a conversa ajuda muito mais do que pose pronta. Esse espaço ficou bom para comentar esse tipo de percepção.",
                            },
                        ],
                    },
                    entrega: {
                        eyebrow: "Comentários do blog",
                        title: "Uso das fotos",
                        intro: [
                            "Use este espaço para comentar sobre seleção, aplicação das imagens e aproveitamento da galeria depois da entrega.",
                        ],
                        description:
                            "Tema focado em dúvidas sobre galeria final, seleção de imagens, uso profissional e continuidade visual após o ensaio.",
                        focus: [
                            "Seleção final",
                            "Redes sociais",
                            "Uso profissional",
                        ],
                        placeholder:
                            "Escreva aqui sua mensagem sobre seleção final, uso das fotos e aproveitamento da galeria entregue.",
                        preview: [
                            {
                                author: "Renato",
                                meta: "Sugestão - hoje",
                                message:
                                    "Seria ótimo ver mais conversas sobre como escolher as imagens principais depois da entrega. O modal já mostra bem esse cenário.",
                            },
                            {
                                author: "Juliana",
                                meta: "Experiência - ontem",
                                message:
                                    "Eu usaria um espaço assim para perguntar como separar fotos para rede social e material profissional. Ficou com cara de recurso real do site.",
                            },
                        ],
                    },
                },
                $modal: t("#ashade-comment-modal"),
                lastFocusedElement: null,
                init: function () {
                    this.$modal.length &&
                        (i.on(
                            "click.mainCommentModal",
                            "[data-comment-open]",
                            function (e) {
                                (e.preventDefault(),
                                    _.open(t(this).data("commentOpen")));
                            },
                        ),
                        i.on(
                            "click.mainCommentModal",
                            "[data-comment-close]",
                            function (e) {
                                (e.preventDefault(), _.close());
                            },
                        ),
                        this.$modal
                            .find("#ashade-comment-modal-form")
                            .on("submit", function (e) {
                                (e.preventDefault(),
                                    _.$modal
                                        .find("#ashade-comment-modal-response")
                                        .addClass("is-success")
                                        .text(
                                            "Layout pronto para o backend: aqui o comentário poderá ser enviado e listado quando você conectar o servidor.",
                                        ));
                            }));
                },
                buildFocusTags: function (e) {
                    return e
                        .map(function (e) {
                            return (
                                '<span class="ashade-comment-modal__tag">' +
                                T(e) +
                                "</span>"
                            );
                        })
                        .join("");
                },
                buildPreview: function (e) {
                    return e
                        .map(function (e) {
                            return [
                                '<div class="ashade-comment-modal__preview-item">',
                                '  <div class="ashade-comment-modal__preview-avatar" aria-hidden="true">' +
                                    T(
                                        e.author
                                            ? e.author.charAt(0).toUpperCase()
                                            : "?",
                                    ) +
                                    "</div>",
                                '  <div class="ashade-comment-modal__preview-body">',
                                '    <div class="ashade-comment-modal__preview-head">',
                                '      <span class="ashade-comment-modal__preview-author">' +
                                    T(e.author) +
                                    "</span>",
                                '      <span class="ashade-comment-modal__preview-meta">' +
                                    T(e.meta) +
                                    "</span>",
                                "    </div>",
                                "    <p>" + T(e.message) + "</p>",
                                "  </div>",
                                "</div>",
                            ].join("");
                        })
                        .join("");
                },
                open: function (e) {
                    var t = this.content[e] || this.content.planejamento;
                    this.$modal.length &&
                        ((this.lastFocusedElement = a.activeElement),
                        this.$modal
                            .find("#ashade-comment-modal-title")
                            .html("<span>" + t.eyebrow + "</span>" + t.title),
                        this.$modal.find("#ashade-comment-modal-intro").html(
                            t.intro
                                .map(function (e) {
                                    return "<p>" + T(e) + "</p>";
                                })
                                .join(""),
                        ),
                        this.$modal
                            .find("#ashade-comment-modal-theme")
                            .text(t.title),
                        this.$modal
                            .find("#ashade-comment-modal-description")
                            .text(t.description),
                        this.$modal
                            .find("#ashade-comment-modal-focus-list")
                            .html(this.buildFocusTags(t.focus)),
                        this.$modal
                            .find("#ashade-comment-modal-topic-input")
                            .val(t.title),
                        this.$modal
                            .find("#ashade-comment-modal-topic-display")
                            .text(t.title),
                        this.$modal
                            .find("#ashade-comment-modal-message")
                            .attr("placeholder", t.placeholder)
                            .val(""),
                        this.$modal
                            .find("#ashade-comment-modal-response")
                            .removeClass("is-success")
                            .text(""),
                        this.$modal
                            .find("#ashade-comment-modal-preview")
                            .html(this.buildPreview(t.preview)),
                        this.$modal
                            .addClass("is-active")
                            .attr("aria-hidden", "false"),
                        s.addClass("ashade-comment-open"),
                        this.$modal
                            .find("#ashade-comment-modal-name")
                            .trigger("focus"));
                },
                close: function () {
                    this.$modal.length &&
                        this.$modal.hasClass("is-active") &&
                        (this.$modal
                            .removeClass("is-active")
                            .attr("aria-hidden", "true"),
                        s.removeClass("ashade-comment-open"),
                        this.lastFocusedElement &&
                            "function" ==
                                typeof this.lastFocusedElement.focus &&
                            this.lastFocusedElement.focus());
                },
            },
            k = {
                init: function () {
                    t("form.ashade-contact-form[action]").each(function () {
                        k.enhance(t(this));
                    });
                },
                enhance: function (a) {
                    var t = a.find(".ashade-contact-form__response"),
                        o = a
                            .find('input[type="submit"], button[type="submit"]')
                            .first();
                    a.on("submit.mainContact", function (i) {
                        var s = a.get(0),
                            n = a.attr("action"),
                            r = (a.attr("method") || "POST").toUpperCase();
                        n &&
                            (i.preventDefault(),
                            ("function" != typeof s.reportValidity ||
                                s.reportValidity()) &&
                                (a.addClass("is-in-action"),
                                o.prop("disabled", !0),
                                q(t, "Enviando mensagem...", ""),
                                e
                                    .fetch(n, {
                                        method: r,
                                        body: new e.FormData(s),
                                    })
                                    .then(function (e) {
                                        return e.text().then(function (a) {
                                            if (!e.ok)
                                                throw new Error(
                                                    a ||
                                                        "Não foi possível enviar a mensagem agora.",
                                                );
                                            return (
                                                a ||
                                                "Mensagem enviada com sucesso."
                                            );
                                        });
                                    })
                                    .then(function (e) {
                                        (s.reset(), q(t, e, "success"), E(40));
                                    })
                                    .catch(function (e) {
                                        (q(
                                            t,
                                            e.message ||
                                                "Não foi possível enviar a mensagem agora.",
                                            "error",
                                        ),
                                            E(40));
                                    })
                                    .finally(function () {
                                        (a.removeClass("is-in-action"),
                                            o.prop("disabled", !1));
                                    })));
                    });
                },
            },
            $ = {
                init: function () {
                    t.fn.masonry &&
                        t(".is-masonry").length &&
                        t(".is-masonry").each(function () {
                            t(this).masonry();
                        });
                },
                layout: function () {
                    t.fn.masonry &&
                        t(".is-masonry").length &&
                        t(".is-masonry").each(function () {
                            t(this).masonry("layout");
                        });
                },
            };
        ((F.prototype.init = function () {
            var e = this;
            (e.$el.on("mouseenter.mainRibbon", function () {
                c && e.$el.addClass("is-hovered");
            }),
                e.$el.on("mouseleave.mainRibbon", function () {
                    (e.$el.removeClass("is-hovered"),
                        (e.pointerDown = !1),
                        (e.dragging = !1),
                        e.$el.removeClass("is-grabbed"));
                }),
                e.$el.on("mousedown.mainRibbon", function (a) {
                    e.handleStart(a.clientX, !!t(a.target).closest("a").length);
                }),
                i.on("mousemove.mainRibbon", function (a) {
                    e.handleMove(a.clientX);
                }),
                i.on("mouseup.mainRibbon", function () {
                    e.handleEnd();
                }),
                e.$el[0].addEventListener(
                    "touchstart",
                    function (a) {
                        a.touches.length &&
                            e.handleStart(
                                a.touches[0].clientX,
                                !!a.target.closest("a"),
                            );
                    },
                    {
                        passive: !0,
                    },
                ),
                e.$el[0].addEventListener(
                    "touchmove",
                    function (a) {
                        a.touches.length &&
                            (e.handleMove(a.touches[0].clientX),
                            e.dragging && a.preventDefault());
                    },
                    {
                        passive: !1,
                    },
                ),
                e.$el[0].addEventListener(
                    "touchend",
                    function () {
                        e.handleEnd();
                    },
                    {
                        passive: !0,
                    },
                ),
                e.$el.on("wheel.mainRibbon", function (a) {
                    (a.preventDefault(),
                        e.goToStep(e.target + a.originalEvent.deltaY));
                }),
                e.$el.on("click.mainRibbon", "a", function (a) {
                    e.linkMoved && (a.preventDefault(), (e.linkMoved = !1));
                }),
                e.$prev.on("click.mainRibbon", function (a) {
                    (a.preventDefault(), e.goToPrev());
                }),
                e.$next.on("click.mainRibbon", function (a) {
                    (a.preventDefault(), e.goToNext());
                }),
                e.layout(),
                e.animate());
        }),
            (F.prototype.handleStart = function (e, a) {
                ((this.pointerDown = !0),
                    (this.dragging = !1),
                    (this.linkMoved = !1),
                    (this.linkTarget = a),
                    (this.startPointer = e),
                    (this.startStep = this.currentStep),
                    this.$el.addClass("is-grabbed"));
            }),
            (F.prototype.handleMove = function (e) {
                var a;
                this.pointerDown &&
                    ((a = 1.8 * (this.startPointer - e)),
                    Math.abs(a) > 4 &&
                        ((this.dragging = !0),
                        (this.linkMoved = this.linkTarget)),
                    this.goToStep(this.startStep + a));
            }),
            (F.prototype.handleEnd = function () {
                ((this.pointerDown = !1),
                    (this.dragging = !1),
                    this.$el.removeClass("is-grabbed"));
            }),
            (F.prototype.updateSlidePositions = function (e) {
                var a = [0],
                    o = this;
                (o.$items.each(function () {
                    var i = Math.round(t(this).position().left - e);
                    i > 0 && i < o.maxStep && a.push(i);
                }),
                    a.push(o.maxStep),
                    (o.slidePositions = Array.from(new Set(a)).sort(
                        function (e, a) {
                            return e - a;
                        },
                    )));
            }),
            (F.prototype.updateControls = function () {
                var e = this.currentStep <= 1,
                    a = this.currentStep >= this.maxStep - 1;
                (this.$prev.toggleClass("is-disabled", e),
                    this.$next.toggleClass("is-disabled", a));
            }),
            (F.prototype.applyTargetChange = function () {
                var e =
                    this.maxStep > 0
                        ? Math.ceil((100 * this.currentStep) / this.maxStep)
                        : 0;
                ((this.barTarget = this.$bar.width() * (e / 100)),
                    this.updateControls(),
                    this.currentStep > o.width() / 2
                        ? s.addClass("has-to-top")
                        : s.removeClass("has-to-top"));
            }),
            (F.prototype.goToStep = function (e) {
                ((this.currentStep = S(e, 0, this.maxStep)),
                    (this.target = this.currentStep),
                    this.applyTargetChange());
            }),
            (F.prototype.goToPrev = function () {
                var e = this.currentStep,
                    a = 0;
                (this.slidePositions.forEach(function (t) {
                    t < e - 1 && t >= a && (a = t);
                }),
                    this.goToStep(a));
            }),
            (F.prototype.goToNext = function () {
                var e = this.currentStep,
                    a = this.maxStep;
                (this.slidePositions.forEach(function (t) {
                    t > e + 1 && t <= a && (a = t);
                }),
                    this.goToStep(a));
            }),
            (F.prototype.layout = function () {
                var e = Math.round(o.height() / 2),
                    a = 0,
                    i =
                        parseInt(
                            this.$el
                                .find(".ashade-album-item__inner")
                                .first()
                                .css("margin-right"),
                            10,
                        ) || 0;
                (s.height(o.height()),
                    this.$el.height(e),
                    this.$items.each(function () {
                        var o = t(this),
                            i = o.find("img, video").first(),
                            s = parseInt(i.attr("width"), 10),
                            n = parseInt(i.attr("height"), 10);
                        (o.height(e),
                            s &&
                                n &&
                                i.height(e).width(Math.round(e * (s / n))),
                            (a += o.width()));
                    }),
                    this.$el.css("padding-left", i + "px").width(a),
                    (this.maxStep = Math.max(0, a - o.width() + i)),
                    (this.currentStep = S(this.currentStep, 0, this.maxStep)),
                    (this.target = S(this.target, 0, this.maxStep)),
                    this.updateSlidePositions(i),
                    this.applyTargetChange());
            }),
            (F.prototype.animate = function () {
                var a,
                    t = this;
                ((t.current += 0.1 * (t.target - t.current)),
                    (t.barCurrent += 0.1 * (t.barTarget - t.barCurrent)),
                    (a = 0.1 * (t.target - t.current)),
                    t.$el.css(
                        "transform",
                        "translate3d(-" + t.current + "px, 0, 0)",
                    ),
                    t.$media.css("transform", "translate3d(" + a + "px, 0, 0)"),
                    t.$progress.width(t.barCurrent),
                    e.requestAnimationFrame(function () {
                        t.animate();
                    }));
            }));
        var x = {
            target: 0,
            current: 0,
            init: function () {
                (d.length || s.hasClass("ashade-home-template")) &&
                    e.requestAnimationFrame(this.animate.bind(this));
            },
            animate: function () {
                (M(),
                    d.length &&
                        ((this.current += 0.1 * (this.target - this.current)),
                        d.css(
                            "transform",
                            "translate3d(0, -" + this.current + "px, 0)",
                        ),
                        s.hasClass("ashade-smooth-scroll") &&
                            Math.abs(s.height() - d.outerHeight()) > 1 &&
                            this.layout()),
                    e.requestAnimationFrame(this.animate.bind(this)));
            },
            layout: function () {
                var e, a;
                (M(),
                    d.length
                        ? ((a = d.children(".ashade-content")).css(
                              "min-height",
                              "0px",
                          ),
                          d.outerHeight() <= o.height()
                              ? ((e = o.height() - (r.outerHeight() || 0)),
                                s.hasClass("no-header-padding") ||
                                    (e -= p.outerHeight() || 0),
                                a.css("min-height", Math.max(0, e) + "px"),
                                d.addClass("is-centered"))
                              : d.removeClass("is-centered"),
                          s.hasClass("ashade-smooth-scroll") &&
                              s.height(d.outerHeight()))
                        : s.hasClass("ashade-home-template") &&
                          s.height(o.height()));
            },
        };
        ((f.change_location = X),
            (f.content_loaded = L),
            (e.ashade = f),
            t(function () {
                var a, i, r, d;
                (s.addClass("is-init"),
                    (v.oldScrollTop = o.scrollTop()),
                    z(),
                    (a = e.location.pathname.split("/").pop().toLowerCase()),
                    (i =
                        {
                            "": "index.html",
                            "formatura.html": "ensaios.html",
                        }[a] ||
                        a ||
                        "index.html"),
                    (r = n.find("nav.ashade-nav ul.main-menu > li")),
                    (d = r.children("a").not(".ashade-aside-toggler")),
                    r.removeClass(
                        "current-menu-item current-menu-parent current-menu-ancestor",
                    ),
                    d.removeAttr("aria-current"),
                    d.each(function () {
                        var e = t(this);
                        if (
                            (
                                (e.attr("href") || "").split("#")[0] || ""
                            ).toLowerCase() === i
                        )
                            return (
                                e
                                    .attr("aria-current", "page")
                                    .parent("li")
                                    .addClass("current-menu-item"),
                                !1
                            );
                    }),
                    n.find(".current-menu-item").each(function () {
                        t(this).parents("li").addClass("current-menu-ancestor");
                    }),
                    D(),
                    k.init(),
                    $.init(),
                    b.init(),
                    C.init(),
                    _.init(),
                    y.init(),
                    w.init(),
                    B(),
                    t(".ashade-before-after").length &&
                        t(".ashade-before-after").each(function () {
                            new j(this);
                        }),
                    t(".ashade-albums-carousel.is-medium").length &&
                        ((g = new F(
                            t(".ashade-albums-carousel.is-medium").first(),
                        )),
                        (e.ashade_ribbon = g)),
                    I(),
                    x.init(),
                    L(),
                    l
                        ? P()
                        : (t(".ashade-page-title-wrap:not(.is-inactive)")
                              .length &&
                              gsap.to(
                                  ".ashade-page-title-wrap:not(.is-inactive)",
                                  {
                                      top: "100%",
                                      duration: 0.45,
                                      onComplete: function () {
                                          t(
                                              ".ashade-page-title-wrap:not(.is-inactive)",
                                          ).addClass("is-loaded");
                                      },
                                  },
                              ),
                          t(".ashade-back-wrap:not(.is-inactive)").length &&
                              gsap.to(".ashade-back-wrap:not(.is-inactive)", {
                                  top: "100%",
                                  duration: 0.45,
                                  onComplete: function () {
                                      t(
                                          ".ashade-back-wrap:not(.is-inactive)",
                                      ).addClass("is-loaded");
                                  },
                              }),
                          s.hasClass("ashade-home-template") &&
                              (gsap.to(
                                  ".ashade-home-link--works:not(.is-inactive)",
                                  {
                                      top: "100%",
                                      duration: 0.45,
                                      onComplete: function () {
                                          t(
                                              ".ashade-home-link--works:not(.is-inactive)",
                                          ).addClass("is-loaded");
                                      },
                                  },
                              ),
                              gsap.to(
                                  ".ashade-home-link--contacts:not(.is-inactive)",
                                  {
                                      top: "100%",
                                      duration: 0.45,
                                      onComplete: function () {
                                          t(
                                              ".ashade-home-link--contacts:not(.is-inactive)",
                                          ).addClass("is-loaded");
                                      },
                                  },
                              )),
                          gsap.from(".ashade-logo", {
                              x: "-50%",
                              opacity: 0,
                              duration: 0.45,
                              delay: o.width() < 760 ? 0.05 : h,
                          }),
                          gsap.from(".ashade-mobile-header > a", {
                              x: 10,
                              y: -10,
                              opacity: 0,
                              duration: 0.2,
                              delay: 0.05,
                              stagger: 0.08,
                          }),
                          gsap.from(".ashade-nav ul.main-menu > li", {
                              x: -10,
                              y: -10,
                              opacity: 0,
                              duration: 0.2,
                              delay: h,
                              stagger: 0.08,
                          }),
                          t(".ashade-footer__socials").length &&
                              gsap.from(
                                  ".ashade-footer__socials li, .ashade-footer__legal > *",
                                  {
                                      x: o.width() < 760 ? 0 : -10,
                                      y: o.width() < 760 ? 20 : -10,
                                      opacity: 0,
                                      duration: 0.2,
                                      delay: h,
                                      stagger: 0.08,
                                  },
                              ),
                          t(".ashade-footer__copyright").length &&
                              gsap.from(".ashade-footer__copyright", {
                                  x: o.width() < 760 ? 0 : "50%",
                                  y: o.width() < 760 ? 20 : 0,
                                  opacity: 0,
                                  duration: 0.45,
                                  delay: h,
                              }),
                          t(".ashade-page-background").length &&
                              gsap.from(".ashade-page-background", {
                                  scale: 1.05,
                                  opacity: 0,
                                  duration: 0.9,
                                  delay: h,
                              }),
                          t(".ashade-content").length &&
                              gsap.from(".ashade-content", {
                                  opacity: 0,
                                  y: 80,
                                  duration: 0.9,
                                  delay: o.width() < 760 ? 0.35 : 1.4 * h,
                                  onStart: L,
                              }),
                          t(".ashade-albums-carousel").length &&
                              (gsap.from(".ashade-album-item__inner", {
                                  opacity: 0,
                                  x: 80,
                                  duration: 0.9,
                                  stagger: 0.06,
                                  delay: 1.4 * h,
                              }),
                              g &&
                                  g.$bar.length &&
                                  gsap.from(g.$bar.get(0), {
                                      opacity: 0,
                                      y: 20,
                                      duration: 0.7,
                                      delay: 1.4 * h,
                                  })),
                          e.setTimeout(P, 1e3)));
            }));
    }

    function S(e, a, t) {
        return Math.min(t, Math.max(a, e));
    }

    function T(e) {
        return String(e)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function M() {
        d = t(".ashade-content-scroll").first();
    }

    function E(a) {
        var t = "number" == typeof a ? a : 80;
        (e.clearTimeout(m), (m = e.setTimeout(L, t)));
    }

    function A(e) {
        return (e || "").replace(/\s+/g, " ").trim();
    }

    function D() {
        (t("a.ashade-logo").attr("aria-label", "Voltar para a página inicial"),
            t("a.ashade-logo img").each(function () {
                var e = t(this),
                    a = e.attr("alt");
                (a && "Logo" !== a) || e.attr("alt", "Iago Pinheiro Estúdio");
            }),
            t("a.ashade-aside-toggler").attr(
                "aria-label",
                "Abrir painel lateral",
            ),
            t("#ashade-aside > a.ashade-aside-close").attr(
                "aria-label",
                "Fechar painel lateral",
            ),
            t("[data-legal-open], [data-comment-open]").attr(
                "aria-haspopup",
                "dialog",
            ),
            t("form.ashade-contact-form")
                .find("input[placeholder], textarea[placeholder]")
                .each(function () {
                    var e = t(this),
                        a = (e.attr("name") || "").toLowerCase(),
                        o = e.attr("placeholder") || "";
                    (!e.attr("aria-label") && o && e.attr("aria-label", o),
                        "name" === a
                            ? e.attr("autocomplete", "name")
                            : "email" === a
                              ? e
                                    .attr("autocomplete", "email")
                                    .attr("inputmode", "email")
                              : "phone" === a &&
                                e
                                    .attr("autocomplete", "tel")
                                    .attr("inputmode", "tel"));
                }),
            t("a.ashade-album-item__link, a.ashade-lightbox-link").each(
                function (e) {
                    var a = t(this),
                        o = "";
                    a.attr("aria-label") ||
                        A(a.text()) ||
                        ((o = A(a.attr("data-caption"))) ||
                            (o = (function (e) {
                                if (!e || !e.length) return "";
                                var a = e
                                    .find("h1, h2, h3, h4, h5, h6")
                                    .first()
                                    .clone();
                                return (a.children().remove(), A(a.text()));
                            })(
                                a.closest(
                                    ".ashade-album-item, .ashade-gallery-item, .ashade-grid-item, article, section",
                                ),
                            )),
                        o || (o = A(a.find("img:first").attr("alt"))),
                        o ||
                            (o = A(
                                a
                                    .closest(
                                        ".ashade-album-item, .ashade-gallery-item, .ashade-grid-item, article, section",
                                    )
                                    .find("img:first")
                                    .attr("alt"),
                            )),
                        o || (o = "item " + (e + 1)),
                        a.is("[data-video-src], [data-video-embed]")
                            ? a.attr("aria-label", "Abrir vídeo: " + o)
                            : a.hasClass("ashade-lightbox-link")
                              ? a.attr("aria-label", "Ampliar imagem: " + o)
                              : a.attr("aria-label", "Abrir: " + o));
                },
            ));
    }

    function I() {
        (M(),
            d.length
                ? ((p = d.children(".ashade-header-holder").first()).length ||
                      ((p = t('<div class="ashade-header-holder"></div>')),
                      d.prepend(p)),
                  p.height(n.outerHeight() || 0))
                : (p = t()));
    }

    function j(e) {
        ((this.$wrap = t(e)),
            (this.$before = t(
                '<div class="ashade-before-after-img ashade-before-img"></div>',
            )),
            (this.$after = t(
                '<div class="ashade-before-after-img ashade-after-img"></div>',
            )),
            (this.$divider = t(
                '<div class="ashade-before-after-divider"><i class="la la-arrows-h"></i></div>',
            )),
            (this.current = 50),
            (this.target = 50),
            (this.offset = 0),
            (this.size = 0),
            (this.isDown = !1),
            this.init());
    }

    function q(e, a, o) {
        var i = t("<span></span>").text(a || "");
        e &&
            e.length &&
            (e.removeClass("alert-success alert-danger").empty(),
            "success" === o
                ? e.addClass("alert-success")
                : "error" === o && e.addClass("alert-danger"),
            e.append(i));
    }

    function F(e) {
        ((this.$el = e),
            (this.$items = this.$el.find(".ashade-album-item")),
            (this.$media = this.$el.find("img, video")),
            (this.$bar = this.$el
                .parent()
                .find(".ashade-albums-carousel-progress")),
            (this.$progress = this.$bar.find(
                ".ashade-albums-carousel-progress__bar",
            )),
            (this.$prev = this.$bar.find(
                ".ashade-albums-carousel-progress__arrow--prev",
            )),
            (this.$next = this.$bar.find(
                ".ashade-albums-carousel-progress__arrow--next",
            )),
            (this.current = 0),
            (this.target = 0),
            (this.currentStep = 0),
            (this.maxStep = 0),
            (this.barCurrent = 0),
            (this.barTarget = 0),
            (this.pointerDown = !1),
            (this.dragging = !1),
            (this.linkTarget = !1),
            (this.linkMoved = !1),
            (this.startPointer = 0),
            (this.startStep = 0),
            (this.slidePositions = []),
            (this.isAnimating = !1),
            this.init());
    }

    function L() {
        (I(),
            o.width() > 760 && s.removeClass("ashade-mobile-menu-shown"),
            t("#ashade-home-works").length &&
                t("#ashade-home-works").css(
                    "padding-top",
                    (n.outerHeight() || 0) + "px",
                ),
            t("#ashade-home-contacts").length &&
                t("#ashade-home-contacts").css(
                    "padding-top",
                    (n.outerHeight() || 0) + "px",
                ),
            n.find(".ashade-menu-offset").removeClass("ashade-menu-offset"),
            n.find(".sub-menu").each(function () {
                var e = t(this);
                e.offset().left +
                    e.outerWidth() +
                    parseInt(e.css("padding-left"), 10) +
                    parseInt(e.css("padding-right"), 10) >
                    o.width() && e.addClass("ashade-menu-offset");
            }),
            $.layout(),
            g && g.layout(),
            (v.oldScrollTop = o.scrollTop()),
            x.layout());
    }

    function P() {
        s.addClass("is-loaded");
    }

    function z() {
        var e,
            a,
            i = n.find(".ashade-nav").first(),
            r = n.find(".ashade-nav-block").first();
        i.length &&
            r.length &&
            !v.mobileMenu &&
            ((e = t('<div class="ashade-mobile-header"></div>')),
            (v.mobileMenuButton = t(
                '<a href="#" class="ashade-mobile-menu-button" aria-label="Abrir menu principal"><i class="la la-bars"></i></a>',
            )),
            (v.mobileMenu = t('<nav class="ashade-mobile-menu"></nav>')),
            (v.mobileMenuClose = t(
                '<a href="#" class="ashade-mobile-menu-close" aria-label="Fechar menu principal"></a>',
            )),
            e.append(v.mobileMenuButton),
            t(".ashade-aside-overlay").length &&
                e.append(
                    [
                        '<a class="ashade-aside-toggler" href="#" aria-label="Abrir painel lateral">',
                        '  <span class="ashade-aside-toggler__icon01"></span>',
                        '  <span class="ashade-aside-toggler__icon02"></span>',
                        '  <span class="ashade-aside-toggler__icon03"></span>',
                        "</a>",
                    ].join(""),
                ),
            r.append(e),
            s.append(v.mobileMenu),
            v.mobileMenu.append(v.mobileMenuClose),
            v.mobileMenu.append(
                [
                    '<div class="ashade-mobile-menu-inner">',
                    '  <div class="ashade-mobile-menu-content">',
                    i.html(),
                    "  </div>",
                    "</div>",
                ].join(""),
            ),
            (a = v.mobileMenu.find("ul.main-menu")),
            v.mobileMenu.find("ul.sub-menu").hide(),
            a.on("click", "a", function (e) {
                var a = t(this).parent(),
                    o = a.children("ul");
                o.length &&
                    (e.preventDefault(),
                    a.toggleClass("is-open"),
                    o.stop(!0, !0).slideToggle(240));
            }),
            v.mobileMenuButton.on("click.mainMobileMenu", function (e) {
                (e.preventDefault(),
                    (function () {
                        if (!v.mobileMenu || !v.mobileMenu.length) return;
                        if (
                            ((v.oldScrollTop = o.scrollTop()),
                            s.addClass("ashade-mobile-menu-shown is-locked"),
                            l)
                        )
                            return void s.removeClass("is-locked");
                        gsap.fromTo(
                            ".ashade-mobile-menu ul.main-menu > li",
                            {
                                x: 0,
                                y: 40,
                                opacity: 0,
                            },
                            {
                                x: 0,
                                y: 0,
                                opacity: 1,
                                duration: 0.2,
                                delay: 0.2,
                                stagger: 0.08,
                                onComplete: function () {
                                    s.removeClass("is-locked");
                                },
                            },
                        );
                    })());
            }),
            v.mobileMenuClose.on("click.mainMobileMenu", function (e) {
                (e.preventDefault(), H());
            }),
            t(".ashade-menu-overlay").on("click.mainMobileMenu", function () {
                H(!0);
            }));
    }

    function H(e) {
        var a = function () {
            s.removeClass("ashade-mobile-menu-shown is-locked");
        };
        s.hasClass("ashade-mobile-menu-shown") &&
            (l || e
                ? a()
                : (s.addClass("is-locked"),
                  gsap.to(".ashade-mobile-menu ul.main-menu > li", {
                      x: 0,
                      y: -40,
                      opacity: 0,
                      duration: 0.18,
                      stagger: 0.06,
                      onComplete: a,
                  })));
    }

    function O() {
        s.removeClass("ashade-aside-shown");
    }

    function R(e) {
        var a = e.closest(".ashade-content-wrap");
        a.length && (a.before(e), a.remove(), M());
    }

    function V(e, a) {
        var o = t(
                "works" === e ? "#ashade-home-works" : "#ashade-home-contacts",
            ),
            i = t(a),
            n = A(i.find("span:first-child").text()),
            r = A(i.find("span:last-child").text());
        if (s.hasClass("ashade-home-template") && o.length) {
            if (
                ((v.activeHomeSection = e),
                s
                    .removeClass("is-faded")
                    .addClass("ashade-content-shown is-locked"),
                t(".ashade-home-link-wrap").addClass("is-inactive"),
                o.closest(".ashade-content-wrap").length ||
                    (function (e) {
                        var a = t('<main class="ashade-content-wrap"></main>'),
                            o = t('<div class="ashade-content-scroll"></div>'),
                            i = t('<div class="ashade-content"></div>'),
                            s = t('<section class="ashade-section"></section>');
                        (a.append(o),
                            o.append(i),
                            i.append(s),
                            e.before(a),
                            s.append(e),
                            M(),
                            I());
                    })(o),
                t(".ashade-page-title").html(
                    "<span>" + T(n) + "</span>" + T(r),
                ),
                t(".ashade-page-title-wrap").removeClass("is-inactive"),
                t(".ashade-home-return").removeClass("is-inactive"),
                L(),
                l)
            )
                return (
                    t(".ashade-page-title-wrap, .ashade-home-return").addClass(
                        "is-loaded",
                    ),
                    void s.removeClass("is-locked")
                );
            (gsap.to(".ashade-page-background", {
                opacity: 0.1,
                scale: 1.05,
                duration: 0.9,
            }),
                gsap.to(".ashade-home-link--works", {
                    top: 0,
                    duration: 0.45,
                }),
                gsap.to(".ashade-home-link--contacts", {
                    top: "200%",
                    duration: 0.45,
                }),
                gsap.to(".ashade-page-title-wrap", {
                    top: "100%",
                    duration: 0.45,
                    delay: 0.45,
                    onComplete: function () {
                        t(".ashade-page-title-wrap")
                            .addClass("is-loaded")
                            .removeClass("is-inactive");
                    },
                }),
                gsap.to(".ashade-back-wrap", {
                    top: "100%",
                    duration: 0.45,
                    delay: 0.45,
                    onComplete: function () {
                        t(".ashade-back-wrap")
                            .addClass("is-loaded")
                            .removeClass("is-inactive");
                    },
                }),
                gsap.fromTo(
                    ".ashade-content",
                    {
                        y: 90,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.55,
                        onComplete: function () {
                            s.removeClass("is-locked");
                        },
                    },
                ));
        }
    }

    function X(a) {
        v.isNavigating ||
            ((v.isNavigating = !0),
            l
                ? (e.location.href = a)
                : (b.$el.addClass("is-unloading"),
                  s.addClass("is-locked").removeClass("is-loaded"),
                  O(),
                  H(!0),
                  t(".ashade-content").length &&
                      gsap.to(".ashade-content", {
                          opacity: 0,
                          y: -80,
                          duration: 0.35,
                      }),
                  g &&
                      (gsap.to(".ashade-album-item__inner", {
                          opacity: 0,
                          x: -80,
                          duration: 0.35,
                          stagger: 0.04,
                      }),
                      g.$bar.length &&
                          gsap.to(g.$bar.get(0), {
                              opacity: 0,
                              y: 16,
                              duration: 0.35,
                          })),
                  gsap.to(".ashade-logo", {
                      x: "-50%",
                      opacity: 0,
                      duration: 0.3,
                  }),
                  gsap.to(
                      ".ashade-nav ul.main-menu > li, .ashade-mobile-header > a, .ashade-footer__socials li, .ashade-footer__legal > *",
                      {
                          x: -10,
                          y: -10,
                          opacity: 0,
                          duration: 0.18,
                          stagger: 0.04,
                      },
                  ),
                  t(".ashade-footer__copyright").length &&
                      gsap.to(".ashade-footer__copyright", {
                          x: "50%",
                          opacity: 0,
                          duration: 0.3,
                      }),
                  t(".ashade-page-title-wrap").length &&
                      (t(
                          ".ashade-page-title-wrap:not(.is-inactive)",
                      ).removeClass("is-loaded"),
                      gsap.to(".ashade-page-title-wrap", {
                          top: 0,
                          duration: 0.35,
                          delay: 0.15,
                      })),
                  t(".ashade-back-wrap").length &&
                      (t(".ashade-back-wrap:not(.is-inactive)").removeClass(
                          "is-loaded",
                      ),
                      gsap.to(".ashade-back-wrap", {
                          top: "200%",
                          duration: 0.35,
                          delay: 0.15,
                      })),
                  s.hasClass("ashade-home-template") &&
                      (t(
                          ".ashade-home-link--works, .ashade-home-link--contacts",
                      ).removeClass("is-loaded"),
                      gsap.to(".ashade-home-link--works:not(.is-inactive)", {
                          top: 0,
                          duration: 0.35,
                      }),
                      gsap.to(".ashade-home-link--contacts:not(.is-inactive)", {
                          top: "200%",
                          duration: 0.35,
                      })),
                  t(".ashade-page-background").length &&
                      gsap.to(".ashade-page-background", {
                          scale: 1.05,
                          opacity: 0,
                          duration: 0.45,
                      }),
                  e.setTimeout(function () {
                      e.location.href = a;
                  }, 450)));
    }

    function B() {
        (i.on("click.mainAside", "a.ashade-aside-toggler", function (e) {
            (e.preventDefault(),
                (v.oldScrollTop = o.scrollTop()),
                s
                    .addClass("ashade-aside-shown")
                    .removeClass("ashade-menu-fade"));
        }),
            i.on(
                "click.mainAside",
                "#ashade-aside > a.ashade-aside-close, .ashade-aside-overlay",
                function (e) {
                    (e.preventDefault(), O());
                },
            ),
            i.on("mouseenter.mainMenuFade", "nav.ashade-nav a", function () {
                s.addClass("ashade-menu-fade");
            }),
            i.on("mouseleave.mainMenuFade", "nav.ashade-nav", function () {
                s.removeClass("ashade-menu-fade");
            }),
            i.on("mouseenter.mainHome", ".ashade-home-link", function () {
                s.addClass("is-faded");
            }),
            i.on("mouseleave.mainHome", ".ashade-home-link", function () {
                s.removeClass("is-faded");
            }),
            i.on("click.mainHome", ".ashade-home-link", function () {
                V(
                    t(this).parent().hasClass("ashade-home-link--works")
                        ? "works"
                        : "contacts",
                    this,
                );
            }),
            i.on("click.mainBack", ".ashade-back", function (a) {
                var i = t(this);
                (a.preventDefault(),
                    i.hasClass("is-home-return")
                        ? (function () {
                              var e, a;
                              if (
                                  s.hasClass("ashade-home-template") &&
                                  v.activeHomeSection
                              ) {
                                  if (
                                      ((e =
                                          "works" === v.activeHomeSection
                                              ? "#ashade-home-works"
                                              : "#ashade-home-contacts"),
                                      (a = t(e)),
                                      s.addClass("is-locked"),
                                      l)
                                  )
                                      return (
                                          R(a),
                                          (v.activeHomeSection = ""),
                                          s.removeClass(
                                              "ashade-content-shown is-locked",
                                          ),
                                          t(
                                              ".ashade-home-link-wrap",
                                          ).removeClass(
                                              "is-inactive is-loaded",
                                          ),
                                          t(
                                              ".ashade-page-title-wrap, .ashade-back-wrap",
                                          )
                                              .addClass("is-inactive")
                                              .removeClass("is-loaded"),
                                          s.height(o.height()),
                                          void L()
                                      );
                                  (gsap.to(".ashade-content", {
                                      y: -90,
                                      opacity: 0,
                                      duration: 0.55,
                                      onComplete: function () {
                                          (R(a), s.height(o.height()), L());
                                      },
                                  }),
                                      t(
                                          ".ashade-page-title-wrap, .ashade-back-wrap",
                                      )
                                          .removeClass("is-loaded")
                                          .addClass("is-inactive"),
                                      gsap.to(".ashade-page-title-wrap", {
                                          top: 0,
                                          duration: 0.45,
                                          delay: 0.3,
                                      }),
                                      gsap.to(".ashade-back-wrap", {
                                          top: "200%",
                                          duration: 0.45,
                                          delay: 0.3,
                                      }),
                                      gsap.to(".ashade-home-link--works", {
                                          top: "100%",
                                          duration: 0.45,
                                          delay: 0.55,
                                          onComplete: function () {
                                              t(".ashade-home-link--works")
                                                  .addClass("is-loaded")
                                                  .removeClass("is-inactive");
                                          },
                                      }),
                                      gsap.to(".ashade-home-link--contacts", {
                                          top: "100%",
                                          duration: 0.45,
                                          delay: 0.55,
                                          onComplete: function () {
                                              t(".ashade-home-link--contacts")
                                                  .addClass("is-loaded")
                                                  .removeClass("is-inactive");
                                          },
                                      }),
                                      gsap.to(".ashade-page-background", {
                                          opacity: 0.75,
                                          scale: 1,
                                          duration: 0.9,
                                          delay: 0.55,
                                          onComplete: function () {
                                              ((v.activeHomeSection = ""),
                                                  s.removeClass(
                                                      "ashade-content-shown is-locked",
                                                  ));
                                          },
                                      }));
                              }
                          })()
                        : i.hasClass("is-to-top") &&
                          (i.addClass("in-action"),
                          g
                              ? (g.goToStep(0),
                                e.setTimeout(function () {
                                    (s.removeClass("has-to-top"),
                                        i.removeClass("in-action"));
                                }, 320))
                              : t("html, body")
                                    .stop(!0)
                                    .animate(
                                        {
                                            scrollTop: 0,
                                        },
                                        420,
                                        function () {
                                            (s.removeClass("has-to-top"),
                                                i.removeClass("in-action"));
                                        },
                                    )));
            }),
            i.on("click.mainLinks", "a", function (a) {
                !(function (a, t) {
                    var o,
                        i = a.getAttribute("href");
                    return !(
                        !i ||
                        "#" === i ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey ||
                        t.altKey ||
                        0 !== t.button ||
                        (a.target && "_self" !== a.target) ||
                        a.hasAttribute("download") ||
                        a.classList.contains("ashade-lightbox-link") ||
                        a.hasAttribute("data-legal-open") ||
                        a.hasAttribute("data-comment-open") ||
                        /^(mailto:|tel:|javascript:)/i.test(i) ||
                        (o = new e.URL(i, e.location.href)).origin !==
                            e.location.origin ||
                        (o.hash && o.pathname === e.location.pathname) ||
                        /\.(jpg|jpeg|png|gif|webp|mp4|webm|svg)$/i.test(
                            o.pathname,
                        )
                    );
                })(this, a)
                    ? "#" === this.getAttribute("href") && a.preventDefault()
                    : (a.preventDefault(), X(this.href));
            }),
            o
                .on("resize.mainLayout", function () {
                    (e.clearTimeout(u),
                        (u = e.setTimeout(function () {
                            L();
                        }, 120)));
                })
                .on("load.mainLayout", function () {
                    L();
                })
                .on("scroll.mainLayout", function () {
                    s.hasClass("ashade-aside-shown") ||
                    s.hasClass("ashade-mobile-menu-shown")
                        ? e.scrollTo(0, v.oldScrollTop)
                        : ((x.target = o.scrollTop()),
                          !g &&
                              t(".ashade-back.is-to-top:not(.in-action)")
                                  .length &&
                              (o.scrollTop() > o.height() / 2
                                  ? s.addClass("has-to-top")
                                  : s.removeClass("has-to-top")));
                })
                .on("pageshow.mainLayout", function (a) {
                    a.originalEvent &&
                        a.originalEvent.persisted &&
                        e.location.reload();
                }),
            i.on("keyup.mainGlobal", function (e) {
                ("Escape" !== e.key && 27 !== e.keyCode) ||
                    (_.close(), C.close(), O(), H(!0));
            }));
    }
})(window, document, window.jQuery);
window.ASHADE_BLOG_COMMENTS_DATA = {
    comments: [
        {
            id: "seed-1",
            author: "Mariana",
            topic: "planejamento",
            intent: "duvida",
            message:
                "Estou começando a organizar o ensaio e queria entender o quanto vale levar referências antes do primeiro contato. Ter uma orientação assim no blog ajuda muito.",
            likes: 4,
            createdAt: "2026-04-18T09:30:00.000Z",
            replyToAuthor: "",
            replyToTopic: "",
        },
        {
            id: "seed-2",
            author: "Felipe",
            topic: "look",
            intent: "experiencia",
            message:
                "Separar uma troca extra fez diferença no meu ensaio. Acho ótimo quando o blog já orienta isso de forma simples, porque evita ansiedade no dia.",
            likes: 7,
            createdAt: "2026-04-18T13:10:00.000Z",
            replyToAuthor: "",
            replyToTopic: "",
        },
        {
            id: "seed-3",
            author: "Camila",
            topic: "direcao",
            intent: "duvida",
            message:
                "Tenho receio de ficar artificial nas fotos. Ver esse tipo de explicação sobre direção leve me deixa mais segura, mas queria saber quanto tempo leva até a pessoa relaxar durante a sessão.",
            likes: 3,
            createdAt: "2026-04-19T08:50:00.000Z",
            replyToAuthor: "",
            replyToTopic: "",
        },
        {
            id: "seed-4",
            author: "Laura",
            topic: "planejamento",
            intent: "experiencia",
            message:
                "Respondendo à Mariana: no meu caso ajudou muito chegar com poucas referências, mas bem alinhadas. O atendimento ficou mais claro e o ensaio fez mais sentido.",
            likes: 5,
            createdAt: "2026-04-19T11:15:00.000Z",
            replyToAuthor: "Mariana",
            replyToTopic: "planejamento",
        },
        {
            id: "seed-5",
            author: "Renato",
            topic: "entrega",
            intent: "sugestao",
            message:
                "Seria legal ter mais conteúdo sobre seleção final das fotos e uso em portfólio profissional. Esse tema tem bastante valor para quem trabalha com imagem pessoal.",
            likes: 2,
            createdAt: "2026-04-19T16:25:00.000Z",
            replyToAuthor: "",
            replyToTopic: "",
        },
    ],
};
