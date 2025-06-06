import { useState, useEffect, useRef } from 'react';

function useDebouncedFetch(fetchFunction, delay = 500) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef('');
  const debounceTimeout = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchDataDebounced = (search) => {
    // Обновляем референс поиска
    searchRef.current = search;

    // Очищаем предыдущий таймаут
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Устанавливаем новый таймаут
    debounceTimeout.current = setTimeout(async () => {
      // Отменяем предыдущий запрос, если есть
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction(searchRef.current, controller.signal);
        setData(result.map(item => item.title)); // предполагаем что API возвращает объекты с полем title
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Ошибка при загрузке данных');
        }
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  // Очистка таймаутов и отмена запросов при размонтировании или изменении
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return { data, loading, error, fetchDataDebounced };
}

export default useDebouncedFetch;
