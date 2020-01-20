import React, { useState } from 'react';
import './App.css';
import { JSONP } from './utils/request';

function App() {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState();

  // 获取数据
  function fetchData() {
    setFetching(true);

    JSONP('http://api.flickr.com/services/feeds/photos_public.gne', {
      data: {
        tags: 'cat',
        tagmode: 'any',
        format: 'json'
      },
      callback: function (data) {
        // data 是服务端返回的数据
        setData(JSON.stringify(data));
        setFetching(false);
      }
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>可发送 JSONP 请求、获取 JSONP 返回结果的函数</p>
        <button className="btn-fetch" onClick={fetchData} disabled={fetching}>{fetching ? '获取中...' : '获取数据'}</button>
        <section className="result-wrap">
          <code>{ data }</code>
        </section>
      </header>
    </div>
  );
}

export default App;
