function renderLine(line: string, index: number) {
  if (line.startsWith("### ")) {
    return (
      <h4 key={index} className="font-serif text-[22px] leading-[1.2] text-[#1f1a16]">
        {line.slice(4)}
      </h4>
    );
  }

  if (line.startsWith("## ")) {
    return (
      <h3 key={index} className="font-serif text-[26px] leading-[1.2] text-[#1f1a16]">
        {line.slice(3)}
      </h3>
    );
  }

  if (line.startsWith("# ")) {
    return (
      <h2 key={index} className="font-serif text-[32px] leading-[1.12] text-[#1f1a16]">
        {line.slice(2)}
      </h2>
    );
  }

  if (line.startsWith("- ")) {
    return (
      <li key={index} className="ml-5 list-disc text-[14px] leading-[1.8] text-[#574f46]">
        {line.slice(2)}
      </li>
    );
  }

  if (!line.trim()) {
    return <div key={index} className="h-3" />;
  }

  return (
    <p key={index} className="text-[14px] leading-[1.85] text-[#574f46]">
      {line}
    </p>
  );
}

export default function MarkdownPreview({ value }: { value: string }) {
  const lines = value.split("\n");

  return <div className="space-y-3">{lines.map((line, index) => renderLine(line, index))}</div>;
}
