# 可发送 JSONP 请求、获取 JSONP 返回结果的函数

## 该工具类函数见 `src/utils/request.js`

```js
export function JSONP(url, options) {
  if (!url || typeof url !== 'string') throw new Error('can not find the request url');

  // 处理 JSONP 返回的数据
  if (options && options.callback && typeof options.callback === 'function') {
    window.jsoncallback = function (req) {
      options.callback(req);
      // 移除 script 标签
      document.querySelector('script[data-type=JSONP]').remove();
    };
  };

  // 组装 url 生成 script 并插入 DOM
  const script = document.createElement('script');
  script.src = `${url}?jsoncallback=jsoncallback`;
  if (options && options.data && !Array.isArray(options.data)) {
    for(let key in options.data) {
      script.src += `&${key}=${options.data[key]}`;
      script.setAttribute('data-type', 'JSONP');
    }
  };

  document.getElementsByTagName('body')[0].appendChild(script);
}
```

## 启动服务

```bash
npm run start
```

项目启动后，点击「获取数据」按钮，发起 JSONP 请求。
