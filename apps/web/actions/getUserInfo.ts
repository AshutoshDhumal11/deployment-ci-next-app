import { prisma } from "@repo/db/client";

export const getUserInfo = async () => {
  try {
    const user = await prisma.user.findFirst();
    return user;
  } catch (error) {
    return null;
  }
};
