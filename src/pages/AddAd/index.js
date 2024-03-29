import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import {
  ErrorMessage,
  PageContainer,
  PageTitle
} from '../../components/MainComponets';
import { PageArea } from './styled';

import useApi from '../../helpers/OlxApi';

const Page = () => {
  const api = useApi();

  const fileField = useRef();
  const history = useHistory()

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError('');
    let errors = [];

    if (!title.trim()) {
      errors.push('Sem título');
    }

    if (!category) {
      errors.push('Sem categoria');
    }

    if (errors.length === 0) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('priceneg', priceNegotiable);
      formData.append('desc', desc);
      formData.append('category', category);

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          formData.append('img', fileField.current.files[i]);
        }
      }

      const json = await api.addAd(formData)

      if(!json.error) {
        history.push(`/ad/${json.id}`)
        return
      } else {
        setError(json.error)
      }

    } else {
      setError(errors.join('\n'));
    }

    setDisabled(false);
  };

  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
  });

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area-title">Título</div>
            <div className="area-input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area-title">Categoria</div>
            <div className="area-input">
              <select
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area-title">Preço</div>
            <div className="area-input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$ "
                disabled={disabled || priceNegotiable}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </label>

          <label className="area rememberPassword">
            <div className="area-title">Preço Negociável</div>
            <div className="area-input-checbox">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area-title">Descrição</div>
            <div className="area-input">
              <textarea
                disabled={disabled}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </label>

          <label className="area">
            <div className="area-title">Imagens (1 ou mais)</div>
            <div className="area-input-checbox">
              <input type="file" disabled={disabled} ref={fileField} multiple />
            </div>
          </label>

          <label className="area">
            <div className="area-title"></div>
            <div className="area-input">
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
