import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Type, Eraser, Check } from 'lucide-react';

interface DigitalSignaturePadProps {
  label: string;
  initialSignature?: string;
  signeeName: string;
  onSaveSignature: (signatureData: string) => void;
  onClose?: () => void;
}

export const DigitalSignaturePad: React.FC<DigitalSignaturePadProps> = ({
  label,
  initialSignature = '',
  signeeName,
  onSaveSignature,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState(signeeName || '');
  const [cursiveStyle, setCursiveStyle] = useState<'handwriting' | 'serif' | 'display'>('handwriting');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Canvas drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1e1b4b'; // dark ink
    ctx.lineWidth = 2.5;

    // Draw baseline
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.moveTo(20, rect.height - 25);
    ctx.lineTo(rect.width - 20, rect.height - 25);
    ctx.stroke();

    ctx.strokeStyle = '#1e1b4b';
  }, [mode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Redraw baseline
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.moveTo(20, rect.height - 25);
    ctx.lineTo(rect.width - 20, rect.height - 25);
    ctx.stroke();
    ctx.strokeStyle = '#1e1b4b';

    setHasDrawn(false);
  };

  const handleSave = () => {
    if (mode === 'draw') {
      const canvas = canvasRef.current;
      if (canvas && hasDrawn) {
        const dataUrl = canvas.toDataURL('image/png');
        onSaveSignature(dataUrl);
      } else {
        // Fallback to typed name if nothing was drawn
        onSaveSignature(typedName || signeeName || 'Signed');
      }
    } else {
      onSaveSignature(typedName || signeeName || 'Signed');
    }
    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200 max-w-lg w-full mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
        <div>
          <h3 className="font-semibold text-neutral-900 text-lg">{label}</h3>
          <p className="text-xs text-neutral-500">Provide your official digital endorsement for this bond</p>
        </div>
        {/* Toggle Mode */}
        <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('draw')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              mode === 'draw' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Draw
          </button>
          <button
            type="button"
            onClick={() => setMode('type')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              mode === 'type' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Cursive
          </button>
        </div>
      </div>

      {mode === 'draw' ? (
        <div>
          <div className="relative border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50 overflow-hidden touch-none">
            <canvas
              ref={canvasRef}
              className="w-full h-44 cursor-crosshair block"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <span className="absolute bottom-2 left-4 text-[10px] text-neutral-400 font-mono pointer-events-none">
              Sign above line using trackpad or finger
            </span>
          </div>

          <div className="flex justify-between items-center mt-3">
            <button
              type="button"
              onClick={clearCanvas}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <Eraser className="w-3.5 h-3.5" />
              Clear Ink
            </button>
            <span className="text-xs text-neutral-400 italic">256-bit certified seal timestamp</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Your Full Name:</label>
            <input
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="e.g. Julian Vance"
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-2">Select Cursive Style:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCursiveStyle('handwriting')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  cursiveStyle === 'handwriting'
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <span className="font-handwriting text-xl block">Signature</span>
                <span className="text-[10px] opacity-75">Flowing Script</span>
              </button>

              <button
                type="button"
                onClick={() => setCursiveStyle('serif')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  cursiveStyle === 'serif'
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <span className="font-serif italic text-xl block">Signature</span>
                <span className="text-[10px] opacity-75">Classic Serif</span>
              </button>

              <button
                type="button"
                onClick={() => setCursiveStyle('display')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  cursiveStyle === 'display'
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <span className="font-display italic text-lg block">Signature</span>
                <span className="text-[10px] opacity-75">Editorial Monograph</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
            <span className="text-xs text-neutral-400 block mb-1">Preview Signature:</span>
            <p
              className={`text-3xl text-neutral-900 ${
                cursiveStyle === 'handwriting'
                  ? 'font-handwriting'
                  : cursiveStyle === 'serif'
                  ? 'font-serif italic'
                  : 'font-display italic'
              }`}
            >
              {typedName || 'Your Name'}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-100">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 px-5 py-2 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          Apply Official Signature
        </button>
      </div>
    </div>
  );
};
