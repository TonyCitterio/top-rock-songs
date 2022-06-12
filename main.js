//Getting the song list
const getSongList = async () => {
  const res = await fetch("http://localhost:5000/api/getsongs");
  const data = await res.json();

  console.log(data);
  console.log(data.songs);
  console.log(data.songs[0]._id);

  document.getElementById("list").innerHTML = data.songs
    .map(
      (song) =>
        `<div style="margin-bottom: 1.5rem; padding: 1.5rem; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"><p style="margin-bottom:0.5rem">${song.song} by ${song.artist}</p>
        <input style="margin-bottom:0.5rem" type="text" id="inputUpdateSong-${song._id}" placeholder="Update song...">
        <input style="margin-bottom:0.5rem" type="text" id="inputUpdateArtist-${song._id}" placeholder="Update artist...">
        <br />
        <button style="width: 100px" onclick="updateVote('${song._id}')">Update vote</button>
        <button style="width: 100px" onclick="deleteVote('${song._id}')">Delete vote</button>
        </div>`
    )
    .join("");
};

//adding a song
const sendSong = async () => {
  const res = await fetch("http://localhost:5000/api/newsong", {
    method: "post",
    body: JSON.stringify({
      song: song.value,
      artist: artist.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
};

//Button to vote for song
const button = document.getElementById("button");
button.addEventListener("click", sendSong);

//Getting the user input
const song = document.getElementById("inputSong");
const artist = document.getElementById("inputArtist");

//update vote
const updateVote = async (id) => {
  const updatedSong = document.getElementById(`inputUpdateSong-${id}`).value;
  const updateArtist = document.getElementById(`inputUpdateArtist-${id}`).value;
 
  const res = await fetch(`http://localhost:5000/api/updatesong/${id}`, {
    method: "put",
    body: JSON.stringify({
      song: updatedSong,
      artist: updateArtist,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
};

//delete vote
const deleteVote = async (id) => {
  const res = await fetch(`http://localhost:5000/api/deletesong/${id}`, {
    method: "delete",
  });
  const data = await res.json();
};

//rendering the list
window.addEventListener("load", () => {
  getSongList();
});
