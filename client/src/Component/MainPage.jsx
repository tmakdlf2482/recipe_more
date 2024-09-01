import React, { useState, useEffect } from 'react';
import List from './Post/List';
import axios from 'axios';
import ImageSlider, { Slide } from 'react-auto-image-slider';
import { DropdownButton, Dropdown, Form, Button, InputGroup } from 'react-bootstrap';
import '../Style/MainPage.css';

function MainPage() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState('최신순'); // 정렬
  const [SearchTerm, setSearchTerm] = useState('');

  const getPostList = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
    };

    axios.post('/api/post/list', body)
    .then((response) => {
      if (response.data.success) {
        setPostList([...response.data.postList]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };

  return (
    <div className='container'>
      {/* 이미지 슬라이더 UI */}
      <div className='slider-container'>
        <ImageSlider effectDelay={500} autoPlayDelay={2000}>
          <Slide>
            <img src="/food.jpg" alt="food_1" />
          </Slide>
          <Slide>
            <img src="/food_2.png" alt="food_2" />
          </Slide>
          <Slide>
            <img src="/food_3.jpg" alt="food_3" />
          </Slide>
        </ImageSlider>
      </div>

      <div className='GNBDiv'>
        <div className='search'>
          <InputGroup className="mb-3" style={{ maxWidth: '600px', marginRight: '1rem' }} >
            <Form.Control placeholder="검색어를 입력하세요." className='shadow-none' value={SearchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => {if (e.keyCode === 13) SearchHandler()}} />
            <Button variant="outline-secondary" onClick={() => SearchHandler()}>검색</Button>
          </InputGroup>
        </div>
        <DropdownButton variant="outline-secondary" title={Sort} style={{ float: 'right', marginTop: '10px' }}>
          <Dropdown.Item onClick={() => setSort('최신순')}>최신순</Dropdown.Item>
          <Dropdown.Item onClick={() => setSort('인기순')}>인기순</Dropdown.Item>
        </DropdownButton>
      </div>

      {/* 게시글 리스트 UI */}
      <List PostList={PostList} />
    </div>
  );
}

export default MainPage;