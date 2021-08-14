import { Text } from 'components/Text'
import { Space } from 'antd'

export const DemoText = () => {
  return (
    <main>
      <Space direction="vertical">
        <Text size="head" bold>
          Header
        </Text>
        <Text size="sub-head" bold>
          Sub Header
        </Text>
        <Text size="normal" bold>
          Normal
        </Text>
        <Text size="small" bold>
          Small
        </Text>

        <hr />

        <Text underline>Underline</Text>
        <Text strike>Strike</Text>
        <Text bold>Bold</Text>
        <Text italic>Italic</Text>
        <Text gray>Gray color</Text>

        <hr />

        <Text size="head" bold italic underline>
          Mixed style in Text
        </Text>
      </Space>
    </main>
  )
}
