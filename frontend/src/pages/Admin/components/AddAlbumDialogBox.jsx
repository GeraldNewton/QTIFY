import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Upload } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore";
import { enqueueSnackbar } from "notistack";

const AddAlbumDialogBox = () => {
  console.log();
  const imageref = useRef(null);
  const { postAlbum, isLoading } = useMusicStore();
  const [files, setFiles] = useState({
    album_name: "",
    artist: "",
    image_file: null,
    releaseYear: "2015",
  });

  /** checks if the file size is greater than 10mb */
  useEffect(() => {
    const Max_File_Size = 10 * 1024 * 1024;
    if (files.image_file && files.image_file.size > Max_File_Size) {
      enqueueSnackbar("File size should be less than 10mb", {
        variant: "error",
      });
      setFiles((prev) => ({ ...prev, image_file: null }));
    }
  }, [files.image_file]);

  /**
   * Handles the form submission for adding a new album.
   * It creates a FormData object from the current file state,
   * checks if all the fields are filled,
   * posts the album data using the postAlbum function,
   * and resets the file state to its initial values.
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {
    for (let value of Object.values(files))
      if (value == null || value === "")
        return enqueueSnackbar("Please fill all the fields", {
          variant: "warning",
        });
    let form = new FormData();
    for (let [key, value] of Object.entries(files)) form.append(key, value);
    await postAlbum(form);
    setFiles({
      album_name: "",
      artist: "",
      image_file: null,
      releaseYear: "2015",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-10" />
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Album</DialogTitle>
          <DialogDescription className="text-lg">
            Add a new album to your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {/* Input element for album image */}
          <input
            type="file"
            ref={imageref}
            hidden
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image_file: e.target.files[0] }))
            }
          />

          {/* Input div for album image */}
          <div className="grid place-items-center border-dashed border-2 border-zinc-700 rounded-md py-10">
            <div className="grid place-items-center gap-2">
              <Upload />
              Upload Artwork
              <Button
                onClick={() => imageref.current.click()}
                className="h-fit"
                disabled={isLoading}
              >
                {!files.image_file ? (
                  "Choose File"
                ) : (
                  <div className="grid place-items-center gap-1">
                    <div className="text-emerald-500">Image Selected:</div>
                    <div className="text-md text-zinc-100">
                      {files.image_file.name.slice(0, 20)}
                    </div>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Input div for album name */}
          <div className="space-y-1">
            <label htmlFor="title">Name:</label>
            <Input
              disabled={isLoading}
              id="title"
              value={files.album_name}
              onChange={(e) =>
                setFiles((prev) => ({ ...prev, album_name: e.target.value }))
              }
            />
          </div>

          {/* Input div for album artist */}
          <div className="space-y-1">
            <label htmlFor="artist">Artist:</label>
            <Input
              disabled={isLoading}
              id="artist"
              value={files.artist}
              onChange={(e) =>
                setFiles((prev) => ({ ...prev, artist: e.target.value }))
              }
            />
          </div>

          {/* Input div for album release year */}
          <div className="space-y-1">
            <label htmlFor="duration">Release Year:</label>
            <Input
              disabled={isLoading}
              id="duration"
              type="number"
              min="1900"
              max="2100"
              step="1"
              value={files.releaseYear}
              onChange={(e) =>
                setFiles((prev) => ({ ...prev, releaseYear: e.target.value }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {!isLoading ? (
              "Create"
            ) : (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumDialogBox;
