import React from 'react';

import { Banner } from '../../components/views/publishing/MainPage';
import { LectureList } from '../../components/views/publishing/MainPage/LectureList';
import { Schedule } from '../../components/views/publishing/MainPage/Schedule';
import "./MainPublishingPage.css";

function MainPublishingPage() {
  return (
    <main id='mainWapper'>
      <Banner />
      <div className='mainPublishingPage'>
        <LectureList />
        <Schedule />
      </div>
    </main>
  )
}

export default MainPublishingPage