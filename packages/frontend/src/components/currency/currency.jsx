import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  startAsyncRequest,
  finishAsyncRequest,
} from '../../redux/global/slice';

import Loader from '../loader/loader';
import './currency.scss';

export default function Currency() {
  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState([]);
  const filter = ['USD', 'EUR', 'CHF', 'GBP'];

  useEffect(() => {
    async function fetchCurrenciesFromAPI() {
      try {
        const lastCurrenciesRequestTime =
          localStorage.getItem('lastRequestTime');
        const currentTime = new Date().getTime();
        if (
          lastCurrenciesRequestTime &&
          currentTime - lastCurrenciesRequestTime < 60 * 60 * 1000
        ) {
          const cachedCurrencies = JSON.parse(
            localStorage.getItem('currencies')
          );
          return cachedCurrencies;
        }

        dispatch(startAsyncRequest());

        const response = await fetch(
          'https://api.nbp.pl/api/exchangerates/tables/C?format=json'
        );
        const data = await response.json();
        const fetchedCurrencies = data[0].rates;

        localStorage.setItem('lastCurrenciesRequestTime', currentTime);
        localStorage.setItem('currencies', JSON.stringify(fetchedCurrencies));

        return fetchedCurrencies;
      } catch (error) {
        console.error('Error fetching currencies:', error);
        throw error;
      } finally {
        dispatch(finishAsyncRequest());
      }
    }

    fetchCurrenciesFromAPI()
      .then((fetchedCurrencies) => {
        const filtered = fetchedCurrencies.filter((currency) =>
          filter.includes(currency.code)
        );
        setCurrencies(filtered);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="currency">
      {currencies.length === 0 ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Currency</td>
              <td>Purchase</td>
              <td>Sell</td>
            </tr>
          </thead>
          <tbody>
            {currencies.map((item) => {
              return (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.bid}</td>
                  <td>{item.ask}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
