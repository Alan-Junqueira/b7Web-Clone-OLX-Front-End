import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { PageContainer } from '../../components/MainComponets';
import { PageArea } from './styled';

import useApi from '../../helpers/OlxApi';

import AdItem from '../../components/partials/AdItem';

let timer;
const Page = () => {
  const api = useApi();
  const history = useHistory();

  // useLocation().search pega a query string
  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQueryString();

  const [q, setQ] = useState(query.get('q') !== null ? query.get('q') : '');
  const [cat, setCat] = useState(
    query.get('cat') !== null ? query.get('cat') : ''
  );
  const [state, setState] = useState(
    query.get('state') !== null ? query.get('state') : ''
  );

  const [adsTotal, setAdsTotal] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [resultOpacity, setResultOpacity] = useState(1);
  const [loading, setLoading] = useState(true);

  const getAdsList = async () => {
    setLoading(true);
     let offset = (currentPage - 1) * 9

    const json = await api.getAds({
      sort: 'desc',
      limit: 9,
      q,
      cat,
      state,
      offset
    });
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  useEffect(() => {
    if (adList.length > 0) {
      setPageCount(Math.ceil(adsTotal / adList.length));
    } else {
      setPageCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adsTotal]);

  useEffect(() => {
    setResultOpacity(0.3);
    getAdsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    let queryString = [];
    if (q) {
      queryString.push(`q=${q}`);
    }

    if (cat) {
      queryString.push(`cat=${cat}`);
    }

    if (state) {
      queryString.push(`state=${state}`);
    }

    history.replace({
      search: `?${queryString.join('&')}`
    });

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(getAdsList, 2000);
    setResultOpacity(0.3);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cat, state, history]);

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

  let pagination = [];
  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i);
  }

  

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <div className="filterName">Estado: </div>
            <select
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option></option>
              {stateList.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <div className="filterName">Categoria: </div>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={
                    cat === category.slug
                      ? 'categoryItem active'
                      : 'categoryItem'
                  }
                  onClick={() => setCat(category.slug)}
                >
                  <img src={category.img} alt="" />
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>

        <div className="rightSide">
          <h2>Resultados</h2>
          {loading && adList.length === 0 && (
            <div className="listWarning">Carregando...</div>
          )}
          {!loading && adList.length === 0 && (
            <div className="listWarning">Não encontramos resultados.</div>
          )}
          <div className="list" style={{ opacity: resultOpacity }}>
            {adList.map((ad, index) => (
              <AdItem key={index} data={ad} />
            ))}
          </div>
          <div className="pagination">
            {pagination.map((page, index) => (
              <div
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? 'pagItem active' : 'pagItem'}
                key={index}
              >
                {page}
              </div>
            ))}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
