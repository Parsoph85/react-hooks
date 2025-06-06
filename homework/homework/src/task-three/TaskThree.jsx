import React, { useState } from 'react';
import './TaskThree.css';
import useDebouncedFetch from './useDebouncedFetch';

// функция для получения данных с Mock API
const fetchData = async (search, signal) => {
  // Обратите внимание: API по умолчанию не поддерживает параметр search,
  // поэтому используйте фильтрацию на клиенте или другой API.
  // Для примера используем фиктивный URL.
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, { signal });
  
  if (!response.ok) throw new Error('Ошибка сети');
  
  const data = await response.json();

  // Фильтрация по поисковому запросу (если нужно)
  if (search) {
    return data.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
  }
  
  return data;
};

export default function TaskThree() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: posts, loading, error, fetchDataDebounced } = useDebouncedFetch(fetchData);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchDataDebounced(value);
  };

  return (
    <div className="TaskThree">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search posts"
        value={searchTerm}
      />
      
      {loading && <p>Загрузка...</p>}
      
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      
      <h1>Posts</h1>
      
      <ul>
        {posts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
