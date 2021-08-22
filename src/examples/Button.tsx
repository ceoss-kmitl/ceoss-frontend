import { Button } from 'components/Button'
import { useState } from 'react'
import { FiDownload } from 'react-icons/fi'

export const DemoButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main>
      <h3>Simple</h3>
      <div style={container}>
        <Button>ปกติ</Button>
        <Button small>เล็ก</Button>
        <Button>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอน
        </Button>
        <Button small>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอนเล็ก
        </Button>
      </div>
      <hr />

      <h3>Blue</h3>
      <div style={container}>
        <Button blue>สีฟ้า</Button>
        <Button blue small>
          สีฟ้า
        </Button>
        <Button blue>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอน
        </Button>
        <Button small blue>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอนเล็ก
        </Button>
      </div>
      <hr />

      <h3>Green</h3>
      <div style={container}>
        <Button green>สีเขียว</Button>
        <Button green small>
          สีเขียว
        </Button>
        <Button green>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอน
        </Button>
        <Button small green>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอนเล็ก
        </Button>
      </div>
      <hr />

      <h3>White</h3>
      <div style={container}>
        <Button white>สีขาว</Button>
        <Button white small>
          สีขาว
        </Button>
        <Button white>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอน
        </Button>
        <Button small white>
          <FiDownload style={{ marginRight: '.5rem' }} />
          มีไอคอนเล็ก
        </Button>
      </div>
      <hr />

      <h3>Functional</h3>
      <div style={container}>
        <Button loading blue small>
          กำลังโหลด
        </Button>
        <Button onClick={() => alert('ทดสอบ')}>กดแล้วมีคำสั่ง</Button>
        <Button
          onClick={() => {
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 1500)
          }}
          loading={isLoading}
          small
          green
        >
          กดแล้วโหลด
        </Button>
      </div>
    </main>
  )
}

const container = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}
