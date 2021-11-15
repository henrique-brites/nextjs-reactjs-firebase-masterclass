import Layout from "../components/Layout";
import Table from "../components/Table";
import Clients from "../core/Clients";

export default function Home() {

  const clients = [
    new Clients('Ana', 34, '1'),
    new Clients('Bia', 45, '2'),
    new Clients('Carlos', 23, '3'),
    new Clients('Pedro', 54, '4')
  ]

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
    `}>
      <Layout title="Cadastro Simples">
        <Table clients={clients}></Table>
      </Layout>
    </div>
  )
}
