/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Persimos`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `Rol`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Persimos.name_unique" ON "Persimos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rol.name_unique" ON "Rol"("name");
