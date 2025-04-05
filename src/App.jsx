import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Custom toggle button component for better handling
  const ToggleButton = ({ label, isChecked, onChange, color }) => {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
        <label className="text-lg font-semibold">{label}</label>
        <button 
          onClick={onChange}
          className="relative w-12 h-6 rounded-full"
          aria-pressed={isChecked}
          role="switch"
        >
          <div
            className={`w-full h-full rounded-full transition-colors duration-300 ${
              isChecked ? `bg-${color}-500` : "bg-gray-600"
            }`}
          />
          <div
            className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isChecked ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 fixed inset-0">
      <div className="w-full max-w-4xl p-8 rounded-3xl shadow-2xl bg-gray-800/90 backdrop-blur-lg text-orange-400 space-y-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
          🔐 Ultimate Password Generator
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 rounded-xl overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-4 px-6 text-2xl font-mono bg-gray-900 text-white rounded-lg border-2 border-gray-700 hover:border-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Generate Password..."
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            📋 Copy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-900/50 rounded-xl">
          <div className="space-y-4">
            <label className="flex items-center justify-between text-lg font-semibold">
              <span>Password Length</span>
              <span className="text-blue-400">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <ToggleButton 
            label="Numbers" 
            isChecked={numberAllowed} 
            onChange={() => setNumberAllowed(prev => !prev)} 
            color="blue" 
          />

          <ToggleButton 
            label="Special Chars" 
            isChecked={charAllowed} 
            onChange={() => setCharAllowed(prev => !prev)} 
            color="purple" 
          />
        </div>

        <p className="text-center text-sm text-gray-400 font-light">
          Crafted with ❤️ by Satish | Securely generate strong passwords
        </p>
      </div>
    </div>
  );
}

export default App;