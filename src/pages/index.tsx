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

  useEffect(getAll, [])

  function getAll() {
    repo.getAll().then(clients => {
      setClients(clients)
      setVisible('tabela')
    })
  }

  function clientSelected(client: Client) {
    setClient(client)
    setVisible('form')
  }

  async function clientDeleted(client: Client) {
    await repo.delete(client)
    getAll()
  }

  function newClient() {
    setClient(Client.empty())
    setVisible('form')
  }

  async function saveClient(client: Client) {
    await repo.save(client)
    getAll()
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
