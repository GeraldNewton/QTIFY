const error_handler = require("../helpers/error_handler");
const album_model = require("../models/album_model");

// ? gets all abums:-
const getAllAlbums=error_handler(async(req,res)=>{
    const albums=await album_model.find();
    res.send(albums);
},"getAllAlbums")

// ? get albums by id:-
const getAlbumsById=error_handler(async(req,res)=>{
    const {albumId}=req.params
    const album=await album_model.findById(albumId).populate("songs");
    res.send(album);
},"getAlbumsById")

module.exports={getAllAlbums,getAlbumsById}