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
    Modal.warning({
      title: 'เตือนแล้วนะ',
      description: 'คุณต้องการที่จะลบข้อมูลทั้งหมดไม่ให้เหลือเลย ใช่หรือไม่',
      okText: 'มีหมุน ๆ',
      onAsyncOk: async () => {
        await delay(1)
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

  function openLongModal() {
    Modal.warning({
      width: 600,
      title: 'ยาวแล้ว เย้',
      description: 'คำอธิบายอะไรสักอย่างที่ไมไ่ด้มีประโยชน์เลย แต่ยาวเฉย ๆ',
    })
  }

  function openLoading() {
    Modal.loading({
      loadingText: 'รอแปปดิ',
      onAsyncOk: async () => {
        await delay(1)
      },
      finishTitle: 'สามผ่านครับ',
      finishText: 'ผ่าน!',
    })
  }

  function openLoadingFail() {
    Modal.loading({
      loadingText: 'รอก่อน',
      onAsyncOk: async () => {
        await delay(1)
        throw new Error()
      },
      finishFailTitle: 'ไม่ผ่านอะ',
      finishFailText: 'ก็ได้',
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
      <button onClick={openLongModal}>Long modal</button>
      <hr />
      <h1>Loader</h1>
      <button onClick={openLoading}>loader</button>
      <button onClick={openLoadingFail}>loader fail</button>
    </main>
  )
}
