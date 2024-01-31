import { useState , useEffect} from 'react';

export default function Filter({selectedCategories,setSelectedCategories}:any) {
    
    const baseUrl = 'https://dummyjson.com/products/categories';
    const [categories , setCategories]= useState<any>();
    useEffect(() => {
       fetch(baseUrl).then((response) => {
         if (!response.ok) {
             throw (response.status);
         }
         return response.json();
       }).then((responseData) => {
         setCategories(responseData);
       }).catch((error) => {
          console.log('error',error);
       });
    },[])
      
    return (
        <>
         {categories &&(
                 <>
                     {
                         categories.map((categorie:string, index:number) => (
                             <div key={index} className='px-2'>
                                 <label className='uppercase'>
                                     <input
                                         type="checkbox"
                                         className='mr-2'
                                         name="category"
                                         value={categorie}
                                         checked={selectedCategories && Array.isArray(selectedCategories) && selectedCategories.includes(categorie)}
                                         onChange={(e) => {
                                             (
                                                 selectedCategories && Array.isArray(selectedCategories) && selectedCategories.includes(categorie) ? 
                                                     setSelectedCategories(selectedCategories.filter(selectedCategories => selectedCategories !== categorie))
                                                 :
                                                     setSelectedCategories([...selectedCategories, categorie])
                                             )
                                         }}
                                     />
                                     {categorie}
                                 </label>
                             </div>
                         ))
                     }
                 </>
         )}
        </>
    )
}
