import React,{ useState,ChangeEvent,} from 'react'
import { handleInputChange } from '../components/utils/formUtils';
// import { Moment } from 'moment'; 

export default function SignIn() {
    // const [mail , setMail]= useState<string>();
    const [name , setName]= useState<string>();
    const [surname , setSurname]= useState<string>();
    const [username , setUsername]= useState<string>();
    const [password , setPassword]= useState<string>();
    // const [date, setDate] = useState<string>('0');

    const userData = {
        firstName: name,
        lastName: surname,
        username: username,
        password: password,
        age: 20,
    }
    
    
    const submitEvent = (e:React.FormEvent) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
            .then(res => res.json())
            .then(console.log);
        }else{
            alert("Lütfen bilgileri eksiksiz giriniz!");
        }
    };

    // const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    //     const inputDate = new Date(e.target.value);
    //     if (!isNaN(inputDate.getTime())) {
    //       const newDateMoment : Moment = moment(inputDate);
    //       const newDate = newDateMoment.format('YYYY-MM-DD');
    //       setDate(newDate);
    //       console.log(newDate); 
    //     } else {
    //       console.error("Geçerli bir tarih seçiniz!");
    //     }
    // };
    
  return (
    <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                 <form className="space-y-6" action="#" method="POST"  onSubmit={submitEvent} >
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                         <div className="mt-2">
                             <input id="email" name="email" onChange={(e) => handleInputChange(e, setName)} type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                         </div> 
                     </div>
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Surname</label>
                         <div className="mt-2">
                             <input id="email" name="email" onChange={(e) => handleInputChange(e, setSurname)} type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                         </div> 
                     </div>
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">username</label>
                         <div className="mt-2">
                             <input id="email" name="email" onChange={(e) => handleInputChange(e, setUsername)} type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                         </div> 
                     </div>
                     {/* <input type="date" value="" onChange={onChangeDate}  /> */}
                     <div>
                         <div className="flex items-center justify-between">
                            <label  htmlFor="password"  className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                         </div>
                         <div className="mt-2">
                             <input id="password" name="password"  onChange={(e) => handleInputChange(e, setPassword)} type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                         </div>
                     </div>
                     <div>
                         <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                     </div>
                 </form>
             </div>
         </div>
    </>
  )
}
function moment(arg0: Date) {
    throw new Error('Function not implemented.');
}

