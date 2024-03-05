import { useEffect, useRef } from "react";

const EffectHook = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  });

  useEffect(() => {
    document.title = 'Connecting React to backend';
  });

  return (
    <div className="container my-5">
      <h2>Understanding the useEffect Hook</h2>
      <div className="mb-4">
        <label htmlFor="name" className="form-label">Name</label>
        <input ref={nameRef} id="name" type="text" className="form-control" />
      </div>
    </div>
  );
};

export default EffectHook;
