import { FormEvent, useState } from "react";
import { login } from "./mainApi/login";
import { Button, H1, Main, Form} from "./styles";


export default function Login(): JSX.Element{
const [email, setEmail] = useState<string>("");
const [senha, setSenha] = useState<string>("");

const submit = async (event: FormEvent) =>{
    event.preventDefault();
    try {
       const response= await login({email, senha});
       console.log(response.data);
       alert("logado com sucesso")
    } catch (error) {
        alert("Algo deu errado")
        
    }
}
return (
    <div>
    <Main className="container-card">
        <H1>Login</H1>
        <Form onSubmit={submit}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                    type="text"
                    className="form-control"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                />
            </div>
            <div className="mb-3">
                <Button type="submit">
                    Logar
                </Button>
            </div>
        </Form>
        
    </Main>
    </div>
)}

