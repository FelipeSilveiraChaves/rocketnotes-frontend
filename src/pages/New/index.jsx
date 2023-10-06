import { Container, Form } from "./styles";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { Header } from "../../components/header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/Noteitem";
import { Section } from "../../components/Section";
import { Button } from "../../components/button";
import { ButtonText } from "../../components/ButtonText";

import { api } from "../../service/api";

export function New(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([]); //vetor onde armazena os links antigos
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1)
    }

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink])  // Precisa do newLink para armazenar os links antigos
        setNewLink("")

    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted)) //retorna uma listagem que o que filtramos
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]); //spred operator, ele faz com que dispeje o conteudo da outra lista na lista nova, para que não exista uma lista dentro de outra lista
        setNewTag("")
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote(){
        if(!title){
            return alert("Digite o titulo da nota.")
        }
        if(newLink){
            return alert("Você deixou um link no campo para adicionar, mas não adicionou.")  
        }
        if(newTag){
            return alert("Você deixou uma tag no campo para adicionar, mas não adicionou.")
        }


        await api.post("/notes", 
        {
            title,
            description,
            tags,
            links
        });

        alert("Nota criada com sucesso!")
        navigate(-1);
    }


    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText 
                        title={"Voltar"}
                        onClick={handleBack}
                        />
                    </header>

                    <Input 
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}

                    />
                    <Textarea 
                    placeholder="Observações" 
                    onChange={e => setDescription(e.target.value)}
                    />
                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                key={String(index)} //sempre que tiver um componente que é renderizado em lista precisa de uma key, index é a posição do array que o map retorna, padrao do React que seja em texto
                                value={link}
                                onClick={() => handleRemoveLink(link)} //quando se usa parametro se usa assim
                                />
                            ))
                        }
                        <NoteItem 
                        isnew 
                        placeholder="Novo Link"
                        value={newLink} // valor inicial do input, nesse caso nao é nada e fica somente o placeholder pois pega o array vazio
                        onChange={e => setNewLink(e.target.value)}
                        onClick={handleAddLink}
                        />
                    </Section>
                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) =>(
                                    <NoteItem
                                    key={String(index)}
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                            isnew
                            placeholder="Nova tag"
                            onChange={e => setNewTag(e.target.value)}
                            value={newTag}
                            onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button 
                    title="Salvar"
                    onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    );
}