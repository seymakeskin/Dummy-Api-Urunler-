import React,{ useState , useEffect,} from 'react'
import { Link } from 'react-router-dom';
import { handleInputChange } from '../components/utils/formUtils';

export default function Login() {
    // const [mail , setMail]= useState<string>();
    const [username , setUsername]= useState<string>();
    const [password , setPassword]= useState<string>();
    const [isLogedIn,setIsLogedIn] = useState<string>('');

    const submitEvent = (e:React.FormEvent) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to login');
                }
            }).then(data => {
                setIsLogedIn(data.token)
                localStorage.setItem("userInfo", JSON.stringify(data));
            })
            .catch(error => {
                alert(error);
            });
        }else{
            alert("Lütfen bilgileri eksiksiz giriniz!");
        }
    };

    useEffect(() => {
        const logedInUser = localStorage.getItem('userInfo');
        if (logedInUser) {
            const parsedData = JSON.parse(logedInUser);
            setIsLogedIn(parsedData.token)
        }
    }, [isLogedIn]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setIsLogedIn('');
    };
  return (
    <>
        {isLogedIn ? (
            <div className="container mx-auto p-2 mt-8">
                <h1>Giriş Başarılı!</h1>
                <h1 className="text-2xl font-bold text-gray-700 px-6 md:px-0">Hesabım</h1>
                <button onClick={handleLogout} className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Çıkış Yap</button>
            </div>
        ) : (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                 <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
             </div>
             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                 <form className="space-y-6" action="#" method="POST"  onSubmit={submitEvent}>
                    <p>Giriş yapmak için ;<br/>
                        username: 'kminchelle',
                        password: '0lelplR',
                    </p>
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                         <div className="mt-2">
                             <input id="email" name="email" onChange={(e) => handleInputChange(e, setUsername)}
                             type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                         </div> 
                     </div>
                     <div>
                         <div className="flex items-center justify-between">
                            <label  htmlFor="password"  className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                         </div>
                         <div className="mt-2">
                             <input id="password" name="password"  onChange={(e) => handleInputChange(e, setPassword)}
                               type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                         </div>
                     </div>
                     <div>
                         <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                     </div>
                     <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or <br/>
                            <Link to={'/signin'} type="button" className="font-medium text-indigo-600 hover:text-indigo-500"> Continue Shopping</Link>
                        </p>
                    </div>
                 </form>
             </div>
         </div>
    )}   
 </>
  )
}
