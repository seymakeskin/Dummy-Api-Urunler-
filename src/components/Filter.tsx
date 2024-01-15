import React, { useState , useEffect} from 'react';

export default function Filter({selectedCategories,setSelectedCategories}:any) {
    
//     const baseUrl = 'https://dummyjson.com/products/categories';
//     const [categories , setCategories]= useState<any[]>();
  
//    useEffect(() => {
//      fetch(baseUrl).then((response) => {
//        if (!response.ok) {
//            throw (response.status);
//        }
//        return response.json();
//      }).then((responseData) => {
//        setCategories(responseData.products);
//      }).catch((error) => {
//         console.log('error',error);
//      });
//    },[])
//    console.log('categories', categories);

    const categories = [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting"
    ]
    const [checked , setChecked]= useState();


    const FilterButtons = () => {
        const button = categories.map((categorie, index) => (
            <div key={index} className='px-2'>
                <label className='uppercase'>
                    <input
                        type="checkbox"
                        className='mr-2'
                        name="category"
                        value={categorie}
                        onChange={(e) => {
                            (
                                selectedCategories && Array.isArray(selectedCategories) && selectedCategories.includes(categorie) ? 
                                    setSelectedCategories(selectedCategories.filter(selectedCategories => selectedCategories != categorie))
                                :
                                    setSelectedCategories([...selectedCategories, categorie])
                            )
                           
                        }}
                    />
                    {categorie}
                </label>
            </div>
        ));
    
        return <div>{button}</div>;
    };
      
    return (
        <div className="rounded-lg bg-white p-2 ">
                <FilterButtons></FilterButtons> 
        </div>
    )
}
