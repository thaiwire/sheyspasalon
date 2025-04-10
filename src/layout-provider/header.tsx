import React from "react";

function Header({ user }: { user: any }) {
  return (
    <div className="bg-primary p-5 text-white">
      <h1 className="fold-bold text-white text-2xl">S.H.E.Y</h1>
      <div>
        <h1 className="text-white text-2xl">Welcome {user?.name}</h1>
        
      </div>
    </div>
  );
}
export default Header;
