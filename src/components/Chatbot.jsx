import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [chatVisible, setChatVisible] = useState(false); // Estado para mostrar el chat

  const sendMessage = async (message) => {
    setMessages([...messages, { sender: "user", text: message }]);

    const response = await axios.post("http://localhost:5000/chatbot", {
      message,
    });

    setMessages([
      ...messages,
      { sender: "user", text: message },
      { sender: "bot", text: response.data.response },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="bg-[#51b4c3] text-white px-7 py-3 rounded-full shadow-lg hover:bg-[#7bd5e3] transition-transform duration-300 hover:scale-105"
        onClick={() => setChatVisible(!chatVisible)}
      >
        💬 Chat
      </button>

      {/* Contenedor del chat */}
      {chatVisible && (
        <div className="w-80 bg-white rounded-lg shadow-lg p-4 mt-2">
          <div className="h-60 overflow-y-auto border-b pb-2">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={`text-sm ${
                  msg.sender === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-gray-600"
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input type="text" />
          <button
            className="w-full bg-[#afdfda] text-white py-2 mt-3 rounded hover:bg-[#6ccfc5] transition"
            onClick={() => sendMessage("¿Qué medicamentos tienes?")}
          >
            Enviar mensaje
          </button>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
