import React, { Component } from 'react';

import { tweetWrapper } from '../stylesheets/news.css';

export default class News extends Component {
  render() {
    return (
      <div className={tweetWrapper}>
        <h2 id="news">Latest Updates</h2>
        <a
          className="twitter-timeline"
          data-dnt="true"
          data-link-color="#3C6DC7"
          data-tweet-limit="3"
          data-chrome="noheader, noscrollbar, nofooter"
          href="https://twitter.com/cabinetvotes"
        >
          @cabinetvotes on Twitter
        </a>
      </div>
    );
  }
}
