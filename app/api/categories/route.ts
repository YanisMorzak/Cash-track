import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(request: Request) {
    //  currentUser() is used to retrieve information on the currently logged-in user.
  const user = await currentUser();

  // If no user is found, the redirect("/sign-in") function redirects the user to the login page.
  if (!user) {
    redirect("/sign-in");
  }

  // Les paramètres de requête sont extraits de l'URL de la requête entrante à l'aide de new URL(request.url).
  const { searchParams } = new URL(request.url);
  // Le paramètre "type" est extrait des paramètres de requête à l'aide de searchParams.get("type").
  const paramType = searchParams.get("type");

  // Un schéma de validation est défini pour s'assurer que la valeur du paramètre "type" est soit "expense" (dépense), soit "income" (revenu), ou null. La fonction z.enum(["expense", "income"]).nullable() définit ce schéma de validation.
  const validator = z.enum(["expense", "income"]).nullable();


  // Les paramètres de requête sont validés par rapport au schéma défini à l'aide de validator.safeParse(paramType).
  const queryParams = validator.safeParse(paramType);

  // Si la validation échoue, un objet d'erreur est renvoyé avec un statut HTTP 400 (mauvaise requête).
  if (!queryParams.success) {
    return Response.json(queryParams.error, {
      status: 400,
    });
  }

  // Les catégories de l'utilisateur sont récupérées à partir de la base de données à l'aide de prisma.category.findMany.
  // Les catégories sont filtrées en fonction de l'ID de l'utilisateur et du type de catégorie spécifié dans les paramètres de requête, le cas échéant.
  // Les catégories sont triées par ordre alphabétique.
  const type = queryParams.data;
  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
      ...(type && { type }), // include type in the filters if it's defined
    },
    orderBy: {
      name: "asc",
    },
  });

  // Les catégories récupérées sont renvoyées sous forme de réponse JSON avec un statut HTTP 200 (OK).
  return Response.json(categories);
}