import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// 1. Obtiene el secreto esperado (la "llave" guardada)
const REVALIDATION_SECRET = process.env.REVALIDATION_TOKEN;

export async function GET(request: NextRequest) {
  // 2. Obtiene el secreto enviado por Strapi
  const secret = request.nextUrl.searchParams.get("secret");

  // 3. Comportamiento: Compara los dos
  if (secret !== REVALIDATION_SECRET) {
    // Si la "llave" es incorrecta, niega el acceso.
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // Si la llave es correcta, ejecuta la acción.
  revalidatePath("/");
  return NextResponse.json({ revalidated: true });
}
