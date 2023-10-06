import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';

import { FiPlus } from 'react-icons/fi';


import { Container, Brand, Menu, Search, Content, NewNote} from './styles'

import { Header } from '../../components/header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

export function Home(){
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([])
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName){
        if(tagName === "all"){
            return setTagsSelected([]) //colocamos que a condição do todos ficar colorido era o array (tagsSelected)ter 0 no length
        }

        const alreadySelected = tagsSelected.includes(tagName); //retorna true nas que tao selecionada e false nas que nao tao

        if(alreadySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName); //compara se o item (tag) é diferente de tagName, se for ele é mandado para o novo array
            setTagsSelected(filteredTags); //lista com o outro retirado ja
            //basicamente ele faz para que quando clicar verificar se ta na lista de selecionados, se tiver o filter vai tirar assim ficando sem ser selecionado
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }

    }

    function handleDetails(id){
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags(){ //useEffect não aceita async nele em si, então quando for utilizar funções asincronas nele pode se criar dentro dele mesmo
            const response = await api.get("/tags");
            setTags(response.data)
        }
        fetchTags()
    }, [])

    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }
        fetchNotes()
    },[tagsSelected, search]) //quando mudar um conteudo de um desses aqui ele roda denovo o UseEffect

    return(
    <Container>
        <Brand>
            <h1>Rocketnotes</h1>
        </Brand>

        <Header />

        <Menu>
            <li>
                <ButtonText title="Todos" isActive={tagsSelected.length === 0} onClick={() => handleTagSelected("all")}/></li>
            {
                tags && tags.map(tag => (
                <li key={String(tag.id)}>
                    <ButtonText 
                    onClick={() => handleTagSelected(tag.name)}
                    title={tag.name} 
                    isActive={tagsSelected.includes(tag.name)} //includes verifica se ta incluso 
                    />
                </li>
                ))
            }

        </Menu>

        <Search>
            <Input 
            placeholder="Pesquisar pelo título"
            onChange={(e) => setSearch(e.target.value)}
            />
        </Search>

        <Content>
            <Section title="Minhas notas">
                {
                    notes.map(note => (
                        <Note 
                        data={note} 
                        onClick={() => handleDetails(note.id)}
                        key={String(note.id)}
                        />
                    ))  
                }
            </Section>
        </Content>

        <NewNote to='/new'>
            <FiPlus />
            Criar nota
        </NewNote>
    </Container>
    )
}