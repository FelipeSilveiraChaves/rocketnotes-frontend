- [REGRAS GERAIS DO REACT](#regras-gerais-do-react)
- [ESTRUTURA DE ARQUIVOS](#estrutura-de-arquivos)
- [DIFERENÇA DO EXPORT DEFAULT E O EXPORT](#diferença-do-export-default-e-o-export)
- [FRAGMENT](#fragment)
- [TEMAS](#temas)
- [ESTRUTURA DO STYLED-COMPONENTS](#estrutura-do-styled-components)
- [PROPRIEDADES](#propriedades)
- [REST OPERATOR](#rest-operator)
- [CHILDREN](#children)
- [MAP](#map)
- [CONCEITO E CAMINHOS DO ROUTES](#conceito-e-caminhos-do-routes)
- [ENTENDENDO OS ARQUIVOS DO ROUTES](#entendendo-os-arquivos-do-routes)
- [AXIOS](#axios)
- [useSTATE](#usestate)
- [useEffect](#useeffect)
- [auth.jsx](#authjsx)
- [ENTENDENDO A LÓGICA DE EXIBIÇÃO DE IMAGEM](#entendendo-a-lógica-de-exibição-de-imagem)
- [USANDO PARAMETROS NAS FUNÇÕES PASSADAS NAS PROPRIEDADAS](#usando-parametros-nas-funções-passadas-nas-propriedadas)
- [MUITAS ANOTAÇÕES SOBRE A LOGICA (não ta achando né animal)](#muitas-anotações-sobre-a-logica-não-ta-achando-né-animal)
- [NAVIGATE](#navigate)

npm run dev

## REGRAS GERAIS DO REACT

- Um componente só retorna no máximo um elemento. Mas dentro desse componente pode ter quantos elementos quiser. (como uma div) 
  Entenda a melhor solução vulgo fragment
-[Fragment](#Fragment)

## ESTRUTURA DE ARQUIVOS

.gitignore => São tipo de arquivos serão ignorados pelo Git, pastas não precisam ser salvas;

**package.json =>** São pastas que mostram as bibliotecas e as suas versões
**package-lock.json =>** É a pasta que mostra o historico de bibliotecas, numerações ao longo da aplicação
**vite.config.js =>** Foi o que nos ajudou a criar tudo isso aqui.

## DIFERENÇA DO EXPORT DEFAULT E O EXPORT 

A principal diferença é que o export sem o default vai ter que muita especificação sobre os nomes da exportação, e também na hora de importar você ter que colocar entre chaves na hora de nomear a exportação

``exemplo:`` import { Details } from './pages/Details'

Isso tudo pois o default faz você não necessariamente utilizar o nome da função no nome da importação;


## FRAGMENT
Mas a melhor solução (pois não tem impacto visual) pra isso é usar o *Fragment* que seria o **<></>** Seria o embrulho feito pelo react ex:
export function Details(){
  return(
    <>
        <h1>Hello World!</h1>
        <span>eai</span>
    </>
  )
}
## TEMAS

Se importa uma biblioteca de temas no arquivo Main, o Theme Provider. Que envolve toda a aplicação e recebe a propriedade theme e recebe o arquivo onde se encontra nossas cores globas

*import { ThemeProvider } from 'styled-components'*

*import theme  from './styles/theme'*

<ThemeProvider theme={theme}>
</ThemeProvider>

## ESTRUTURA DO STYLED-COMPONENTS

**cria o estilo no estilo styles.css ---> vai pro index.jsx ---> pagina que quiser** 

- 1. Tu cria estiliza o componente com o styled-components
```js
import { styled } from "styled-components";
// reparar no tipo de exportação
export const Container = styled.button`
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.ORANGE};
    }
`;
```

- 2. importa ele no index.jsx e cria sua estrutura, e o exporta

```jsx
import { Container } from './styles'
// reparar no tipo de exportação
export function Button({ title }){ // passando como parametro o que deseja ser variavel em cada parte
    return(
        <Container type="button">
            { title }
        </Container>

    )
}
```

- 3. importa ele na pagina que o deseja usar

```jsx
import { Container } from './styles'
import { Button } from '../../components/button'
export function Details(){
  

  return(
    <Container>
      <h1>Hello World!</h1>

      <Button title="Entrar" loading/>
      <Button title="Cadastrar"/>
      <Button title="Voltar"/>
    </Container>
  )
  //usando a propriedade pra definir a diferença em cada
}
```
## PROPRIEDADES 

Pra usar propriedades diferentes em cada botão é necessario usar o props, passando como parâmetro o que deseja ter de mudança no botão, como um title;

```jsx
export function Button({ title }){
    return(
        <Container 
        type="button"
        >
            { title }
        </Container>

    )
}
```

## REST OPERATOR
{..rest}

rest operator serve pra que não precise (declarar explicitamente) passar como parametro todas as propriedades que tu passou no componente por completo. Mas pra isso precisa passar ela no final da lista de compoentes.
```jsx
export function Button({ title, loading = false ...rest }){
    return(
        <Container 
        type="button"
        disabled={ loading }
        { ...rest }
        >
            { loading ? 'Carregando...' : title }
        </Container>

    )
}
```

## CHILDREN

O parametro **Children** ele é passado quando o conteúdo, o conteúdo é o indefinido ou varíavel e ele não usado como atributo ele é passado como conteudo dentro do html do componente criado

```jsx
export function Section({ title, children}){
    
    return(
        <Container>
            <h2>{ title }</h2>
            { children }
        </Container>
    )
}

--------------------------------------------------

      <Section title="Links úteis">
        <Links>
          <li><a href="#">https://app.rocketseat.com.br/n</a></li> 
          <li><a href="#">https://app.rocketseat.com.br/n</a></li>
        </Links>
      </Section>
```
O Links é o children do Links que são passados como parâmetros são colocados ali na hora

## MAP

```jsx
export function Note({data, ...rest}){
    return(
        <Container {...rest}>
            <h1>{data.title}</h1>

            {
                data.tags &&
                <footer>
                {
                    data.tags.map(tag => <Tag key={tag.id} title={tag.name} />)
                }
                </footer>
            }
        </Container>
    )
}
```
O que acontece aí é que se o container tiver tags do objeto data ele vai renderizar o *footer*.
E dentro desse footer vai ser utilizado o método .map() e vai renderizar o **componente** Tag criado anteriormente com a key sendo o id e o name dele sendo o titulo.

o método map() percorre todo o array de tags que o backend vai ter criado e retorna alguma coisa de cada um dos itens(`isso tudo é armezanado na variavel inicial criada quando chamamos o map{no primeiro termo}, no exemplo do note é a "tag" que poderia ser qualquer outro nome`), nesse nosso caso ele vai retornar o titulo e o id dele em forma de lista mesmo mas é interpretado de forma melhor.

o **forEach** nao é usado nesse caso pois ele não necessariamente retorna alguma coisa diferente do map. **forEach** é mais utilizado para fazer alterações em cada item de um array e não necessariamente retornar algo deles



## CONCEITO E CAMINHOS DO ROUTES

É recomendado fazer [auth.routes] e o [app.routes] para que pessoas não logadas não tenham acesso ao conteúdo do site.

Em vez de rendererizar a pagina no main.jsx rendereriza o <Routes />  que é a função exportada do index do folder *routes*, que aí entra o backend para fazer a troca se essa função do index do folder routes renderiza o [<auth.routes />] ou o [<app.routes /> se a pessoa estiver logada ou não.


## ENTENDENDO OS ARQUIVOS DO ROUTES

```jsx
// exemplo do app.routes.jsx
import { Routes, Route } from 'react-router-dom'

import { New } from '../pages/New'
import { Home } from '../pages/Home'
import { Details } from '../pages/Details'
import { Profile } from '../pages/Profile'

export function AppRoutes(){
    return(
        <Routes>
            <Route path='home' element={<Home/>} />
            <Route path='new' element={<New/>} />
            <Route path='profile' element={<Profile/>} />
            <Route path='details/:id' element={<Details/>} />
        </Routes>
    )
}
```
É simples, path é a parte da URL e o element é o que vai ser renderizado.
Vale lembrar que tem que importar as pages padrão react

## AXIOS

Axios é a biblioteca usada para fazer o intermedio do back-end com o front-end, para conseguir fazer solicitações por aqui


## useSTATE

useState faz parte do react e é o responsável pelos states do react **(o que cada input recebe, basicamente)** a sintaxe fica assim (apos importação):
```jsx
    const [name, setName] = useState("");
```
primeira parte é responsavel por armazenar o estado, e a segunda parte é a função que vai ser executada.

*normalmente o nome da variavel é com exemplo: email, e a função acompanha o nome com o set antes*

## useEffect

```jsx
export function App(){
    const [name, setName] = useState("");

    useEffect(() => {
        console.log("useEffect foi chamado!")

    }, [dependencia de um estado])
}
```
O **useEffect** é o hook de efeito colateral, ou seja, voce pode fazer com que ele faça determinada coisa quando X coisa acontecer. Mas pra isso tem que colocar no vetor de sua sintaxe *alguma variavel de estado* por exemplo. Que toda vez que ela for atualizada ele executa o codigo.

Se o vetor ficar *vazio* ele vai executar uma unica vez quando o componente for renderizado



## auth.jsx
**nesse caso antes da parte do useEffect**

```jsx
import { createContext, useContext, useState } from "react";

import { api } from '../service/api';

// Criação do contexto de autenticação
export const AuthContext = createContext({})

function AuthProvider({ children }){
    // Inicialização do estado local para armazenar dados de autenticação
    const [data, setData] = useState({})

    // Função para autenticar o usuário
    async function signIn({ email, password }){
        try{
            // Faz uma solicitação POST à rota '/sessions' da API
            const response = await api.post('/sessions', { email, password });
            
            // Extrai informações do usuário e token da resposta da API
            const { user, token } = response.data;
            
            // Configura o token nos cabeçalhos da API para autorização posterior
            api.defaults.headers.authorization = `Bearer ${token}`;
            
            // Armazena informações do usuário e token no estado local
            setData({ user, token });

        }catch(error){
            // Tratamento de erros
            if(error.resopnse){
                // Se houver uma resposta de erro da API, exibe a mensagem de erro da API
                alert(error.resopnse.data.message);
            }else{
                // Caso contrário, exibe uma mensagem genérica de erro
                alert("Não foi possível entrar.");
            }
        }
    }
 
    // Fornece o contexto de autenticação e a função signIn para os componentes filhos
    return(
        <AuthContext.Provider value={{signIn, user: data.user}}>
            { children }
        </AuthContext.Provider>
    )
}

// Hook personalizado para acessar o contexto de autenticação
function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

// Exporta o AuthProvider para envolver o aplicativo e disponibilizar o contexto de autenticação
export { AuthProvider, useAuth };
```




## ENTENDENDO A LÓGICA DE EXIBIÇÃO DE IMAGEM

```jsx
    const [avatar, setAvatar] = useState(avatarUrl); //exibir o arquivo via url
    const [avatarFile, setAvatarFile] = useState(null); // guardar o arquivo

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}files/${user.avatar}` : avatarPlaceholder;
```


se criam *estados* para guardar **o arquivo em si** da imagem, e *estados* para guardar a [URL] criada pelo backend;


## USANDO PARAMETROS NAS FUNÇÕES PASSADAS NAS PROPRIEDADAS

```jsx
 <Section title="Links úteis">
    {
        links.map((link, index) => (
            <NoteItem 
            key={String(index)}
            value={link}
            onClick={() => handleRemoveLink(link)} //quando se usa parametro se usa assim
            />
        ))
    }
```

## MUITAS ANOTAÇÕES SOBRE A LOGICA (não ta achando né animal)

Depois que começei mais a fundo na logica eu começei a escrever comentarios no codigo com partes que imaginava que ia esquecer, felipe do futuro. Então quando tu for voltar aqui procurando procura nos arquivos do codigo mesmo por que possivelmente tu teve preguiça de fazer um topico só para aquela parte pequena e fez um simples comentario lá!

vai la guerreiro!


## NAVIGATE

A questao do `useNavigate`, é que pra **voltar** se é recomendado usar o `(-1)` pra **voltar**, para que nao crie *camadas* repetidas no historico de navegação.


para navegação normal continuar do mesmo jeito, porém para voltar usar o apresentado a cima. 
```jsx
const navigate = useNavigate()

navigate(-1) // em vez de "/"
```