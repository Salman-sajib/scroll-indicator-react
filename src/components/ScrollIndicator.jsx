import { useEffect, useState } from 'react';

function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  }

  console.log(data);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Custom Scroll Indicator</h1>
      <div className='data-container'>
        {data && data.length > 0
          ? data.map((dataItem) => <p key={dataItem.id}> {dataItem.title} </p>)
          : null}
      </div>
    </div>
  );
}

export default ScrollIndicator;
