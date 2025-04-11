import React from "react";

const Header = () => {
  return (
    <div className="bg-zinc-900/75 flex gap-2 px-3 py-3 items-center">
      <div className="h-10 w-10">
        <img src="/spotify.png" className="h-full w-full" alt="spotify image" />
      </div>
      <div>
        <div className="text-white text-xl font-bold">Music Manager</div>
        <div className="text-zinc-400 text-sm">Manage your music catalog</div>
      </div>
    </div>
  );
};

export default Header;
