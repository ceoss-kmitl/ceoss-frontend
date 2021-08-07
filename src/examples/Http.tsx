import { useDemoHttp } from 'examples/useDemoHttp'

export const DemoHttp = () => {
  const { data, error, isLoading, getAllAccount, getErrorAccount } =
    useDemoHttp()

  return (
    <main>
      <h1>Loading : {`${isLoading}`}</h1>
      <button onClick={getAllAccount} disabled={isLoading}>
        Get all account
      </button>
      <button onClick={getErrorAccount} disabled={isLoading}>
        Get error account
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
