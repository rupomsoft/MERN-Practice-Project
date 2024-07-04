const defaultsConfig = require("../config/defaultsConfig");
const Note = require("../models/note.schema");
const CustomError = require("../utils/CustomError");

const create = async ({ title, description, author }) => {
  if (!title || !author) throw new CustomError(400, "Invalid parameters");

  const note = new Note({
    title,
    description,
    author,
  });

  await note.save();
  return note;
};

const count = ({ search = "", author }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
    author: author.id,
  };

  return Note.countDocuments(filter);
};

const findAllItems = async ({
  page = defaultsConfig.page,
  limit = defaultsConfig.limit,
  sortType = defaultsConfig.sortType,
  sortBy = defaultsConfig.sortBy,
  search = defaultsConfig.search,
  author,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
    author: author.id,
  };

  const notes = await Note.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return notes;
};

const findSingleItem = async ({ id, expand = "", author }) => {
  if (!id) throw new CustomError(400, "Id is required");

  expand = expand.split(",").map((item) => item.trim());

  const note = await Note.findById(id);
  if (!note) {
    throw new CustomError(404, "Note not found");
  }

  if (note._doc.author.toString() !== author.id.toString()) {
    throw new CustomError(404, "Note not found");
  }

  if (expand.includes("author")) {
    await note.populate({
      path: "author",
      select: "name",
      strictPopulate: false,
    });
  }

  if (expand.includes("/shares")) {
    await note.populate({
      path: "/shares",
      select: "description author",
      strictPopulate: false,
      populate: {
        path: "author",
        select: "name",
      },
    });
  }
  return note;
};

const updateOrCreate = async (id, { title, description, author }) => {
  const note = await Note.findOne({ _id: id, author: author.id });

  if (!note) {
    const note = await create({ title, description, author: author.id });
    return {
      note: note,
      code: 201,
    };
  }

  const payload = {
    title,
    description,
    author: author.id,
  };

  note.overwrite(payload);
  await note.save();

  return { note: note, code: 200 };
};

const removeItem = async (id, author) => {
  const note = await Note.findOne({ _id: id, author: author.id });
  if (!note) {
    throw new CustomError(404, "Note not found");
  }

  await Note.findByIdAndDelete(id);

  return note;
};

const pinItem = async (id, author) => {
  const note = await Note.findOne({ _id: id, author: author.id });
  if (!note) {
    throw new CustomError(404, "Note not found");
  }

  // Update all notes for the author to set isPinpost to false
  await Note.updateMany({ author: author.id }, { $set: { isPinpost: false } });

  // Toggle the isPinpost status of the specific note
  note.isPinpost = !note.isPinpost;
  await note.save();

  return note;
};

module.exports = {
  create,
  count,
  findAllItems,
  findSingleItem,
  updateOrCreate,
  pinItem,
  removeItem,
};
