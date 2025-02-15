const prisma = require("../../db/connect");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../../errors");

const get_long_articles = async (req, res) => {
  const { id } = req.params;
  const article = await prisma.knowledge_capsule.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      Long_image: true,
      Long_title: true,
      Long_content: true,
      tags: true,
      category: true,
    },
  });

  if (!article) {
    throw new NotFoundError(`Article with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ article });
};

const update_long_articles = async (req, res) => {
  const { id } = req.params;
  const { Long_image, Long_title, Long_content, tags, category } = req.body;

  try {
    const article = await prisma.knowledge_capsule.update({
      where: { id: Number(id) },
      data: {
        Long_image,
        Long_title,
        Long_content,
        tags: {
          connect: tags?.map((tagId) => ({ id: Number(tagId) })) || [],
        },
        category: {
          connect: { id: Number(category) },
        },
      },
      include: {
        tags: true,
        category: true,
      },
    });

    res.status(StatusCodes.OK).json({ article });
  } catch (error) {
    if (error.code === "P2025") {
      throw new NotFoundError(`Article with id ${id} not found`);
    }
    throw error;
  }
};

module.exports = { get_long_articles, update_long_articles };
