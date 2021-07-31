import { useDemoHttp } from 'examples/useDemoHttp'

export const DemoHttp = () => {
  const { data, error, isLoading, loadData } = useDemoHttp()

  return (
    <main>
      <h1>Loading : {`${isLoading}`}</h1>
      <button onClick={loadData} disabled={isLoading}>
        Random Data or Error
      </button>
      <hr />
      <h2>[ Data ]</h2>
      <p>{JSON.stringify(data, null, 2)}</p>
      <hr />
      <h2>[ Error ]</h2>
      <p>{JSON.stringify(error, null, 2)}</p>
    </main>
  )
}
