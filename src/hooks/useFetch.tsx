import { useState, useEffect } from 'react';

const useFetch = <T,>(url: string): { data: T | null; loading: boolean; error: Error | null,setData: React.Dispatch<React.SetStateAction<T | null>> } => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data); 
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        return () => {
            setData(null); 
            setLoading(true);
            setError(null);
        };
    }, [url]);
    return { data, loading, error , setData}; 
};

export default useFetch;
