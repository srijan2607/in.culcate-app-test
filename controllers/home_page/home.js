// controllers/home_page/home.js

const prisma = require("../../db/connect");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const get_knowledge_capsule_home_page = async (req, res) => {
  const page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 5;
  if (page <= 0) {
    limit = 5;
  }
  if (limit <= 0 || limit > 100) {
    limit = 10;
  }
  const knowledge_capsule = await prisma.knowledge_capsule.findMany({
    take: limit,
    skip: (page - 1) * limit,
    select: {
      id: true,
      Short_image: true,
      Short_title: true,
      Short_content: true,
    },
  });

  if (!knowledge_capsule || knowledge_capsule.length === 0) {
    throw new NotFoundError(`No articles found`);
  }
  res.status(StatusCodes.OK).json({ knowledge_capsule });
};

const get_category_home_page_by_id = async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      category: true,
      knowledge_capsules: {
        select: {
          id: true,
          Short_image: true,
          Short_title: true,
          Short_content: true,
        },
      },
    },
  });

  if (!category) {
    throw new NotFoundError(`Category with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ category });
};

module.exports = {
  get_knowledge_capsule_home_page,
  get_category_home_page_by_id,
};
