const defaultsConfig = require("../config/defaultsConfig");
const noteService = require("../services/note.service");
const query = require("../utils/query");

const create = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const note = await noteService.create({
      title,
      description,
      author: req.user.id,
    });

    const response = {
      code: 201,
      message: "Note Created Successfully",
      data: note,
      links: {
        self: `/notes/${note._id}`,
        author: `/notes/${note._id}/author`,
        shares: `/notes/${note._id}/shares`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaultsConfig.page;
  const limit = req.query.limit || defaultsConfig.limit;
  const sortType = req.query.sort_type || defaultsConfig.sortType;
  const sortBy = req.query.sort_by || defaultsConfig.sortBy;
  const search = req.query.search || defaultsConfig.search;

  try {
    // data
    const notes = await noteService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      author: req.user,
    });

    const data = query.getTransformedItems({
      items: notes,
      selection: [
        "_id",
        "title",
        "description",
        "author",
        "updatedAt",
        "createdAt",
      ],
      path: "/notes",
    });

    // pagination
    const totalItems = await noteService.count({ search, author: req.user });
    const pagination = query.getPagination({ totalItems, limit, page });

    // HATEOAS Links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;
  const expand = req.query.expand || "";

  try {
    const note = await noteService.findSingleItem({
      id,
      expand,
      author: req.user,
    });
    const response = {
      data: note,
      links: {
        self: `/notes/${note._id}`,
        author: `/notes/${note._id}/author`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const updateItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { note, code } = await noteService.updateOrCreate(id, {
      title: req.body.title,
      description: req.body.description,
      author: req.user,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Note updated successfully"
          : "Note created successfully",
      data: note,
      links: {
        self: `/notes/${note._id}`,
      },
    };

    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

const pinItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await noteService.pinItem(id, req.user);
    res.json({ data: note, message: "Note pin successfully" });
  } catch (e) {
    next(e);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await noteService.removeItem(id, req.user);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  findAllItems,
  findSingleItem,
  updateItem,
  pinItem,
  removeItem,
};
