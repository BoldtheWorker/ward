import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ variant: "destructive", title: "Invalid File", description: "Please upload an image." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "File too large", description: "Images must be under 5MB." });
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("article-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("article-images")
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast({ title: "Image Uploaded", description: "Ready to publish." });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      toast({ variant: "destructive", title: "Upload Failed", description: message });
    } finally {
      setUploading(false);
    }
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleUpload(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        <ImageIcon className="w-3 h-3" /> Headline Image
      </label>

      {value ? (
        <div className="relative group aspect-video w-full overflow-hidden rounded-sm border border-border bg-card">
          <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => onChange("")}
              className="p-3 bg-destructive text-destructive-foreground rounded-sm hover:scale-110 transition-transform"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-sm flex items-center gap-1.5 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-3 h-3" /> UPLOADED
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative aspect-video w-full rounded-sm border-2 border-dashed transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center p-8 text-center
            ${dragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-border hover:border-primary/50 hover:bg-secondary"}
            ${uploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm font-medium animate-pulse">Syncing to Terminal...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-secondary/50 rounded-sm flex items-center justify-center mb-6 border border-border/50 group-hover:bg-primary/10 transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-bold text-foreground mb-1">Drag and drop file</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Or click to browse storage</p>
            </>
          )}
        </div>
      )}
      
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 border border-border rounded-sm">
        <label className="text-[10px] font-bold uppercase text-muted-foreground whitespace-nowrap">Image Link:</label>
        <input 
          type="url" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://external-image.jpg"
          className="flex-1 bg-transparent border-none text-xs text-primary focus:outline-none placeholder:opacity-50"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
