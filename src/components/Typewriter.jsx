import React from "react";

export default function Typewriter({ text, speed = 80 }) {
  const [output, setOutput] = React.useState("");

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setOutput((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="terminal-cursor">
      {output}
    </span>
  );
}
