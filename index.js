class Router {
  routes = [];
  curPath = "/";

  constructor(options) {
    const { routes } = options;
    this.routes = routes;
    window.addEventListener("load", this.refresh);
    window.addEventListener("hashchange", this.refresh);
  }

  refresh = () => {
    this.curPath = location.hash.slice(1) || "/";
    for (const item of this.routes) {
      if (item.path === this.curPath) {
        return item.component();
      }
    }
  };
}

window.$Router = Router;
