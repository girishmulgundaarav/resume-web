import { useRef, useEffect } from 'react';

export const Editable = ({ 
  value, 
  onChange, 
  className = "", 
  placeholder = "Click to edit...", 
  multiline = false 
}) => {
  const elementRef = useRef(null);
  
  // Only allow inline editing if ?edit=true is appended to the URL query parameters
  const isEditable = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('edit') === 'true';

  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== value) {
      elementRef.current.innerText = value || "";
    }
  }, [value]);

  const handleBlur = () => {
    if (elementRef.current && isEditable) {
      const newValue = elementRef.current.innerText;
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (!isEditable) return;
    // For single line fields, blur on Enter
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current.blur();
    }
  };

  return (
    <div
      ref={elementRef}
      contentEditable={isEditable}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${isEditable ? 'edit-highlight outline-none' : ''} min-w-[20px] min-h-[1.2em] ${multiline ? 'block' : 'inline-block'} ${className}`}
      data-placeholder={isEditable ? placeholder : ""}
    />
  );
};
