import { Plus, Terminal, FileText, Info } from "lucide-react";
import { FilePenLine, Trash2 } from "lucide-react";

const CommandCard = ({ command }) => {
  const { name, command: cmdText, description } = command;

  return (
    <>
   

      <div className="relative group bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
      <button className="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded-md hidden group-hover:block text-gray-600 hover:text-gray-300"><FilePenLine size={16} /></button>
      <button className="absolute bottom-2 right-2 p-1 hover:bg-gray-700 rounded-md hidden group-hover:block text-gray-600 hover:text-gray-300"><Trash2 size={16} /></button>
        <div className="flex items-center gap-3">
          <Terminal size={20} className="text-green-400" />
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
          <FileText size={16} className="text-yellow-400" />
          <code className="bg-gray-900 px-2 py-1 rounded-md text-green-300">
            {cmdText}
          </code>
        </div>
        {description && (
          <div className="flex items-start gap-2 text-gray-300 text-sm mt-2">
            <Info size={16} className="text-blue-400" /> {description}
          </div>
        )}
      </div>
    </>
  );
};

export default CommandCard;
