import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import Card from './Card';
import { useParams } from 'react-router-dom';

function SearchResults({ match }) {

  const { input } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async (query) => {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&page=1&country=US&category_id=aps`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c539ea99cemsh7a4fe5251b26368p171ffejsn0551d0287fd3',
        'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com',
      },
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (data.data && data.data.products && data.data.products.length > 0) {
        setResults(data.data.products);
      } else {
        setResults([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = input;
    fetchData(query);
  }, [input]);

  if (loading) {
    return <div className='buffering'>Loading...</div>;
  } 

  if (results.length > 0) {
    return (
      <div className="search-results">
        {results.map((product) => (
          <Card
            key={product.asin}
            id={product.asin}
            title={product.product_title || 'No title available'}
            image={product.product_photo || 'default_image_url'} // provide a default image URL if needed
            price={product.product_price ? Number(product.product_price.substring(1)) : 0}
            rating={product.product_star_rating ? Math.round(product.product_star_rating) : 0}
          />
        ))}
      </div>
    );
  } else {
    return <div className='buffering'>No results found.</div>;
  }
}

export default SearchResults;
