export default class Router {
  routes: { path: RegExp | string; cb: (arg: RegExpMatchArray) => void }[] = [];

  mode: string;

  root: string;

  current = '';

  constructor(options: { mode: string; root: string }) {
    this.mode = options.mode;
    this.root = options.root;
    window.addEventListener('hashchange', this.interval, false);
  }

  add = (path: RegExp | string, cb: () => void) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: RegExp | string) => {
    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  private clearSlashes = (path: RegExp | string) => {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  };

  private getFragment = () => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(
        decodeURI(window.location.pathname + window.location.search)
      );
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = '') => {
    if (this.mode === 'history') {
      window.history.pushState(null, '', this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(
        /#(.*)$/,
        ''
      )}#${path}`;
    }
    return this;
  };

  interval = () => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, [match]);
        return match;
      }
      return false;
    });
  };
}
