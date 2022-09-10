const NoteModal = require("../modals/Note");

//  create Note
exports.CreateNote = async (req, res) => {
  // get the Description and title from user
  const { title, Description } = req.body;

  // set the header
  res.setHeader("Content-Type", "appliction/json");

  try {
    const userId = req.user.id; // get the user id from token by user
    

    // save the notes of the user in the database
    const result = await NoteModal.create({
      title,
      Description,
      user: userId,
    });

    // send the message to the user
    return res.json({
      status: "ok",
      data: "Your notes has been successfully submitted.",
    });
  } catch (err) {
    console.log(err);
  }
};

// fetch all the notes
exports.FetchNotes = async (req, res) => {
  try {
    // get the user id
    userId = req.user.id;
    
    const IsNote = await NoteModal.find({ user: userId });
    if (IsNote) {
      
      if (IsNote[0].user.toString() == userId) {
        const result = await NoteModal.find({ user: userId });
        res.status(200).json({ status: "ok", data: result });
      } else {
        res.status(401);
      }
    } else {
      res.status(401);
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete the notes
exports.DeleteNotes = async (req, res) => {
  try {
    userId = req.user.id;
    const IsNote = await NoteModal.find({ user: userId });
    if (IsNote) {
      if (IsNote[0].user.toString() == userId) {
        const data = await NoteModal.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "ok", data });
      } else {
        res.status(401);
      }
    } else {
      res.status(401);
    }
  } catch (err) {
    console.log(err);
  }
};

// Update the notes
exports.UpdateNotes = async (req, res) => {
  try {
    const user = req.user.id; // getting userId
    const IsNote = await NoteModal.findById(req.params.id);

    // if any data found and user id is matched then update the items , if not throw error
    if (IsNote && IsNote.user.toString() == user) {
      const finalNote = await NoteModal.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json({ status: "ok", data: "Your data has been updated successfully." });
    } else {
      return res.status(401).json({ state: "error", data: "unauthorized" });
    }
  } catch (err) {
    console.log(err);
  }
};
