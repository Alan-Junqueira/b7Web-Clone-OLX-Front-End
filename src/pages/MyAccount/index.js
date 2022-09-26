import React, { useEffect, useState } from 'react';
import { PageContainer, PageTitle } from '../../components/MainComponets';
import AdItem from '../../components/partials/AdItem';
import useApi from '../../helpers/OlxApi';
import { PageArea } from './styled';

const Page = () => {
  const api = useApi();

  const [userData, setUserData] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [ads, setAds] = useState([]);
  const [wrongPassword, setWrongPassword] = useState(false) 

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      let getUserFromApi = await api.getUser();
      setUserData(getUserFromApi);
      setName(getUserFromApi.name);
      setEmail(getUserFromApi.email);
      setState(getUserFromApi.state);
      setAds(getUserFromApi.ads);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(userData);

  const handleUpdateData = (e) => {
    setDisabled(true)
    e.preventDefault();
    if(password === passwordConfirm) {
      api.updateUser({
        name, email, state, password
      })
    } else {
      setWrongPassword(true)
    }
    setDisabled(false)
  }

  return (
    <PageContainer>
      <PageTitle>Minha Conta</PageTitle>
      <PageArea>
        <div className="formContainer">
          <form>
            <label className="area" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id="name"
              disabled={disabled}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="area" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              disabled={disabled}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="area" htmlFor="state">
              Estado
            </label>
            <input
              type="text"
              id="state"
              disabled={disabled}
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />

            <label className="area" htmlFor="newPassword">
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              disabled={disabled}
              value={password}
              placeholder="Digite sua nova senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="area" htmlFor="passwordConfirm">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="passwordConfirm"
              disabled={disabled}
              placeholder="Confirme sua nova senha"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            {wrongPassword &&
              <p className='wrongPassword'>Senhas não batem</p>
            }
            <button onClick={handleUpdateData}>Atualizar Dados</button>
          </form>
        </div>

        <div className="adsContainer">
          {ads.map((ad, index) => (
            <AdItem key={index} data={ad}/>
          ))}
        </div>
      </PageArea>
      <img src="2fc9a5b5-8db3-4ead-9a35-a1f1053ad204.jpg" alt=''/>
    </PageContainer>
  );
};

export default Page;
