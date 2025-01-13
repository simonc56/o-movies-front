import { Paper } from '@mantine/core';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { useEffect } from 'react';
import { News } from '../../../@types/SettingsState';
import { saveNews } from '../../../features/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isoDateToFrench } from '../../../utils/utils';
import staticNews from './staticNews';

export default function NewsFeed() {
  const allNews: News[] = useAppSelector((state) => state.settings.news.allNews);
  const rssFeedUrl = useAppSelector((state) => state.settings.news.rssFeedUrl);
  const forbiddenWords = useAppSelector((state) => state.settings.news.forbiddenWords);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // remove news when title or description contain forbidden word
    function filterNews(news: News) {
      return !forbiddenWords.some(
        (word) => news.title.toLowerCase().includes(word) || news.description.toLowerCase().includes(word)
      );
    }

    // trick function to decode HTML entities
    // used twice because 'Première' RSS uses double html escape such as : d&amp;#039;Eric
    function decodeHTMLEntities(str: string) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = str;
      return textarea.value.replace(/<[^>]*>/g, '');
    }

    async function fetchNews() {
      try {
        const response = await axios.get(rssFeedUrl);
        const result = new XMLParser({
          processEntities: false, // do not decode entities, i do it myself with decodeHTMLEntities
          tagValueProcessor: (_, tagValue) => decodeHTMLEntities(decodeHTMLEntities(tagValue)),
        }).parse(response.data);
        const allowedNews = result.rss.channel.item.filter(filterNews);
        dispatch(saveNews(allowedNews));
      } catch {
        // eslint-disable-next-line no-console
        console.error(`Error while fetching RSS news from ${rssFeedUrl} : check if rss provider is still available`);
      }
    }
    if (allNews.length === 0) fetchNews();
  }, [allNews, rssFeedUrl, forbiddenWords, dispatch]);

  // function to remove square brackets tags like '[review]'
  function removeSquareBracketsTags(text: string) {
    return text.replace(/\[.*?\]/g, '');
  }

  return (
    <>
      {Array.prototype.concat(allNews, staticNews).map((news: News) => (
        <Paper key={news.guid} shadow="xl" p="md" className="news">
          <div className="header-news">
            <h3>{removeSquareBracketsTags(news.title)}</h3>
            <span>{isoDateToFrench(news.pubDate.split('T')[0])}</span>
          </div>
          {news.description}
        </Paper>
      ))}
    </>
  );
}
