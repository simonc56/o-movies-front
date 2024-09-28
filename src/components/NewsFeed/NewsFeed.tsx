import { Paper } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Parser } from 'xml2js';
import { isoDateToFrench } from '../../utils/utils';

const rssFeedUrl = 'http://www.premiere.fr/rss/actu-cinema';
const quantityOfNews = 3;

type News = {
  title: string;
  pubDate: string;
  description: string;
  guid: string;
};

export default function NewsFeed() {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    // remove news whose title contains forbidden word
    function filterNews(news: News) {
      const forbiddenWords = ['bande-annonce', 'trailer', 'teaser', 'première'];
      // const forbiddenWords = ['première'];
      return !forbiddenWords.some((word) => news.title.toLowerCase().includes(word));
    }

    async function fetchNews() {
      const response = await axios.get(rssFeedUrl);
      const parser = new Parser({ explicitArray: false, mergeAttrs: true });
      parser.parseString(response.data, (err, result) => {
        const allowedNews = result.rss.channel.item.filter(filterNews);
        setAllNews(allowedNews.slice(0, quantityOfNews));
      });
    }
    fetchNews();
  }, []);

  // function to remove square brackets tags like '[review]'
  function removeSquareBracketsTags(text: string) {
    return text.replace(/\[.*?\]/g, '');
  }

  return allNews.map((news: News) => (
    <Paper key={news.guid} shadow="xl" p="md" className="news">
      <div className="header-news">
        <h3>{removeSquareBracketsTags(news.title)}</h3>
        <span>{isoDateToFrench(news.pubDate.split('T')[0])}</span>
      </div>
      {news.description}
    </Paper>
  ));
}
