import { Modal } from 'components/Modal'

const delay = (second: number) =>
  new Promise((resolve) => setTimeout(() => resolve(0), 1000 * second))

export const DemoModal = () => {
  function openSuccess() {
    Modal.success({
      title: 'สำเร็จแล้ว',
      description: 'ทดสอบซัคเซส',
      okText: 'ตกลงงับ',
    })
  }

  function openWarning() {
    const modal = Modal.warning({
      title: 'เตือนแล้วนะ',
      description: 'ทดสอบวานนิ่ง',
      okText: 'มีดีเล',
      onAsyncOk: async () => {
        await delay(1)
        modal.destroy()
      },
    })
  }

  function openError() {
    Modal.error({
      title: 'มีปัญหาว่ะ',
      description: 'ทดสอบเออเร่อ',
      okText: '',
      cancelText: 'ปิดแต่สีเทา',
    })
  }

  return (
    <main
      style={{
        width: '100%',
        margin: '2rem auto',
        padding: '2rem',
      }}
    >
      <h1>Default</h1>
      <button onClick={() => Modal.success()}>success</button>
      <button onClick={() => Modal.warning()}>warning</button>
      <button onClick={() => Modal.error()}>error</button>
      <hr />
      <h1>Custom</h1>
      <button onClick={openSuccess}>success</button>
      <button onClick={openWarning}>warning</button>
      <button onClick={openError}>error</button>
    </main>
  )
}
