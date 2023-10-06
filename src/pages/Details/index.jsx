import { Container, Links, Content } from './styles';

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { api } from '../../service/api';

import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { Tag } from '../../components/Tag';

export function Details(){
  const [data, setData] = useState(null);

  const params = useParams(); //para pegar o id dos params da url
  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?"); // true or false

    if(confirm){
      await api.delete(`/notes/${params.id}`);
      navigate(-1)
    }
  }
  

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    
    fetchNote()
    console.log(data)
  },[])
  return(
    <Container>

      <Header/>
      {
        data && //saber se de fato existe 
        <main>
          <Content>
            <ButtonText  title="Excluir Nota" onClick={handleRemove}/>

            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>
            { data.links && //só vai renderizar se existir links
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target='_blank'>
                        {link.url}
                      </a>
                    </li>
                    ))
                  }
                </Links>
              </Section>
            }

            { 
             data.tags && //só renderiza essa sessão se tiver tags, basicamente isso
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag
                    key={String(tag.id)}
                    title={tag.name}
                    />
                  ))
                }
              </Section>
            }


            <Button 
            title="Voltar" 
            onClick={handleBack}
            />

          </Content>
        </main>
      }
    </Container>
  )
}