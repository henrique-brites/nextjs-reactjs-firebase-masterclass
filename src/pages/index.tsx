import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";

export default function Home() {

  const {
    client,
    clients,
    saveClient,
    newClient,
    selectedClient,
    deletedClient,
    tableVisible,
    displayTable,
  } = useClients()

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
    `}>
      <Layout title="Cadastro Simples">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <Button color="green" className="mb-4"
                onClick={newClient}
              >Novo Cliente</Button>
            </div>
            <Table clients={clients}
              clientSelected={selectedClient}
              clientDeleted={deletedClient}
            />
          </>
        ) : (
          <Form
            client={client}
            clientChange={saveClient}
            cancel={() => displayTable}
          />
        )}
      </Layout>
    </div>
  )
}
