import { useEffect, useState } from "react";
import CollectionClient from "../backend/db/CollectionClient";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";

export default function Home() {

  const repo: ClientRepository = new CollectionClient()

  const [client, setClient] = useState<Client>(Client.empty())
  const [clients, setClients] = useState<Client[]>([])
  const [visible, setVisible] = useState<'tabela' | 'form'>('tabela');

  useEffect(() => {
    repo.getAll().then(setClients)
  }, [])

  function clientSelected(client: Client) {
    setClient(client)
    setVisible('form')
  }

  function clientDeleted(client: Client) {
    console.log(`Excluir... ${client.name}`)

  }

  function newClient() {
    setClient(Client.empty())
    setVisible('form')

  }

  function saveClient(client: Client) {
    repo.save(client)
    setVisible('tabela')

  }

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
                onClick={newClient}
              >Novo Cliente</Button>
            </div>
            <Table clients={clients}
              clientSelected={clientSelected}
              clientDeleted={clientDeleted}
            />
          </>
        ) : (
          <Form
            client={client}
            clientChange={saveClient}
            cancel={() => setVisible('tabela')}
          />
        )}
      </Layout>
    </div>
  )
}
