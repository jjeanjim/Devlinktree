import { Header } from "../../Components/header";
import { Input } from '../../Components/input'
import { FormEvent, useState, useEffect } from 'react'

import { FiTrash } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc} from  'firebase/firestore'

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlLink, setUrlLink] = useState("");
    const [textColor, setTextColor] = useState("#f1f1f1");
    const [backgroundColor, setBackgroundColor] = useState("#121212");
    const [links, setLinks ] = useState<LinkProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, "Links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const onsub = onSnapshot(queryRef, (snapshot) => {

            let lista = [] as LinkProps[];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color


                })
            })
            setLinks(lista);

        })
        return () => {
            onsub();
        }


    },[])

    function handleRegister(e: FormEvent){
        e.preventDefault();
        if(nameInput === '' || urlLink === ''){
            alert("Preencha todos os campos!")
            return;
        }
        addDoc(collection(db, "Links"), {
            name: nameInput,
            url: urlLink,
            bg:backgroundColor,
            color:textColor,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlLink("")
            setBackgroundColor("")
            setTextColor("")

            console.log("USUARIO CADASTRADO")
        })
        .catch((error) => {
            console.log("ERRO AO CADASTRAR" + error);
        })
        
    }
    async function handleDeleLink(id: string){
        const docRef = doc(db, "Links", id)
        await deleteDoc(docRef);
    }
    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2 " >
            <Header />


            <form  className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister} >
                <label className="text-white font-medium mt-2 mb-2 " >Nome do Link</label>
                <Input
                    placeholder={"Digite o nome do link..."}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2 " >Nome url do Link</label>
                <Input
                    placeholder={"Digite o url do link..."}
                    type="url"
                    value={urlLink}
                    onChange={(e) => setUrlLink(e.target.value)}
                />

            <section className="flex my-4 justify-between">
                <div className="flex gap-2 " >
                    <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <label className="text-white font-medium mt-3 mb-2">Fundo do Link</label>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                </div>
            </section>

            {nameInput !== '' && (
                <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md ">
                <label className="text-white font-medium mt-2 mb-2">Veja como está ficando: </label>
                <article 
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded bg-zinc-900 px-1 py-3"
                    style={{marginBottom: 8, marginTop: 8, background:backgroundColor}}
                >
                    <p className="font-medium" style={{color: textColor}}>{nameInput}</p>
                </article>
                </div>
            )}
            <button type="submit" className="bg-blue-600 h-9 rounded text-white">
                Cadastrar
            </button>
        </form>
        <h2 className="font-bold text-white mb-4 text-2xl">
            Meus links
        </h2>

        {links.map( (link)=> (
            <article
            key={link.id}
            className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none "
            style={{backgroundColor: link.bg , color: link.color}}
            >
                <p>{link.name}</p>
                <div>
                    <button className= "border border-dashed p-1 rounded"
                    onClick={ () => handleDeleLink(link.id) }
                    >
                        <FiTrash size={18} color="#FFF" />
                    </button>
                </div>
            </article>
        ))}
    </div>
    )
}