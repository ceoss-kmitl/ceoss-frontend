import { message } from 'antd'
import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'

import { toDayjsTime } from 'libs/datetime'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'

interface IRoom {
  id: string
  name: string
}

export function useWorkload(academicYear: number, semester: number) {
  const [room, setRoom] = useState({} as IRoom)
  const [workload, setWorkload] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  function setCurrentRoom(room: any) {
    setRoom(room)
  }

  async function getWorkloadByRoomId(id: string) {
    if (!id) return

    setIsLoading(true)
    try {
      const { data } = await http.get(`/room/${room.id}/workload`, {
        params: {
          academic_year: academicYear,
          semester,
        },
      })

      const workloadWithDayjs = data.map((day: any) => ({
        workloadList: day.workloadList.map((workload: any) => ({
          ...workload,
          timeList: workload.timeList.map((time: any) => [
            toDayjsTime(time.start),
            toDayjsTime(time.end),
          ]),
        })),
      }))

      setWorkload(workloadWithDayjs)
    } catch (err) {
      Modal.error({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเรียกดูตารางการใช้ห้องได้',
      })
      setWorkload([])
    }
    setIsLoading(false)
  }

  async function assignWorkload(form: any) {
    setIsLoading(true)
    const payload = {
      workloadIdList: form.workloadIdList,
    }

    await http.post(`/room/${room.id}/workload`, payload)
    await getWorkloadByRoomId(room.id)
    setIsLoading(false)
  }

  async function unassignWorkload(workload: any) {
    setIsLoading(true)
    await http.delete(`/room/${room.id}/workload/${workload.id}`)
    await getWorkloadByRoomId(room.id)
    setIsLoading(false)
  }

  async function downloadExcel() {
    const messageKey = 'downloading'

    message.loading({ key: messageKey, content: 'กำลังดาวน์โหลด...' })
    setIsDownloading(true)
    try {
      const { data } = await http.get('/room/excel', {
        params: {
          academic_year: academicYear,
          semester,
        },
      })

      const bufferArray = [new Uint8Array(data.buffer).buffer]
      const blob = new Blob(bufferArray, { type: data.fileType })
      saveAs(blob, data.fileName)

      message.success({ key: messageKey, content: 'ดาวน์โหลดสำเร็จ' })
    } catch (err) {
      message.error({ key: messageKey, content: err.message })
    }
    setIsDownloading(false)
  }

  async function triggerAutoRoom() {
    Modal.loading({
      loadingText: 'กำลังจัดห้องอัตโนมัติ',
      finishTitle: 'จัดห้องอัตโนมัติสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'เกิดข้อผิดพลาดบางอย่าง',
      finishFailText: 'ตกลง',
      width: 400,
      onAsyncOk: async () => {
        try {
          await http.get('/room/auto-assign', {
            params: {
              academic_year: academicYear,
              semester,
            },
          })
          await getWorkloadByRoomId(room.id)
        } catch (err) {
          throw err
        }
      },
    })
  }

  async function triggerResetAutoRoom() {
    Modal.warning({
      title: 'รีเซตการจัดห้อง',
      okText: 'รีเซต',
      description: 'คุณต้องการรีเซตการจัดห้องทั้งหมดหรือไม่',
      finishTitle: 'รีเซตการจัดห้องสำเร็จ',
      finishFailTitle: 'เกิดข้อผิดพลาดบางอย่าง',
      width: 400,
      onAsyncOk: async () => {
        try {
          await http.delete('/room/reset-assign', {
            params: {
              academic_year: academicYear,
              semester,
            },
          })
          await getWorkloadByRoomId(room.id)
        } catch (err) {
          throw err
        }
      },
    })
  }

  useEffect(() => {
    getWorkloadByRoomId(room.id)
  }, [academicYear, semester, room.id])

  return {
    isLoading,
    isDownloading,
    workload,
    currentRoom: room,
    setCurrentRoom,
    getWorkloadByRoomId,
    assignWorkload,
    unassignWorkload,
    downloadExcel,
    triggerAutoRoom,
    triggerResetAutoRoom,
  }
}
