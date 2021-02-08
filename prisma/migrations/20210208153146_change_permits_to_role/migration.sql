/*
  Warnings:

  - You are about to drop the `_PersimosToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PersimosToUser" DROP CONSTRAINT "_PersimosToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersimosToUser" DROP CONSTRAINT "_PersimosToUser_B_fkey";

-- CreateTable
CREATE TABLE "_PersimosToRol" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- DropTable
DROP TABLE "_PersimosToUser";

-- CreateIndex
CREATE UNIQUE INDEX "_PersimosToRol_AB_unique" ON "_PersimosToRol"("A", "B");

-- CreateIndex
CREATE INDEX "_PersimosToRol_B_index" ON "_PersimosToRol"("B");

-- AddForeignKey
ALTER TABLE "_PersimosToRol" ADD FOREIGN KEY ("A") REFERENCES "Persimos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersimosToRol" ADD FOREIGN KEY ("B") REFERENCES "Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;
