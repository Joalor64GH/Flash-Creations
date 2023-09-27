!function() {
    "use strict";
    const n = (n,t)=>{
        customElements.get(n) || customElements.define(n, t)
    }
      , t = (n,t)=>{
        try {
            n.innerHTML = t
        } catch (e) {
            const i = window.trustedTypes?.createPolicy?.("rq-html-policy", {
                createHTML: n=>n
            });
            n.innerHTML = i.createHTML(t)
        }
    }
    ;
    class e extends HTMLElement {
        #n;
        #t = 1e4;
        constructor() {
            super(),
            this.#n = this.attachShadow({
                mode: "closed"
            }),
            t(this.#n, this._getDefaultMarkup()),
            this.show = this.show.bind(this),
            this.hide = this.hide.bind(this)
        }
        connectedCallback() {
            this.#n.getElementById("heading").textContent = this.attributes.getNamedItem("heading")?.value ?? null;
            const n = Number(this.attributes.getNamedItem("time")?.value) ?? null;
            n && (this.#t = n);
            const t = this.attributes.getNamedItem("icon-path")?.value;
            if (t) {
                const n = this.#n.getElementById("icon-container")
                  , e = document.createElement("img");
                e.setAttribute("src", t),
                n?.appendChild(e)
            }
            this.#n.getElementById("close-icon").addEventListener("click", this.hide),
            this.show()
        }
        _getDefaultMarkup() {
            return '\n    <style>:host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n  top: 0;\n  right: 0;\n}\n\n::slotted(*) {\n  all: unset !important;\n}\n\n#container {\n  background-color: #295ff6;\n  border-radius: 8px;\n  padding: 12px 24px;\n  margin: 16px;\n  width: 30vw;\n  right: 0;\n  top: 0;\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n  font-family: system-ui;\n  transform: translateX(calc(100% + 20px));\n  transition: all 0.5s cubic-bezier(0.3, -0.1, 1, 1);\n}\n\n#container.active {\n  transform: translateX(0);\n}\n\n#heading {\n  font-size: 16px;\n  margin: 4px 0;\n  font-weight: 600;\n  line-height: 1.4;\n}\n\n#heading-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 2px;\n}\n\n#heading-container div {\n  display: flex;\n  flex-direction: row;\n}\n\n#close-icon {\n  align-self: center;\n  cursor: pointer;\n}\n\n#content-container {\n  display: flex;\n  flex-direction: row;\n  width: 96%;\n}\n\n#content {\n  font-size: 13px;\n  line-height: 1.4;\n}\n\n#icon-container {\n  height: 20px;\n  width: 20px;\n  padding-right: 6px;\n  align-self: center;\n}\n\n#icon-container img {\n  height: 20px;\n  width: 20px;\n  background: #2a2a2a;\n  border-radius: 4px;\n}\n</style>\n    <div id="container">\n        <div id="heading-container">\n          <div>\n            <div id="icon-container"></div>\n            <div id="heading"></div>\n          </div>\n          <div id="close-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M3.52858 3.52851C3.78892 3.26816 4.21103 3.26816 4.47138 3.52851L7.99998 7.05711L11.5286 3.52851C11.7889 3.26816 12.211 3.26816 12.4714 3.52851C12.7317 3.78886 12.7317 4.21097 12.4714 4.47132L8.94279 7.99992L12.4714 11.5285C12.7317 11.7889 12.7317 12.211 12.4714 12.4713C12.211 12.7317 11.7889 12.7317 11.5286 12.4713L7.99998 8.94273L4.47138 12.4713C4.21103 12.7317 3.78892 12.7317 3.52858 12.4713C3.26823 12.211 3.26823 11.7889 3.52858 11.5285L7.05717 7.99992L3.52858 4.47132C3.26823 4.21097 3.26823 3.78886 3.52858 3.52851Z" fill="currentColor"/>\n</svg></div>\n        </div>\n        <div id="content-container">\n          <slot id="content" name="content"></slot>\n        </div>\n     </div>\n    '
        }
        show() {
            setTimeout((()=>{
                this.#n.getElementById("container").classList.add("active"),
                setTimeout(this.hide, this.#t)
            }
            ), 300)
        }
        hide() {
            this.#n.getElementById("container").classList.remove("active")
        }
    }
    n("rq-toast", e);
    var i;
    !function(n) {
        n.STOP_RECORDING = "stop",
        n.DISCARD_RECORDING = "discard",
        n.MOVED = "moved"
    }(i || (i = {}));
    const o = {
        left: 30,
        bottom: 30
    };
    class s extends HTMLElement {
        #n;
        #e = !1;
        constructor() {
            super(),
            this.#n = this.attachShadow({
                mode: "closed"
            }),
            t(this.#n, this._getDefaultMarkup()),
            this.show = this.show.bind(this),
            this.hide = this.hide.bind(this)
        }
        connectedCallback() {
            this.addListeners(),
            this.show()
        }
        addListeners() {
            this.#n.querySelector(".stop-recording").addEventListener("click", (n=>{
                n.stopPropagation(),
                this.triggerEvent(i.STOP_RECORDING)
            }
            )),
            this.#n.querySelector(".discard-recording").addEventListener("click", (n=>{
                n.stopPropagation(),
                this.triggerEvent(i.DISCARD_RECORDING),
                this.hide()
            }
            )),
            this.addEventListener("show", (n=>{
                this.show(n.detail?.position)
            }
            )),
            this.addEventListener("hide", this.hide),
            this.addEventListener("mousedown", (n=>{
                n.preventDefault();
                let t = n.clientX
                  , e = n.clientY;
                const i = n=>{
                    n.preventDefault(),
                    this.#e = !0;
                    const i = n.clientX - t
                      , o = n.clientY - e;
                    t = n.clientX,
                    e = n.clientY;
                    const s = Math.min(Math.max(this.offsetLeft + i, 0), window.innerWidth - this.offsetWidth)
                      , a = Math.min(Math.max(this.offsetTop + o, 0), window.innerHeight - this.offsetHeight);
                    this.moveToPostion({
                        top: a,
                        left: s
                    })
                }
                  , o = ()=>{
                    document.removeEventListener("mousemove", i),
                    document.removeEventListener("mouseup", o)
                }
                ;
                document.addEventListener("mousemove", i),
                document.addEventListener("mouseup", o)
            }
            )),
            this.#n.addEventListener("click", (n=>{
                this.#e && (n.stopPropagation(),
                this.#e = !1)
            }
            ), !0),
            window.addEventListener("resize", (()=>{
                const n = this.getBoundingClientRect();
                (n.left + n.width > window.innerWidth || n.top + n.height > window.innerHeight) && this.moveToPostion(o)
            }
            ))
        }
        moveToPostion(n) {
            const t = n=>void 0 !== n ? `${n}px` : "auto";
            this.style.left = t(n.left),
            this.style.top = t(n.top),
            this.style.bottom = t(n.bottom),
            this.style.right = t(n.right),
            this.triggerEvent(i.MOVED, n)
        }
        triggerEvent(n, t) {
            this.dispatchEvent(new CustomEvent(n,{
                detail: t
            }))
        }
        _getDefaultMarkup() {
            return '\n      <style>:host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n}\n\n#container {\n  background-color: #295ff6;\n  border-radius: 24px;\n  padding: 12px 18px;\n  margin: auto;\n  color: #fff;\n  font-family: system-ui;\n  font-size: 13px;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  white-space: nowrap;\n  cursor: move;\n  display: none;\n}\n\n#container.visible {\n  display: flex;\n}\n\n#container > div {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 0 0 auto;\n}\n\n.stop-recording:hover {\n  text-decoration: underline;\n}\n\n.divider {\n  display: inline-block;\n  height: 20px;\n  width: 1px;\n  background: #fff;\n}\n\n.discard-recording {\n  margin-top: 2px;\n}\n\n.action {\n  cursor: pointer;\n}\n\n@keyframes blink {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.recording-icon {\n  display: inline-block;\n  height: 4px;\n  width: 4px;\n  border: 4px solid #fff;\n  border-radius: 50%;\n  background: #ea3323;\n  animation: blink 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;\n}\n</style>\n      <div id="container">\n        <div>\n          <span class="recording-icon"></span>\n          <span class="action stop-recording">Stop & Watch Replay</span>\n        </div>\n        <div>\n          <span class="divider"></span>\n          <span class="action discard-recording" title="Discard"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M3.47222 1.33333C3.47222 0.596954 4.09405 0 4.86111 0H9.02778C9.79484 0 10.4167 0.596954 10.4167 1.33333V2.66667H11.7984C11.8027 2.66663 11.807 2.66663 11.8113 2.66667H13.1944C13.578 2.66667 13.8889 2.96514 13.8889 3.33333C13.8889 3.70152 13.578 4 13.1944 4H12.4522L11.8499 12.095C11.7979 12.7927 11.1932 13.3333 10.4645 13.3333H3.42439C2.69572 13.3333 2.09094 12.7927 2.03903 12.095L1.43672 4H0.694444C0.310913 4 0 3.70152 0 3.33333C0 2.96514 0.310913 2.66667 0.694444 2.66667H2.0776C2.08191 2.66663 2.08621 2.66663 2.0905 2.66667H3.47222V1.33333ZM4.86111 2.66667H9.02778V1.33333H4.86111V2.66667ZM2.82915 4L3.42439 12H10.4645L11.0597 4H2.82915ZM5.55555 5.33333C5.93909 5.33333 6.25 5.63181 6.25 6V10C6.25 10.3682 5.93909 10.6667 5.55555 10.6667C5.17202 10.6667 4.86111 10.3682 4.86111 10V6C4.86111 5.63181 5.17202 5.33333 5.55555 5.33333ZM8.33333 5.33333C8.71686 5.33333 9.02778 5.63181 9.02778 6V10C9.02778 10.3682 8.71686 10.6667 8.33333 10.6667C7.9498 10.6667 7.63889 10.3682 7.63889 10V6C7.63889 5.63181 7.9498 5.33333 8.33333 5.33333Z" fill="white"/>\n</svg></span>\n        </div>\n      </div>\n    '
        }
        show(n=o) {
            this.moveToPostion(n),
            this.setAttribute("draggable", "true"),
            this.getContainer().classList.add("visible")
        }
        hide() {
            this.getContainer().classList.remove("visible")
        }
        getContainer() {
            return this.#n.getElementById("container")
        }
    }
    n("rq-session-recording-widget", s)
}();