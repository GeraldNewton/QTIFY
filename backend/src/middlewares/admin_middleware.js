/**
 * @function admin_check
 * @description
 * admin middleware to check for all required fields and files before performing create or delete operation of album or song
 * @param {string} fn - name of the function to check for
 * @returns {function} - middleware
 * @throws {Error} - 400 error if required fields or files are not provided
 */
const admin_check=(fn)=>(req,res,next)=>{
    if(fn=="createSong"){
        if (!req.files || !req.files.audio_file || !req.files.image_file || !req.body || !req.body.song_name || !req.body.artist || !req.body.duration)
        return res.status(400).send({ message: "send all files" });
    }else if(fn=="createAlbum"){
        if (!req.files ||!req.files.image_file || !req.files.image_file.tempFilePath || !req.body || !req.body.album_name || !req.body.artist || !req.body.releaseYear)
        return res.status(400).send({ message: "send all files" });
    }else{
        if (!req.params || !req.params._id)
        return res.status(400).send({ message: "_id not provided to perform deletion" });
    }
    next()
}

module.exports=admin_check