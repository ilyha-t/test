import React from 'react';
import { Switch } from 'antd';

import HttpService from '../../services/http';

const App = () => {
  const httpClient = new HttpService();

  return (
    <div>
      <Switch defaultChecked />
      <button onClick={() => httpClient.getFilmsByQuery('res')}>Response</button>
    </div>
  );
};

export default App;
