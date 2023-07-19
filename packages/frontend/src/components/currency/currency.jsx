import { useEffect, useState } from 'react';
import Loader from '../loader/loader';

export const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [filter, setFilter] = useState(['USD', 'EUR', "CHF", "GBP"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrenciesFromAPI() {
      try {
        const lastCurrenciesRequestTime = localStorage.getItem('lastRequestTime');
        const currentTime = new Date().getTime();

        // const minus = currentTime - lastCurrenciesRequestTime
        // console.log(minus)

        // Check if less than an hour has passed since the last request
        if (lastCurrenciesRequestTime && currentTime - lastCurrenciesRequestTime < 60 * 60 * 1000) {
          const cachedCurrencies = JSON.parse(
            localStorage.getItem('currencies')
          );
          return cachedCurrencies;
        }

        const response = await fetch(
          'https://api.nbp.pl/api/exchangerates/tables/C?format=json'
        );
        const data = await response.json();
        const fetchedCurrencies = data[0].rates;

        // Store last request time and response in localStorage
        localStorage.setItem('lastCurrenciesRequestTime', currentTime);
        localStorage.setItem('currencies', JSON.stringify(fetchedCurrencies));

        return fetchedCurrencies;
      } catch (error) {
        console.error('Error fetching currencies:', error);
        throw error;
      }
    }

    fetchCurrenciesFromAPI()
      .then((fetchedCurrencies) => {
        const filtered = fetchedCurrencies.filter((currency) =>
          filter.includes(currency.code)
        );
        setCurrencies(filtered);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Currency</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.code}>
                <td>{currency.code}</td>
                <td>{currency.bid}</td>
                <td>{currency.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
