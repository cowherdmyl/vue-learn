class Router {
  model = true; // true=hash,false=history
  targetPath = "/";
  routes = [];
  curPath = "/";

  constructor(options) {
    const { model = "hash", routes = [] } = options;
    this.model = model === "hash";
    this.routes = routes;

    this.model ? this.initHash() : this.initHistory();
    window.addEventListener("load", this.refresh); // 初始化
  }

  initHash() {
    window.addEventListener("hashchange", this.refresh);
  }

  initHistory() {
    window.addEventListener("popstate", this.refresh); // 监听用户操作
  }

  refresh = (e) => {
    this.curPath = this.model
      ? location.hash.slice(1) || "/"
      : (e.state && e.state.path) || "/";
    console.log("curPath:", this.curPath);

    for (const item of this.routes) {
      if (item.path === this.curPath) {
        return item.component();
      }
    }
  };

  changeHash(path) {
    console.log("path:", path);
    location.hash = this.targetPath;
  }

  changeHistory(path) {
    // 只改变路由
    history.pushState({ path }, null, path);
    // 触发新组件渲染
    this.refresh({ state: { path } });
  }

  push(path) {
    this.targetPath = path;
    this.model ? this.changeHash() : this.changeHistory(path);
  }
}

window.$Router = Router;
