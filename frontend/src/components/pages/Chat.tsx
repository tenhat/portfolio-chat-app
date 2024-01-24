import { InputForm } from '../molecules/InputForm'
import { ChatArea } from '../molecules/ChatArea'
import ResponsiveLayout from '../organisms/ResponsiveLayout'

// type Props = {
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// }

export const Chat = () => {
  return (
    <>
      <ResponsiveLayout>
        <ChatArea />
        <InputForm />
      </ResponsiveLayout>
    </>
  )
}
