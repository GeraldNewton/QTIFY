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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import React, { useEffect, useRef, useState } from "react";
import { Plus, Upload } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore";
import { enqueueSnackbar } from "notistack";

const AddSongDialogBox = () => {
  const imageref = useRef(null);
  const audioref = useRef(null);
  const { postSong, isLoading, albums } = useMusicStore();
  const [files, setFiles] = useState({
    song_name: "",
    artist: "",
    albumId: "",
    image_file: null,
    audio_file: null,
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
    if (files.audio_file && files.audio_file.size > Max_File_Size) {
      enqueueSnackbar("File size should be less than 10mb", {
        variant: "error",
      });
      setFiles((prev) => ({ ...prev, audio_file: null }));
    }
  }, [files.audio_file, files.image_file]);

  /**
   * Handles the form submission for adding a new song.
   * It creates a FormData object from the current file state,
   * checks if all the fields are filled,
   * posts the song data using the postSong function,
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
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(files.audio_file);

    audio.addEventListener("loadedmetadata", async () => {
      form.append("duration", audio.duration);
      await postSong(form);
      setFiles({
        song_name: "",
        artist: "",
        albumId: "",
        image_file: null,
        audio_file: null,
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-10" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Song</DialogTitle>
          <DialogDescription className="text-lg">
            Add a new song to your music library.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {/* Input element for song image */}
          <input
            type="file"
            ref={imageref}
            hidden
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image_file: e.target.files[0] }))
            }
          />
          {/* Input element for song file */}
          <input
            type="file"
            ref={audioref}
            hidden
            accept="audio/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio_file: e.target.files[0] }))
            }
          />

          {/* Input div for song image */}
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

          {/* Input div for song file */}
          <div className="space-y-1">
            <label htmlFor="title">Audio File:</label>
            <Button
              className="w-full"
              onClick={() => audioref.current.click()}
              disabled={isLoading}
            >
              {files.audio_file
                ? files.audio_file.name.slice(0, 20)
                : "Choose Audio File"}
            </Button>
          </div>

          {/* Input div for song title */}
          <div className="space-y-1">
            <label htmlFor="title">Title:</label>
            <Input
              disabled={isLoading}
              id="title"
              value={files.song_name}
              onChange={(e) =>
                setFiles((prev) => ({ ...prev, song_name: e.target.value }))
              }
            />
          </div>

          {/* Input div for song artist */}
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

          {/* Input div for song album */}
          <div className="space-y-1">
            <label htmlFor="album">Album(optional):</label>
            <Select
              disabled={isLoading}
              value={files.albumId}
              onValueChange={(value) => setFiles({ ...files, albumId: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select some" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Albums</SelectLabel>
                  {albums?.map((obj) => (
                    <SelectItem key={obj._id} value={obj._id}>
                      {obj.album_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

export default AddSongDialogBox;
