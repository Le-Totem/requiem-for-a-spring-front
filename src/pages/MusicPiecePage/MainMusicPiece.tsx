import { Outlet } from "react-router";

function MainMusicPiece() {
    return (
        <>
            {/* header */}

            <main className="music-piece-container"><Outlet /></main>

            {/* footer */}
        </>
    )
}

export default MainMusicPiece;