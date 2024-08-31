import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Heading from './Component/Heading.jsx';
import List from './Component/Post/List.jsx';
import Upload from './Component/Post/Upload.jsx';
import Detail from './Component/Post/Detail.jsx';

function App() {
  return (
    <>
      <Heading />
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/post/:postNum' element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;