import { useEffect, useState } from "react"
import { Social } from '../../Components/social'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { db } from "../../services/firebaseConnection"
import { getDocs, collection, orderBy, query, doc, getDoc } from "firebase/firestore"


interface LinksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string
}

interface SocialLinkProps {
    facebook: string;
    youtube: string;
    instagram: string;
}



export function Home() {
    const [links, setLinks] = useState<LinksProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();


    useEffect(() => {
        function loadLinks() {
            const linkRef = collection(db, "Links")
            const queryRef = query(linkRef, orderBy("created", "asc"))
            getDocs(queryRef)
                .then((snapshot) => {
                    let lista = [] as LinksProps[];

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
        }
        loadLinks();
    }, [])

    useEffect(()=> {
       function loadSocialLinks(){
        const docRef = doc(db, "social", "link")
        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setSocialLinks({
                    facebook: snapshot.data()?.facebook,
                    instagram: snapshot.data()?.instagram,
                    youtube: snapshot.data()?.youtube,
                })
            }
        })
       }

       loadSocialLinks();
    },[])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4x1 text-3xl font-bold text-white mt-20" >LinkTree</h1>
            <span className="text-gray-50 mb-5 mt-3" >Veja meus links 🦉</span>
            <main className="flex flex-col w-11/12 max-w-xl text-center">
               {links.map((link) => (
                 <section
                 style={{background: link.bg}}
                 key={link.id} 
                 className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                 <a href={link.url} target="_blank">
                     <p className="text-base md:text-lg "
                     style={{color: link.color}}>
                        {link.name}
                    </p>
                 </a>
             </section>
               ))}
                {socialLinks && Object.keys(socialLinks).length > 0 &&
                <footer className="flex justify-center gap-3 my-4">

                <Social url={socialLinks.facebook}>
                    <FaFacebook size={35} color="#FFF" />
                </Social>
                <Social url={socialLinks.instagram}>
                    <FaYoutube size={35} color="#FFF" />
                </Social>
                <Social url={socialLinks.youtube}>
                    <FaInstagram size={35} color="#FFF" />
                </Social>
                </footer>
             }
            </main>
        </div>

    )
}