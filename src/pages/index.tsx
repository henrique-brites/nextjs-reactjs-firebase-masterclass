import { useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

export default function Home() {

  const clients = [
    new Client('Ana', 34, '1'),
    new Client('Bia', 45, '2'),
    new Client('Carlos', 23, '3'),
    new Client('Pedro', 54, '4')
  ]

  function clientSelected(client: Client) {
    console.log(client.name);

  }

  function clientDeleted(client: Client) {
    console.log(`Excluir... ${client.name}`);

  }

  function saveClient(client: Client) {
    console.log(client);

  }

  const [visible, setVisible] = useState<'tabela' | 'form'>('tabela');

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
    `}>
      <Layout title="Cadastro Simples">
        {visible === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Button color="green" className="mb-4"
                onClick={() => setVisible('form')}
              >Novo Cliente</Button>
            </div>
            <Table clients={clients}
              clientSelected={clientSelected}
              clientDeleted={clientDeleted}
            />
          </>
        ) : (
          <Form
            client={clients[2]}
            clientChange={saveClient}
            cancel={() => setVisible('tabela')}
          />
        )}
      </Layout>
    </div>
  )
}
