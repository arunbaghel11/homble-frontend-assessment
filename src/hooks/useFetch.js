import { useState, useEffect, useCallback } from 'react';
import { getRequest } from '../axios';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await getRequest(url, options);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
