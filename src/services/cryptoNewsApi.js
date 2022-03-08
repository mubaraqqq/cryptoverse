import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/';

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'a2a93b20a9mshd63fdbc1d1e4213p1b6f20jsn0f1693ce22e0'
};

const baseUrl = `https://bing-news-search1.p.rapidapi.com`;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;