import { Link } from 'react-router-dom'

export function ErrorPage(){
    return(
        <div className='flex flex-col text-white w-full justify-center items-center min-h-screen '>
            <h1 className='font-bold text-4xl mb-4'>404 - Página não encontrada</h1>
            <p className=' italic text-1xl mb-4'>Você caiu em uma página que nnão existe!</p>
        
        <Link
        className='bg-gray-50/20 py-1 px-4 rounded-md' 
         to={"/"}> Voltar para a Home</Link>
        </div>
    )
}