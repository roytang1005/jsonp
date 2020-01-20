/**
 * JSONP 请求
 * @param {String} url 
 * @param {Object} options { data, callback }
 */

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
