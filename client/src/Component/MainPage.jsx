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
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);

  const getPostLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    };

    axios.post('/api/post/list', body)
    .then((response) => {
      if (response.data.success) {
        setPostList([...PostList, ...response.data.postList]); // 기존 PostList도 함께
        // 0 idx ~ 4 idx
        // 다음으로 찾을 idx는 5 idx ~ 9 idx : 더 불러오면 이전 5개는 skip
        // 다음으로 찾을 idx는 10 idx ~ 14 idx : skip이 10만큼 되어야 함
        setSkip(Skip + response.data.postList.length);
        
        // 만약 게시글이 총 12개이면,
        // limit 5 * 2 + 2
        // 반드시 2개가 남는 시점이 옴
        if (response.data.postList.length < 5) {
          setLoadMore(false);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getPostList = () => {
    setSkip(0);

    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };

    axios.post('/api/post/list', body)
    .then((response) => {
      if (response.data.success) {
        setPostList([...response.data.postList]); // 기존 PostList도 함께
        // 0 idx ~ 4 idx
        // 다음으로 찾을 idx는 5 idx ~ 9 idx : 더 불러오면 이전 5개는 skip
        // 다음으로 찾을 idx는 10 idx ~ 14 idx : skip이 10만큼 되어야 함
        setSkip(response.data.postList.length);
        
        // 만약 게시글이 총 12개이면,
        // limit 5 * 2 + 2
        // 반드시 2개가 남는 시점이 옴
        if (response.data.postList.length < 5) {
          setLoadMore(false);
        }
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

      {/* 검색, 정렬 UI */}
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
      {
        LoadMore &&
        (<div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '100px 0px' }}>
           <Button variant="secondary" size="sm" style={{ width: 'auto', padding: '5px 10px' }} onClick={() => getPostLoadMore()}>더 불러오기</Button>
        </div>)
      }
      
    </div>
  );
}

export default MainPage;