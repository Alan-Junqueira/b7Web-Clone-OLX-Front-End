import React, { useState, useEffect } from 'react';

import { PageContainer } from '../../components/MainComponets';
import { PageArea, SearchArea } from './styled';

import useApi from '../../helpers/OlxApi';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, [api]);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, [api]);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8
      });
      setAdList(json.ads);
    };
    getRecentAds();
  }, [api]);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((state, index) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/ads?cat=${category.slug}`}
                className="categoryItem"
              >
                <img src={category.img} alt={category.name} />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adList.map((ad, index) => (
              <AdItem key={index} data={ad} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver todos
          </Link>
          <hr />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
