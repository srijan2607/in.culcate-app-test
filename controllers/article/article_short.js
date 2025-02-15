const prisma = require("../../db/connect");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../../errors");

const get_short_articles = async (req, res) => {
  const page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 20;
  if (page <= 0) {
    limit = 1;
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
      tags: true,
      category: true,
    },
  });

  if (!knowledge_capsule || knowledge_capsule.length === 0) {
    throw new NotFoundError(`No articles found`);
  }
  res.status(StatusCodes.OK).json({ knowledge_capsule });
};

const get_short_articles_by_id = async (req, res) => {
  const { id } = req.params;
  const article = await prisma.knowledge_capsule.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      Short_image: true,
      Short_title: true,
      Short_content: true,
      tags: true,
      category: true,
    },
  });

  if (!article) {
    throw new NotFoundError(`Article with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ article });
};

module.exports = { get_short_articles, get_short_articles_by_id };
