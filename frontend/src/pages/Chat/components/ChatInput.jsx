import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useChatStore from "@/stores/useChatStore";
import { Send } from "lucide-react";
import React, { useState } from "react";

const ChatInput = () => {
  const [chat, setChat] = useState("");
  const { sendMessage } = useChatStore();
  const maxHeight = 60;
  const textareaRef = React.useRef(null);

  /**
   * Sends the chat message to the server and clears the text input.
   * This function is called when the user clicks the "Send" button.
   */
  const handleSend=()=>{
    sendMessage(chat.trim())
    setChat("");
  }

  /**
   * Adjusts the height of the textarea to fit its content.
   * If the content is too large, it will be capped at maxHeight and
   * the textarea will become scrollable.
   */
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = textareaRef.current.scrollHeight;

      if (newHeight <= maxHeight) {
        textareaRef.current.style.height = `${newHeight}px`;
      } else {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = "auto";
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      <Textarea
        ref={textareaRef}
        onChange={(e) => setChat(e.target.value)}
        value={chat}
        placeholder="Message"
        onInput={adjustHeight}
        style={{ fontSize: "16px"}}
        className="min-h-[38px] resize-none overflow-hidden w-4/5 text-2xl"
        />
      <Button
        size={"icon"}
        onClick={handleSend}
        disabled={!chat.trim()}
        className="h-12 w-12 bg-green-300 hover:bg-green-400 active:bg-green-500 text-slate-600"
      >
        <Send className="size-7" />
      </Button>
    </div>
  );
};

export default ChatInput;
