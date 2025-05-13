import AssistantIcon from "@mui/icons-material/Assistant";

export const ChatBot = () => {
  return (
    <div className="bg-blue-700 absolute bottom-4 right-4 p-2 w-20 flex justify-center items-center rounded-full gap-1 cursor-pointer hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-300/50">
      <span className="absolute -top-1 -right-1 flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-sky-300"></span>
      </span>

      <AssistantIcon sx={{ color: "#fff" }} />
      <p className="text-sm text-white">Chat</p>
    </div>
  );
};
