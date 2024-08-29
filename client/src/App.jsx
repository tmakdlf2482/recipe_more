import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Heading from './Component/Heading.jsx';
import List from './Component/Post/List.jsx';
import Upload from './Component/Post/Upload.jsx';

function App() {
  const [ContentList, setContentList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </>
  );
}

export default App;